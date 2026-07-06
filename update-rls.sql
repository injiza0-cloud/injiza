-- Run this in your Supabase SQL Editor to fix the registration issue
-- It allows the app to insert users (register), update balances, and create transactions

-- Users table policies
CREATE POLICY "Allow public insert access" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON users FOR UPDATE USING (true);

-- Transactions table policies
CREATE POLICY "Allow public insert access" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON transactions FOR UPDATE USING (true);

-- Videos table policies (to update views)
CREATE POLICY "Allow public update access" ON videos FOR UPDATE USING (true);

-- Page views policies
CREATE POLICY "Allow public insert access" ON page_views FOR INSERT WITH CHECK (true);

-- Tasks table policies
CREATE POLICY "Allow public update access" ON tasks FOR UPDATE USING (true);

-- Games table policies
CREATE POLICY "Allow public update access" ON games FOR UPDATE USING (true);
