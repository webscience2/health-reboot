import express from 'express';
import { dataSyncService } from '../services/data-sync.js';
import { getIntervalsClient } from '../integrations/intervals-icu.js';
import { db } from '../db/index.js';

const router = express.Router();

/**
 * POST /api/sync/test - Test Intervals.icu connection
 */
router.post('/test', async (req, res) => {
    try {
        const client = getIntervalsClient();
        const connected = await client.testConnection();

        if (connected) {
            const athlete = await client.getAthlete();
            res.json({
                status: 'success',
                message: 'Successfully connected to Intervals.icu',
                athlete: {
                    id: athlete.id,
                    name: athlete.name,
                },
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Failed to connect to Intervals.icu',
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});

/**
 * POST /api/sync/daily - Run daily sync
 */
router.post('/daily', async (req, res) => {
    try {
        await dataSyncService.dailySync();
        res.json({ status: 'success', message: 'Daily sync completed' });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Sync failed',
        });
    }
});

/**
 * POST /api/sync/historical - Run historical sync
 */
router.post('/historical', async (req, res) => {
    const { yearsBack = 5 } = req.body;

    try {
        // Run in background and return immediately
        dataSyncService.syncHistoricalData(yearsBack).catch(console.error);

        res.json({
            status: 'started',
            message: `Historical sync started for ${yearsBack} years of data`,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Failed to start sync',
        });
    }
});

/**
 * GET /api/sync/status - Get sync status
 */
router.get('/status', (req, res) => {
    const statuses = db.prepare(`
    SELECT source, last_sync_time, last_sync_status, last_sync_error
    FROM sync_status
    ORDER BY last_sync_time DESC
  `).all();

    res.json(statuses);
});

/**
 * POST /api/sync/analyze-bests - Analyze historical bests
 */
router.post('/analyze-bests', async (req, res) => {
    try {
        const bests = await dataSyncService.analyzeHistoricalBests();
        res.json(bests);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error instanceof Error ? error.message : 'Analysis failed',
        });
    }
});

export default router;
