import { createAdminClient } from '@/lib/supabase/admin'
import { slugify } from '@/lib/dir-utils'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('listing_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data: data || [] })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, action } = await req.json()

    if (!id || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ success: false, error: 'Invalid id or action' }, { status: 400 })
    }

    const supabase = createAdminClient()

    if (action === 'reject') {
      const { error } = await supabase
        .from('listing_submissions')
        .update({ status: 'rejected' })
        .eq('id', id)

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 })
      }

      return NextResponse.json({ success: true, action: 'rejected' })
    }

    // Approve: read submission, insert into companies, update submission status
    const { data: submission, error: fetchErr } = await supabase
      .from('listing_submissions')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchErr || !submission) {
      return NextResponse.json({ success: false, error: fetchErr?.message || 'Submission not found' }, { status: 400 })
    }

    // Look up category_id from slug
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', submission.category_slug)
      .single()

    // Generate unique slug
    let baseSlug = slugify(submission.company_name)
    let slug = baseSlug
    let counter = 1
    while (true) {
      const { data: existing } = await supabase
        .from('companies')
        .select('id')
        .eq('slug', slug)
        .single()
      if (!existing) break
      counter++
      slug = `${baseSlug}-${counter}`
    }

    // Insert into companies
    const companyData: Record<string, any> = {
      slug,
      name: submission.company_name,
      name_hi: submission.company_name_hi || null,
      description: submission.description || null,
      email: submission.email || null,
      phone: submission.phone || null,
      whatsapp: submission.whatsapp || null,
      website: submission.website || null,
      address_city: submission.city || null,
      address_state: submission.state || null,
      address_country: 'India',
      tier: 'free',
      active: true,
      status: 'approved',
      featured: false,
      verified: false,
      products: submission.products || [],
    }

    if (category?.id) {
      companyData.category_id = category.id
    }

    const { data: newCompany, error: insertErr } = await supabase
      .from('companies')
      .insert(companyData)
      .select()

    if (insertErr) {
      return NextResponse.json({ success: false, error: insertErr.message }, { status: 400 })
    }

    // Mark submission as approved
    await supabase
      .from('listing_submissions')
      .update({ status: 'approved' })
      .eq('id', id)

    return NextResponse.json({ success: true, action: 'approved', data: newCompany })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
