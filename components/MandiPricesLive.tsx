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
              <div key={i} className="rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                <div className="h-[42px]" style={{ background: '#05420d' }} />
                <div className="p-3">
                  <div className="w-1/3 h-2 bg-gray-100 rounded mb-1.5" />
                  <div className="w-2/5 h-5 bg-gray-100 rounded mb-3" />
                  <div className="w-full h-2.5 bg-gray-50 rounded" />
                </div>
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
              {displayRecords.map((r, idx) => (
                <div
                  key={`${r.state}-${r.market}-${idx}`}
                  className="rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 mandi-card"
                >
                  {/* Green header */}
                  <div className="px-3.5 py-2.5" style={{ background: '#05420d' }}>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-[13.5px] font-bold text-white leading-tight truncate">
                        {r.market}
                      </h3>
                      <span className="text-[10px] text-white/60 shrink-0 font-medium">{r.state}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="px-3.5 pt-3 pb-2.5">
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-gray-300">मॉडल भाव</span>
                    <div className="text-[22px] font-extrabold leading-none mt-0.5" style={{ color: '#ed6442' }}>
                      ₹{r.modal_price.toLocaleString('hi-IN')}
                    </div>

                    <div className="text-[11px] text-gray-400 mt-2.5">
                      न्यूनतम <span className="font-semibold text-gray-600">₹{r.min_price.toLocaleString('hi-IN')}</span>
                      <span className="mx-1.5 text-gray-200">·</span>
                      अधिकतम <span className="font-semibold text-gray-600">₹{r.max_price.toLocaleString('hi-IN')}</span>
                    </div>
                  </div>

                  {/* Date footer */}
                  {r.arrival_date && (
                    <div className="px-3.5 pb-2.5">
                      <div className="pt-2 border-t border-gray-100 text-[9px] text-gray-300 text-right">
                        {formatDate(r.arrival_date)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
