// lib/supabaseServer.ts
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  // SUPABASE_SERVICE_ROLE_KEY, // only if truly needed
} from './env';

export function supabaseServer() {
  const cookieStore = cookies();
  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: () => {},
        remove: () => {},
      },
    }
  );
}
