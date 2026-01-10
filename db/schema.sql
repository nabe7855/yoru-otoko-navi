-- NightJob JP Database Schema

-- Types / Enums
-- PostgreSQL equivalent (Adjust if using other DB like MySQL/SQLite)
-- CREATE TYPE role_type AS ENUM ('guest', 'jobseeker', 'employer', 'admin');
-- CREATE TYPE job_status_type AS ENUM ('draft', 'pending', 'approved', 'published', 'suspended');
-- CREATE TYPE salary_type AS ENUM ('hourly', 'daily', 'monthly');
-- CREATE TYPE application_status_type AS ENUM ('submitted', 'contacted', 'interview', 'offer', 'rejected');
-- CREATE TYPE hunting_status_type AS ENUM ('active', 'passive', 'closed');

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, -- Using TEXT for UUID or string IDs
    role TEXT NOT NULL CHECK (role IN ('guest', 'jobseeker', 'employer', 'admin')),
    display_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Seeker Profiles table
CREATE TABLE IF NOT EXISTS seeker_profiles (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    mbti VARCHAR(4),
    personality_tags JSONB DEFAULT '[]',
    lifestyle TEXT,
    desired_atmosphere TEXT,
    desired_person_type TEXT,
    job_hunting_status TEXT CHECK (job_hunting_status IN ('active', 'passive', 'closed')),
    bio TEXT
);

-- 3. Employers table
CREATE TABLE IF NOT EXISTS employers (
    id TEXT PRIMARY KEY,
    owner_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    business_type TEXT,
    area_pref TEXT,
    area_city TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    vibe_tags JSONB DEFAULT '[]',
    preferred_mbti JSONB DEFAULT '[]'
);

-- 4. Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    employer_id TEXT NOT NULL REFERENCES employers(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    employment_type TEXT,
    area_pref TEXT,
    area_city TEXT,
    salary_type TEXT CHECK (salary_type IN ('hourly', 'daily', 'monthly')),
    salary_min INTEGER,
    salary_max INTEGER,
    tags JSONB DEFAULT '[]',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'published', 'suspended')),
    published_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    images JSONB DEFAULT '[]',
    is_hot BOOLEAN DEFAULT FALSE,
    -- Detailed fields
    qualifications TEXT,
    access_info TEXT,
    salary_details TEXT,
    benefits TEXT,
    insurance TEXT,
    working_hours TEXT,
    holidays TEXT,
    workplace_info TEXT,
    -- Matching fields
    required_mbti JSONB DEFAULT '[]',
    shop_vibe JSONB DEFAULT '[]'
);

-- 5. Applications table
CREATE TABLE IF NOT EXISTS applications (
    id TEXT PRIMARY KEY,
    job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    seeker_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    contact_type TEXT CHECK (contact_type IN ('phone', 'line', 'email')),
    contact_value TEXT,
    message TEXT,
    status TEXT DEFAULT 'submitted' CHECK (status IN ('submitted', 'contacted', 'interview', 'offer', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_offer BOOLEAN DEFAULT FALSE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_area_pref ON jobs(area_pref);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_applications_seeker_id ON applications(seeker_user_id);
