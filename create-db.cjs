const { Client } = require('pg');

const SQL = `
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

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
`;

async function main() {
  const client = new Client({
    host: 'db.lfiyorbabuchkxdheyjz.supabase.co',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Amazon11@@200',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to Supabase database');
    
    await client.query(SQL);
    console.log('Tables created successfully!');
    
    // Verify tables
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables in database:', result.rows.map(r => r.table_name).join(', '));
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.end();
  }
}

main();
