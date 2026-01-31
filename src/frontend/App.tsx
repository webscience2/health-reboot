import { useState } from 'react';
import Dashboard from './components/Dashboard';
import SyncPanel from './components/SyncPanel';

function App() {
    const [activeView, setActiveView] = useState<'dashboard' | 'sync'>('dashboard');

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Header */}
            <header style={{
                background: 'var(--bg-secondary)',
                borderBottom: '1px solid var(--border-color)',
                padding: 'var(--spacing-lg)',
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                        🏃 Health Reboot
                    </h1>

                    <nav style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                        <button
                            className={activeView === 'dashboard' ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setActiveView('dashboard')}
                        >
                            Dashboard
                        </button>
                        <button
                            className={activeView === 'sync' ? 'btn btn-primary' : 'btn btn-secondary'}
                            onClick={() => setActiveView('sync')}
                        >
                            Sync
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="container" style={{ marginTop: 'var(--spacing-xl)' }}>
                {activeView === 'dashboard' && <Dashboard />}
                {activeView === 'sync' && <SyncPanel />}
            </main>

            {/* Footer */}
            <footer style={{
                marginTop: 'var(--spacing-xl)',
                padding: 'var(--spacing-lg)',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontSize: '0.875rem',
            }}>
                <p>Health Reboot v0.1.0 - Phase 1: Foundation & Data Pipeline</p>
            </footer>
        </div>
    );
}

export default App;
