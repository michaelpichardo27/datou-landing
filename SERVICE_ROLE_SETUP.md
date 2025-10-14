# Service Role Key Setup

## How to Get Your Service Role Key

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `kyncaczhextxgxnsbkfd`
3. Go to **Settings** → **API**
4. Copy the **service_role** key (not the anon key)
5. Add it to your `.env.local` file:

```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Why Use Service Role?

- **Bypasses RLS**: No need to worry about Row Level Security policies
- **Better Error Handling**: Real SQL error messages instead of generic 500s
- **Upsert Support**: Handles duplicate emails gracefully with `ignoreDuplicates: true`
- **Server-Only**: Never exposed to the client, more secure

## Current Environment Variables

Your `.env.local` should now contain:
```
NEXT_PUBLIC_SUPABASE_URL=https://kyncaczhextxgxnsbkfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Testing

Once you add the Service Role key, restart your dev server:
```bash
pnpm dev
```

Then test the waitlist form - it should now handle duplicates gracefully and show real error messages.
