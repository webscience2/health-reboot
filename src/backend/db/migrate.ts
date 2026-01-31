import { db, initializeDatabase } from './index.js';

// Run migrations
initializeDatabase();

console.log('Database migration completed');
process.exit(0);
