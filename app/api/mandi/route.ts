import { NextRequest, NextResponse } from 'next/server';
import { translateState, translateMarket } from '@/lib/mandi-translations';

const RID = '9ef84268-d588-465a-a308-a864a43d0070';
const BU = 'https://api.data.gov.in/resource';
const CD = 1800;
let cache: { data: any; ts: number } | null = null;

const FB: any[] = [
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
];

// Internal record — keeps English state_en for sorting/dedup
interface IR {
  state_en: string; state: string; district: string; market: string;
  commodity: string; variety: string; arrival_date: string;
  min_price: number; max_price: number; modal_price: number;
}

function parseRecord(d: any): IR {
  return {
    state_en: d.state || '',
    state: translateState(d.state || ''),
    district: d.district || '',
    market: translateMarket(d.market || ''),
    commodity: d.commodity || 'Potato',
    variety: d.variety || '',
    arrival_date: d.arrival_date || '',
    min_price: Number(d.min_price) || 0,
    max_price: Number(d.max_price) || 0,
    modal_price: Number(d.modal_price) || 0,
  };
}

async function fetchData(state?: string, limit = 100): Promise<IR[]> {
  const ak = process.env.DATA_GOV_IN_API_KEY;
  if (!ak) return FB.map(parseRecord);
  try {
    const p = new URLSearchParams({
      'api-key': ak, format: 'json', limit: String(limit),
      'filters[commodity]': 'Potato',
    });
    if (state) p.set('filters[state]', state);
    const r = await fetch(BU + '/' + RID + '?' + p.toString(), {
      next: { revalidate: CD }, headers: { Accept: 'application/json' },
    });
    if (!r.ok) throw new Error('E');
    const j = await r.json();
    if (!j.records || !j.records.length) return FB.map(parseRecord);
    return j.records.map(parseRecord);
  } catch (e) {
    return FB.map(parseRecord);
  }
}

// Priority sort order (English names for internal matching)
const PS = ['Gujarat', 'Punjab', 'Uttar Pradesh', 'West Bengal', 'Madhya Pradesh', 'Bihar', 'Haryana', 'Rajasthan', 'Maharashtra', 'Chhattisgarh', 'Uttarakhand', 'Himachal Pradesh', 'Karnataka', 'Delhi'];

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const st = sp.get('state') || undefined;
  const lm = Math.min(Number(sp.get('limit') || 100), 500);
  if (cache && cache.ts > Date.now() - CD * 1000) return NextResponse.json(cache.data);

  const recs = await fetchData(st, lm);

  // Dedup: keep latest record per state+market
  const mm = new Map<string, IR>();
  for (const r of recs) {
    const k = r.state_en + '-' + r.market;
    const e = mm.get(k);
    if (!e || r.arrival_date > e.arrival_date) mm.set(k, r);
  }

  // Sort by priority state, then by price desc
  const sorted = Array.from(mm.values()).sort((a, b) => {
    const pa = PS.indexOf(a.state_en); const pb = PS.indexOf(b.state_en);
    const ia = pa >= 0 ? pa : 999; const ib = pb >= 0 ? pb : 999;
    if (ia !== ib) return ia - ib;
    return b.modal_price - a.modal_price;
  });

  // Build unique Hindi state list for filter pills
  const stateOrder = Array.from(new Set(sorted.map(r => r.state_en))).sort((a, b) => {
    const pa = PS.indexOf(a); const pb = PS.indexOf(b);
    const ia = pa >= 0 ? pa : 999; const ib = pb >= 0 ? pb : 999;
    return ia - ib;
  });
  const states = stateOrder.map(s => translateState(s));

  // Final response records — Hindi only, drop state_en
  const records = sorted.map(({ state_en, ...rest }) => rest);

  const d = {
    updated_at: new Date().toISOString(),
    total: records.length,
    states,
    records,
    source: 'Indian Potato Team',
  };
  cache = { data: d, ts: Date.now() };
  return NextResponse.json(d, {
    headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600' },
  });
}
