import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabaseServer'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Get Supabase client
    const supabase = await supabaseServer()

    // Insert email into Supabase waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        { 
          email: email.trim().toLowerCase(),
          status: 'pending',
          source: 'website'
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      
      // Handle duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on our waitlist.' },
          { status: 409 }
        )
      }
      
      // Handle table doesn't exist error
      if (error.code === '42P01') {
        return NextResponse.json(
          { error: 'Database table not found. Please run the SQL setup from SUPABASE_SETUP.md' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist!', data },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
