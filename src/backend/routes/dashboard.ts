import express from 'express';
import { db, getDefaultUserId } from '../db/index.js';
import { format, subDays } from 'date-fns';

const router = express.Router();
const userId = getDefaultUserId();

/**
 * GET /api/dashboard - Get dashboard overview
 */
router.get('/', (req, res) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const days30Ago = format(subDays(new Date(), 30), 'yyyy-MM-dd');
    const days7Ago = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    // Today's biometrics
    const todayBiometrics = db.prepare(`
    SELECT * FROM biometrics
    WHERE user_id = ? AND date = ?
  `).get(userId, today);

    // 30-day averages
    const averages = db.prepare(`
    SELECT 
      AVG(hrv_rmssd) as avg_hrv_30d,
      AVG(resting_hr) as avg_rhr_30d,
      AVG(sleep_score) as avg_sleep_score_30d,
      AVG(sleep_duration_minutes) as avg_sleep_duration_30d
    FROM biometrics
    WHERE user_id = ? AND date >= ?
  `).get(userId, days30Ago);

    // 7-day HRV trend for readiness
    const hrvTrend = db.prepare(`
    SELECT date, hrv_rmssd, resting_hr, sleep_score
    FROM biometrics
    WHERE user_id = ? AND date >= ?
    ORDER BY date DESC
    LIMIT 7
  `).all(userId, days7Ago);

    // Last 7 days activities
    const recentActivities = db.prepare(`
    SELECT activity_type, COUNT(*) as count, SUM(duration_seconds) as total_duration
    FROM activities
    WHERE user_id = ? AND date(start_time) >= ?
    GROUP BY activity_type
  `).all(userId, days7Ago);

    // Training load (last 30 days)
    const trainingLoad = db.prepare(`
    SELECT 
      SUM(training_stress_score) as total_tss,
      AVG(training_stress_score) as avg_tss_per_workout
    FROM activities
    WHERE user_id = ? 
      AND date(start_time) >= ?
      AND training_stress_score IS NOT NULL
  `).get(userId, days30Ago);

    // Calculate simple readiness score
    let readiness = null;
    if (todayBiometrics && averages) {
        const hrvScore = todayBiometrics.hrv_rmssd && averages.avg_hrv_30d
            ? (todayBiometrics.hrv_rmssd / averages.avg_hrv_30d) * 50
            : 50;

        const rhrScore = todayBiometrics.resting_hr && averages.avg_rhr_30d
            ? (1 - (todayBiometrics.resting_hr - averages.avg_rhr_30d) / averages.avg_rhr_30d) * 30
            : 30;

        const sleepScore = todayBiometrics.sleep_score || 20;

        const totalScore = Math.max(0, Math.min(100, hrvScore + rhrScore + sleepScore));

        readiness = {
            score: Math.round(totalScore),
            level: totalScore >= 70 ? 'green' : totalScore >= 40 ? 'yellow' : 'red',
            recommendation: totalScore >= 70 ? 'train_hard' : totalScore >= 40 ? 'moderate' : 'rest',
        };
    }

    res.json({
        todayBiometrics,
        averages,
        hrvTrend,
        recentActivities,
        trainingLoad,
        readiness,
        lastUpdated: new Date().toISOString(),
    });
});

/**
 * GET /api/dashboard/weekly-summary - Get weekly training summary
 */
router.get('/weekly-summary', (req, res) => {
    const days7Ago = format(subDays(new Date(), 7), 'yyyy-MM-dd');

    const summary = db.prepare(`
    SELECT 
      date(start_time) as date,
      activity_type,
      COUNT(*) as count,
      SUM(duration_seconds) as total_duration,
      SUM(distance_meters) as total_distance,
      SUM(training_stress_score) as total_tss
    FROM activities
    WHERE user_id = ? AND date(start_time) >= ?
    GROUP BY date(start_time), activity_type
    ORDER BY date DESC
  `).all(userId, days7Ago);

    res.json(summary);
});

export default router;
