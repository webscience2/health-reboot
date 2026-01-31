import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
});

export interface BiometricData {
    id: number;
    user_id: number;
    date: string;
    hrv_rmssd?: number;
    resting_hr?: number;
    sleep_score?: number;
    sleep_duration_minutes?: number;
    vo2_max?: number;
    body_battery?: number;
    weight_kg?: number;
    body_fat_percent?: number;
}

export interface Activity {
    id: number;
    external_id?: string;
    activity_type: string;
    start_time: string;
    duration_seconds?: number;
    distance_meters?: number;
    elevation_gain_meters?: number;
    avg_hr?: number;
    training_stress_score?: number;
    name?: string;
}

export interface DashboardData {
    todayBiometrics: BiometricData | null;
    averages: {
        avg_hrv_30d: number;
        avg_rhr_30d: number;
        avg_sleep_score_30d: number;
    };
    hrvTrend: Array<{
        date: string;
        hrv_rmssd: number;
        resting_hr: number;
    }>;
    recentActivities: Array<{
        activity_type: string;
        count: number;
        total_duration: number;
    }>;
    readiness: {
        score: number;
        level: 'green' | 'yellow' | 'red';
        recommendation: string;
    } | null;
}

export const dashboardApi = {
    getDashboard: () => api.get<DashboardData>('/dashboard'),
};

export const biometricsApi = {
    getAll: (params?: { startDate?: string; endDate?: string; limit?: number }) =>
        api.get<BiometricData[]>('/biometrics', { params }),
    getTrends: (days: number = 90) =>
        api.get<Array<{ date: string; hrv_rmssd: number }>>('/biometrics/trends/hrv', {
            params: { days },
        }),
};

export const activitiesApi = {
    getAll: (params?: { startDate?: string; endDate?: string; type?: string; limit?: number }) =>
        api.get<Activity[]>('/activities', { params }),
    getBests: () => api.get('/activities/bests/all'),
};

export const syncApi = {
    testConnection: () => api.post('/sync/test'),
    runDailySync: () => api.post('/sync/daily'),
    runHistoricalSync: (yearsBack: number = 5) =>
        api.post('/sync/historical', { yearsBack }),
    getStatus: () => api.get('/sync/status'),
};

export default api;
