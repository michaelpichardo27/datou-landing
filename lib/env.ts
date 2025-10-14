// lib/env.ts
function required(name: string) {
  const v = process.env[name];
  if (!v || v.trim().length === 0) {
    // Only throw error in runtime, not during build
    if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development') {
      throw new Error(
        `Missing required env var: ${name}. Set it in .env.local (dev) and in your host (prod).`
      );
    }
    // Return empty string during build to prevent build failures
    return '';
  }
  return v;
}

// Build-safe environment variable getters
function getEnvVar(name: string): string {
  return process.env[name] || '';
}

// Public (browser) keys must be prefixed with NEXT_PUBLIC_ in Next.js
export const NEXT_PUBLIC_SUPABASE_URL = required('NEXT_PUBLIC_SUPABASE_URL');
export const NEXT_PUBLIC_SUPABASE_ANON_KEY = required('NEXT_PUBLIC_SUPABASE_ANON_KEY');

// Server-only (never expose to client)
export const SUPABASE_SERVICE_ROLE_KEY = required('SUPABASE_SERVICE_ROLE_KEY');
