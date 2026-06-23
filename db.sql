-- Supabase SQL Schema for Cart Share

-- 1. Users table (to manage permissions via token)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Carts table (NoSQL-ish with JSONB)
CREATE TABLE carts (
  id TEXT PRIMARY KEY, -- using custom ID like nanoid
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  items JSONB DEFAULT '[]'::JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Trigger to update 'updated_at' automatically
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;

-- Policies for users table (Allow anonymous access)
CREATE POLICY "Allow anonymous access to users" 
ON users FOR ALL 
TO anon 
USING (true) 
WITH CHECK (true);

-- Policies for carts table (Allow anonymous access)
-- Note: Our API level handles the ownership check via fingerprint
CREATE POLICY "Allow anonymous access to carts" 
ON carts FOR ALL 
TO anon 
USING (true) 
WITH CHECK (true);

-- 4. Sample Query for items update:
-- UPDATE carts SET items = items || '{"id": "...", "url": "..."}'::jsonb WHERE id = '...';
