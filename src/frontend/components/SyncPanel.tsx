import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { syncApi } from '../api/client';

export default function SyncPanel() {
    const [syncMessage, setSyncMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Get sync status
    const { data: syncStatus, refetch: refetchStatus } = useQuery({
        queryKey: ['syncStatus'],
        queryFn: async () => {
            const response = await syncApi.getStatus();
            return response.data;
        },
    });

    // Test connection mutation
    const testMutation = useMutation({
        mutationFn: syncApi.testConnection,
        onSuccess: (response) => {
            setSyncMessage({
                type: 'success',
                text: `✅ ${response.data.message} - Athlete: ${response.data.athlete?.name}`,
            });
        },
        onError: (error: any) => {
            setSyncMessage({
                type: 'error',
                text: `❌ ${error.response?.data?.message || error.message}`,
            });
        },
    });

    // Daily sync mutation
    const dailySyncMutation = useMutation({
        mutationFn: syncApi.runDailySync,
        onSuccess: () => {
            setSyncMessage({
                type: 'success',
                text: '✅ Daily sync completed successfully',
            });
            refetchStatus();
        },
        onError: (error: any) => {
            setSyncMessage({
                type: 'error',
                text: `❌ Daily sync failed: ${error.response?.data?.message || error.message}`,
            });
        },
    });

    // Historical sync mutation
    const historicalSyncMutation = useMutation({
        mutationFn: () => syncApi.runHistoricalSync(5),
        onSuccess: () => {
            setSyncMessage({
                type: 'success',
                text: '✅ Historical sync started (running in background)',
            });
            refetchStatus();
        },
        onError: (error: any) => {
            setSyncMessage({
                type: 'error',
                text: `❌ Failed to start historical sync: ${error.response?.data?.message || error.message}`,
            });
        },
    });

    return (
        <div>
            <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Data Sync</h2>
            <p className="text-muted" style={{ marginBottom: 'var(--spacing-xl)' }}>
                Sync wellness and activity data from Intervals.icu (which acts as a bridge to Garmin)
            </p>

            {/* Message Display */}
            {syncMessage && (
                <div
                    className="card"
                    style={{
                        marginBottom: 'var(--spacing-lg)',
                        background: syncMessage.type === 'success'
                            ? 'rgba(16, 185, 129, 0.1)'
                            : 'rgba(239, 68, 68, 0.1)',
                        borderColor: syncMessage.type === 'success'
                            ? 'var(--accent-success)'
                            : 'var(--accent-danger)',
                    }}
                >
                    <p style={{
                        color: syncMessage.type === 'success' ? 'var(--accent-success)' : 'var(--accent-danger)',
                    }}>
                        {syncMessage.text}
                    </p>
                </div>
            )}

            {/* Sync Actions */}
            <div className="grid grid-2" style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Test Connection</h3>
                    <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-lg)' }}>
                        Verify your Intervals.icu API credentials are working
                    </p>
                    <button
                        className="btn btn-secondary"
                        onClick={() => testMutation.mutate()}
                        disabled={testMutation.isPending}
                        style={{ width: '100%' }}
                    >
                        {testMutation.isPending ? 'Testing...' : '🔌 Test Connection'}
                    </button>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Daily Sync</h3>
                    <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-lg)' }}>
                        Sync the last 7 days of wellness and activity data
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => dailySyncMutation.mutate()}
                        disabled={dailySyncMutation.isPending}
                        style={{ width: '100%' }}
                    >
                        {dailySyncMutation.isPending ? 'Syncing...' : '🔄 Run Daily Sync'}
                    </button>
                </div>

                <div className="card" style={{ gridColumn: '1 / -1' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Historical Sync</h3>
                    <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: 'var(--spacing-lg)' }}>
                        Import 5 years of historical data (runs in background, may take several minutes)
                    </p>
                    <button
                        className="btn btn-secondary"
                        onClick={() => historicalSyncMutation.mutate()}
                        disabled={historicalSyncMutation.isPending}
                        style={{ width: '100%', maxWidth: '400px' }}
                    >
                        {historicalSyncMutation.isPending ? 'Starting...' : '📥 Run Historical Sync (5 years)'}
                    </button>
                </div>
            </div>

            {/* Sync Status */}
            <div className="card">
                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Sync Status</h3>
                {syncStatus && syncStatus.length > 0 ? (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            fontSize: '0.875rem',
                        }}>
                            <thead>
                                <tr style={{
                                    borderBottom: '1px solid var(--border-color)',
                                    textAlign: 'left',
                                }}>
                                    <th style={{ padding: 'var(--spacing-sm)', color: 'var(--text-muted)' }}>
                                        Source
                                    </th>
                                    <th style={{ padding: 'var(--spacing-sm)', color: 'var(--text-muted)' }}>
                                        Last Sync
                                    </th>
                                    <th style={{ padding: 'var(--spacing-sm)', color: 'var(--text-muted)' }}>
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {syncStatus.map((status: any) => (
                                    <tr key={status.source} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: 'var(--spacing-sm)' }}>
                                            {status.source.replace('_', ' ')}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-sm)', color: 'var(--text-muted)' }}>
                                            {status.last_sync_time
                                                ? new Date(status.last_sync_time).toLocaleString()
                                                : 'Never'}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-sm)' }}>
                                            <span style={{
                                                color: status.last_sync_status === 'success'
                                                    ? 'var(--accent-success)'
                                                    : status.last_sync_status === 'error'
                                                        ? 'var(--accent-danger)'
                                                        : 'var(--text-muted)',
                                            }}>
                                                {status.last_sync_status === 'success' && '✅ Success'}
                                                {status.last_sync_status === 'error' && '❌ Error'}
                                                {status.last_sync_status === 'pending' && '⏳ Pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-muted">No sync history available</p>
                )}
            </div>
        </div>
    );
}
