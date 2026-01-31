# Development Setup - Multi-Workstation

This guide helps you set up the Health Reboot project on a new workstation.

## Quick Start (New Workstation)

### 1. Clone the Repository

```bash
git clone <your-repo-url> health-reboot
cd health-reboot
```

### 2. Install Node.js

Ensure you have Node.js v18 or higher:
```bash
node --version  # Should be v18.0.0 or higher
```

If not installed, download from: https://nodejs.org/

### 3. Install Dependencies

```bash
npm install
```

This will install all backend and frontend dependencies.

### 4. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```bash
# Required
INTERVALS_API_KEY=your_api_key_here
INTERVALS_ATHLETE_ID=your_athlete_id_here

# Optional (for Phase 2+)
GEMINI_API_KEY=your_gemini_key
ANTHROPIC_API_KEY=your_anthropic_key
```

### 5. Initialize Database

```bash
npm run db:migrate
```

### 6. Start Development

```bash
npm run dev
```

- Backend: http://localhost:3001
- Frontend: http://localhost:3000

## Project Context

### What This Project Does

Health Reboot is an AI-driven holistic health and wellness system for:
- Optimizing endurance performance (marathon, cycling)
- Managing chronic inflammation and auto-immune conditions
- HRV-guided training decisions
- Comprehensive health tracking

### Current Status: Phase 1 Complete ✅

**Implemented:**
- Database schema (SQLite)
- Intervals.icu API integration (bridge to Garmin)
- Backend REST API (Express + TypeScript)
- React dashboard with dark theme
- Daily readiness scoring (HRV + RHR + Sleep)
- Biometric trends and activity summaries
- Data sync (daily + historical)

**Next: Phase 2** - Conversational AI & Training Intelligence

### Key Documents

- **[README.md](../README.md)** - Main project overview
- **[docs/PRD.md](PRD.md)** - Full Product Requirements Document
- **[docs/GETTING_STARTED.md](GETTING_STARTED.md)** - First-time setup guide
- **[.gemini/*/walkthrough.md]** - Phase 1 implementation walkthrough (if available)

## Development Workflow

### Daily Development

```bash
# Start both backend and frontend in watch mode
npm run dev

# Or run separately:
npm run dev:backend   # Backend only
npm run dev:frontend  # Frontend only
```

### Key Scripts

```bash
npm run dev              # Start dev servers (both)
npm run build            # Build for production
npm run db:migrate       # Run database migrations
npm run test             # Run tests (when available)
npm run lint             # Lint code
npm run format           # Format with Prettier
```

### Making Changes

1. **Backend API:**
   - Routes: `src/backend/routes/`
   - Services: `src/backend/services/`
   - Integrations: `src/backend/integrations/`

2. **Frontend:**
   - Components: `src/frontend/components/`
   - API Client: `src/frontend/api/client.ts`
   - Styles: `src/frontend/index.css`

3. **Database:**
   - Schema: `src/backend/db/schema.sql`
   - Run: `npm run db:migrate` to apply

### Syncing Data

After starting the app:
1. Open http://localhost:3000
2. Go to "Sync" tab
3. Click "Test Connection" to verify Intervals.icu
4. Click "Run Historical Sync" to import data
5. View your data on the Dashboard

## Architecture Quick Reference

### Data Flow
```
Garmin Watch → Intervals.icu → Our API → SQLite → React Dashboard
```

### Tech Stack
- **Backend:** Node.js, Express, TypeScript, SQLite
- **Frontend:** React, Vite, TanStack Query
- **Data Source:** Intervals.icu API (Garmin bridge)

### Project Structure
```
src/
├── backend/              # Express API
│   ├── config/          # Environment config
│   ├── db/              # Database & schema
│   ├── integrations/    # External APIs
│   ├── routes/          # API endpoints
│   └── services/        # Business logic
└── frontend/            # React app
    ├── api/             # API client
    ├── components/      # React components
    └── App.tsx          # Main app
```

## Troubleshooting

### Node Version Issues

If you see compilation errors with `better-sqlite3`:
```bash
node --version  # Must be v18+
npm install     # Reinstall with correct Node version
```

### Database Issues

Reset the database:
```bash
rm data/health.db*
npm run db:migrate
```

### Port Conflicts

If ports 3000 or 3001 are in use:
```bash
# Find and kill process
lsof -i :3000
lsof -i :3001
kill -9 <PID>
```

### Environment Variables

If the app can't connect to Intervals.icu:
1. Check `.env` exists (not `.env.example`)
2. Verify `INTERVALS_API_KEY` and `INTERVALS_ATHLETE_ID` are set
3. Test at: https://intervals.icu/settings
4. Restart server after changing `.env`

## Git Workflow

### Committing Changes

```bash
git add .
git commit -m "Description of changes"
git push
```

### Pulling Latest Changes

```bash
git pull
npm install        # In case dependencies changed
npm run db:migrate # In case schema changed
```

### Best Practices

- ✅ Never commit `.env` file
- ✅ Never commit database files (`data/*.db*`)
- ✅ Run migrations after pulling schema changes
- ✅ Test locally before pushing

## Getting Help

1. **Check Documentation:**
   - README.md for overview
   - docs/PRD.md for full requirements
   - docs/GETTING_STARTED.md for setup

2. **Check Walkthrough:**
   - `.gemini/*/walkthrough.md` for Phase 1 summary

3. **Debugging:**
   - Check terminal for backend errors
   - Check browser console for frontend errors
   - Verify Intervals.icu connection from Sync panel

## Next Steps

Once set up:
1. Read the PRD (docs/PRD.md) for full context
2. Review Phase 1 walkthrough for what's built
3. Check task.md in artifacts for upcoming Phase 2 work
4. Start coding! 🚀

---

Happy coding! Built with ❤️ for holistic health optimization.
