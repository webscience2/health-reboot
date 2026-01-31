import express from 'express';
import { db, getDefaultUserId } from '../db/index.js';

const router = express.Router();
const userId = getDefaultUserId();

/**
 * GET /api/activities - Get activities for date range
 */
router.get('/', (req, res) => {
    const { startDate, endDate, type, limit = '50' } = req.query;

    let query = `
    SELECT * FROM activities 
    WHERE user_id = ?
  `;
    const params: any[] = [userId];

    if (startDate && endDate) {
        query += ` AND date(start_time) BETWEEN ? AND ?`;
        params.push(startDate, endDate);
    }

    if (type) {
        query += ` AND activity_type = ?`;
        params.push(type);
    }

    query += ` ORDER BY start_time DESC LIMIT ?`;
    params.push(parseInt(limit as string, 10));

    const data = db.prepare(query).all(...params);
    res.json(data);
});

/**
 * GET /api/activities/:id - Get single activity
 */
router.get('/:id', (req, res) => {
    const { id } = req.params;

    const activity = db.prepare(`
    SELECT * FROM activities 
    WHERE id = ? AND user_id = ?
  `).get(id, userId);

    if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
    }

    res.json(activity);
});

/**
 * GET /api/activities/stats/summary - Get activity statistics
 */
router.get('/stats/summary', (req, res) => {
    const { days = '30' } = req.query;

    const stats = db.prepare(`
    SELECT 
      activity_type,
      COUNT(*) as count,
      SUM(duration_seconds) as total_duration,
      SUM(distance_meters) as total_distance,
      AVG(training_stress_score) as avg_tss,
      SUM(training_stress_score) as total_tss
    FROM activities
    WHERE user_id = ?
      AND date(start_time) >= date('now', '-' || ? || ' days')
    GROUP BY activity_type
  `).all(userId, parseInt(days as string, 10));

    res.json(stats);
});

/**
 * GET /api/activities/bests - Get historical bests
 */
router.get('/bests/all', (req, res) => {
    // Best 5k run
    const run5k = db.prepare(`
    SELECT duration_seconds, start_time, name
    FROM activities
    WHERE user_id = ? AND activity_type = 'run'
      AND distance_meters BETWEEN 4900 AND 5100
      AND completed = 1
    ORDER BY duration_seconds ASC
    LIMIT 1
  `).get(userId);

    // Best 10k run
    const run10k = db.prepare(`
    SELECT duration_seconds, start_time, name
    FROM activities
    WHERE user_id = ? AND activity_type = 'run'
      AND distance_meters BETWEEN 9900 AND 10100
      AND completed = 1
    ORDER BY duration_seconds ASC
    LIMIT 1
  `).get(userId);

    // Highest average power for 1-hour ride
    const ftp = db.prepare(`
    SELECT avg_power, normalized_power, start_time, name
    FROM activities
    WHERE user_id = ? AND activity_type = 'cycle'
      AND avg_power IS NOT NULL
      AND duration_seconds >= 3600
    ORDER BY avg_power DESC
    LIMIT 1
  `).get(userId);

    res.json({
        run5k,
        run10k,
        ftp,
    });
});

export default router;
