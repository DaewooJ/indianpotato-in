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

  return (
    <>
      <section style={{ padding: '48px 20px 80px', background: '#fafafa' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }} className="scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: '9px 20px', borderRadius: 50,
                  border: active === f ? '1.5px solid #05420d' : '1.5px solid #e5e7eb',
                  fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer',
                  whiteSpace: 'nowrap', transition: 'all 0.25s ease',
                  background: active === f ? '#05420d' : '#fff',
                  color: active === f ? '#fff' : '#6b7280',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Count */}
          <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: 24, letterSpacing: '0.02em' }}>
            {filtered.length} योजना{active !== 'सभी' ? ` — ${active}` : 'एँ'}
          </p>

          {/* Cards — 2 column */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }} className="yojnaye-grid">
            {filtered.map((s, i) => (
              <Link key={i} href={s.link} className="yojnaye-card" style={{
                background: '#fff', borderRadius: 16, padding: 28,
                border: '1px solid #f0f0f0',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                textDecoration: 'none', color: 'inherit',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}>
                {/* Category label + status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 600, color: '#9ca3af',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{s.type} सरकार</span>
                  <span style={{
                    padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600,
                    background: s.status === 'नई' ? '#dbeafe' : s.status === 'राज्य' ? '#dbeafe' : '#dcfce7',
                    color: s.status === 'नई' ? '#1d4ed8' : s.status === 'राज्य' ? '#1d4ed8' : '#166534',
                  }}>{s.status}</span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1f2937', lineHeight: 1.35, marginBottom: 12 }}>{s.name}</h3>

                {/* Benefit — largest text, the hook */}
                <div style={{ fontSize: 24, fontWeight: 700, color: '#05420d', marginBottom: 14, letterSpacing: '-0.02em' }}>{s.benefit}</div>

                {/* Description */}
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>{s.desc}</p>

                {/* Eligibility */}
                <div style={{ marginBottom: 20 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>पात्रता</span>
                  <div style={{ fontSize: 13, fontWeight: 500, color: '#4b5563', marginTop: 3 }}>{s.eligibility}</div>
                </div>

                {/* CTA — text link, not button */}
                <span className="yojnaye-cta" style={{ fontSize: 14, fontWeight: 500, color: '#05420d', transition: 'opacity 0.25s' }}>
                  विवरण पढ़ें →
                </span>
              </Link>
            ))}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
              <p style={{ fontSize: 16, marginBottom: 16 }}>इस श्रेणी में कोई योजना नहीं मिली।</p>
              <button onClick={() => setActive('सभी')} style={{
                padding: '10px 24px', background: '#05420d', color: '#fff',
                border: 'none', borderRadius: 50, cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}>
                सभी योजनाएँ देखें
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Additional scheme posts */}
      {additionalPosts.length > 0 && (
        <section style={{ padding: '0 20px 80px', background: '#fafafa' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 20 }}>
              और योजना-संबंधी लेख
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="yojnaye-grid">
              {additionalPosts.map((post) => (
                <Link key={post.slug} href={'/samachar/' + post.slug} className="yojnaye-card" style={{
                  textDecoration: 'none', color: 'inherit',
                  background: '#fff', borderRadius: 16, padding: 24,
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginBottom: 12 }}>{post.excerpt.slice(0, 140)}…</p>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#05420d' }}>पढ़ें →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .yojnaye-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important; }
        .yojnaye-card:hover .yojnaye-cta { text-decoration: underline; }
        @media (max-width: 860px) { .yojnaye-grid { grid-template-columns: 1fr !important; gap: 16px !important; } }
      `}</style>
    </>
  );
}
