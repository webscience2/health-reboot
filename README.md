# Health Reboot

A comprehensive, AI-driven holistic health and wellness system for optimizing endurance performance, managing inflammation, and improving overall well-being.

## Overview

This project is a personalized health management platform that integrates:
- **Training & Performance**: Adaptive endurance training based on biometric data
- **Biometric Monitoring**: HRV, sleep, RHR, VO2 Max tracking via Garmin/Intervals.icu
- **Nutrition**: Personalized nutrition tracking and anti-inflammatory optimization
- **Recovery**: Evidence-based recovery protocols (ice bath, sauna, contrast therapy)
- **Mental Wellness**: Meditation, mood tracking, and mental health support
- **Auto-immune Management**: Symptom tracking and pattern identification

## Project Status

🚀 **Phase 1 Complete** - Foundation & Data Pipeline MVP

**Completed:**
- ✅ Database schema (SQLite)
- ✅ Intervals.icu API integration (bridge to Garmin data)
- ✅ Backend API (Express + TypeScript)
- ✅ Basic dashboard UI (React + Vite)
- ✅ Daily readiness scoring
- ✅ Biometric trends visualization
- ✅ Sync functionality

**Next:** Phase 2 - Conversational AI & Training Intelligence

## Tech Stack

### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express
- **Database**: SQLite3 (via better-sqlite3)
- **Data Source**: Intervals.icu API (acts as Garmin bridge)

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: React Query (TanStack Query)
- **Styling**: CSS with modern dark theme

## Prerequisites

- **Node.js**: v18 or higher (tested with v25)
- **Intervals.icu account** with Garmin connected
- **Intervals.icu API key**

## Quick Start

### 1. Clone & Install

```bash
cd /Users/adamcoates/src/health-reboot
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your Intervals.icu credentials:

```bash
# Get these from https://intervals.icu/settings
INTERVALS_API_KEY=your_api_key_here
INTERVALS_ATHLETE_ID=your_athlete_id_here
```

### 3. Initialize Database

```bash
npm run db:migrate
```

### 4. Start Development Servers

```bash
npm run dev
```

This starts:
- **Backend API**: http://localhost:3001
- **Frontend**: http://localhost:3000

### 5. Sync Your Data

1. Navigate to http://localhost:3000
2. Click "Sync" tab
3. Click "Test Connection" to verify Intervals.icu credentials
4. Click "Run Historical Sync" to import your data (5 years by default)
5. After sync completes, go to "Dashboard" to see your data

## Project Structure

```
health-reboot/
├── src/
│   ├── backend/              # Express API server
│   │   ├── config/           # Environment configuration
│   │   ├── db/               # Database schema & initialization
│   │   ├── integrations/     # Intervals.icu API client
│   │   ├── routes/           # API endpoints
│   │   ├── services/         # Business logic (sync, etc.)
│   │   └── server.ts         # Main server file
│   └── frontend/             # React application
│       ├── api/              # API client
│       ├── components/       # React components
│       ├── App.tsx           # Main app component
│       └── main.tsx          # Entry point
├── data/                     # SQLite database (gitignored)
├── docs/                     # Documentation
└── config/                   # App configuration

```

## API Documentation

### Endpoints

#### Health Check
```
GET /api/health
```

#### Dashboard
```
GET /api/dashboard
Returns: Today's biometrics, 30-day averages, readiness score, recent activities
```

#### Biometrics
```
GET /api/biometrics?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&limit=30
GET /api/biometrics/:date
GET /api/biometrics/stats/summary?days=30
GET /api/biometrics/trends/hrv?days=90
```

#### Activities
```
GET /api/activities?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&type=run&limit=50
GET /api/activities/:id
GET /api/activities/stats/summary?days=30
GET /api/activities/bests/all
```

#### Sync
```
POST /api/sync/test              # Test Intervals.icu connection
POST /api/sync/daily             # Sync last 7 days
POST /api/sync/historical        # Sync 5 years (background job)
GET  /api/sync/status            # Get sync status
POST /api/sync/analyze-bests     # Analyze historical bests
```

## Data Sources

### Primary: Intervals.icu API

Intervals.icu has official Garmin API access and provides:
- **Wellness Data**: HRV (rMSSD), RHR, sleep duration, weight
- **Activity Data**: Workouts with power, HR, pace, TSS, etc.
- **Training Load**: CTL, ATL, ramp rate
- **Historical Data**: Full history available

This approach is recommended because:
- ✅ Official Garmin API access (difficult to get individually)
- ✅ Clean, well-documented REST API
- ✅ No need for local GarminDB setup (for now)
- ✅ Real-time sync with Garmin

### Fallback: GarminDB (Future)

If Intervals.icu is missing specific metrics, we can supplement with GarminDB for:
- Advanced sleep metrics (REM, deep sleep stages)
- Body Battery details
- Stress levels
- Detailed activity streams

## Features Deep Dive

### Daily Readiness Score

Calculated from:
- **HRV Score** (50%): Today's HRV vs 30-day average
- **RHR Score** (30%): Today's RHR vs 30-day average
- **Sleep Score** (20%): Sleep quality/duration

**Readiness Levels:**
- 🟢 **Green (70-100)**: Train hard - body is recovered
- 🟡 **Yellow (40-69)**: Moderate - adjust intensity
- 🔴 **Red (0-39)**: Rest day - focus on recovery

### Historical Bests Analysis

Automatically extracts:
- Best 5k run time
- Best 10k run time
- Highest FTP (from 1hr+ rides with power)
- Peak VO2 Max

Used for age-adjusted performance tracking.

## Development

### Scripts

```bash
npm run dev              # Start both frontend & backend in watch mode
npm run dev:backend      # Backend only
npm run dev:frontend     # Frontend only
npm run build            # Build for production
npm run db:migrate       # Initialize/update database schema
npm test                 # Run tests (coming soon)
```

### Adding New Features

1. **Database**: Update `src/backend/db/schema.sql`
2. **Backend Logic**: Add service in `src/backend/services/`
3. **API Route**: Add endpoint in `src/backend/routes/`
4. **Frontend API**: Update `src/frontend/api/client.ts`
5. **UI Component**: Add component in `src/frontend/components/`

## Roadmap

See [implementation_plan.md](.gemini/antigravity/brain/*/implementation_plan.md) for full PRD.

### Phase 2: Conversational AI & Training Intelligence (Weeks 3-4)
- Progressive training plan generator
- Conversational AI interface (challenges, asks questions, learns)
- Activity listening & real-time recommendations
- Workout library

### Phase 3: Nutrition & Recovery (Weeks 5-6)
- Garmin lifestyle logging integration
- AI-assisted meal input
- Auto-immune symptom diary with pattern detection
- Food elimination experiments tracking

### Phase 4: Goal Intelligence (Weeks 7-8)
- AI race research (terrain, elevation, technical difficulty)
- Event-specific training plan adaptation
- Mental wellness tracking (meditation apps integration)

### Phase 5: Polish & Deployment (Weeks 9-10)
- Deploy to Synology NAS or GCP
- Mobile PWA optimizations
- Performance tuning
- Push notifications

## Contributing

This is a personal project, but contributions and suggestions are welcome!

## Security

⚠️ **Important**: This project handles sensitive health data.
- Never commit `.env` file
- Never commit database files (`data/`)
- Keep API keys secure
- Review `.gitignore` before committing

See [SECURITY.md](SECURITY.md) for more details.

## License

Private project - TBD

---

**Health Reboot** - Built with ❤️ for personal holistic health optimization
