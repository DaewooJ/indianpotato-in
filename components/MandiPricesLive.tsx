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
  const displayRecords = showAll ? filteredRecords : filteredRecords.slice(0, 8);
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
    <section id="mandi-prices" style={{ padding: '64px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', fontWeight: 700, color: '#111827', margin: 0 }}>आज का मंडी भाव</h2>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#f0fdf4', border: '1px solid #dcfce7', borderRadius: 4, padding: '3px 10px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#05420d', animation: 'pulse 2s infinite' }} />
                <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#05420d', letterSpacing: 1, textTransform: 'uppercase' as const }}>LIVE</span>
              </span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: 0 }}>
              प्रमुख मंडियों से आलू के ताज़ा थोक भाव (₹ प्रति क्विंटल)
              {data && !data.api_key_configured && <span style={{ color: '#ea580c', fontSize: '0.75rem', marginLeft: 8 }}>⚠ डेमो डेटा</span>}
            </p>
          </div>
          {data && (
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'right' as const }}>
              <div>अपडेट: {formatTime(data.updated_at)}</div>
              <div>{data.total} मंडियाँ</div>
            </div>
          )}
        </div>

        <div className="scrollbar-hide" style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto' as const, paddingBottom: 4 }}>
          {(loading ? ['सभी'] : stateFilters.slice(0, 10)).map((state) => (
            <button key={state} onClick={() => { setActiveState(state); setShowAll(false); }}
              style={{
                padding: '7px 16px', borderRadius: 8, fontSize: '0.82rem', fontWeight: 500,
                cursor: 'pointer', whiteSpace: 'nowrap' as const, transition: 'all 0.2s',
                background: activeState === state ? '#05420d' : '#fff',
                color: activeState === state ? '#fff' : '#6b7280',
                border: activeState === state ? '1px solid #05420d' : '1px solid #e5e7eb',
              }}>
              {state}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb', animation: 'shimmer 1.5s infinite' }}>
                <div style={{ width: '60%', height: 18, background: '#f3f4f6', borderRadius: 4, marginBottom: 8 }} />
                <div style={{ width: '40%', height: 14, background: '#f3f4f6', borderRadius: 4, marginBottom: 16 }} />
                <div style={{ width: '50%', height: 28, background: '#f3f4f6', borderRadius: 4 }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center' as const, padding: 40 }}>
            <p style={{ fontSize: '0.95rem', color: '#6b7280', marginBottom: 12 }}>{error}</p>
            <button onClick={fetchPrices} style={{ padding: '10px 24px', background: '#ed6442', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>पुनः प्रयास करें</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {displayRecords.map((record, idx) => (
                <div key={`${record.state}-${record.market}-${idx}`}
                  style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e5e7eb', transition: 'box-shadow 0.25s' }}
                  className="mandi-card">
                  <div style={{ marginBottom: 14 }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#111827', margin: 0 }}>{cleanMarket(record.market_hindi || record.market)}</h3>
                    <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0' }}>{record.state_hindi}</p>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: '0.62rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>मॉडल भाव</span>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#05420d' }}>₹{record.modal_price.toLocaleString('hi-IN')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 16, borderTop: '1px solid #f3f4f6', paddingTop: 12 }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.62rem', color: '#9ca3af' }}>न्यूनतम</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#374151' }}>₹{record.min_price.toLocaleString('hi-IN')}</div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: '0.62rem', color: '#9ca3af' }}>अधिकतम</span>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#374151' }}>₹{record.max_price.toLocaleString('hi-IN')}</div>
                    </div>
                  </div>
                  {record.arrival_date && <div style={{ marginTop: 10, fontSize: '0.7rem', color: '#d1d5db' }}>{formatDate(record.arrival_date)}</div>}
                </div>
              ))}
            </div>
            {filteredRecords.length > 8 && (
              <div style={{ textAlign: 'center' as const, marginTop: 28 }}>
                <button onClick={() => setShowAll(!showAll)}
                  style={{ padding: '12px 28px', background: '#ed6442', color: '#fff', border: 'none', borderRadius: 10, fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}>
                  {showAll ? 'कम दिखाएँ' : `सभी ${filteredRecords.length} मंडी भाव देखें →`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes shimmer { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
        .mandi-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
      `}</style>
    </section>
  );
}
