import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Test 1: Try with anon key
  const anonClient = createClient(url, key)
  const anonInsert = await anonClient.from('listing_submissions').insert({
    company_name: 'Anon Test',
    category_slug: 'processors',
    contact_person: 'Test',
    email: 'test@test.com',
    phone: '9999999999',
    source_site: 'hi'
  }).select()

  // Test 2: Try with service role key (bypasses RLS)
  let serviceInsert = null
  if (serviceKey) {
    const adminClient = createClient(url, serviceKey, { auth: { persistSession: false } })
    const result = await adminClient.from('listing_submissions').insert({
      company_name: 'Admin Test',
      category_slug: 'processors',
      contact_person: 'Test Admin',
      email: 'admin@test.com',
      phone: '8888888888',
      source_site: 'hi'
    }).select()
    serviceInsert = { data: result.data, error: result.error?.message || null }
  }

  // Test 3: Anon select to check read access
  const { data: sample, error: selectError } = await anonClient
    .from('listing_submissions')
    .select('*')
    .limit(1)

  return NextResponse.json({
    hasServiceKey: !!serviceKey,
    anonInsert: {
      data: anonInsert.data,
      error: anonInsert.error?.message || null,
      code: anonInsert.error?.code || null,
      hint: anonInsert.error?.hint || null,
      details: anonInsert.error?.details || null
    },
    serviceInsert,
    selectTest: {
      data: sample,
      error: selectError?.message || null
    }
  })
}
