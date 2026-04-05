import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('companies')
      .select('id, name, slug, tier, address_state, view_count, whatsapp_clicks, active, status, created_at, categories(name_en, name_hi)')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    const companies = (data || []).map((c: any) => ({
      ...c,
      category_name: c.categories?.name_hi || c.categories?.name_en || '—',
      categories: undefined,
    }))

    return NextResponse.json({ success: true, data: companies })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, updates } = await req.json()

    if (!id || !updates) {
      return NextResponse.json({ success: false, error: 'Missing id or updates' }, { status: 400 })
    }

    const allowed = ['tier', 'active', 'status', 'featured', 'verified']
    const filtered: Record<string, any> = {}
    for (const key of allowed) {
      if (key in updates) filtered[key] = updates[key]
    }

    if (Object.keys(filtered).length === 0) {
      return NextResponse.json({ success: false, error: 'No valid fields to update' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('companies')
      .update(filtered)
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
