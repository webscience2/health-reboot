/**
 * Data Sync Service
 * 
 * Handles syncing data from Intervals.icu (which acts as a bridge to Garmin)
 * into our local database.
 */

import { getIntervalsClient, IntervalsWellnessData, IntervalsActivity } from '../integrations/intervals-icu.js';
import { db, getDefaultUserId } from '../db/index.js';
import { format, subDays } from 'date-fns';

export class DataSyncService {
    private userId = getDefaultUserId();

    /**
     * Sync wellness data from Intervals.icu
     */
    async syncWellnessData(startDate: string, endDate: string): Promise<number> {
        const client = getIntervalsClient();
        const wellnessData = await client.getWellness(startDate, endDate);

        let syncedCount = 0;

        const stmt = db.prepare(`
      INSERT INTO biometrics (
        user_id, date, hrv_rmssd, resting_hr, sleep_duration_minutes, 
        weight_kg, source
      ) VALUES (?, ?, ?, ?, ?, ?, 'intervals')
      ON CONFLICT(user_id, date) DO UPDATE SET
        hrv_rmssd = COALESCE(excluded.hrv_rmssd, hrv_rmssd),
        resting_hr = COALESCE(excluded.resting_hr, resting_hr),
        sleep_duration_minutes = COALESCE(excluded.sleep_duration_minutes, sleep_duration_minutes),
        weight_kg = COALESCE(excluded.weight_kg, weight_kg)
    `);

        for (const data of wellnessData) {
            stmt.run(
                this.userId,
                data.date,
                data.hrv || null,
                data.restingHR || null,
                data.sleepSecs ? Math.round(data.sleepSecs / 60) : null,
                data.weight || null
            );
            syncedCount++;
        }

        console.log(`Synced ${syncedCount} wellness records from ${startDate} to ${endDate}`);
        return syncedCount;
    }

    /**
     * Sync activities from Intervals.icu
     */
    async syncActivities(startDate: string, endDate: string): Promise<number> {
        const client = getIntervalsClient();
        const activities = await client.getActivities(startDate, endDate);

        let syncedCount = 0;

        const stmt = db.prepare(`
      INSERT INTO activities (
        user_id, external_id, activity_type, start_time, duration_seconds,
        distance_meters, elevation_gain_meters, avg_hr, max_hr, avg_power,
        normalized_power, training_stress_score, intensity_factor, calories,
        avg_cadence, name, description, source
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'intervals')
      ON CONFLICT(external_id) DO UPDATE SET
        avg_hr = COALESCE(excluded.avg_hr, avg_hr),
        max_hr = COALESCE(excluded.max_hr, max_hr),
        avg_power = COALESCE(excluded.avg_power, avg_power),
        training_stress_score = COALESCE(excluded.training_stress_score, training_stress_score)
    `);

        for (const activity of activities) {
            const activityType = this.mapActivityType(activity.type);

            stmt.run(
                this.userId,
                activity.id,
                activityType,
                activity.start_date_local,
                activity.moving_time || activity.elapsed_time || null,
                activity.distance || null,
                activity.total_elevation_gain || null,
                activity.average_hr || null,
                activity.max_hr || null,
                activity.average_power || null,
                activity.normalized_power || null,
                activity.training_load || null,
                activity.intensity || null,
                activity.calories || null,
                activity.average_cadence || null,
                activity.name || null,
                activity.description || null
            );
            syncedCount++;
        }

        console.log(`Synced ${syncedCount} activities from ${startDate} to ${endDate}`);
        return syncedCount;
    }

    /**
     * Full historical sync
     */
    async syncHistoricalData(yearsBack: number = 5): Promise<void> {
        const endDate = format(new Date(), 'yyyy-MM-dd');
        const startDate = format(subDays(new Date(), yearsBack * 365), 'yyyy-MM-dd');

        console.log(`Starting historical sync from ${startDate} to ${endDate}...`);

        // Sync in monthly chunks to avoid timeouts
        const start = new Date(startDate);
        const end = new Date(endDate);
        let currentStart = new Date(start);

        while (currentStart <= end) {
            const monthEnd = new Date(currentStart);
            monthEnd.setMonth(monthEnd.getMonth() + 1);
            monthEnd.setDate(0);

            const chunkEnd = monthEnd > end ? end : monthEnd;
            const chunkStartStr = format(currentStart, 'yyyy-MM-dd');
            const chunkEndStr = format(chunkEnd, 'yyyy-MM-dd');

            try {
                await this.syncWellnessData(chunkStartStr, chunkEndStr);
                await this.syncActivities(chunkStartStr, chunkEndStr);
            } catch (error) {
                console.error(`Error syncing ${chunkStartStr} to ${chunkEndStr}:`, error);
            }

            currentStart = new Date(chunkEnd);
            currentStart.setDate(currentStart.getDate() + 1);
        }

        this.updateSyncStatus('intervals_icu', 'success');
        console.log('Historical sync completed');
    }

    /**
     * Daily sync - last 7 days to catch any updates
     */
    async dailySync(): Promise<void> {
        const endDate = format(new Date(), 'yyyy-MM-dd');
        const startDate = format(subDays(new Date(), 7), 'yyyy-MM-dd');

        console.log(`Running daily sync from ${startDate} to ${endDate}...`);

        try {
            await this.syncWellnessData(startDate, endDate);
            await this.syncActivities(startDate, endDate);
            this.updateSyncStatus('intervals_icu', 'success');
            console.log('Daily sync completed');
        } catch (error) {
            console.error('Daily sync error:', error);
            this.updateSyncStatus('intervals_icu', 'error', String(error));
            throw error;
        }
    }

    /**
     * Update sync status in database
     */
    private updateSyncStatus(source: string, status: 'success' | 'error', error?: string) {
        db.prepare(`
      UPDATE sync_status 
      SET last_sync_time = CURRENT_TIMESTAMP,
          last_sync_status = ?,
          last_sync_error = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE source = ?
    `).run(status, error || null, source);
    }

    /**
     * Map Intervals.icu activity type to our internal types
     */
    private mapActivityType(intervalsType: string): string {
        const typeMap: Record<string, string> = {
            'Run': 'run',
            'Ride': 'cycle',
            'VirtualRide': 'cycle',
            'WeightTraining': 'strength',
            'Yoga': 'yoga',
            'Walk': 'walk',
            'Hike': 'hike',
            'Swim': 'swim',
            'Other': 'other',
        };

        return typeMap[intervalsType] || 'other';
    }

    /**
     * Analyze historical data to extract bests
     */
    async analyzeHistoricalBests(): Promise<{
        run5kBest?: { time: number; date: string };
        run10kBest?: { time: number; date: string };
        ftpHigh?: { watts: number; date: string };
        vo2MaxHigh?: { value: number; date: string };
    }> {
        // Get best 5k run time
        const run5k = db.prepare(`
      SELECT duration_seconds, start_time
      FROM activities
      WHERE activity_type = 'run'
        AND distance_meters BETWEEN 4900 AND 5100
        AND completed = 1
      ORDER BY duration_seconds ASC
      LIMIT 1
    `).get() as { duration_seconds: number; start_time: string } | undefined;

        // Get best 10k run time
        const run10k = db.prepare(`
      SELECT duration_seconds, start_time
      FROM activities
      WHERE activity_type = 'run'
        AND distance_meters BETWEEN 9900 AND 10100
        AND completed = 1
      ORDER BY duration_seconds ASC
      LIMIT 1
    `).get() as { duration_seconds: number; start_time: string } | undefined;

        // Get highest FTP (from activities with power)
        const ftp = db.prepare(`
      SELECT MAX(normalized_power) as watts, start_time
      FROM activities
      WHERE activity_type = 'cycle'
        AND normalized_power IS NOT NULL
        AND duration_seconds >= 3600
      LIMIT 1
    `).get() as { watts: number; start_time: string } | undefined;

        // Get highest VO2 Max
        const vo2max = db.prepare(`
      SELECT MAX(vo2_max) as value, date
      FROM biometrics
      WHERE vo2_max IS NOT NULL
      LIMIT 1
    `).get() as { value: number; date: string } | undefined;

        return {
            run5kBest: run5k ? { time: run5k.duration_seconds, date: run5k.start_time } : undefined,
            run10kBest: run10k ? { time: run10k.duration_seconds, date: run10k.start_time } : undefined,
            ftpHigh: ftp && ftp.watts ? { watts: ftp.watts, date: ftp.start_time } : undefined,
            vo2MaxHigh: vo2max ? { value: vo2max.value, date: vo2max.date } : undefined,
        };
    }
}

export const dataSyncService = new DataSyncService();
