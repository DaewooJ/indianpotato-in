import { NextRequest, NextResponse } from 'next/server'
import { translateState, translateMarket } from '@/lib/mandi-translations'

const RID = '9ef84268-d588-465a-a308-a864a43d0070'
const BU = 'https://api.data.gov.in/resource'
const CACHE_TTL = 1800 * 1000 // 30 min in ms

// Cache stores ALREADY-TRANSLATED data
let cache: { data: any; ts: number } | null = null

// Build version — changes on every deploy, busts stale cache
const BUILD_ID = Date.now().toString()

const FALLBACK = [
  { state:'Uttar Pradesh',district:'Agra',market:'Agra',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1180,max_price:1420,modal_price:1340 },
  { state:'Uttar Pradesh',district:'Lucknow',market:'Lucknow',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1200,max_price:1480,modal_price:1380 },
  { state:'West Bengal',district:'Kolkata',market:'Kolkata',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1350,max_price:1550,modal_price:1460 },
  { state:'Gujarat',district:'Banaskantha',market:'Deesa',commodity:'Potato',variety:'Desi',arrival_date:'2026-03-26',min_price:980,max_price:1180,modal_price:1080 },
  { state:'Punjab',district:'Jalandhar',market:'Jalandhar',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1150,max_price:1350,modal_price:1260 },
  { state:'Bihar',district:'Patna',market:'Patna',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1280,max_price:1490,modal_price:1400 },
  { state:'Madhya Pradesh',district:'Indore',market:'Indore',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1080,max_price:1280,modal_price:1200 },
  { state:'Uttar Pradesh',district:'Kanpur Nagar',market:'Kanpur',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1220,max_price:1460,modal_price:1360 },
  { state:'Rajasthan',district:'Jaipur',market:'Jaipur',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1300,max_price:1500,modal_price:1400 },
  { state:'Maharashtra',district:'Pune',market:'Pune',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1400,max_price:1650,modal_price:1520 },
  { state:'Haryana',district:'Karnal',market:'Karnal',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1100,max_price:1300,modal_price:1200 },
  { state:'Chhattisgarh',district:'Raipur',market:'Raipur',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1500,max_price:1750,modal_price:1620 },
]

// Priority sort order
const PRIORITY_STATES = ['Gujarat','Punjab','Uttar Pradesh','West Bengal','Madhya Pradesh','Bihar','Haryana','Rajasthan','Maharashtra','Chhattisgarh','Uttarakhand','Himachal Pradesh','Karnataka','Delhi']

function statePriority(state: string): number {
  const idx = PRIORITY_STATES.indexOf(state)
  return idx >= 0 ? idx : 999
}

async function fetchRawRecords(state?: string, limit = 100): Promise<any[]> {
  const apiKey = process.env.DATA_GOV_IN_API_KEY
  if (!apiKey) return FALLBACK

  try {
    const params = new URLSearchParams({
      'api-key': apiKey, format: 'json', limit: String(limit),
      'filters[commodity]': 'Potato',
    })
    if (state) params.set('filters[state]', state)

    const res = await fetch(`${BU}/${RID}?${params}`, {
      next: { revalidate: 1800 },
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) return FALLBACK

    const json = await res.json()
    return json.records?.length ? json.records : FALLBACK
  } catch {
    return FALLBACK
  }
}

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams
  const stateFilter = sp.get('state') || undefined
  const limit = Math.min(Number(sp.get('limit') || 100), 500)

  // Serve from cache if fresh
  if (cache && cache.ts > Date.now() - CACHE_TTL) {
    return NextResponse.json(cache.data, {
      headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
    })
  }

  // 1. Fetch raw English data from API
  const rawRecords = await fetchRawRecords(stateFilter, limit)

  // 2. Normalize to simple objects (ALL ENGLISH at this stage)
  const normalized = rawRecords.map((r: any) => ({
    state: (r.state || '').trim(),
    district: (r.district || '').trim(),
    market: (r.market || '').trim(),
    variety: (r.variety || '').trim(),
    arrival_date: r.arrival_date || '',
    min_price: Number(r.min_price) || 0,
    max_price: Number(r.max_price) || 0,
    modal_price: Number(r.modal_price) || 0,
  }))

  // 3. Dedup: keep latest per state+market (ENGLISH keys)
  const deduped = new Map<string, typeof normalized[0]>()
  for (const r of normalized) {
    const key = `${r.state}|${r.market}`
    const existing = deduped.get(key)
    if (!existing || r.arrival_date > existing.arrival_date) {
      deduped.set(key, r)
    }
  }

  // 4. Sort by priority state, then price desc (ENGLISH sorting)
  const sorted = Array.from(deduped.values()).sort((a, b) => {
    const pa = statePriority(a.state)
    const pb = statePriority(b.state)
    if (pa !== pb) return pa - pb
    return b.modal_price - a.modal_price
  })

  // 5. Build unique English state list, sorted
  const uniqueStates = Array.from(new Set(sorted.map(r => r.state)))
    .sort((a, b) => statePriority(a) - statePriority(b))

  // 6. === TRANSLATE EVERYTHING TO HINDI — FINAL STEP ===
  const unmapped: string[] = []
  const hindiRecords = sorted.map(r => {
    const translatedMarket = translateMarket(r.market)
    // If translation returned the same Latin text, it's unmapped
    if (translatedMarket === r.market || !/[\u0900-\u097F]/.test(translatedMarket)) {
      unmapped.push(r.market)
    }
    return {
      state: translateState(r.state),
      market: translatedMarket,
      district: r.district,
      variety: r.variety,
      arrival_date: r.arrival_date,
      min_price: r.min_price,
      max_price: r.max_price,
      modal_price: r.modal_price,
    }
  })
  if (unmapped.length > 0) {
    console.log('[mandi] Untranslated markets:', [...new Set(unmapped)].join(', '))
  }

  const hindiStates = uniqueStates.map(s => translateState(s))

  const responseData = {
    updated_at: new Date().toISOString(),
    total: hindiRecords.length,
    states: hindiStates,
    records: hindiRecords,
    source: 'Indian Potato Team',
    build: BUILD_ID,
  }

  // Cache the translated response
  cache = { data: responseData, ts: Date.now() }

  return NextResponse.json(responseData, {
    headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
  })
}
