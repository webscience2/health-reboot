import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '../api/client';
import { format } from 'date-fns';

export default function Dashboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await dashboardApi.getDashboard();
            return response.data;
        },
        refetchInterval: 60000, // Refresh every minute
    });

    if (isLoading) {
        return <div className="spinner" />;
    }

    if (error) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                <h2 style={{ color: 'var(--accent-danger)', marginBottom: 'var(--spacing-md)' }}>
                    ❌ Error Loading Dashboard
                </h2>
                <p className="text-muted">
                    {error instanceof Error ? error.message : 'Failed to load data'}
                </p>
                <p className="text-muted" style={{ marginTop: 'var(--spacing-md)' }}>
                    Make sure the backend server is running and Intervals.icu is configured.
                </p>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const { todayBiometrics, averages, recentActivities, readiness } = data;

    return (
        <div>
            {/* Readiness Score */}
            {readiness && (
                <div className="card" style={{
                    background: readiness.level === 'green'
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)'
                        : readiness.level === 'yellow'
                            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)'
                            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 100%)',
                    marginBottom: 'var(--spacing-lg)',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: 'var(--spacing-md)',
                    }}>
                        <div>
                            <h2 style={{ marginBottom: 'var(--spacing-sm)' }}>
                                Daily Readiness
                            </h2>
                            <p className="text-muted">
                                {format(new Date(), 'EEEE, MMMM d, yyyy')}
                            </p>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                fontSize: '3.5rem',
                                fontWeight: '700',
                                color: readiness.level === 'green'
                                    ? 'var(--accent-success)'
                                    : readiness.level === 'yellow'
                                        ? 'var(--accent-warning)'
                                        : 'var(--accent-danger)',
                            }}>
                                {readiness.score}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                / 100
                            </div>
                        </div>

                        <div>
                            <span className={`readiness-badge readiness-${readiness.level}`}>
                                {readiness.level === 'green' && '✅ Train Hard'}
                                {readiness.level === 'yellow' && '⚠️ Moderate'}
                                {readiness.level === 'red' && '🛑 Rest Day'}
                            </span>
                            <p className="text-muted" style={{ marginTop: 'var(--spacing-sm)', fontSize: '0.875rem' }}>
                                Recommendation: {readiness.recommendation.replace('_', ' ')}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Today's Biometrics */}
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Today's Metrics</h3>
            <div className="grid grid-3" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div className="card stat">
                    <div className="stat-value">
                        {todayBiometrics?.hrv_rmssd?.toFixed(0) || '—'}
                    </div>
                    <div className="stat-label">HRV (rMSSD)</div>
                    {averages?.avg_hrv_30d && todayBiometrics?.hrv_rmssd && (
                        <div className={`stat-change ${todayBiometrics.hrv_rmssd >= averages.avg_hrv_30d ? 'text-success' : 'text-danger'}`}>
                            {todayBiometrics.hrv_rmssd >= averages.avg_hrv_30d ? '↑' : '↓'}
                            {' '}
                            {Math.abs((todayBiometrics.hrv_rmssd / averages.avg_hrv_30d - 1) * 100).toFixed(1)}% vs 30d avg
                        </div>
                    )}
                </div>

                <div className="card stat">
                    <div className="stat-value">
                        {todayBiometrics?.resting_hr || '—'}
                    </div>
                    <div className="stat-label">Resting HR</div>
                    {averages?.avg_rhr_30d && todayBiometrics?.resting_hr && (
                        <div className={`stat-change ${todayBiometrics.resting_hr <= averages.avg_rhr_30d ? 'text-success' : 'text-danger'}`}>
                            {todayBiometrics.resting_hr <= averages.avg_rhr_30d ? '↓' : '↑'}
                            {' '}
                            {Math.abs((1 - todayBiometrics.resting_hr / averages.avg_rhr_30d) * 100).toFixed(1)}% vs 30d avg
                        </div>
                    )}
                </div>

                <div className="card stat">
                    <div className="stat-value">
                        {todayBiometrics?.sleep_score || '—'}
                    </div>
                    <div className="stat-label">Sleep Score</div>
                    {todayBiometrics?.sleep_duration_minutes && (
                        <div className="stat-change text-muted">
                            {(todayBiometrics.sleep_duration_minutes / 60).toFixed(1)}h sleep
                        </div>
                    )}
                </div>

                <div className="card stat">
                    <div className="stat-value">
                        {todayBiometrics?.vo2_max?.toFixed(1) || '—'}
                    </div>
                    <div className="stat-label">VO2 Max</div>
                </div>

                <div className="card stat">
                    <div className="stat-value">
                        {todayBiometrics?.weight_kg?.toFixed(1) || '—'}
                    </div>
                    <div className="stat-label">Weight (kg)</div>
                </div>

                <div className="card stat">
                    <div className="stat-value">
                        {todayBiometrics?.body_battery || '—'}
                    </div>
                    <div className="stat-label">Body Battery</div>
                </div>
            </div>

            {/* Recent Activities */}
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Last 7 Days Activity</h3>
            <div className="grid grid-2">
                {recentActivities && recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                        <div key={activity.activity_type} className="card">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <div>
                                    <h4 style={{
                                        textTransform: 'capitalize',
                                        marginBottom: 'var(--spacing-xs)',
                                    }}>
                                        {activity.activity_type}
                                    </h4>
                                    <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                                        {activity.count} sessions
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                                        {(activity.total_duration / 3600).toFixed(1)}h
                                    </div>
                                    <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                                        total time
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                        <p className="text-muted">No activities in the last 7 days</p>
                        <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: 'var(--spacing-sm)' }}>
                            Run a sync to import your data from Intervals.icu
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
