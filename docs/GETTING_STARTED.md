# Getting Started with Health Reboot

Welcome to Health Reboot! This guide will help you get up and running quickly.

## Step 1: Prerequisites

Before you begin, ensure you have:

1. **Node.js v18 or higher** installed
   - Check: `node --version`
   - Download: https://nodejs.org/

2. **Intervals.icu account** with Garmin connected
   - Sign up: https://intervals.icu
   - Connect your Garmin account
   - Verify data is syncing (wellness + activities)

3. **Intervals.icu API Key**
   - Go to: https://intervals.icu/settings
   - Find "API Key" section
   - Generate a new key if you don't have one
   - Note your Athlete ID (also on settings page)

## Step 2: Installation

```bash
# Navigate to project directory
cd /Users/adamcoates/src/health-reboot

# Install dependencies (already done if you see this file!)
npm install
```

## Step 3: Configuration

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   ```bash
   # Open in your editor
   nano .env
   # or
   code .env
   ```

3. **Add your credentials:**
   ```bash
   INTERVALS_API_KEY=your_api_key_here
   INTERVALS_ATHLETE_ID=your_athlete_id_here
   ```

4. **Save and close** the file

## Step 4: Initialize Database

```bash
npm run db:migrate
```

This creates the SQLite database at `data/health.db` with all required tables.

## Step 5: Start the Application

```bash
npm run dev
```

This starts:
- **Backend API**: http://localhost:3001
- **Frontend UI**: http://localhost:3000 (opens automatically)

## Step 6: Sync Your Data

1. **Open your browser** to http://localhost:3000
2. **Click the "Sync" tab** in the navigation
3. **Test your connection:**
   - Click "Test Connection"
   - You should see: "✅ Successfully connected to Intervals.icu - Athlete: Your Name"
   - If you get an error, double-check your API key and Athlete ID

4. **Run a historical sync:**
   - Click "Run Historical Sync (5 years)"
   - This runs in the background and may take 5-10 minutes
   - Watch the sync status table update

5. **Go to Dashboard:**
   - Click "Dashboard" tab
   - You should see your biometric data, readiness score, and recent activities!

## Troubleshooting

### "Failed to connect to Intervals.icu"
- Double-check your API key and Athlete ID in `.env`
- Verify your Intervals.icu account has Garmin connected
- Make sure you saved the `.env` file
- Restart the server: `Ctrl+C` then `npm run dev`

### "No data found for this date"
- Run a historical sync first
- Check that Garmin is syncing to Intervals.icu
- Verify you have recent activities in Intervals.icu

### Backend won't start
- Check if port 3001 is already in use
- Try: `lsof -i :3001` and kill the process
- Check the terminal for error messages

### Frontend won't start
- Check if port 3000 is already in use
- Try: `lsof -i :3000` and kill the process
- Clear browser cache and try again

## Next Steps

Once you have data syncing:

1. **Explore the Dashboard**
   - Check your daily readiness score
   - Review biometric trends
   - See your activity summary

2. **Review Your Data**
   - Current HRV, RHR, Sleep metrics
   - 30-day averages
   - Recent training load

3. **Plan Next Features**
   - See what's coming in Phase 2 (Conversational AI & Training Intelligence)
   - Think about which features you'd like to prioritize

## Understanding Your Readiness Score

### What It Means

- **🟢 Green (70-100)**: Body is recovered - go hard if planned
- **🟡 Yellow (40-69)**: Moderate - adjust intensity or duration
- **🔴 Red (0-39)**: Rest day - prioritize recovery

### How It's Calculated

- **50%**: HRV vs your 30-day average
- **30%**: RHR vs your 30-day average  
- **20%**: Sleep quality/duration

### What To Do

- **Don't ignore red flags** - this is injury prevention
- **Build up your baseline** - first few weeks help calibrate
- **Use it as guidance** - you can override, but track outcomes
- **Watch the trends** - consistent yellows/reds mean you need more recovery

## Daily Workflow

1. **Morning Check-in**
   - Open dashboard to see readiness score
   - Review biometrics (HRV, RHR, sleep)
   - Decide on today's training

2. **After your workout**
   - Sync should happen automatically via Intervals.icu → Garmin
   - Click "Run Daily Sync" to update immediately

3. **Evening Review**
   - Check activity was logged
   - Review training load accumulation

## Tips for Best Results

1. **Consistency**: Wear your Garmin watch 24/7 for best data
2. **Sleep Tracking**: Ensure sleep tracking is enabled
3. **HRV Reliability**: Measure at same time daily (morning is best)
4. **Sync Regularly**: Run daily sync each morning
5. **Historical Data**: More data = better insights and baselines

## Getting Help

- **Check the README**: `/Users/adamcoates/src/health-reboot/README.md`
- **Review the PRD**: `.gemini/antigravity/brain/*/implementation_plan.md`
- **Check Server Logs**: Look at terminal output for errors
- **Database Issues**: Delete `data/health.db` and run `npm run db:migrate` again

## What's Next?

See the [README](README.md) for the full roadmap and upcoming features!

**Phase 2** focuses on:
- Training plan generator
- Conversational AI that challenges and supports you
- Real-time workout recommendations
- Workout library

Happy training! 🏃‍♂️🚴‍♂️
