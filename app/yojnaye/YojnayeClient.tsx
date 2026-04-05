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
      <section className="px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto">

          {/* Filter Pills */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className="shrink-0 px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: active === f ? '#05420d' : '#fff',
                  color: active === f ? '#fff' : '#6b7280',
                  border: active === f ? '1.5px solid #05420d' : '1.5px solid #e8ece9',
                  boxShadow: active === f ? '0 2px 8px rgba(5,66,13,0.15)' : 'none',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="text-xs tracking-wide mb-6" style={{ color: '#9ca3af' }}>
            {filtered.length} योजना{active !== 'सभी' ? ` — ${active}` : 'एँ'}
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((s, i) => (
              <Link
                key={i}
                href={s.link}
                className="group relative rounded-2xl bg-white p-7 flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{ border: '1px solid #e8ece9', boxShadow: '0 1px 3px rgba(5,66,13,0.04)' }}
              >
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, #05420d, #f97316)' }}
                />

                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl leading-none">{s.icon}</span>
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                      style={{ color: s.type === 'राज्य' ? '#f97316' : '#05420d' }}
                    >
                      {s.type} सरकार
                    </span>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-[11px] font-semibold"
                    style={{
                      background: s.status === 'नई' ? 'rgba(249,115,22,0.1)' : 'rgba(5,66,13,0.06)',
                      color: s.status === 'नई' ? '#f97316' : '#05420d',
                    }}
                  >
                    {s.status}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[17px] font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#05420d] transition-colors">
                  {s.name}
                </h3>

                {/* Benefit */}
                <div
                  className="text-2xl sm:text-[26px] font-bold mb-3 tracking-tight"
                  style={{ color: '#f97316' }}
                >
                  {s.benefit}
                </div>

                {/* Description */}
                <p className="text-[13.5px] text-gray-500 leading-relaxed mb-5 flex-1">
                  {s.desc}
                </p>

                {/* Eligibility */}
                <div
                  className="rounded-xl px-4 py-3 mb-5"
                  style={{ background: '#f0fdf4', border: '1px solid #dcfce7' }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#9ca3af' }}>
                    पात्रता
                  </span>
                  <div className="text-[13px] font-medium mt-0.5" style={{ color: '#05420d' }}>
                    {s.eligibility}
                  </div>
                </div>

                {/* CTA */}
                <span
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium opacity-60 group-hover:opacity-100 transition-all duration-300"
                  style={{ color: '#05420d' }}
                >
                  विवरण पढ़ें
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </span>
              </Link>
            ))}
          </div>

          {/* No results */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-5">इस श्रेणी में कोई योजना नहीं मिली।</p>
              <button
                onClick={() => setActive('सभी')}
                className="px-6 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-all hover:shadow-lg"
                style={{ background: '#05420d' }}
              >
                सभी योजनाएँ देखें
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Additional Posts ── */}
      {additionalPosts.length > 0 && (
        <section className="px-4 sm:px-6 pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px" style={{ background: '#e8ece9' }} />
              <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-[0.1em]">और योजना-संबंधी लेख</span>
              <div className="flex-1 h-px" style={{ background: '#e8ece9' }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {additionalPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={'/samachar/' + post.slug}
                  className="group relative rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1"
                  style={{ border: '1px solid #e8ece9', boxShadow: '0 1px 3px rgba(5,66,13,0.04)' }}
                >
                  <div
                    className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg, #05420d, #f97316)' }}
                  />
                  <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#05420d] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
                    {post.excerpt.slice(0, 140)}…
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-[13px] font-medium opacity-60 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: '#05420d' }}
                  >
                    पढ़ें
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
