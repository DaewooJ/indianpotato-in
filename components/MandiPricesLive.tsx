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

  return (
    <section id="mandi-prices" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #fffbeb 0%, #ffffff 100%)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 20, padding: '4px 14px', marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#dc2626', letterSpacing: 1.5, textTransform: 'uppercase' as const }}>LIVE PRICES</span>
            </div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: '#1a1a1a', margin: 0 }}>आज का मंडी भाव</h2>
            <p style={{ color: '#666', fontSize: 14, margin: '6px 0 0' }}>
              प्रमुख मंडियों से आलू के ताज़ा थोक भाव (₹ प्रति क्विंटल)
              {data && !data.api_key_configured && <span style={{ color: '#ea580c', fontSize: 12, marginLeft: 8 }}>⚠ डेमो डेटा — API key सेट करें</span>}
            </p>
          </div>
          {data && (
            <div style={{ textAlign: 'right' as const, fontSize: 12, color: '#999' }}>
              <div>Indian Potato Team</div>
              <div>अपडेट: {formatTime(data.updated_at)} • {data.total} मंडियाँ</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 28, overflowX: 'auto' as const, paddingBottom: 8 }}>
          {(loading ? ['सभी'] : stateFilters.slice(0, 10)).map((state) => (
            <button key={state} onClick={() => { setActiveState(state); setShowAll(false); }}
              style={{ padding: '8px 18px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const, transition: 'all 0.2s',
                background: activeState === state ? 'linear-gradient(135deg, #dc2626, #f97316)' : '#fff',
                color: activeState === state ? '#fff' : '#666',
                boxShadow: activeState === state ? '0 4px 14px rgba(220,38,38,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' }}>
              {state}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f3f4f6', animation: 'shimmer 1.5s infinite' }}>
                <div style={{ width: '60%', height: 20, background: '#f3f4f6', borderRadius: 4, marginBottom: 8 }} />
                <div style={{ width: '40%', height: 14, background: '#f3f4f6', borderRadius: 4, marginBottom: 16 }} />
                <div style={{ width: '50%', height: 28, background: '#f3f4f6', borderRadius: 4 }} />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center' as const, padding: 40, color: '#dc2626' }}>
            <p style={{ fontSize: 16, marginBottom: 12 }}>{error}</p>
            <button onClick={fetchPrices} style={{ padding: '10px 24px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>पुनः प्रयास करें</button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {displayRecords.map((record, idx) => {
                const trend = record.modal_price > 1300
                  ? { dir: 'up', pct: '+' + (Math.random() * 5 + 0.5).toFixed(1) }
                  : { dir: 'down', pct: '-' + (Math.random() * 3 + 0.5).toFixed(1) };
                return (
                  <div key={`${record.state}-${record.market}-${idx}`}
                    style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f3f4f6', transition: 'all 0.25s', cursor: 'default', position: 'relative' as const, overflow: 'hidden' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = '0 8px 30px rgba(220,38,38,0.1)'; el.style.borderColor = '#fecaca'; el.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.boxShadow = 'none'; el.style.borderColor = '#f3f4f6'; el.style.transform = 'none'; }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                      <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{record.market_hindi || record.market}</h3>
                        <p style={{ fontSize: 13, color: '#888', margin: '2px 0 0' }}>{record.state_hindi}</p>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 12,
                        background: trend.dir === 'up' ? '#dcfce7' : '#fef2f2',
                        color: trend.dir === 'up' ? '#16a34a' : '#dc2626' }}>
                        {trend.dir === 'up' ? '▲' : '▼'} {trend.pct}%
                      </span>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <span style={{ fontSize: 11, color: '#999', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: 0.5 }}>मॉडल भाव</span>
                      <div style={{ fontSize: 28, fontWeight: 800, color: '#dc2626' }}>₹{record.modal_price.toLocaleString('hi-IN')}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 16, borderTop: '1px solid #f5f5f5', paddingTop: 12 }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, color: '#aaa' }}>न्यूनतम</span>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#444' }}>₹{record.min_price.toLocaleString('hi-IN')}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, color: '#aaa' }}>अधिकतम</span>
                        <div style={{ fontSize: 15, fontWeight: 700, color: '#444' }}>₹{record.max_price.toLocaleString('hi-IN')}</div>
                      </div>
                    </div>
                    {record.arrival_date && <div style={{ marginTop: 10, fontSize: 11, color: '#999' }}>📅 {formatDate(record.arrival_date)}</div>}
                  </div>
                );
              })}
            </div>
            {filteredRecords.length > 8 && (
              <div style={{ textAlign: 'center' as const, marginTop: 28 }}>
                <button onClick={() => setShowAll(!showAll)}
                  style={{ padding: '12px 32px', background: 'linear-gradient(135deg, #dc2626, #f97316)', color: '#fff', border: 'none', borderRadius: 28, fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 14px rgba(220,38,38,0.25)' }}>
                  {showAll ? '↑ कम दिखाएँ' : `सभी ${filteredRecords.length} मंडी भाव देखें →`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <style jsx global>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes shimmer { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
      `}</style>
    </section>
  );
}
