import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ssqlfbirfifeclrhwttq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcWxmYmlyZmlmZWNscmh3dHRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTkwODUsImV4cCI6MjA5NjQzNTA4NX0.UQbtW2slFvWn2-fX1V9Er5W76UqNe2dlNpgXiztzF4w'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const TABLES = {
  USERS: 'users',
  VIDEOS: 'videos',
  TASKS: 'tasks',
  TRANSACTIONS: 'transactions',
  GAMES: 'games',
  PAGE_VIEWS: 'page_views'
}

export const SQL_SCHEMA = `
-- Run this in Supabase SQL Editor to set up your database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  password TEXT NOT NULL,
  referral_code TEXT,
  referred_by TEXT,
  balance REAL DEFAULT 0,
  referral_earnings REAL DEFAULT 0,
  level INTEGER DEFAULT 1,
  points REAL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'en',
  currency TEXT DEFAULT 'rwf',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'rwf';
ALTER TABLE users ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  video_url TEXT,
  duration INTEGER,
  reward REAL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  reward REAL DEFAULT 0,
  time_required INTEGER,
  daily_limit INTEGER,
  total_budget REAL,
  is_active BOOLEAN DEFAULT true,
  expiry_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount REAL NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Page Views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id TEXT PRIMARY KEY,
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  device TEXT,
  session_id TEXT,
  viewed_at TIMESTAMP DEFAULT NOW()
);

-- Insert admin user
INSERT INTO users (id, username, email, phone, password, referral_code, balance, referral_earnings, level, is_active, is_admin, created_at)
VALUES ('admin-001', 'admin', 'injiza0@admin.com', '+250788000000', 'amazon11@@', 'ADMIN001', 0, 0, 10, true, true, NOW())
ON CONFLICT (email) DO NOTHING;
`

export async function checkTablesExist() {
  try {
    const { data, error } = await supabase.from('users').select('id').limit(1)
    return !error
  } catch {
    return false
  }
}

export async function initializeAdminUser() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'injiza0@admin.com')
      .single()

    if (data) return { success: true, user: data }

    if (error && error.code !== 'PGRST116') {
      return { success: false, error: error.message }
    }

    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({
        id: 'admin-001',
        username: 'admin',
        email: 'injiza0@admin.com',
        phone: '+250788000000',
        password: 'amazon@@11',
        referral_code: 'ADMIN001',
        balance: 0,
        referral_earnings: 0,
        level: 10,
        is_active: true,
        is_admin: true,
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (insertError) {
      return { success: false, error: insertError.message }
    }

    return { success: true, user: newUser }
  } catch (e) {
    return { success: false, error: e.message }
  }
}