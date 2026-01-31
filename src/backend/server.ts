import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { initializeDatabase } from './db/index.js';
import biometricsRouter from './routes/biometrics.js';
import activitiesRouter from './routes/activities.js';
import syncRouter from './routes/sync.js';
import dashboardRouter from './routes/dashboard.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Initialize database
initializeDatabase();

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/biometrics', biometricsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/sync', syncRouter);
app.use('/api/dashboard', dashboardRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
});

// Start server
app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
    console.log(`Environment: ${config.nodeEnv}`);
});

export default app;
