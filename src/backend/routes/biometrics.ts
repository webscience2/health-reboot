import express from 'express';
import { db, getDefaultUserId } from '../db/index.js';

const router = express.Router();
const userId = getDefaultUserId();

/**
 * GET /api/biometrics - Get biometric data for date range
 */
router.get('/', (req, res) => {
    const { startDate, endDate, limit = '30' } = req.query;

    let query = `
    SELECT * FROM biometrics 
    WHERE user_id = ?
  `;
    const params: any[] = [userId];

    if (startDate && endDate) {
        query += ` AND date BETWEEN ? AND ?`;
        params.push(startDate, endDate);
    }

    query += ` ORDER BY date DESC LIMIT ?`;
    params.push(parseInt(limit as string, 10));

    const data = db.prepare(query).all(...params);
    res.json(data);
});

/**
 * GET /api/biometrics/:date - Get biometrics for specific date
 */
router.get('/:date', (req, res) => {
    const { date } = req.params;

    const data = db.prepare(`
    SELECT * FROM biometrics 
    WHERE user_id = ? AND date = ?
  `).get(userId, date);

    if (!data) {
        return res.status(404).json({ error: 'No data found for this date' });
    }

    res.json(data);
});

/**
 * GET /api/biometrics/stats/summary - Get summary statistics
 */
router.get('/stats/summary', (req, res) => {
    const { days = '30' } = req.query;

    const stats = db.prepare(`
    SELECT 
      AVG(hrv_rmssd) as avg_hrv,
      AVG(resting_hr) as avg_rhr,
      AVG(sleep_score) as avg_sleep_score,
      AVG(sleep_duration_minutes) as avg_sleep_duration,
      AVG(vo2_max) as avg_vo2max,
      MIN(date) as start_date,
      MAX(date) as end_date,
      COUNT(*) as total_records
    FROM biometrics
    WHERE user_id = ?
      AND date >= date('now', '-' || ? || ' days')
  `).get(userId, parseInt(days as string, 10));

    res.json(stats);
});

/**
 * GET /api/biometrics/trends/hrv - Get HRV trend data
 */
router.get('/trends/hrv', (req, res) => {
    const { days = '90' } = req.query;

    const trend = db.prepare(`
    SELECT date, hrv_rmssd, resting_hr
    FROM biometrics
    WHERE user_id = ?
      AND date >= date('now', '-' || ? || ' days')
      AND hrv_rmssd IS NOT NULL
    ORDER BY date ASC
  `).all(userId, parseInt(days as string, 10));

    res.json(trend);
});

export default router;
