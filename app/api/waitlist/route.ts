import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from '@/lib/env';

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function POST(req: Request) {
  try {
    const { email, source = 'website' } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // De-dupe nicely: upsert on email unique constraint
    const { error } = await supabase
      .from('waitlist')
      .upsert({ 
        email: email.trim().toLowerCase(), 
        source,
        status: 'pending',
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'email', 
        ignoreDuplicates: true 
      });

    if (error) {
      // Bubble the real SQL/PostgREST message to help you debug
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      message: 'Successfully added to waitlist!',
      ok: true 
    });
  } catch (e: any) {
    console.error('API error:', e);
    return NextResponse.json({ error: e?.message ?? 'Unknown error' }, { status: 500 });
  }
}