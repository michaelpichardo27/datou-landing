import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const { email, source = 'website' } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Get environment variables at runtime to avoid build-time issues
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Create Supabase client inside the function to avoid build-time issues
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

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