# 🚀 New Workstation Setup Checklist

Use this checklist when setting up Health Reboot on a new machine.

## Prerequisites
- [ ] Node.js v18+ installed (`node --version`)
- [ ] Git installed and configured
- [ ] Intervals.icu account with Garmin connected
- [ ] Intervals.icu API key ready

## Setup Steps

### 1. Clone Repository
```bash
git clone https://github.com/webscience2/health-reboot.git
cd health-reboot
```

### 2. Install Dependencies
```bash
npm install
```
Wait for completion (may take 1-2 minutes)

### 3. Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` and add:
- [ ] `INTERVALS_API_KEY=your_key_here`
- [ ] `INTERVALS_ATHLETE_ID=your_id_here`
- [ ] Save the file

### 4. Database Setup
```bash
npm run db:migrate
```
Should see: "Database initialized successfully"

### 5. Start Development
```bash
npm run dev
```
Should open automatically to http://localhost:3000

### 6. Verify Setup
- [ ] Backend running at http://localhost:3001
- [ ] Frontend running at http://localhost:3000
- [ ] Click "Sync" tab
- [ ] Click "Test Connection" → Should see "✅ Successfully connected"
- [ ] Click "Run Historical Sync" (optional, takes 5-10 min)
- [ ] View Dashboard tab → Should show your data

## Troubleshooting

### npm install fails
- Check Node.js version: `node --version` (must be v18+)
- Delete `node_modules` and `package-lock.json`, try again
- Check for error messages about `better-sqlite3`

### Database migration fails
- Delete `data/health.db*` files
- Run `npm run db:migrate` again

### Can't connect to Intervals.icu
- Verify API key at https://intervals.icu/settings
- Check `.env` file exists (not `.env.example`)
- Restart server: Ctrl+C then `npm run dev`

### Ports already in use
```bash
# Kill existing processes
lsof -i :3000  # Frontend
lsof -i :3001  # Backend
kill -9 <PID>
```

## Quick Reference

**Repository:** https://github.com/webscience2/health-reboot

**Key Documents:**
- `README.md` - Project overview
- `docs/PRD.md` - Full requirements
- `docs/GETTING_STARTED.md` - Detailed setup guide
- `docs/DEVELOPMENT.md` - Development workflow

**Current Phase:** Phase 1 Complete ✅  
**Next Phase:** Conversational AI & Training Intelligence

## All Set? 🎉

You're ready to develop! Check the PRD for context and roadmap.

```bash
# Start coding
npm run dev

# Make changes, then commit
git add .
git commit -m "Your changes"
git push
```
