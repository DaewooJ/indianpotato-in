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

  const filteredRecords = data?.records.filter((r) => activeState === 'सभी' ? true : r.state_hindi === activeState) || [];
  const displayRecords = showAll ? filteredRecords : filteredRecords.slice(0, 12);
  const stateFilters = ['सभी', ...(data?.states.map((s) => s.name_hindi) || [])];

  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return dateStr; }
  };
  const formatTime = (isoStr: string) => {
    try { return new Date(isoStr).toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }); }
    catch { return ''; }
  };

  const cleanMarket = (name: string) => {
    return name.replace(/\(.*?\)/g, '').replace(/apmc/gi, '').replace(/\s+/g, ' ').trim();
  };

  return (
    <section id="mandi-prices" className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">आज का मंडी भाव</h2>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
                style={{ background: 'rgba(5,66,13,0.06)', color: '#05420d' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#05420d' }} />
                दैनिक
              </span>
            </div>
            <p className="text-sm text-gray-400">
              देश भर की प्रमुख मंडियों से आज के आलू भाव
            </p>
          </div>
          {data && (
            <div className="text-right">
              <div className="text-xs text-gray-400">अपडेट: {formatTime(data.updated_at)}</div>
              <div className="text-xs font-medium" style={{ color: '#f97316' }}>{data.total} मंडियाँ</div>
            </div>
          )}
        </div>

        {/* State Filter Pills */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          {(loading ? ['सभी'] : stateFilters.slice(0, 12)).map((state) => (
            <button
              key={state}
              onClick={() => { setActiveState(state); setShowAll(false); }}
              className="shrink-0 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl p-6 animate-pulse" style={{ border: '1px solid #e8ece9' }}>
                <div className="w-3/5 h-4 bg-gray-100 rounded mb-2" />
                <div className="w-2/5 h-3 bg-gray-100 rounded mb-5" />
                <div className="w-1/3 h-2 bg-gray-100 rounded mb-1.5" />
                <div className="w-2/5 h-7 bg-gray-100 rounded mb-5" />
                <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid #f3f4f6' }}>
                  <div className="flex-1"><div className="w-full h-3 bg-gray-100 rounded mb-1" /><div className="w-3/4 h-4 bg-gray-100 rounded" /></div>
                  <div className="flex-1"><div className="w-full h-3 bg-gray-100 rounded mb-1" /><div className="w-3/4 h-4 bg-gray-100 rounded" /></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(249,115,22,0.08)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            </div>
            <p className="text-gray-500 mb-5">{error}</p>
            <button
              onClick={fetchPrices}
              className="px-6 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-all hover:shadow-lg"
              style={{ background: '#f97316', boxShadow: '0 2px 8px rgba(249,115,22,0.25)' }}
            >
              पुनः प्रयास करें
            </button>
          </div>
        )}

        {/* Mandi Cards */}
        {!loading && !error && (
          <>
            {/* Count */}
            <p className="text-xs tracking-wide mb-5" style={{ color: '#9ca3af' }}>
              {filteredRecords.length} मंडी{activeState !== 'सभी' ? ` — ${activeState}` : 'याँ'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayRecords.map((record, idx) => (
                <div
                  key={`${record.state}-${record.market}-${idx}`}
                  className="group relative rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 mandi-card"
                  style={{ border: '1px solid #e8ece9', boxShadow: '0 1px 3px rgba(5,66,13,0.04)' }}
                >
                  {/* Top accent on hover */}
                  <div
                    className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #05420d, #f97316)' }}
                  />

                  {/* Market Name + State */}
                  <div className="mb-4">
                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug group-hover:text-[#05420d] transition-colors">
                      {cleanMarket(record.market_hindi || record.market)}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{record.state_hindi}</p>
                  </div>

                  {/* Modal Price */}
                  <div className="mb-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#9ca3af' }}>मॉडल भाव</span>
                    <div className="text-2xl font-extrabold mt-0.5" style={{ color: '#f97316' }}>
                      ₹{record.modal_price.toLocaleString('hi-IN')}
                    </div>
                  </div>

                  {/* Min / Max Row */}
                  <div className="flex gap-4 pt-4" style={{ borderTop: '1px solid #f0f2f0' }}>
                    <div className="flex-1">
                      <span className="text-[10px] text-gray-400 block">न्यूनतम</span>
                      <span className="text-sm font-bold text-gray-700">₹{record.min_price.toLocaleString('hi-IN')}</span>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] text-gray-400 block">अधिकतम</span>
                      <span className="text-sm font-bold text-gray-700">₹{record.max_price.toLocaleString('hi-IN')}</span>
                    </div>
                  </div>

                  {/* Date */}
                  {record.arrival_date && (
                    <div className="mt-3 text-[11px] text-gray-300">{formatDate(record.arrival_date)}</div>
                  )}
                </div>
              ))}
            </div>

            {/* Show More / Less */}
            {filteredRecords.length > 12 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-all duration-200 hover:shadow-xl"
                  style={{ background: '#f97316', boxShadow: '0 4px 14px rgba(249,115,22,0.3)' }}
                >
                  {showAll ? (
                    'कम दिखाएँ'
                  ) : (
                    <>
                      सभी {filteredRecords.length} मंडी भाव देखें
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .mandi-card:hover { box-shadow: 0 8px 30px rgba(5,66,13,0.08) !important; }
      `}</style>
    </section>
  );
}
