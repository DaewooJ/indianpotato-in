import { createClient } from '@supabase/supabase-js'

// Use anon key for public read-only queries (no auth needed)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export interface DbCategory {
  id: string
  slug: string
  name_en: string
  name_hi: string
  emoji: string | null
  description_en: string | null
  description_hi: string | null
  display_order: number
  company_count: number
}

export interface DbCompany {
  id: string
  slug: string
  category_id: string
  name: string
  name_hi: string | null
  description: string | null
  description_hi: string | null
  website: string | null
  email: string | null
  phone: string | null
  whatsapp: string | null
  address_street: string | null
  address_city: string | null
  address_district: string | null
  address_state: string | null
  address_pin: string | null
  tier: string
  featured: boolean
  verified: boolean
  active: boolean
  status: string
  products: string[] | null
  logo_url: string | null
  categories?: {
    slug: string
    name_en: string
    name_hi: string
    emoji: string | null
  }
}

export async function getCategoriesWithCounts(): Promise<DbCategory[]> {
  const supabase = getSupabase()

  // First get categories
  const { data: categories, error } = await supabase
    .from('categories')
    .select('id, slug, name_en, name_hi, emoji, description_en, description_hi, display_order')
    .order('display_order')

  if (error || !categories) return []

  // Get counts per category
  const counts: Record<string, number> = {}
  for (const cat of categories) {
    const { count } = await supabase
      .from('companies')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', cat.id)
      .eq('active', true)
      .eq('status', 'approved')
    counts[cat.id] = count ?? 0
  }

  return categories.map((cat) => ({
    ...cat,
    company_count: counts[cat.id] || 0,
  }))
}

export async function getCompaniesByCategory(categorySlug: string, options?: { query?: string; state?: string }) {
  const supabase = getSupabase()

  const { data: category } = await supabase
    .from('categories')
    .select('id, slug, name_en, name_hi, emoji, description_en, description_hi')
    .eq('slug', categorySlug)
    .single()

  if (!category) return { category: null, companies: [] as DbCompany[] }

  let q = supabase
    .from('companies')
    .select('*')
    .eq('category_id', category.id)
    .eq('active', true)
    .eq('status', 'approved')

  if (options?.state) {
    q = q.eq('address_state', options.state)
  }
  if (options?.query) {
    q = q.or(`name.ilike.%${options.query}%,name_hi.ilike.%${options.query}%,description.ilike.%${options.query}%`)
  }

  // Order: featured first, then by tier priority, then name
  q = q.order('featured', { ascending: false }).order('name')

  const { data: companies } = await q

  return { category, companies: (companies || []) as DbCompany[] }
}

export async function getCompanyBySlug(slug: string): Promise<DbCompany | null> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('companies')
    .select('*, categories(slug, name_en, name_hi, emoji)')
    .eq('slug', slug)
    .eq('active', true)
    .eq('status', 'approved')
    .single()
  return data as DbCompany | null
}

export async function getRelatedCompanies(categoryId: string, excludeSlug: string): Promise<DbCompany[]> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('companies')
    .select('slug, name, name_hi, description, address_city, address_state, tier, featured, verified')
    .eq('category_id', categoryId)
    .eq('active', true)
    .eq('status', 'approved')
    .neq('slug', excludeSlug)
    .order('featured', { ascending: false })
    .limit(4)
  return (data || []) as DbCompany[]
}

export async function getTotalCompanyCount(): Promise<number> {
  const supabase = getSupabase()
  const { count } = await supabase
    .from('companies')
    .select('*', { count: 'exact', head: true })
    .eq('active', true)
    .eq('status', 'approved')
  return count ?? 0
}
