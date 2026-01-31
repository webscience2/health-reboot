import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_DIR = join(__dirname, '../../../data');
const DB_PATH = join(DATA_DIR, 'health.db');

// Ensure data directory exists
try {
    mkdirSync(DATA_DIR, { recursive: true });
} catch (err) {
    // Directory already exists
}

export const db = new Database(DB_PATH);

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL');

export function initializeDatabase() {
    console.log('Initializing database...');

    const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');

    // Execute schema
    db.exec(schema);

    // Initialize default user if not exists
    const userCount = db.prepare('SELECT COUNT(*) as count FROM user_profile').get() as { count: number };

    if (userCount.count === 0) {
        console.log('Creating default user profile...');
        db.prepare(`
      INSERT INTO user_profile (id, name, email)
      VALUES (1, 'Adam', 'adam@example.com')
    `).run();
    }

    // Initialize sync status
    const sources = ['garmin_db', 'intervals_icu', 'garmin_api'];
    for (const source of sources) {
        db.prepare(`
      INSERT OR IGNORE INTO sync_status (source, last_sync_status)
      VALUES (?, 'pending')
    `).run(source);
    }

    console.log('Database initialized successfully');
}

// Helper to get user (for now, always user_id = 1)
export function getDefaultUserId(): number {
    return 1;
}

export default db;
