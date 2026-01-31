-- Database schema for Health Reboot system
-- SQLite implementation (can migrate to PostgreSQL later)

-- User profile
CREATE TABLE IF NOT EXISTS user_profile (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    date_of_birth DATE,
    weight_kg REAL,
    height_cm REAL,
    gender TEXT CHECK(gender IN ('M', 'F', 'Other')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Biometric data (time-series)
CREATE TABLE IF NOT EXISTS biometrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    hrv_rmssd REAL, -- Heart Rate Variability
    resting_hr INTEGER, -- Resting Heart Rate
    sleep_score INTEGER, -- 0-100
    sleep_duration_minutes INTEGER,
    sleep_deep_minutes INTEGER,
    sleep_rem_minutes INTEGER,
    sleep_light_minutes INTEGER,
    sleep_awake_minutes INTEGER,
    vo2_max REAL,
    body_battery INTEGER, -- Garmin Body Battery
    recovery_score INTEGER, -- 0-100
    respiratory_rate REAL,
    stress_level INTEGER, -- 0-100
    spo2_avg REAL, -- Blood oxygen
    weight_kg REAL,
    body_fat_percent REAL,
    source TEXT DEFAULT 'garmin', -- 'garmin', 'intervals', 'manual'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id),
    UNIQUE(user_id, date)
);

CREATE INDEX idx_biometrics_date ON biometrics(user_id, date DESC);

-- Activities (workouts)
CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    external_id TEXT, -- ID from Garmin/Intervals.icu
    activity_type TEXT NOT NULL, -- 'run', 'cycle', 'strength', 'yoga', etc.
    start_time DATETIME NOT NULL,
    duration_seconds INTEGER,
    distance_meters REAL,
    elevation_gain_meters REAL,
    avg_hr INTEGER,
    max_hr INTEGER,
    avg_power REAL, -- Watts for cycling
    normalized_power REAL,
    training_stress_score REAL, -- TSS
    intensity_factor REAL,
    calories INTEGER,
    avg_cadence INTEGER,
    avg_pace_min_per_km REAL,
    name TEXT,
    description TEXT,
    completed BOOLEAN DEFAULT 1,
    source TEXT DEFAULT 'garmin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE INDEX idx_activities_start_time ON activities(user_id, start_time DESC);
CREATE INDEX idx_activities_external_id ON activities(external_id);

-- Training plans
CREATE TABLE IF NOT EXISTS training_plans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    goal_type TEXT, -- 'base_building', 'trail_marathon', 'gran_fondo', etc.
    goal_event_date DATE,
    goal_event_name TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    current_phase TEXT, -- 'foundation', 'build', 'develop', 'performance'
    is_active BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

-- Planned workouts
CREATE TABLE IF NOT EXISTS planned_workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    training_plan_id INTEGER,
    user_id INTEGER NOT NULL,
    planned_date DATE NOT NULL,
    workout_type TEXT NOT NULL, -- 'zone2', 'intervals', 'tempo', 'strength', 'rest', etc.
    activity_type TEXT NOT NULL, -- 'run', 'cycle', 'strength', 'yoga'
    duration_minutes INTEGER,
    distance_km REAL,
    intensity TEXT, -- 'easy', 'moderate', 'hard'
    description TEXT,
    completed BOOLEAN DEFAULT 0,
    actual_activity_id INTEGER, -- Link to completed activity
    skipped BOOLEAN DEFAULT 0,
    rescheduled_from DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (training_plan_id) REFERENCES training_plans(id),
    FOREIGN KEY (user_id) REFERENCES user_profile(id),
    FOREIGN KEY (actual_activity_id) REFERENCES activities(id)
);

CREATE INDEX idx_planned_workouts_date ON planned_workouts(user_id, planned_date);

-- Daily readiness scores
CREATE TABLE IF NOT EXISTS daily_readiness (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    readiness_score INTEGER NOT NULL, -- 0-100
    readiness_level TEXT CHECK(readiness_level IN ('green', 'yellow', 'red')),
    hrv_score REAL,
    sleep_score REAL,
    rhr_score REAL,
    load_score REAL, -- Based on training load
    recommendation TEXT, -- 'train_hard', 'moderate', 'easy', 'rest'
    user_override TEXT, -- User's actual decision
    subjective_feeling INTEGER, -- 1-10 self-reported
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id),
    UNIQUE(user_id, date)
);

CREATE INDEX idx_readiness_date ON daily_readiness(user_id, date DESC);

-- Nutrition log
CREATE TABLE IF NOT EXISTS nutrition_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    meal_type TEXT, -- 'breakfast', 'lunch', 'dinner', 'snack'
    meal_time TIME,
    description TEXT,
    calories INTEGER,
    protein_g REAL,
    carbs_g REAL,
    fat_g REAL,
    fiber_g REAL,
    sugar_g REAL,
    anti_inflammatory_score INTEGER, -- 1-10
    source TEXT DEFAULT 'manual', -- 'manual', 'garmin', 'myfitness pal', 'ai'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE INDEX idx_nutrition_date ON nutrition_log(user_id, date DESC);

-- Hydration tracking
CREATE TABLE IF NOT EXISTS hydration_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    time TIME,
    amount_ml INTEGER NOT NULL,
    beverage_type TEXT DEFAULT 'water', -- 'water', 'electrolyte', 'coffee', 'alcohol', etc.
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE INDEX idx_hydration_date ON hydration_log(user_id, date DESC);

-- Auto-immune symptom tracking
CREATE TABLE IF NOT EXISTS autoimmune_symptoms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    condition_type TEXT NOT NULL, -- 'vitiligo', 'celiac', 'psoriasis'
    severity INTEGER CHECK(severity BETWEEN 1 AND 10),
    symptoms TEXT, -- JSON array or comma-separated
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE INDEX idx_symptoms_date ON autoimmune_symptoms(user_id, date DESC);

-- Recovery protocols
CREATE TABLE IF NOT EXISTS recovery_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    time TIME,
    protocol_type TEXT NOT NULL, -- 'ice_bath', 'sauna', 'contrast', 'massage', 'stretch'
    duration_minutes INTEGER,
    temperature_celsius REAL, -- For ice bath/sauna
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE INDEX idx_recovery_date ON recovery_log(user_id, date DESC);

-- Meditation/mindfulness log
CREATE TABLE IF NOT EXISTS meditation_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    time TIME,
    duration_minutes INTEGER NOT NULL,
    meditation_type TEXT, -- 'mindfulness', 'breath_work', 'vr_tripp', etc.
    app_used TEXT, -- 'tripp', 'balance', 'headspace', 'insight_timer', 'breathwrk'
    mood_before INTEGER, -- 1-10
    mood_after INTEGER, -- 1-10
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE INDEX idx_meditation_date ON meditation_log(user_id, date DESC);

-- Mental health check-ins
CREATE TABLE IF NOT EXISTS mental_health_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    mood_score INTEGER CHECK(mood_score BETWEEN 1 AND 10),
    stress_level INTEGER CHECK(stress_level BETWEEN 1 AND 10),
    depression_score INTEGER CHECK(depression_score BETWEEN 1 AND 10),
    anxiety_score INTEGER CHECK(anxiety_score BETWEEN 1 AND 10),
    alcohol_consumption_units REAL,
    sleep_quality INTEGER CHECK(sleep_quality BETWEEN 1 AND 10),
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE INDEX idx_mental_health_date ON mental_health_log(user_id, date DESC);

-- Blood work results
CREATE TABLE IF NOT EXISTS blood_work (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    test_date DATE NOT NULL,
    panel_type TEXT, -- 'comprehensive', 'lipid', 'inflammation', etc.
    uploaded_file_path TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user_profile(id)
);

CREATE TABLE IF NOT EXISTS blood_work_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    blood_work_id INTEGER NOT NULL,
    metric_name TEXT NOT NULL, -- 'crp', 'vitamin_d', 'ferritin', etc.
    value REAL NOT NULL,
    unit TEXT,
    reference_range_low REAL,
    reference_range_high REAL,
    is_abnormal BOOLEAN DEFAULT 0,
    FOREIGN KEY (blood_work_id) REFERENCES blood_work(id)
);

-- System settings and metadata
CREATE TABLE IF NOT EXISTS system_settings (
    key TEXT PRIMARY KEY,
    value TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Data sync status
CREATE TABLE IF NOT EXISTS sync_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL, -- 'garmin', 'intervals', 'garmin_db'
    last_sync_time DATETIME,
    last_sync_status TEXT, -- 'success', 'error'
    last_sync_error TEXT,
    next_sync_time DATETIME,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Triggers for updated_at
CREATE TRIGGER update_user_profile_timestamp 
AFTER UPDATE ON user_profile
BEGIN
    UPDATE user_profile SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER update_system_settings_timestamp 
AFTER UPDATE ON system_settings
BEGIN
    UPDATE system_settings SET updated_at = CURRENT_TIMESTAMP WHERE key = NEW.key;
END;
