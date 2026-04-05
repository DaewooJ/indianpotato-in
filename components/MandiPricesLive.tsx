'use client';

import { useState, useEffect, useCallback } from 'react';

interface MandiRecord {
  state: string; district: string; market: string;
  commodity: string; variety: string; arrival_date: string;
  min_price: number; max_price: number; modal_price: number;
}

interface MandiResponse {
  updated_at: string; total: number;
  states: string[];
  records: MandiRecord[]; source: string;
}

export default function MandiPricesLive() {
  const [data, setData] = useState<MandiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeState, setActiveState] = useState('सभी');
  const [showAll, setShowAll] = useState(false);

  const fetchPrices = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/mandi');
      if (!res.ok) throw new Error('Failed');
      const json: MandiResponse = await res.json();
      setData(json);
      setError(null);
    } catch {
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

  const stateFilters = ['सभी', ...(data?.states || [])];

  const filteredRecords = data?.records.filter((r) =>
    activeState === 'सभी' ? true : r.state === activeState
  ) || [];

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

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">आज का मंडी भाव</h2>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full"
                style={{ background: 'rgba(5,66,13,0.06)', color: '#05420d', fontSize: 10, fontWeight: 600 }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#05420d' }} />
                दैनिक
              </span>
            </div>
            <p className="text-[13px] text-gray-400">प्रमुख मंडियों से आज के आलू भाव</p>
          </div>
          {data && (
            <div className="text-[11px] text-gray-400">
              अपडेट: {formatTime(data.updated_at)} <span className="mx-1 text-gray-200">|</span>
              <span className="font-semibold" style={{ color: '#f97316' }}>{data.total} मंडियाँ</span>
            </div>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {(loading ? ['सभी'] : stateFilters.slice(0, 12)).map((s) => (
            <button
              key={s}
              onClick={() => { setActiveState(s); setShowAll(false); }}
              className="shrink-0 rounded-full text-xs font-medium cursor-pointer transition-all duration-200"
              style={{
                padding: '6px 14px',
                background: activeState === s ? '#05420d' : '#fff',
                color: activeState === s ? '#fff' : '#6b7280',
                border: activeState === s ? '1.5px solid #05420d' : '1.5px solid #d1d5db',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 border-t-[3px] border-t-[#ed6442] p-4 animate-pulse">
                <div className="w-3/5 h-3.5 bg-gray-100 rounded mb-1.5" />
                <div className="w-2/5 h-2.5 bg-gray-50 rounded mb-4" />
                <div className="w-1/4 h-2 bg-gray-50 rounded mb-1" />
                <div className="w-2/5 h-5 bg-gray-100 rounded mb-3" />
                <div className="w-4/5 h-2.5 bg-gray-50 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-14">
            <p className="text-gray-400 text-sm mb-4">{error}</p>
            <button
              onClick={fetchPrices}
              className="px-5 py-2 rounded-full text-[13px] font-semibold text-white cursor-pointer"
              style={{ background: '#f97316' }}
            >
              पुनः प्रयास करें
            </button>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <>
            <p className="text-[11px] mb-4" style={{ color: '#b0b0b0' }}>
              {filteredRecords.length} मंडी{activeState !== 'सभी' ? ` — ${activeState}` : 'याँ'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayRecords.map((r, idx) => {
                const style = idx < 5 ? idx + 1 : 1
                const price = `₹${r.modal_price.toLocaleString('hi-IN')}`
                const min = `₹${r.min_price.toLocaleString('hi-IN')}`
                const max = `₹${r.max_price.toLocaleString('hi-IN')}`
                const date = r.arrival_date ? formatDate(r.arrival_date) : ''
                const badge = idx < 5 ? (
                  <span className="absolute top-2 right-2 text-[8px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-400">स्टाइल {style}</span>
                ) : null

                /* ── STYLE 1: Minimal Clean ── */
                if (style === 1) return (
                  <div key={`${r.state}-${r.market}-${idx}`} className="relative rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 mandi-card">
                    {badge}
                    <h3 className="text-sm font-bold text-gray-900 truncate">{r.market}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{r.state}</p>
                    <div className="mt-3">
                      <span className="text-[10px] text-gray-400">मॉडल भाव</span>
                      <div className="text-xl font-bold" style={{ color: '#05420d' }}>{price}</div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      न्यूनतम <span className="font-semibold text-gray-600">{min}</span>
                      <span className="mx-1 text-gray-300">·</span>
                      अधिकतम <span className="font-semibold text-gray-600">{max}</span>
                    </div>
                    {date && <div className="text-[10px] text-gray-400 text-right mt-2">{date}</div>}
                  </div>
                )

                /* ── STYLE 2: Left Green Border ── */
                if (style === 2) return (
                  <div key={`${r.state}-${r.market}-${idx}`} className="relative rounded-xl bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 mandi-card" style={{ border: '1px solid #e5e7eb', borderLeft: '4px solid #05420d' }}>
                    {badge}
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-gray-900 truncate">{r.market} <span className="text-[10px] font-normal text-gray-400">· {r.state}</span></h3>
                      </div>
                      <div className="text-xl font-bold shrink-0" style={{ color: '#05420d' }}>{price}</div>
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                      <div className="text-xs text-gray-500">
                        न्यूनतम <span className="font-semibold text-gray-600">{min}</span>
                        <span className="mx-1 text-gray-300">·</span>
                        अधिकतम <span className="font-semibold text-gray-600">{max}</span>
                      </div>
                      {date && <span className="text-[10px] text-gray-400 shrink-0">{date}</span>}
                    </div>
                  </div>
                )

                /* ── STYLE 3: Green Badge Header ── */
                if (style === 3) return (
                  <div key={`${r.state}-${r.market}-${idx}`} className="relative rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:-translate-y-0.5 mandi-card">
                    {badge}
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2" style={{ background: '#05420d' }}>{r.market}</div>
                    <p className="text-xs text-gray-500">{r.state}</p>
                    <div className="text-center mt-3">
                      <span className="text-[10px] text-gray-400">मॉडल भाव</span>
                      <div className="text-2xl font-bold" style={{ color: '#ed6442' }}>{price}</div>
                    </div>
                    <div className="text-xs text-gray-500 text-center mt-2">
                      न्यूनतम <span className="font-semibold text-gray-600">{min}</span>
                      <span className="mx-1 text-gray-300">·</span>
                      अधिकतम <span className="font-semibold text-gray-600">{max}</span>
                    </div>
                    {date && <div className="text-[10px] text-gray-400 text-right mt-2">{date}</div>}
                  </div>
                )

                /* ── STYLE 4: Split Card ── */
                if (style === 4) return (
                  <div key={`${r.state}-${r.market}-${idx}`} className="relative rounded-xl border border-gray-200 bg-white overflow-hidden flex transition-all duration-200 hover:-translate-y-0.5 mandi-card">
                    {badge}
                    <div className="flex-[3] p-4">
                      <h3 className="text-sm font-bold text-gray-900 truncate">{r.market}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{r.state}</p>
                      <div className="text-xs text-gray-500 mt-3">
                        न्यूनतम <span className="font-semibold text-gray-600">{min}</span>
                        <span className="mx-1 text-gray-300">·</span>
                        अधिकतम <span className="font-semibold text-gray-600">{max}</span>
                      </div>
                      {date && <div className="text-[10px] text-gray-400 mt-1.5">{date}</div>}
                    </div>
                    <div className="flex-[2] flex flex-col items-center justify-center p-3" style={{ background: '#f0fdf4', borderLeft: '1px solid #dcfce7' }}>
                      <span className="text-[9px] text-gray-400">मॉडल भाव</span>
                      <div className="text-xl font-bold mt-0.5" style={{ color: '#05420d' }}>{price}</div>
                    </div>
                  </div>
                )

                /* ── STYLE 5: Compact Tag Style ── */
                return (
                  <div key={`${r.state}-${r.market}-${idx}`} className="relative rounded-xl bg-white p-3 transition-all duration-200 hover:-translate-y-0.5 mandi-card" style={{ border: '1px solid #e5e7eb', borderBottom: '2px solid #ed6442' }}>
                    {badge}
                    <div className="text-sm truncate">
                      <span className="font-bold text-gray-900">{r.market}</span>
                      <span className="text-xs text-gray-400 ml-1">({r.state})</span>
                    </div>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-xl font-bold" style={{ color: '#05420d' }}>{price}</span>
                      <span className="text-[11px] text-gray-400">↕ {min} – {max}</span>
                    </div>
                    {date && <div className="text-[10px] text-gray-400 text-right mt-1.5">{date}</div>}
                  </div>
                )
              })}
            </div>

            {/* Show more */}
            {filteredRecords.length > 12 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold text-white cursor-pointer transition-all hover:shadow-lg"
                  style={{ background: '#f97316', boxShadow: '0 3px 12px rgba(249,115,22,0.25)' }}
                >
                  {showAll ? 'कम दिखाएँ' : (
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
        .mandi-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important; }
      `}</style>
    </section>
  );
}
