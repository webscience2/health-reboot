# Holistic Health & Wellness System - Product Requirements Document

> [!IMPORTANT]
> This PRD outlines a comprehensive, personalized health and fitness recovery system. Your review and feedback on the scope, priorities, and phased approach is critical before development begins.

## Executive Summary

### Vision
Create a fully personalized, AI-driven holistic health and wellness platform that enables safe return to regular endurance training while addressing chronic inflammation, auto-immune conditions, and mental well-being through data-driven insights from wearables, intelligent conversational AI, and comprehensive lifestyle management.

### Primary Objectives
1. **Safe Return to Training**: Progressive, injury-free return to regular running and cycling (multiple times per week)
2. **Health Management**: Address chronic inflammation and auto-immune conditions through holistic, experimental approach
3. **Performance Foundation**: Build aerobic base and lean muscle mass while preventing re-injury
4. **Mental Well-being**: Support mental health recovery and stress management
5. **Adaptive & Conversational Intelligence**: AI that challenges, supports, asks questions, and learns from your feedback
6. **Flexible Goal Support**: Adapt training for specific events (trail races, gran fondos, ultra hikes) or default balanced multi-discipline fitness

### Near-Term Goals (6-12 months)
- Running regularly without injury (consistency over distance)
- Cycling with club on weekend rides (~60km)
- Building strength and injury-proofing
- Managing chronic conditions (reducing flare-ups)
- Improving body composition (lean muscle, athletic build)

### Uber Goals (Long-term)
- Marathon distance capability (potentially Hounslow Classic trail marathon - September)
- 100k+ cycling events
- 50k+ trail races
- 200k+ gran fondos
- Multi-day hikes

---

## User Background & Current State

### Athletic History
- **Peak Performance**: Marathon distances, 100k+ cycling, regular gym work, yoga/flexibility
- **Disciplines**: Endurance running & cycling (balanced), strength training, flexibility work
- **Platforms Used**: Zwift (indoor training), structured interval work, zone 2 training
- **Historical Data**: Extensive Garmin history available for analysis (5k/10k PRs, FTP highs, performance baselines)

### Current Health Status
- **Injury Timeline**: 3 months inactive
  - Ankle fracture & torn ligaments
  - Year-long gluteal tendinopathy battle
  - Current tennis elbow (needs management during strength work)
- **Auto-immune Conditions**: 
  - Vitiligo
  - Celiac disease (strict gluten-free)
  - Psoriasis
  - All currently flaring
- **Suspected Root Cause**: Chronic inflammation (potentially systemic)
- **Lifestyle Factors**:
  - Recent excessive alcohol consumption
  - Depression
  - Poor hydration habits
  - Dietary factors to investigate (sugar, inflammatory foods beyond gluten)

### Available Resources
- **Wearables**: Garmin (primary with smart scale), Whoop (deprioritize)
- **Recovery Equipment**: Ice bath, sauna access
- **Training Platforms**: Zwift, Intervals.icu, Gravl (strength)
- **Data Tracking**: Garmin lifestyle logging (research needed on API access)
- **Meditation/Wellness**: Meta Quest 3S (Tripp), Balance, Insight Timer, Headspace, Breathwrk
- **Nutrition**: True Protein products (WPI90, post, meal replacement, creatine, collagen, protein bars)
- **Future**: Blood panel testing planned (can provide historical results for testing)
- **AI Access**: Gemini Pro, Claude Pro subscriptions

### Infrastructure Constraints
- **Cost-sensitive**: Self-hosted on Synology NAS or GCP (no AWS/Azure)
- **Personal use**: Single user system
- **Timeline**: Rapid prototyping preferred over long development cycles

---

## Goals & Success Metrics

### Near-Term Performance Goals (6-12 months)
1. **Running**: 
   - Consistent 3-4 runs per week
   - Pain-free progression
   - Return to enjoying running
2. **Cycling**: 
   - Weekend club rides (~60km comfortably)
   - Regular weekday sessions
3. **Strength**: 
   - 2-3x/week structured work
   - Injury-proofing focus
   - Tennis elbow management
4. **Body Composition**: 
   - Build lean muscle mass
   - More athletic, bulked build
   - Reduce body fat
5. **Flexibility**: 
   - Improve mobility to address chronic conditions
   - 2-3x/week yoga/flexibility work

### Long-Term Performance Goals (Uber Goals)
1. **Event-Specific Training**:
   - Trail marathon capability (e.g., Hounslow Classic - Sept, highly technical, elevation/stairs)
   - 100k+ gran fondos
   - 50k+ trail races
   - 200k+ cycling events
   - Multi-day adventure hikes
2. **AI Race Intelligence**: System researches race characteristics (road vs trail, elevation, technical difficulty) and adapts training accordingly

### Health Goals
1. **Injury Prevention**: Zero setbacks during progressive return
2. **Inflammation Reduction**: Measurable decrease through dietary experiments and tracking
3. **Auto-immune Management**: 
   - Reduced flare-ups of vitiligo, celiac, psoriasis
   - Pattern identification (triggers from diet, stress, training load)
   - Symptom diary with correlations
4. **Mental Health**: Improved mood, reduced depression symptoms
5. **Lifestyle Improvements**: 
   - Reduced alcohol consumption
   - Proper hydration (measurable daily intake in metric)
   - Improved sleep quality
   - Dietary optimization (identify and eliminate inflammatory foods)
   - Physical appearance (lean muscle, athletic build)

### Health Goals
1. **Injury Prevention**: Zero setbacks during progressive return
2. **Inflammation Reduction**: Measurable decrease in inflammatory markers
3. **Auto-immune Management**: Reduced flare-ups of vitiligo, celiac, psoriasis
4. **Mental Health**: Improved mood, reduced depression symptoms
5. **Lifestyle Improvements**: 
   - Reduced alcohol consumption
   - Proper hydration (measurable daily intake)
   - Improved sleep quality

### Success Metrics
- **Training Load**: Progressive increase following evidence-based protocols (≤10% weekly increase)
- **HRV Trends**: Improving baseline HRV over time
- **Sleep Scores**: Consistent 80+ scores
- **VO2 Max**: Return to pre-injury levels and beyond
- **Resting Heart Rate**: Decreased RHR indicating improved fitness
- **Recovery Quality**: Sleep, HRV, RHR alignment
- **Injury Rate**: Zero training-related injuries
- **Adherence**: >80% workout completion rate
- **Mental Well-being**: Self-reported weekly mood scores
- **Hydration**: Daily water intake tracking meeting targets

---

## Core Features & Functionality

### 1. Intelligent Training Planning & Adaptation

#### Progressive Return-to-Training Protocol
Based on 2024 research on safe return after injury:

**Phase 1: Foundation (Weeks 1-4)**
- Walking progression → walk-run intervals
- Criteria-based advancement (pain-free 30min brisk walk)
- Soft surfaces prioritized
- 50-60% max heart rate
- Cross-training emphasis (cycling, strength)
- Strict pain monitoring (stop if sharp pain, pain during run, or sleep disruption)

**Phase 2: Build (Weeks 5-12)**
- Progressive running volume (5-10min increases per level)
- Multi-level completion before advancement
- Introduce steady-state cycling
- Begin structured strength training
- Neurological and tendon adaptation focus (8-12 week timeline)
- Continue flexibility/mobility work

**Phase 3: Develop (Weeks 13-24)**
- Reach 50-60% pre-injury mileage
- Introduction of speed work (intervals, tempo)
- Hill training (avoid downhills initially)
- Structured Zone 2 work
- Advanced strength protocols for lean muscle
- Sport-specific movements

**Phase 4: Performance (Week 25+)**
- 75-80% pre-injury mileage → normal training
- Full workout spectrum
- Race-specific training
- Performance optimization

#### Multi-Discipline Load Management
- **Weekly Training Distribution**:
  - Running + Cycling: Balanced focus (flexible based on enjoyment and progress)
  - Strength: 2-3x/week (injury-proofing, lean mass, tennis elbow management)
  - Flexibility/Yoga: 2-3x/week (chronic condition management)
  - Recovery: Scheduled rest, active recovery
  - **User Flexibility**: System adapts if you want to increase cycling or running based on enjoyment/preference

- **Load Balancing**:
  - Total weekly training stress score (TSS) monitoring
  - Cross-discipline fatigue consideration
  - Acute:Chronic Workload Ratio (ACWR) tracking
  - Smart scheduling based on HRV/recovery metrics

#### Workout Library & Integration
- **Structured Workouts**:
  - Zone 2 endurance sessions
  - VO2 max intervals (4-5min @ 90-95% max HR)
  - Tempo runs/rides (threshold work)
  - Sweet spot training (cycling specific)
  - Progressive long runs/rides
  
- **Platform Integration**:
  - Zwift: Custom .zwo workout files auto-generated
  - Intervals.icu: Bi-directional sync for planning/analysis
  - Garmin: Workout push to device
  - Adaptive difficulty based on recent performance

### 2. Biometric Monitoring & Adaptive Intelligence

#### HRV-Guided Training
Based on 2024 HRV training load research:

- **Daily Readiness Score**:
  - Morning HRV measurement (vs. 7-day rolling average)
  - Combine with sleep quality, RHR, subjective feel
  - Traffic light system: Green (train hard), Yellow (moderate), Red (rest/recovery)

- **Adaptive Modifications**:
  - HRV significantly below baseline → reduce intensity or rest day
  - HRV stable/elevated → proceed with planned session
  - Trend analysis: declining HRV over 3+ days → deload week
  - Integration with training plan for auto-adjustments

#### Recovery Metrics Dashboard
- **Primary Metrics**:
  - HRV (rMSSD preferred)
  - Sleep score & stages (deep, REM, light)
  - Resting heart rate
  - VO2 Max trends
  - Body Battery / Recovery Score
  - Respiratory rate
  - Stress levels
  - **Historical Baselines**: Recent bests (5k/10k times, FTP highs) from Garmin history
  - **Age-adjusted Performance**: Account for age-related performance changes
  
- **Secondary Metrics**:
  - Training load (acute vs chronic)
  - Workout completion quality
  - Subjective wellness (daily check-in)
  - Nutrition quality score
  - Hydration status
  - **Comprehensive Garmin Data**: Leverage ALL available metrics
  - Body weight & body fat % (from smart scale)
  - Lifestyle logging data
  - Calorie/macro tracking (AI-assisted meal input or Garmin)
  - Experimental food group elimination tracking

#### Smart Session Recommendations & Conversational AI
- **Real-time Decision Engine**:
  - Parse biometric data each morning
  - Compare against training plan
  - Recommend: proceed, modify intensity, modify duration, substitute, rest
  - **Activity Listening**: Monitor for completed activities and suggest same-day decisions (e.g., "You just did a hard run - light strength or rest today?")
  - Explain reasoning (education + transparency)
  - Allow user override with feedback capture

- **Conversational AI Interface**:
  - **AI-generated conversation/summary available anytime**
  - Asks specific questions about how you're feeling, what you want to do
  - Challenges you appropriately ("Are you sure you want to skip rest day? Your HRV is down 3 days in a row")
  - Supportive and factors in your feedback
  - Does NOT assume "I know best" - collaborative decision making
  - Learns from your preferences and overrides
  - Responds to your feedback and works out changes to future sessions

### 3. Holistic Health Management

#### Nutrition & Inflammation Management
Based on 2024 chronic inflammation research:

**Anti-Inflammatory Diet Framework**
- **Core Principles** (Mediterranean-based):
  - Fatty fish (salmon, mackerel, sardines) 3-4x/week
  - Daily servings: berries, leafy greens, nuts/seeds
  - Healthy fats: olive oil, avocado, coconut oil
  - Anti-inflammatory spices: turmeric, ginger
  - Fermented foods for gut health
  - Whole grains (gluten-free for celiac)

- **Foods to Limit/Avoid**:
  - Refined sugars
  - Processed meats & red meat
  - Trans fats, saturated fats
  - High omega-6 oils (soybean, corn, canola)
  - White flour products
  - Deep-fried foods
  - Alcohol (tracked separately)

**Supplement Protocol**
Evidence-based supplementation:
- **Core Stack**:
  - Omega-3 (EPA/DHA): 3g daily (inflammation reduction)
  - Vitamin D: Dosage based on blood work
  - Curcumin: with black pepper for absorption
  - Probiotics: gut health & inflammation
  - Vitamin B12: auto-immune support, energy
  
- **Conditional** (based on blood work):
  - Glutamine: gut barrier, immune support
  - Vitamin C & E: antioxidants
  - Zinc, Magnesium: if deficient
  - Collagen/Gelatin: joint health

**Protein & Macros**
- **Lean Muscle Goals**:
  - Protein: 1.6-2.2g/kg body weight
  - Strategic timing: post-workout windows
  - Quality sources: lean meats, fish, legumes, plant-based
  - **True Protein Integration**: WPI90, post-workout formula, meal replacement, creatine, collagen, protein bars
  - Research True Protein product line for optimal protocols

**Nutrition Tracking**
- Calorie tracking via MyFitnessPal or Garmin
- Macro split visualization
- Anti-inflammatory food score
- Meal suggestions based on training load
- Hydration tracking (automatic + manual)

#### Auto-immune Condition Tracking
- **Daily/Weekly Monitoring**:
  - **Symptom Diary with Prompts**: System asks about specific conditions
  - Self-reported flare severity (1-10 scale for each condition)
  - Detailed symptom logging ("skin bad", "aching joints", etc.)
  - Potential trigger identification
  - **Pattern Spotting**: AI analyzes correlations with diet, stress, training load, sleep
  - **Experimental Food Elimination**: Track removal of food groups to identify triggers
  
- **Interventions**:
  - Exercise as anti-inflammatory (moderate intensity)
  - Nutrition optimization (strict gluten-free, anti-inflammatory)
  - Dietary experiments (eliminate sugar, specific foods)
  - Stress reduction protocols
  - Sleep quality emphasis

#### Hydration Management
Based on endurance athlete guidelines (METRIC UNITS):

- **Daily Baseline**: 
  - Men: ~3.7L total fluid
  - Adjusted for body weight, climate
  
- **Pre-Training**: 
  - 500-700ml within 2 hours before
  - 200-300ml 10-20 minutes before
  
- **During Training**:
  - 175-350ml every 10-20 minutes
  - Carb-electrolyte drink for >60min sessions
  
- **Post-Training**:
  - 1-1.5L per kg body weight lost
  - Majority within 2 hours
  
- **Tracking & Alerts**:
  - Daily intake logging
  - Smart reminders based on training schedule
  - Hydration score in readiness calculation
  - Urine color tracking (optional)

#### Alcohol Impact Awareness
Based on 2024 research on alcohol & athletic performance:

- **Education Module**:
  - Impact on HRV (immediate decrease)
  - Recovery impairment (72hr window)
  - Inflammation increase
  - Sleep quality disruption (REM reduction)
  - Protein synthesis inhibition
  
- **Tracking & Goal Setting**:
  - Weekly alcohol intake logging
  - Visual impact on recovery metrics
  - Progressive reduction goals
  - Alcohol-free day streaks
  - Alternative coping strategies for stress

### 4. Recovery Protocols

#### Ice Bath (Cold Water Immersion)
Based on 2024 contrast therapy research & Huberman Protocol:

**Protocol**:
- Temperature: 10-15°C
- **Huberman Protocol**: ~11-12 minutes total per week across multiple sessions
- Timing: Immediately post-training
- Frequency: 2-3 sessions per week
- Best for: Intense running sessions, races

**Benefits**:
- Reduced muscle soreness & inflammation
- Enhanced recovery between sessions
- Improved sleep quality (deep sleep increase)
- Mental toughness building
- Circulation improvement

**Caution**: Avoid frequent use post-strength training (may blunt adaptations)

#### Sauna
**Protocol**:
- Duration: ~30 minutes
- Frequency: 2-4x/week
- Timing: Post-exercise
- Temperature: Traditional sauna heat
- **Future**: Heat training protocols once baseline fitness returns

**Benefits**:
- Increased plasma volume → endurance boost
- Enhanced thermoregulation
- Improved circulation & nutrient delivery
- Growth hormone increase
- Cardiovascular health
- Mental health benefits

#### Contrast Therapy (Optional)
**Protocol**:
- Alternating hot (37-43°C) and cold (12-15°C)
- Ratio: 3:1 or 4:1 (hot:cold)
- Cycles: 1-minute intervals
- Total duration: 6-14 minutes
- End with: Cold immersion
- Timing: Immediately post-exercise
- **User Note**: Too messy with sweaty ice bath - make optional with ability to swap for ice bath or sauna instead

**Benefits**:
- Superior metabolic waste clearance
- Reduced muscle soreness & inflammation
- Faster recovery
- Enhanced circulation via vascular pumping
- Natural pain relief

**Scheduling Intelligence**:
- Recommend protocol based on workout type
- Track recovery response
- Integrate with weekly plan
- Provide guidance on when to use each modality

### 5. Mental Wellness & Stress Management

#### Meditation & Mindfulness
Based on 2024 research on meditation for athletes & depression:

**Daily Practice** (5-15 minutes max):
- **Flexible Timing**: Morning, post-workout, or evening
- **Duration**: 5-15 minutes daily (user finds meditation challenging, keep realistic)
- **Apps Available**: 
  - Meta Quest 3S: Tripp (VR meditation)
  - Balance
  - Insight Timer
  - Headspace
  - Breathwrk
- **Session Types**:
  - Mindfulness meditation
  - Breath work
  - VR-guided experiences (Tripp)
  - Recovery meditation

**Benefits Tracking**:
- Mood/stress score (daily)
- Meditation streak
- Perceived performance impact
- Depression symptom monitoring
- Sleep quality correlation

**Integration**:
- Guided sessions (library or integration with apps)
- Reminders based on stress levels
- Adaptive duration based on schedule
- Research-backed for athletic performance & depression recovery

#### Mental Health Support
- **Weekly Check-ins**:
  - Depression symptom questionnaire
  - Stress level assessment
  - Life satisfaction score
  - Social connection quality
  
- **Interventions**:
  - Exercise as antidepressant (moderate intensity recommendation)
  - Social connection prompts
  - Professional resource directory
  - Crisis support information

#### Stress & Life Balance
- Training stress vs life stress separation
- Work-life-training balance monitoring
- Rest day enforcement when total stress high
- Adaptive scheduling around life events

### 6. Blood Work Integration (Future)

**Initial Panel Recommended**:
- Complete Blood Count (CBC)
- Comprehensive Metabolic Panel
- Lipid Panel
- Inflammatory Markers:
  - C-Reactive Protein (CRP)
  - Erythrocyte Sedimentation Rate (ESR)
- Vitamin Levels:
  - Vitamin D (25-OH)
  - Vitamin B12
  - Folate
- Iron Panel (ferritin, iron, TIBC)
- Thyroid Function (TSH, T3, T4)
- Auto-immune Markers (as recommended by physician)
- Testosterone (if appropriate)

**System Integration**:
- Manual upload of lab results
- Trend visualization over time
- Auto-generation of supplement recommendations
- Flagging of concerning values
- Comparison to athlete-optimal ranges
- Export summary for physician review

**Periodic Re-testing**:
- Initial comprehensive panel to establish baselines
- Smaller targeted panels as budget allows (more affordable than quarterly comprehensive)
- Post-major intervention changes
- Annual comprehensive for ongoing monitoring

---

## Data Sources & Technical Integration

### Primary: Garmin Ecosystem

#### Available Metrics
- Activity data (runs, rides, strength, yoga)
- Heart rate (24/7, zones, max, resting)
- HRV (rMSSD, SDNN)
- Sleep tracking (stages, score, quality)
- VO2 Max estimates
- Body Battery / Recovery
- Stress scores
- Respiratory rate
- Pulse Ox (SpO2)
- Steps, calories
- Training Load (acute, chronic)
- Training Effect (aerobic, anaerobic)

#### Integration Approach
**Primary: GarminDB (Open Source) via Intervals.icu Bridge**
- **Intervals.icu has Garmin API Access**: Use their excellent API as a bridge
- Get wellness data (HRV, respiration, RHR, sleep, etc.) from Intervals.icu API
- Get activity data from Intervals.icu
- Primary data flow: Garmin → Intervals.icu → Our System
- Fallback: GarminDB for local sync if Intervals.icu doesn't have all needed data

**GarminDB (Fallback/Supplement)**:
- Python-based local database sync
- Full historical data extraction
- Daily automated sync  
- Database: SQLite or PostgreSQL
- Use for any metrics not available via Intervals.icu

**Reference Implementation**:
- Review https://github.com/webscience2/fitnesstats-sync for prototype patterns
- Shows approaches for GarminDB, Intervals.icu, and MyFitnessPal integration
- Don't assume it's correct, but use as reference

### Secondary: Intervals.icu

#### Purpose
- Training plan management
- Workout creation & editing
- Performance analytics & trending
- Workout synchronization to Garmin
- Calendar view of training plan

#### Integration
- **Bi-directional Sync**:
  - Push: Custom workouts from system to Intervals.icu
  - Pull: Completed activities for analysis
  - Calendar: Training plan visualization
  
- **API Access**:
  - RESTful API available
  - Workout CRUD operations
  - Activity data retrieval
  - Athlete settings sync

### Zwift Integration

#### Purpose
- Structured indoor training
- Custom workout execution (.zwo files)
- Weather-independent training
- Gamified motivation

#### Integration
- **Workout Generation**:
  - System generates .zwo files
  - Push to Intervals.icu → auto-sync to Zwift
  - OR: Direct file placement in Zwift folder
  
- **Workout Completion**:
  - Zwift → Garmin Connect → System
  - Automated pipeline for completed workouts
  - Data analysis & plan adjustment

### Nutrition Tracking

#### Garmin Lifestyle Logging (Primary)
- **Native Integration**:
  - Calorie tracking in Garmin Connect
  - Automatic sync with activities
  - Hydration logging
  - **Research needed**: API availability (may require paid Garmin subscription)
  - **AI-Assisted Input**: Use Gemini/Claude to log meals conversationally
  
#### MyFitnessPal (Fallback)
- **No official API**: Known issue
- Hacky workarounds exist but not recommended
- See fitnesstats-sync repo for potential approaches
- Use only if Garmin lifestyle logging insufficient

**Approach**: Prioritize Garmin lifestyle logging with AI assistance for easy input. Investigate API access and subscription requirements. Use MyFitnessPal only if necessary.

### Whoop (Optional - May Cancel)

If retained temporarily:
- HRV, RHR, sleep data
- Recovery score
- Strain score
- Comparison against Garmin for validation
- graceful deprecation path

---

## Technical Architecture Overview

### System Components

#### 1. Data Ingestion Layer
- **Garmin Sync Service**: 
  - Scheduled jobs (daily, or real-time webhook)
  - GarminDB integration
  - Data validation & cleaning
  - Storage in time-series database
  
- **Nutrition Sync**:
  - MyFitnessPal or Garmin API
  - Daily macro/calorie extraction
  
- **Manual Input**:
  - Subjective wellness (mood, soreness, stress)
  - Alcohol consumption
  - Hydration (supplemental)
  - Blood work results
  - Auto-immune symptom tracking

#### 2. Database & Storage
- **Cost-Optimized Approach**:
  - Self-hosted on Synology NAS (preferred) OR
  - GCP Cloud SQL (if NAS insufficient)
  - **NO AWS or Azure**
  
- **Time-Series Data**:
  - PostgreSQL with TimescaleDB extension (if needed)
  - OR SQLite for lightweight single-user
  - Biometric data (HRV, RHR, sleep, etc.)
  - Activity data
  - Nutrition logs
  
- **Relational DB**:
  - PostgreSQL or SQLite
  - User profile
  - Training plans
  - Workout library
  - Supplement protocols
  - Historical blood work
  
- **File Storage**:
  - Local filesystem (NAS)
  - Zwift .zwo files
  - Export files
  - Blood work PDFs

#### 3. Intelligence Engine
- **Training Plan Generator**:
  - Progressive loading algorithm
  - Multi-discipline balancing
  - Periodization logic
  - Goal-based planning
  
- **Daily Readiness Calculator**:
  - HRV analysis (rolling averages, trends)
  - Sleep quality weighting
  - RHR deviation
  - Subjective wellness integration
  - Training load consideration
  - Output: Readiness score + recommendation
  
- **Adaptive Workout Engine**:
  - Real-time plan modification
  - Workout substitution logic
  - Intensity/duration adjustments
  - Deload week triggers
  
- **Nutrition Advisor**:
  - Macro targets based on training load
  - Anti-inflammatory meal suggestions
  - Supplement recommendations
  - Hydration targets
  
- **Recovery Protocol Recommender**:
  - Post-workout modality selection (ice/sauna/contrast)
  - Timing optimization
  - Frequency management
  
- **Insights & Alerts**:
  - Trend detection (positive and negative)
  - Warning systems (overtraining, under-recovery)
  - Milestone celebrations
  - Pattern recognition (sleep/performance correlations)

#### 4. User Interface
- **Dashboard**:
  - Daily readiness score (prominent)
  - Today's workout + recommendation
  - Key metrics snapshot (HRV, sleep, RHR)
  - Weekly training overview
  - Hydration status
  
- **Training Calendar**:
  - Weekly/monthly view
  - Workout details & completion status
  - Load visualization
  - Planned vs actual
  
- **Metrics & Trends**:
  - Interactive charts (HRV, VO2 max, sleep, etc.)
  - Goal progress tracking
  - Historical comparisons
  
- **Nutrition Hub**:
  - Daily log view
  - Macro breakdown
  - Supplement checklist
  - Hydration tracker
  - Anti-inflammatory food score
  
- **Wellness Center**:
  - Meditation timer & guided sessions
  - Mood journal
  - Auto-immune symptom tracker
  - Alcohol log
  - Mental health resources
  
- **Recovery Protocols**:
  - Today's recommendation
  - Protocol guides (ice/sauna/contrast)
  - Completion logging
  
- **Blood Work**:
  - Upload & storage
  - Trend visualization
  - Supplement correlation
  - Printable summary for physician

#### 5. Workout Delivery
- **Zwift Integration**:
  - .zwo file generation
  - Auto-sync to Zwift folder or Intervals.icu
  
- **Garmin Integration**:
  - Push structured workouts to device
  - Sync settings (HR zones, power zones)
  
- **Intervals.icu Bridge**:
  - Bi-directional calendar sync
  - Workout library management

#### 6. Reporting & Analytics
- **Weekly Summary**:
  - Training load completion
  - Recovery quality
  - Goal progress
  - Key insights
  - Next week preview
  
- **Monthly Report**:
  - Comprehensive metrics trends
  - Training phase progress
  - Health markers evolution
  - Achievements & milestones
  
- **Export Capabilities**:
  - CSV data dumps
  - PDF reports for healthcare providers
  - Backup functionality

### Technology Stack Recommendations

**Backend**:
- Language: Python (excellent libraries for data science, Garmin integration)
- Framework: FastAPI or Django (REST API)
- Task Queue: Celery (scheduled Garmin syncs)
- Database: PostgreSQL + TimescaleDB extension (time-series)

**Data Processing**:
- Pandas, NumPy (analysis)
- Scikit-learn (ML for pattern recognition - future)
- Matplotlib/Plotly (visualizations)

**Frontend**:
- Framework: React or Next.js (responsive, modern)
- Charting: Chart.js or Recharts
- State Management: Redux or Context API
- Mobile: Progressive Web App (PWA) for mobile access

**Infrastructure**:
- Hosting: **GCP or Synology NAS self-hosted** (cost-optimized, no AWS/Azure)
- Containerization: Docker (for easy deployment to NAS or GCP)
- CI/CD: GitHub Actions
- **AI Integration**: Leverage Gemini Pro and Claude Pro subscriptions for conversational AI

**External Integrations**:
- **Intervals.icu API**: Primary data source (Garmin bridge + training calendar)
- GarminDB: Fallback/supplement for missing data
- MyFitnessPal: Only if needed (no official API)
- OAuth for authentication
- **Reference**: github.com/webscience2/fitnesstats-sync

---

## Implementation Phases

> [!NOTE]
> **Rapid Prototyping Approach**: User prefers moving much faster than 24-week timeline. Focus on getting working prototypes quickly, iterate based on real usage. Phases below are guidelines, not strict timelines.

### Phase 1: Foundation & Data Pipeline (MVP - Weeks 1-2)

**Objectives**:
- Establish data pipeline from Garmin
- Build core database schema
- Create basic dashboard

**Deliverables**:
1. **Intervals.icu + Garmin Integration**:
   - Intervals.icu API integration for Garmin data
   - GarminDB setup as fallback
   - Historical data import (as much as available)
   - **Historical Analysis**: Extract recent bests (5k/10k, FTP, etc.)
   - Age-adjusted baseline calculations
   
2. **Database Architecture**:
   - Schema design (user, metrics, workouts, plans)
   - Time-series tables for biometrics
   - Migration scripts
   
3. **Basic Dashboard**:
   - Metric visualization (HRV, sleep, RHR, VO2 max)
   - Historical trends
   - Manual data entry forms (wellness, alcohol, hydration)
   
4. **User Profile**:
   - Athletic history
   - Health conditions
   - Current goals
   - Baseline metrics

**Validation**:
- Daily Garmin sync operational
- 30+ days historical data visible
- Manual entry functioning
- Charts rendering correctly

### Phase 2: Conversational AI & Training Intelligence (Weeks 3-4)

**Objectives**:
- Implement progressive training plan generator
- Build HRV-guided readiness calculator
- Create workout library

**Deliverables**:
1. **Training Plan Generator**:
   - Phase-based progression (Foundation → Build → Develop → Performance)
   - Multi-discipline load balancing
   - Weekly planning algorithm
   - 10% rule enforcement
   
2. **Daily Readiness System + Conversational AI**:
   - HRV analysis engine (rolling averages)
   - Sleep quality integration
   - RHR deviation calculation
   - Readiness score algorithm
   - Recommendation engine (train hard / moderate / rest)
   - **Conversational Interface**: AI asks questions, challenges, supports
   - **Activity Listening**: Real-time session recommendations
   - User override tracking and learning
   
3. **Workout Library**:
   - Structured workout templates (Zone 2, intervals, tempo, etc.)
   - Discipline-specific (run, bike, strength, yoga)
   - Intensity/duration variations
   
4. **Training Calendar UI**:
   - Weekly view
   - Workout assignment
   - Completion tracking
   - Load visualization

**Validation**:
- Generate 12-week training plan for test user
- Daily readiness calculation functioning
- Workout library accessible
- Manual workout completion logging works

### Phase 3: Nutrition, Recovery & Auto-immune Tracking (Weeks 5-6)

**Objectives**:
- Implement adaptive workout modification
- Build nutrition tracking & advisory
- Integrate recovery protocols

**Deliverables**:
1. **Adaptive Engine**:
   - Daily readiness → workout modification logic
   - Intensity adjustment algorithms
   - Workout substitution rules
   - Deload week triggers
   - User override capture
   
2. **Nutrition System**:
   - Garmin lifestyle logging integration (research API access)
   - AI-assisted meal input (via Gemini/Claude)
   - Macro tracking & visualization
   - Anti-inflammatory food scoring
   - **True Protein Integration**: Track supplements, protein intake
   - Hydration management with targets & reminders (metric units)
   - **Food Elimination Experiments**: Track dietary changes
   
3. **Recovery Protocols**:
   - Ice bath / sauna / contrast therapy guides
   - Post-workout recommendations
   - Completion logging
   - Frequency management
   
4. **Auto-immune Tracking**:
   - **Symptom Diary with Prompts**: Daily check-ins for each condition
   - Flare severity tracking (1-10 scale)
   - Pattern analysis (AI-driven correlation detection)
   - Food elimination experiment tracking
   
5. **Insights Engine**:
   - Trend detection (7-day, 30-day)
   - Alert system (overtraining, poor recovery)
   - Correlation analysis (sleep vs performance, alcohol vs HRV)

**Validation**:
- Adaptive modifications trigger correctly for low HRV scenario
- Nutrition data syncing from source
- Hydration tracking functional
- Recovery protocol recommendations appear post-workout

### Phase 4: Goal Intelligence & Platform Integration (Weeks 7-8)

**Objectives**:
- Mental wellness features
- Auto-immune tracking
- Platform integrations (Intervals.icu, Zwift)
- Blood work module

**Deliverables**:
1. **Goal & Race Intelligence**:
   - Flexible goal setting (default balanced fitness OR specific event)
   - **AI Race Research**: Given race name, research terrain, elevation, technical difficulty
   - Adapt training plan to race characteristics (trail vs road, etc.)
   - Support various events: trail marathon, gran fondo, ultra hikes, etc.
   - **Example**: Hounslow Classic (Sept) - highly technical trail, elevation, stairs
   
2. **Mental Wellness**:
   - Meditation timer (5-15 min sessions)
   - App integration tracking (Tripp VR, Balance, Insight Timer, Headspace, Breathwrk)
   - Daily mood/stress logging
   - Depression symptom tracking
   - Weekly mental health check-ins
   - Alcohol impact education & tracking
   - **Notifications**: Email/push, or Gemini notifications if possible
   
3. **Intervals.icu Bi-directional Integration**:
   - Bi-directional calendar sync
   - Workout push/pull
   - Activity data retrieval
   
4. **Zwift Integration**:
   - .zwo file generation from workouts
   - Auto-sync pipeline
   - Completed workout ingestion
   
5. **Blood Work Module**:
   - PDF upload
   - Manual metric entry
   - Trend visualization
   - **Historical Results**: Can upload past results for testing
   - Supplement recommendation logic
   - Export for physician

**Validation**:
- Meditation app integrations logged
- Goal setting and race research functional (test with Hounslow Classic)
- Auto-immune diary with pattern detection working
- Workout syncs to Intervals.icu and Zwift
- Blood work upload working with historical data

### Phase 5: Polish & Deployment (Weeks 9-10)

**Objectives**:
- Production deployment (NAS or GCP)
- Mobile PWA optimization
- Performance & polish

**Deliverables**:
1. **Deployment**:
   - Docker containers
   - Deploy to Synology NAS (primary) or GCP
   - Automated backups
   - SSL certificates
   
2. **Mobile PWA**:
   - Responsive design
   - Quick daily check-in flow  
   - Simplified mobile dashboard
   - Progressive Web App features
   - Push notifications (workout reminders, hydration alerts)
   - Email notifications
   
3. **Performance Optimization**:
   - Database query optimization
   - Page load times <2s
   - Efficient data syncing
   
4. **Polish**:
   - UI/UX refinements
   - Error handling
   - Data export capabilities
   - Backup & recovery

**Validation**:
- System running on production environment
- Mobile PWA tested on iOS and Android
- Performance benchmarks met
- All integrations functioning
- User acceptance testing complete

### Phase 6: Advanced Features (Ongoing)

**Objectives**:
- Advanced analytics
- Social/coach integration (optional)
- Comprehensive reporting
- Performance optimization

**Deliverables** (as needed over time):
1. **ML & Advanced Analytics**:
   - Pattern recognition from user data
   - Performance predictors
   - Injury risk indicators
   - Multi-metric correlation analysis
   
2. **Advanced Reporting**:
   - Weekly automated summaries (email)
   - Monthly comprehensive reports
   - Exportable physician reports
   
3. **Continuous Improvement**:
   - Based on real usage data
   - User feedback integration
   - Feature refinements

---

## Confirmed Decisions

> [!NOTE]
> **User Has Confirmed** - These decisions have been finalized based on user feedback.

### 1. Timeline & Approach
- **Rapid prototyping**: Move much faster than 24 weeks
- **Phases are guidelines**: Iterate based on real usage, not strict timelines
- **Target**: 10 weeks for MVP to advanced features, then ongoing improvements

### 2. Data Sources
- **Primary**: Garmin via Intervals.icu API (as bridge)
- **Fallback**: GarminDB for any missing data
- **Whoop**: Deprioritize, focus on Garmin first
- **Historical Data**: Import as much Garmin history as possible for baseline analysis

### 3. Nutrition Tracking
- **Primary**: Garmin lifestyle logging with AI-assisted meal input
- **Research**: API availability (may need paid subscription)
- **AI**: Use Gemini/Claude Pro for conversational meal logging
- **Fallback**: MyFitnessPal only if truly needed (no official API, hacky)

### 4. Technical Infrastructure
- **Platform**: Web app (Progressive Web App for mobile)
- **Hosting**: Synology NAS (preferred) or GCP (if needed)
- **NO**: AWS or Azure
- **Cost-optimized**: Self-hosted, single user system
- **Database**: PostgreSQL or SQLite
- **AI**: Leverage existing Gemini Pro & Claude Pro subscriptions

### 5. Units & Formatting
- **Metric only**: mL, L, kg, km, °Coptions (no oz, cups, F, miles, lbs)

### 6. Goals & Training Balance
- **Near-term (6-12 months)**: Regular running & cycling, injury-free
- **Uber goals**: Marathon/100k events (long-term)
- **Balance**: Running & cycling balanced (NOT running-primary)
- **Flexibility**: User can increase discipline they're enjoying
- **Specific Event**: Possibly Hounslow Classic trail marathon (Sept)
- **Race Intelligence**: AI researches race characteristics (trail vs road, elevation)

### 7. Features Confirmed
- **Conversational AI**: Not "I know best" - challenges, asks questions, supports
- **Activity Listening**: Real-time suggestions after workouts
- **Auto-immune Diary**: Prompts, pattern spotting, food elimination experiments
- **Historical Analysis**: Extract 5k/10k PRs, FTP highs from Garmin data
- **Age-adjusted**: Account for performance degradation
- **True Protein**: Integration for WPI90, post, meal replacement, creatine, collagen, bars
- **Gravl App**: Access for strength training (manage tennis elbow)
- **Meditation**: 5-15 min max daily (Tripp VR, Balance, Insight Timer, Headspace, Breathwrk)
- **Notifications**: Email/push, or Gemini if possible

### 8. Blood Work
- **Timing**: Can upload historical results now for testing
- **Frequency**: Initial comprehensive, then smaller targeted panels (budget-conscious)

### 9. Coach/Social
- **Not initially**: Skip for MVP

### 10. Recovery Protocols
- **Ice Bath**: Huberman protocol (~11-12 min/week across sessions)
- **Sauna**: 2-4x/week, 30 min, post-exercise
- **Heat Training**: Future interest once baseline back
- **Contrast Therapy**: Too messy - make optional/swappable

---

## Remaining Questions & Research Needed

### Health & Safety Risks

**Risk**: Re-injury during progressive return
- **Mitigation**: Strict adherence to pain rules, conservative progression, mandatory rest days, HRV monitoring with hard stops

**Risk**: Overtraining despite smart monitoring
- **Mitigation**: Weekly load caps, ACWR monitoring, forced deload weeks, user education on overtraining signs

**Risk**: Auto-immune flare-up from training stress
- **Mitigation**: Daily symptom tracking, correlation analysis, immediate load reduction on flare-up, medical professional consultation prompts

**Risk**: Neglecting mental health signals
- **Mitigation**: Weekly depression screening, mandatory mental health check-ins, crisis resources prominently available

### Data & Technical Risks

**Risk**: Garmin API changes or data access limitations
- **Mitigation**: GarminDB local sync as primary (not dependent on Garmin API), regular backups, documented fallback procedures

**Risk**: Data loss or corruption
- **Mitigation**: Automated daily backups, export capabilities, version control on database schemas, transaction logging

**Risk**: Privacy/security of health data
- **Mitigation**: Encryption at rest and in transit, secure authentication, HIPAA-level considerations in design, user data ownership

**Risk**: System downtime affecting training guidance
- **Mitigation**: Offline mode capability, last-known-good recommendations cached, graceful degradation, printable training plans

### User Experience Risks

**Risk**: System too complex, overwhelming
- **Mitigation**: Progressive disclosure UI, simple daily dashboard, advanced features optional, onboarding flow, tooltips & education

**Risk**: Low adherence to recommendations
- **Mitigation**: Gamification elements (streaks, milestones), positive reinforcement, user autonomy (override capability), transparent reasoning

**Risk**: Analysis paralysis from too much data
- **Mitigation**: Focus on action items, clear daily/weekly priorities, hide extraneous metrics by default, executive summary views

---

### User Information Needed

1. **Current Supplements**: What are you currently taking (if anything)? *(For baseline tracking)*

2. **Weekly Time Availability**: 
   - How many hours per week can you dedicate to training (ideal)?
   - Minimum hours per week?
   - Preferred training times (morning/afternoon/evening)?

3. **Strength Training Specifics**:
   - What's your experience with Gravl app?
   - Tennis elbow severity (1-10) and any exercises/movements to avoid?
   - Any other injury considerations for strength work?

4. **Medical Team**: 
   - Do you have a sports medicine doctor, physical therapist, or other professionals currently involved?
   - Should system factor in any professional recommendations?

5. **Equipment Access**: 
   - Gym access (home/commercial)?
   - Power meter for cycling?
   - Treadmill access for treadmill running option?
   - Any other relevant equipment?

6. **Hounslow Classic Details**:
   - Confirm Sept 2026?
   - Is this a firm goal or aspirational?
   - Should we build training plan around this?

7. **Social/Cycling Club**:
   - Your cycling club's typical weekend ride schedule?
   - Typical pace/intensity?
   - Should system schedule to ensure you're ready for these rides?

### Technical Research Needed

1. **Garmin Lifestyle Logging API**:
   - Investigate API access availability
   - Subscription requirements (if any)
   - Data available via API vs manual entry

2. **Intervals.icu API Coverage**:
   - Confirm all needed wellness metrics available (HRV, RHR, sleep stages, etc.)
   - Activity data completeness
   - API rate limits

3. **Synology NAS Requirements**:
   - Disk space needed for time-series data
   - Docker support verification
   - SSL certificate setup for remote access
   - Backup strategy

4. **Gemini Notifications**:
   - Research if Google Gemini can send push notifications
   - Alternative: Email/PWA push notifications

5. **True Protein Products**:
   - Research full product line
   - Optimal usage protocols for each (WPI90, post, meal replacement, creatine, collagen)
   - Timing recommendations

---

## Next Steps

### Immediate Actions After PRD Approval

1. **Finalize Technical Stack**: Confirm architecture decisions
2. **Environment Setup**: Development environment, repositories, CI/CD
3. **Data Analysis**: Deep dive into your Garmin historical data to understand patterns
4. **Baseline Assessment**: Document current state (fitness, health, mental wellness)
5. **Phase 1 Kickoff**: Begin Garmin integration and database development

### Your Action Items

1. **Review this PRD**: Provide feedback on scope, priorities, concerns
2. **Answer Open Questions**: Help us refine and personalize
3. **Approve Phased Approach**: Confirm timeline and phase breakdown
4. **Provide Data Access**: Garmin credentials for integration testing
5. **Medical Consultation**: Consider discussing plan with sports medicine doctor for clearance

---

## Conclusion

This holistic health and wellness system represents a comprehensive, evidence-based approach to your recovery and return to elite endurance performance. By integrating wearable data, progressive training protocols, anti-inflammatory nutrition, recovery modalities, and mental wellness practices, we create a fully personalized platform that adapts to your unique physiology and circumstances.

The phased implementation ensures we build a solid foundation before adding complexity, validating each component before proceeding. Your feedback and active participation throughout development will be crucial to creating a system that truly serves your needs.

**The goal is not just to return to your previous fitness level—it's to emerge healthier, more resilient, and better equipped to maintain long-term athletic performance while managing chronic conditions holistically.**

Let's build this together.
