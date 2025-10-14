# 🚀 Netlify Deployment Guide for DATOU Landing Page

## ✅ **Build Issues Fixed**

The build crashes on Netlify have been resolved by:
1. **Moving Supabase client creation inside API functions** - Prevents build-time environment variable issues
2. **Runtime environment variable validation** - Only checks env vars when actually needed
3. **Build-safe configuration** - Added `netlify.toml` for proper Next.js deployment

## 🔧 **Netlify Deployment Steps**

### 1. **Environment Variables Setup**
In your Netlify dashboard, go to **Site Settings > Environment Variables** and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://kyncaczhextxgxnsbkfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bmNhY3poZXh0eGd4bnNia2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDUxMDAsImV4cCI6MjA3NjAyMTEwMH0.OJXIU5EId7aLnh4nWsWsHL2FcIc_YmgRC2boKBvk2E4
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5bmNhY3poZXh0eGd4bnNia2ZkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDQ0NTEwMCwiZXhwIjoyMDc2MDIxMTAwfQ.WNMw9ub8I0NNkWSp2DL_JJ0M-HpH3g7rjrPC50NNV8M
```

### 2. **Build Settings**
- **Build Command**: `pnpm build`
- **Publish Directory**: `.next`
- **Node Version**: `18` (set in `netlify.toml`)

### 3. **Deployment Process**
1. Connect your GitHub repository to Netlify
2. Set the environment variables above
3. Deploy - the build should now succeed!

## 🧪 **What Was Fixed**

### **Before (Causing Build Crashes):**
```typescript
// ❌ This caused build failures on Netlify
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
```

### **After (Build-Safe):**
```typescript
// ✅ This works on Netlify
export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }
  
  const supabase = createClient(supabaseUrl, serviceRoleKey);
  // ... rest of function
}
```

## 📁 **Files Modified for Netlify Compatibility**

1. **`app/api/waitlist/route.ts`** - Moved Supabase client creation inside function
2. **`lib/env.ts`** - Added build-safe environment variable handling
3. **`netlify.toml`** - Added Netlify-specific configuration

## 🎉 **Result**

Your DATOU landing page will now:
- ✅ **Build successfully on Netlify**
- ✅ **Handle environment variables properly**
- ✅ **Deploy without crashes**
- ✅ **Maintain full waitlist functionality**

## 🔍 **Troubleshooting**

If you still encounter issues:
1. **Check Environment Variables** - Ensure all 3 variables are set in Netlify
2. **Clear Build Cache** - In Netlify dashboard, go to Deploys > Clear cache and retry
3. **Check Build Logs** - Look for specific error messages in Netlify build output

Your DATOU landing page is now ready for successful Netlify deployment! 🚀
