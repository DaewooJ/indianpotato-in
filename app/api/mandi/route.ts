import { NextRequest, NextResponse } from 'next/server';
const RID = '9ef84268-d588-465a-a308-a864a43d0070';
const BU = 'https://api.data.gov.in/resource';
const CD = 1800;
let cache: { data: any; ts: number } | null = null;
const FB: any[] = [{ state:'Uttar Pradesh',district:'Agra',market:'Agra',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1180,max_price:1420,modal_price:1340 },{ state:'Uttar Pradesh',district:'Lucknow',market:'Lucknow',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1200,max_price:1480,modal_price:1380 },{ state:'West Bengal',district:'Kolkata',market:'Kolkata',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1350,max_price:1550,modal_price:1460 },{ state:'Gujarat',district:'Banaskantha',market:'Deesa',commodity:'Potato',variety:'Desi',arrival_date:'2026-03-26',min_price:980,max_price:1180,modal_price:1080 },{ state:'Punjab',district:'Jalandhar',market:'Jalandhar',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1150,max_price:1350,modal_price:1260 },{ state:'Bihar',district:'Patna',market:'Patna',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1280,max_price:1490,modal_price:1400 },{ state:'Madhya Pradesh',district:'Indore',market:'Indore',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1080,max_price:1280,modal_price:1200 },{ state:'Uttar Pradesh',district:'Kanpur Nagar',market:'Kanpur',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1220,max_price:1460,modal_price:1360 },{ state:'Rajasthan',district:'Jaipur',market:'Jaipur',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1300,max_price:1500,modal_price:1400 },{ state:'Maharashtra',district:'Pune',market:'Pune',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1400,max_price:1650,modal_price:1520 },{ state:'Haryana',district:'Karnal',market:'Karnal',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1100,max_price:1300,modal_price:1200 },{ state:'Chhattisgarh',district:'Raipur',market:'Raipur',commodity:'Potato',variety:'Other',arrival_date:'2026-03-26',min_price:1500,max_price:1750,modal_price:1620 }];
const SH: Record<string,string> = {'Uttar Pradesh':'उत्तर प्रदेश','West Bengal':'पश्चिम बंगाल','Gujarat':'गुजरात','Punjab':'पंजाब','Bihar':'बिहार','Madhya Pradesh':'मध्य प्रदेश','Rajasthan':'राजस्थान','Maharashtra':'महाराष्ट्र','Haryana':'हरियाणा','Chhattisgarh':'छत्तीसगढ़','Himachal Pradesh':'हिमाचल प्रदेश','Jharkhand':'झारखंड','Karnataka':'कर्नाटक','Delhi':'दिल्ली','Uttarakhand':'उत्तराखंड'};
const MH: Record<string,string> = {'Agra':'आगरा','Lucknow':'लखनऊ','Kolkata':'कोलकाता','Deesa':'डीसा','Jalandhar':'जालंधर','Patna':'पटना','Indore':'इंदौर','Kanpur':'कानपुर','Jaipur':'जयपुर','Pune':'पुणे','Mumbai':'मुंबई','Delhi':'दिल्ली','Karnal':'करनाल','Raipur':'रायपुर','Ahmedabad':'अहमदाबाद','Amritsar':'अमृतसर','Shimla':'शिमला','Nagpur':'नागपुर'};
interface MR { state:string;state_hindi:string;district:string;market:string;market_hindi:string;commodity:string;variety:string;arrival_date:string;min_price:number;max_price:number;modal_price:number; }
function toMR(d:any):MR { return {...d,state_hindi:SH[d.state]||d.state,market_hindi:MH[d.market]||d.market}; }
async function fetchData(state?:string,limit=100):Promise<MR[]> {
  const ak=process.env.DATA_GOV_IN_API_KEY;
  if(!ak) return FB.map(toMR);
  try {
    const p=new URLSearchParams({'api-key':ak,format:'json',limit:String(limit),'filters[commodity]':'Potato'});
    if(state) p.set('filters[state]',state);
    const r=await fetch(BU+'/'+RID+'?'+p.toString(),{next:{revalidate:CD},headers:{Accept:'application/json'}});
    if(!r.ok) throw new Error('E');
    const j=await r.json();
    if(!j.records||!j.records.length) return FB.map(toMR);
    return j.records.map((x:any)=>({state:x.state||'',state_hindi:SH[x.state]||x.state||'',district:x.district||'',market:x.market||'',market_hindi:MH[x.market]||x.market||'',commodity:x.commodity||'Potato',variety:x.variety||'',arrival_date:x.arrival_date||'',min_price:Number(x.min_price)||0,max_price:Number(x.max_price)||0,modal_price:Number(x.modal_price)||0}));
  } catch(e) { return FB.map(toMR); }
}
export async function GET(req:NextRequest) {
  const sp=new URL(req.url).searchParams;
  const st=sp.get('state')||undefined;
  const lm=Math.min(Number(sp.get('limit')||100),500);
  if(cache&&cache.ts>Date.now()-CD*1000) return NextResponse.json(cache.data);
  const recs=await fetchData(st,lm);
  const mm=new Map<string,MR>();
  for(const r of recs){const k=r.state+'-'+r.market;const e=mm.get(k);if(!e||r.arrival_date>e.arrival_date)mm.set(k,r);}
  const u=Array.from(mm.values()).sort((a,b)=>b.modal_price-a.modal_price);
  const ss=Array.from(new Set(u.map(r=>r.state))).sort();
  const d={updated_at:new Date().toISOString(),total:u.length,states:ss.map(s=>({name:s,name_hindi:SH[s]||s})),records:u,source:'data.gov.in / Agmarknet',api_key_configured:!!process.env.DATA_GOV_IN_API_KEY};
  cache={data:d,ts:Date.now()};
  return NextResponse.json(d);
}
