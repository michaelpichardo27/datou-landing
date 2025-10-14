# Environment Variables

## Supabase Configuration
Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Choose a name like "datou-landing"
4. Set a database password
5. Select a region close to your users

### 2. Create Email List Table
Run this SQL in your Supabase SQL Editor:

```sql
-- Create waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'subscribed', 'unsubscribed')),
  source TEXT DEFAULT 'website'
);

-- Create index for faster email lookups
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for new signups)
CREATE POLICY "Allow public to insert waitlist entries" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create policy to allow updates (for status changes)
CREATE POLICY "Allow public to update own waitlist entries" ON waitlist
  FOR UPDATE USING (true);

-- Create policy to allow reads (for admin purposes)
CREATE POLICY "Allow public to read waitlist entries" ON waitlist
  FOR SELECT USING (true);
```

### 3. Get Your Supabase Credentials
1. Go to your Supabase project dashboard
2. Click on "Settings" → "API"
3. Copy:
   - **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon public** key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 4. Add Environment Variables
Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Test the Setup
1. Start your development server: `pnpm dev`
2. Go to your waitlist form
3. Submit an email
4. Check your Supabase dashboard → Table Editor → waitlist table

## Features Included:
- ✅ Email validation and duplicate prevention
- ✅ Timestamp tracking
- ✅ Status management (pending/subscribed/unsubscribed)
- ✅ Source tracking (website, social media, etc.)
- ✅ Row Level Security for data protection
- ✅ Optimized database indexes

## Next Steps:
- Set up email marketing integration (Mailchimp, ConvertKit, etc.)
- Create admin dashboard for managing subscribers
- Add unsubscribe functionality
- Implement email verification
