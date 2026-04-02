'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Scheme {
  icon: string;
  name: string;
  benefit: string;
  desc: string;
  status: 'सक्रिय' | 'नई' | 'राज्य';
  type: 'केंद्र' | 'राज्य';
  tags: string[];
  link: string;
  eligibility: string;
}

interface AdditionalPost {
  slug: string;
  title: string;
  excerpt: string;
}

const filters = ['सभी', 'केंद्र सरकार', 'राज्य सरकार', 'प्रसंस्करण', 'कोल्ड स्टोरेज'];

export default function YojnayeClient({ schemes, additionalPosts }: { schemes: Scheme[]; additionalPosts: AdditionalPost[] }) {
  const [active, setActive] = useState('सभी');

  const filtered = schemes.filter((s) => {
    if (active === 'सभी') return true;
    if (active === 'केंद्र सरकार') return s.type === 'केंद्र';
    if (active === 'राज्य सरकार') return s.type === 'राज्य';
    if (active === 'प्रसंस्करण') return s.tags.some((t) => t.includes('प्रसंस्करण') || t.includes('उद्यम'));
    if (active === 'कोल्ड स्टोरेज') return s.tags.some((t) => t.includes('कोल्ड स्टोरेज') || t.includes('अवसंरचना') || t.includes('लोन'));
    return true;
  });

  const statusStyle = (status: string) => {
    if (status === 'नई') return { background: '#fef2f2', color: '#dc2626', boxShadow: '0 0 0 3px rgba(220,38,38,0.08)' };
    if (status === 'राज्य') return { background: '#eff6ff', color: '#1d4ed8', boxShadow: 'none' };
    return { background: '#dcfce7', color: '#166534', boxShadow: 'none' };
  };

  return (
    <>
      <section style={{ padding: '48px 20px 80px', background: '#fafafa' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 36, overflowX: 'auto', paddingBottom: 4 }} className="scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: '10px 22px', borderRadius: 50, border: 'none',
                  fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                  whiteSpace: 'nowrap', transition: 'all 0.2s',
                  background: active === f ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : '#fff',
                  color: active === f ? '#fff' : '#666',
                  boxShadow: active === f ? '0 4px 14px rgba(220,38,38,0.25)' : '0 1px 4px rgba(0,0,0,0.06)',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Count */}
          <p style={{ fontSize: '0.82rem', color: '#999', marginBottom: 20 }}>
            {filtered.length} योजना{active !== 'सभी' ? ` — ${active}` : 'एँ'}
          </p>

          {/* Premium Cards — 2 column */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 20 }} className="yojnaye-grid">
            {filtered.map((s, i) => (
              <Link key={i} href={s.link} className="yojnaye-card" style={{
                background: '#fff', borderRadius: 16, padding: '32px 28px',
                border: '1px solid #f0f0f0', borderLeft: '5px solid #dc2626',
                textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}>
                {/* Top row: status + type */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, alignItems: 'center' }}>
                  <span style={{
                    padding: '5px 14px', borderRadius: 50, fontSize: '0.68rem', fontWeight: 700,
                    ...statusStyle(s.status),
                  }}>{s.status}</span>
                  <span style={{
                    padding: '5px 12px', borderRadius: 50, fontSize: '0.65rem', fontWeight: 600,
                    background: '#f5f5f5', color: '#888',
                  }}>{s.type} सरकार</span>
                </div>

                {/* Icon */}
                <div style={{
                  width: 56, height: 56, borderRadius: 16,
                  background: 'linear-gradient(135deg, #fef2f2, #fff5f5)',
                  border: '1px solid #fecaca',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, marginBottom: 20, flexShrink: 0,
                }}>{s.icon}</div>

                {/* Title */}
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#333', lineHeight: 1.3, marginBottom: 8 }}>{s.name}</h3>

                {/* Benefit — the HOOK */}
                <div style={{
                  fontSize: '1.4rem', fontWeight: 900, color: '#dc2626',
                  marginBottom: 12, letterSpacing: '-0.02em',
                }}>{s.benefit}</div>

                {/* Description */}
                <p style={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.65, marginBottom: 16, flex: 1 }}>{s.desc}</p>

                {/* Eligibility strip */}
                <div style={{
                  background: '#fafafa', borderRadius: 10, padding: '10px 14px',
                  marginBottom: 20, border: '1px solid #f0f0f0',
                }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>पात्रता</span>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#555', marginTop: 2 }}>{s.eligibility}</div>
                </div>

                {/* CTA */}
                <div className="yojnaye-cta" style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 50, alignSelf: 'flex-start',
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  color: '#fff', fontWeight: 700, fontSize: '0.85rem',
                  boxShadow: '0 3px 12px rgba(220,38,38,0.2)',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                }}>
                  विवरण पढ़ें →
                </div>
              </Link>
            ))}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <p style={{ fontSize: '1.1rem' }}>इस श्रेणी में कोई योजना नहीं मिली।</p>
              <button onClick={() => setActive('सभी')} style={{ marginTop: 16, padding: '10px 24px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 50, cursor: 'pointer', fontWeight: 600 }}>
                सभी योजनाएँ देखें
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Additional scheme posts */}
      {additionalPosts.length > 0 && (
        <section style={{ padding: '0 20px 80px', background: '#fafafa' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <div style={{ width: 4, height: 24, background: '#dc2626', borderRadius: 2 }} />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#333' }}>और योजना-संबंधी लेख</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 16 }} className="yojnaye-grid">
              {additionalPosts.map((post) => (
                <Link key={post.slug} href={'/samachar/' + post.slug} className="yojnaye-card" style={{
                  textDecoration: 'none', color: 'inherit',
                  background: '#fff', borderRadius: 12, padding: '24px',
                  border: '1px solid #f0f0f0',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#333', lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6 }}>{post.excerpt.slice(0, 140)}…</p>
                  <span style={{ display: 'inline-block', marginTop: 12, fontSize: '0.8rem', fontWeight: 600, color: '#dc2626' }}>पढ़ें →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .yojnaye-card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(220,38,38,0.1) !important; }
        .yojnaye-card:hover .yojnaye-cta { box-shadow: 0 6px 20px rgba(220,38,38,0.3); transform: translateY(-1px); }
        @media (max-width: 860px) { .yojnaye-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
