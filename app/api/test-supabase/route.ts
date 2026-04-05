import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return NextResponse.json({ error: 'Missing env vars', hasUrl: !!url, hasKey: !!key })
  }

  try {
    const supabase = createClient(url, key)

    // Test 1: Try listing tables via a simple query
    const { data: listingData, error: listingError } = await supabase
      .from('listing_submissions')
      .select('id')
      .limit(1)

    // Test 2: Try inserting a test row
    const { data: insertData, error: insertError } = await supabase
      .from('listing_submissions')
      .insert({
        company_name: 'TEST — DELETE ME',
        category_slug: 'test',
        description: 'Test submission from debug route',
        email: 'test@test.com',
        phone: '0000000000',
        status: 'pending',
        source_site: 'hi',
      })
      .select('id')

    return NextResponse.json({
      success: true,
      url: url.substring(0, 30) + '...',
      listingQuery: { data: listingData, error: listingError?.message || null, code: listingError?.code || null },
      insertTest: { data: insertData, error: insertError?.message || null, code: insertError?.code || null, details: insertError?.details || null },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, type: 'exception' })
  }
}
