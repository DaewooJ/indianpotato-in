'use client';

import { useState, useEffect, useCallback } from 'react';

interface MandiRecord {
  state: string; state_hindi: string; district: string; market: string;
  market_hindi: string; commodity: string; variety: string; arrival_date: string;
  min_price: number; max_price: number; modal_price: number;
}

interface MandiResponse {
  updated_at: string; total: number;
  states: { name: string; name_hindi: string }[];
  records: MandiRecord[]; source: string; api_key_configured: boolean;
}

/* ── Client-side Hindi fallback maps ── */
const SH: Record<string, string> = {
  'Uttar Pradesh':'उत्तर प्रदेश','West Bengal':'पश्चिम बंगाल','Bihar':'बिहार',
  'Gujarat':'गुजरात','Madhya Pradesh':'मध्य प्रदेश','Punjab':'पंजाब',
  'Haryana':'हरियाणा','Rajasthan':'राजस्थान','Maharashtra':'महाराष्ट्र',
  'Karnataka':'कर्नाटक','Jharkhand':'झारखंड','Chhattisgarh':'छत्तीसगढ़',
  'Himachal Pradesh':'हिमाचल प्रदेश','Uttarakhand':'उत्तराखंड','Delhi':'दिल्ली',
  'NCT of Delhi':'दिल्ली','Assam':'असम','Odisha':'ओडिशा','Tamil Nadu':'तमिलनाडु',
  'Andhra Pradesh':'आंध्र प्रदेश','Telangana':'तेलंगाना','Kerala':'केरल',
  'Meghalaya':'मेघालय','Tripura':'त्रिपुरा','Nagaland':'नागालैंड',
  'Manipur':'मणिपुर','Mizoram':'मिज़ोरम','Sikkim':'सिक्किम',
  'Arunachal Pradesh':'अरुणाचल प्रदेश','Goa':'गोवा',
  'Jammu and Kashmir':'जम्मू और कश्मीर','Chandigarh':'चंडीगढ़',
};
const MH: Record<string, string> = {
  'Agra':'आगरा','Ahmedabad':'अहमदाबाद','Aligarh':'अलीगढ़','Ambala':'अंबाला',
  'Amritsar':'अमृतसर','Anand':'आणंद','Azadpur':'आज़ादपुर','Bangalore':'बेंगलुरु',
  'Bareilly':'बरेली','Bhavnagar':'भावनगर','Bhopal':'भोपाल','Bikaner':'बीकानेर',
  'Bulandshahr':'बुलंदशहर','Chennai':'चेन्नई','Deesa':'डीसा','Dehradun':'देहरादून',
  'Delhi':'दिल्ली','Etawah':'इटावा','Farrukhabad':'फ़र्रुख़ाबाद',
  'Firozabad':'फ़िरोज़ाबाद','Gandhidham':'गांधीधाम','Guwahati':'गुवाहाटी',
  'Gwalior':'ग्वालियर','Haldwani':'हल्द्वानी','Hanumangarh':'हनुमानगढ़',
  'Hathras':'हाथरस','Hooghly':'हुगली','Hyderabad':'हैदराबाद','Indore':'इंदौर',
  'Jaipur':'जयपुर','Jalandhar':'जालंधर','Jodhpur':'जोधपुर','Junagadh':'जूनागढ़',
  'Kanpur':'कानपुर','Karnal':'करनाल','Kolkata':'कोलकाता','Kota':'कोटा',
  'Lucknow':'लखनऊ','Ludhiana':'लुधियाना','Mainpuri':'मैनपुरी','Mathura':'मथुरा',
  'Meerut':'मेरठ','Mehsana':'मेहसाणा','Mumbai':'मुंबई','Muzaffarpur':'मुज़फ़्फ़रपुर',
  'Nagpur':'नागपुर','Nalanda':'नालंदा','Nashik':'नासिक','Patna':'पटना',
  'Pune':'पुणे','Raipur':'रायपुर','Rajkot':'राजकोट','Ranchi':'रांची',
  'Rishikesh':'ऋषिकेश','Sambhal':'संभल','Shimla':'शिमला','Surat':'सूरत',
  'Udaipur':'उदयपुर','Unnao':'उन्नाव','Vadodara':'वडोदरा','Varanasi':'वाराणसी',
  'Prayagraj':'प्रयागराज','Allahabad':'इलाहाबाद','Saharanpur':'सहारनपुर',
  'Moradabad':'मुरादाबाद','Gorakhpur':'गोरखपुर','Hisar':'हिसार','Rohtak':'रोहतक',
  'Sonipat':'सोनीपत','Panipat':'पानीपत','Bathinda':'बठिंडा','Patiala':'पटियाला',
  'Haridwar':'हरिद्वार','Rudrapur':'रुद्रपुर','Gaya':'गया','Siliguri':'सिलीगुड़ी',
  'Darbhanga':'दरभंगा','Bhagalpur':'भागलपुर','Burdwan':'बर्धमान','Malda':'मालदा',
  'Ujjain':'उज्जैन','Jabalpur':'जबलपुर','Ratlam':'रतलाम','Sagar':'सागर',
  'Aurangabad':'औरंगाबाद','Solapur':'सोलापुर','Kolhapur':'कोल्हापुर',
  'Coimbatore':'कोयंबटूर','Madurai':'मदुरई','Salem':'सेलम',
  'Bishnupur':'बिशनपुर','Maihar':'मैहर','Katni':'कटनी','Morena':'मुरैना',
  'Gharaunda':'घरौंडा','Narnaul':'नारनौल','Uklana':'उकलाना','Barwala':'बरवाला',
  'Punhana':'पुनहाना','Siwan':'सीवान','Sangriya':'संगरिया','Rawatsar':'रावतसर',
  'Bayana':'बयाना','Akluj':'अकलूज','Shimoga':'शिमोगा','Padra':'पादरा',
  'Khambhat':'खंभात','Dinanagar':'दीनानगर','Charra':'छर्रा','Bisoli':'बिसौली',
  'Jalalabad':'जलालाबाद','Hasanpur':'हसनपुर','Baxirhat':'बक्शीरहाट',
  'Dinhata':'दिनहाटा','Haldibari':'हल्दीबाड़ी','Khatra':'खात्रा',
  'Kalipur':'कालीपुर','Toofanganj':'तूफानगंज','Raipur Rai':'रायपुर राय',
  'PMY Chamba':'चंबा','Dharapuram':'धरापुरम','Chinnalapatti':'चिन्नलपट्टी',
  'Kancheepuram':'कांचीपुरम','Karur':'करूर','Sirsa':'सिरसा',
  'Sri Ganganagar':'श्रीगंगानगर','Ganganagar':'गंगानगर',
};

function hiState(r: MandiRecord): string {
  if (r.state_hindi && r.state_hindi !== r.state) return r.state_hindi;
  return SH[r.state] || r.state;
}
function hiMarket(r: MandiRecord): string {
  const raw = r.market_hindi || r.market || '';
  const cleaned = raw.replace(/\(.*?\)/g, '').replace(/apmc/gi, '').replace(/\s+/g, ' ').trim();
  // If already Hindi (contains Devanagari), return as-is
  if (/[\u0900-\u097F]/.test(cleaned)) return cleaned;
  return MH[cleaned] || cleaned;
}

export default function MandiPricesLive() {
  const [data, setData] = useState<MandiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeState, setActiveState] = useState<string>('सभी');
  const [showAll, setShowAll] = useState(false);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/mandi');
      if (!res.ok) throw new Error('Failed to fetch');
      const json: MandiResponse = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError('मंडी भाव लोड करने में समस्या हुई');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  // Build Hindi state list for filters
  const stateFilters = data
    ? ['सभी', ...data.states.map((s) => SH[s.name] || s.name_hindi || s.name)]
    : ['सभी'];

  const filteredRecords = data?.records.filter((r) => {
    if (activeState === 'सभी') return true;
    return hiState(r) === activeState;
  }) || [];

  const displayRecords = showAll ? filteredRecords : filteredRecords.slice(0, 12);

  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString('hi-IN', { day: 'numeric', month: 'short' }); }
    catch { return dateStr; }
  };
  const formatTime = (isoStr: string) => {
    try { return new Date(isoStr).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }); }
    catch { return ''; }
  };

  return (
    <section id="mandi-prices" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">आज का मंडी भाव</h2>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ background: 'rgba(5,66,13,0.06)', color: '#05420d' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#05420d' }} />
                दैनिक
              </span>
            </div>
            <p className="text-[13px] text-gray-400">प्रमुख मंडियों से आज के आलू भाव</p>
          </div>
          {data && (
            <div className="text-right text-[11px]">
              <span className="text-gray-400">अपडेट: {formatTime(data.updated_at)}</span>
              <span className="mx-1.5 text-gray-200">|</span>
              <span className="font-semibold" style={{ color: '#f97316' }}>{data.total} मंडियाँ</span>
            </div>
          )}
        </div>

        {/* State Filter Pills */}
        <div className="flex gap-1.5 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {(loading ? ['सभी'] : stateFilters.slice(0, 12)).map((state) => (
            <button
              key={state}
              onClick={() => { setActiveState(state); setShowAll(false); }}
              className="shrink-0 px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer"
              style={{
                background: activeState === state ? '#05420d' : '#fff',
                color: activeState === state ? '#fff' : '#6b7280',
                border: activeState === state ? '1.5px solid #05420d' : '1.5px solid #e8ece9',
                boxShadow: activeState === state ? '0 2px 8px rgba(5,66,13,0.15)' : 'none',
              }}
            >
              {state}
            </button>
          ))}
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="rounded-xl p-4 animate-pulse" style={{ border: '1px solid #e8ece9' }}>
                <div className="w-3/5 h-3.5 bg-gray-100 rounded mb-1.5" />
                <div className="w-2/5 h-2.5 bg-gray-50 rounded mb-4" />
                <div className="w-2/5 h-6 bg-gray-100 rounded mb-3" />
                <div className="flex gap-3 pt-3" style={{ borderTop: '1px solid #f5f5f5' }}>
                  <div className="flex-1"><div className="w-full h-2.5 bg-gray-50 rounded mb-1" /><div className="w-3/4 h-3 bg-gray-100 rounded" /></div>
                  <div className="flex-1"><div className="w-full h-2.5 bg-gray-50 rounded mb-1" /><div className="w-3/4 h-3 bg-gray-100 rounded" /></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-14">
            <p className="text-gray-400 text-sm mb-4">{error}</p>
            <button
              onClick={fetchPrices}
              className="px-5 py-2 rounded-full text-[13px] font-semibold text-white cursor-pointer transition-all hover:shadow-lg"
              style={{ background: '#f97316' }}
            >
              पुनः प्रयास करें
            </button>
          </div>
        )}

        {/* Mandi Cards */}
        {!loading && !error && (
          <>
            <p className="text-[11px] tracking-wide mb-4" style={{ color: '#b0b0b0' }}>
              {filteredRecords.length} मंडी{activeState !== 'सभी' ? ` — ${activeState}` : 'याँ'}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {displayRecords.map((record, idx) => (
                <div
                  key={`${record.state}-${record.market}-${idx}`}
                  className="group relative rounded-xl bg-white transition-all duration-200 hover:-translate-y-0.5 mandi-card"
                  style={{ border: '1px solid #e8ece9' }}
                >
                  {/* Hover accent */}
                  <div
                    className="absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: 'linear-gradient(90deg, #05420d, #f97316)' }}
                  />

                  <div className="px-4 pt-4 pb-3">
                    {/* Market + State */}
                    <h3 className="text-[13.5px] font-bold text-gray-900 leading-tight group-hover:text-[#05420d] transition-colors truncate">
                      {hiMarket(record)}
                    </h3>
                    <p className="text-[10.5px] text-gray-400 mt-0.5 truncate">{hiState(record)}</p>

                    {/* Modal Price */}
                    <div className="mt-3">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-gray-300">मॉडल भाव</span>
                      <div className="text-xl font-extrabold leading-none mt-0.5" style={{ color: '#f97316' }}>
                        ₹{record.modal_price.toLocaleString('hi-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Min / Max */}
                  <div className="flex mx-4 mb-3 pt-2.5" style={{ borderTop: '1px solid #f0f2f0' }}>
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-300 block leading-none">न्यूनतम</span>
                      <span className="text-[12.5px] font-bold text-gray-600 leading-none mt-1 block">₹{record.min_price.toLocaleString('hi-IN')}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] text-gray-300 block leading-none">अधिकतम</span>
                      <span className="text-[12.5px] font-bold text-gray-600 leading-none mt-1 block">₹{record.max_price.toLocaleString('hi-IN')}</span>
                    </div>
                    {record.arrival_date && (
                      <span className="text-[9px] text-gray-300 self-end leading-none">{formatDate(record.arrival_date)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show More / Less */}
            {filteredRecords.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold text-white cursor-pointer transition-all duration-200 hover:shadow-lg"
                  style={{ background: '#f97316', boxShadow: '0 3px 12px rgba(249,115,22,0.25)' }}
                >
                  {showAll ? (
                    'कम दिखाएँ'
                  ) : (
                    <>
                      सभी {filteredRecords.length} मंडी भाव देखें
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .mandi-card:hover { box-shadow: 0 6px 20px rgba(5,66,13,0.07) !important; }
      `}</style>
    </section>
  );
}
