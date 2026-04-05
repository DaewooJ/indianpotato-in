import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    )

    const { data, error } = await supabase.from('listing_submissions').insert({
      company_name: body.company_name,
      company_name_hi: body.company_name_hi || null,
      category_slug: body.category_slug,
      description: body.description || null,
      contact_person: body.contact_person || null,
      email: body.email,
      phone: body.phone,
      whatsapp: body.whatsapp || null,
      website: body.website || null,
      city: body.city || null,
      state: body.state || null,
      products: body.products || null,
      status: 'pending',
      source_site: 'hi',
    }).select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
