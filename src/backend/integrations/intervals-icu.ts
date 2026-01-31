/**
 * Intervals.icu API Client
 * 
 * Intervals.icu has Garmin API access and provides a bridge to access:
 * - Wellness data (HRV, RHR, sleep, respiration, stress, etc.)
 * - Activity data
 * - Training calendar
 * 
 * API Documentation: https://forum.intervals.icu/t/api-access/609
 * 
 * Authentication:
 * - HTTP Basic Auth with API_KEY:athlete_id as username and blank password OR
 * - API_KEY as 'Authorization: Basic {base64(API_KEY:)}'
 */

import axios, { AxiosInstance } from 'axios';
import { config } from '../config/index.js';

export interface IntervalsWellnessData {
    id: string;
    icu_athlete_id: number;
    date: string; // YYYY-MM-DD
    weight?: number;
    restingHR?: number;
    hrv?: number; // rMSSD
    sleepSecs?: number;
    sleepScore?: number;
    mentalEnergy?: number;
    ctl?: number; // Chronic Training Load
    atl?: number; // Acute Training Load
    rampRate?: number;
    ctlLoad?: number;
    atlLoad?: number;
    sportInfo?: {
        [sport: string]: {
            ctl?: number;
            atl?: number;
        };
    };
    updated?: string;
}

export interface IntervalsActivity {
    id: string;
    icu_athlete_id: number;
    start_date_local: string;
    type: string; // 'Ride', 'Run', 'WeightTraining', etc.
    name?: string;
    description?: string;
    distance?: number; // meters
    moving_time?: number; // seconds
    elapsed_time?: number; // seconds
    total_elevation_gain?: number; // meters
    average_hr?: number;
    max_hr?: number;
    average_power?: number;
    normalized_power?: number;
    training_load?: number; // TSS
    intensity?: number; // IF
    calories?: number;
    average_cadence?: number;
    average_pace?: number; // min/km
    feel?: number; // 1-10
    perceived_exertion?: number; // 1-10
    external_id?: string; // Garmin/Strava ID
}

export interface IntervalsAthlete {
    id: number;
    name: string;
    email?: string;
    weight?: number;
    max_hr?: number;
    resting_hr?: number;
    lthr?: number; // Lactate Threshold HR
    ftp?: number; // Functional Threshold Power
}

export class IntervalsICUClient {
    private client: AxiosInstance;
    private athleteId: string;

    constructor(apiKey: string, athleteId: string) {
        this.athleteId = athleteId;

        // Create basic auth header: base64(API_KEY:)
        const authString = Buffer.from(`${apiKey}:`).toString('base64');

        this.client = axios.create({
            baseURL: 'https://intervals.icu/api/v1',
            headers: {
                'Authorization': `Basic ${authString}`,
                'Content-Type': 'application/json',
            },
            timeout: 30000,
        });
    }

    /**
     * Get athlete profile
     */
    async getAthlete(): Promise<IntervalsAthlete> {
        const response = await this.client.get(`/athlete/${this.athleteId}`);
        return response.data;
    }

    /**
     * Get wellness data for a date range
     * @param startDate YYYY-MM-DD
     * @param endDate YYYY-MM-DD
     */
    async getWellness(startDate: string, endDate: string): Promise<IntervalsWellnessData[]> {
        const response = await this.client.get(
            `/athlete/${this.athleteId}/wellness/${startDate}/${endDate}`
        );
        return response.data;
    }

    /**
     * Get single day wellness data
     */
    async getWellnessForDate(date: string): Promise<IntervalsWellnessData | null> {
        try {
            const response = await this.client.get(
                `/athlete/${this.athleteId}/wellness/${date}/${date}`
            );
            return response.data?.[0] || null;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                return null;
            }
            throw error;
        }
    }

    /**
     * Get activities for a date range
     * @param startDate YYYY-MM-DD
     * @param endDate YYYY-MM-DD
     */
    async getActivities(startDate: string, endDate: string): Promise<IntervalsActivity[]> {
        const response = await this.client.get(
            `/athlete/${this.athleteId}/activities`,
            {
                params: {
                    oldest: startDate,
                    newest: endDate,
                },
            }
        );
        return response.data;
    }

    /**
     * Get single activity by ID
     */
    async getActivity(activityId: string): Promise<IntervalsActivity> {
        const response = await this.client.get(
            `/athlete/${this.athleteId}/activities/${activityId}`
        );
        return response.data;
    }

    /**
     * Get all wellness data (paginated internally by month)
     * Fetches historical data from specified start date to today
     */
    async getAllWellness(startDate: string): Promise<IntervalsWellnessData[]> {
        const today = new Date().toISOString().split('T')[0];
        const start = new Date(startDate);
        const end = new Date(today);

        const allData: IntervalsWellnessData[] = [];

        // Fetch in monthly chunks to avoid timeout
        let currentStart = new Date(start);

        while (currentStart <= end) {
            const monthEnd = new Date(currentStart);
            monthEnd.setMonth(monthEnd.getMonth() + 1);
            monthEnd.setDate(0); // Last day of month

            const chunkEnd = monthEnd > end ? end : monthEnd;

            const chunkData = await this.getWellness(
                currentStart.toISOString().split('T')[0],
                chunkEnd.toISOString().split('T')[0]
            );

            allData.push(...chunkData);

            currentStart = new Date(chunkEnd);
            currentStart.setDate(currentStart.getDate() + 1);
        }

        return allData;
    }

    /**
     * Test connection and authentication
     */
    async testConnection(): Promise<boolean> {
        try {
            await this.getAthlete();
            return true;
        } catch (error) {
            console.error('Intervals.icu connection test failed:', error);
            return false;
        }
    }
}

// Singleton instance
let client: IntervalsICUClient | null = null;

export function getIntervalsClient(): IntervalsICUClient {
    if (!client) {
        if (!config.intervals.apiKey || !config.intervals.athleteId) {
            throw new Error('Intervals.icu API credentials not configured');
        }
        client = new IntervalsICUClient(config.intervals.apiKey, config.intervals.athleteId);
    }
    return client;
}

export default IntervalsICUClient;
