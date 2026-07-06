-- Supabase Database Schema for RWF Platform
-- Run this in your Supabase Dashboard: SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'rwf';
ALTER TABLE users ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en';
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  video_url TEXT,
  duration INTEGER,
  reward REAL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
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
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id),
  amount REAL NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  embed_url TEXT,
  reward REAL DEFAULT 0,
  duration INTEGER DEFAULT 30,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page Views table for analytics
CREATE TABLE IF NOT EXISTS page_views (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  page TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  device TEXT,
  session_id TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create policies for anon access
CREATE POLICY "Allow public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON videos FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON tasks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON transactions FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON games FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON page_views FOR SELECT USING (true);

-- Insert admin user
INSERT INTO users (id, username, email, phone, password, referral_code, balance, referral_earnings, level, is_active, is_admin)
VALUES ('admin-001', 'admin', 'injiza0@admin.com', '+250788000000', 'amazon11@@', 'ADMIN001', 0, 0, 10, true, true)
ON CONFLICT (email) DO NOTHING;

-- Insert sample videos
INSERT INTO videos (title, description, thumbnail, video_url, duration, reward, is_active, views) VALUES
('Welcome Video', 'Welcome to RWF Platform', 'https://example.com/thumb1.jpg', 'https://example.com/video1.mp4', 60, 10, true, 0),
('Tutorial Video', 'Learn how to earn', 'https://example.com/thumb2.jpg', 'https://example.com/video2.mp4', 120, 15, true, 0);

-- Insert sample tasks
INSERT INTO tasks (type, title, description, url, reward, time_required, daily_limit, total_budget, is_active) VALUES
('survey', 'Daily Survey', 'Complete our daily survey', 'https://example.com/survey', 5, 5, 1, 100, true),
('watch', 'Watch Video', 'Watch promotional videos', 'https://example.com/video', 3, 30, 10, 50, true);

-- Insert sample games
INSERT INTO games (title, description, thumbnail, embed_url, reward, duration, is_active) VALUES
('Spin & Win', 'Spin the wheel and win big rewards!', 'https://images.unsplash.com/photo-1614680376578-61d7cb65306c?w=400', '', 500, 30, true),
('Lucky Match', 'Match the symbols to earn rewards!', 'https://images.unsplash.com/photo-1603569283847-aa9456610708?w=400', '', 300, 30, true),
('Quick Quiz', 'Answer questions and earn!', 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400', '', 400, 45, true),
('Treasure Hunt', 'Find hidden treasures!', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400', '', 600, 60, true);