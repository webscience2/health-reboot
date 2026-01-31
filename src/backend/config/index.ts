import { config as dotenvConfig } from 'dotenv';

// Load environment variables
dotenvConfig();

export const config = {
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    database: {
        path: process.env.DATABASE_URL || 'data/health.db',
    },

    intervals: {
        apiKey: process.env.INTERVALS_API_KEY || '',
        athleteId: process.env.INTERVALS_ATHLETE_ID || '',
    },

    garmin: {
        consumerKey: process.env.GARMIN_CONSUMER_KEY,
        consumerSecret: process.env.GARMIN_CONSUMER_SECRET,
        accessToken: process.env.GARMIN_ACCESS_TOKEN,
        accessSecret: process.env.GARMIN_ACCESS_SECRET,
    },

    ai: {
        geminiApiKey: process.env.GEMINI_API_KEY,
        anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    },

    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
};

export default config;
