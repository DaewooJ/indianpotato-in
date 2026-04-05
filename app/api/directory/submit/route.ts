import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    console.log('Submit body:', JSON.stringify(body))

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const insertData: Record<string, any> = {
      company_name: body.company_name || body.companyName || 'Unknown',
      category_slug: body.category_slug || body.category || 'processors',
      contact_person: body.contact_person || body.contactPerson || 'Unknown',
      email: body.email || 'unknown@test.com',
      phone: body.phone || '0000000000',
      source_site: 'hi',
      status: 'pending',
    }

    if (body.company_name_hi || body.companyNameHi) insertData.company_name_hi = body.company_name_hi || body.companyNameHi
    if (body.description) insertData.description = body.description
    if (body.whatsapp) insertData.whatsapp = body.whatsapp
    if (body.website) insertData.website = body.website
    if (body.city) insertData.city = body.city
    if (body.state) insertData.state = body.state
    if (body.products) insertData.products = body.products

    console.log('Insert data:', JSON.stringify(insertData))

    const { data, error } = await supabase.from('listing_submissions').insert(insertData).select()

    console.log('Supabase result:', { data, error })

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        receivedBody: Object.keys(body),
        insertDataKeys: Object.keys(insertData),
      }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      error: e.message,
      type: 'exception',
    }, { status: 500 })
  }
}
