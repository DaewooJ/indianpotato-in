'use client';

import Link from 'next/link';

interface TickerPost {
  slug: string;
  title: string;
}

export default function NewsTicker({ posts }: { posts: TickerPost[] }) {
  const items = posts.length > 0 ? posts : [
    { slug: '', title: 'भारत में आलू उत्पादन 60.18 मिलियन टन के रिकॉर्ड स्तर पर पहुँचा' },
  ];

  return (
    <div style={{
      background: '#E53E3E', color: '#fff',
      overflow: 'hidden', whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        background: '#fff', color: '#E53E3E',
        padding: '11px 20px', fontWeight: 800,
        fontSize: '0.7rem', letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-english), sans-serif',
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#E53E3E', animation: 'blink 1.5s infinite',
        }} />
        ताज़ा
      </div>
      <div style={{ overflow: 'hidden', flex: 1, padding: '11px 0' }}>
        <div style={{
          display: 'inline-block', animation: 'ticker 50s linear infinite',
          fontFamily: 'var(--font-hindi), sans-serif',
          fontSize: '0.84rem', fontWeight: 500,
        }}>
          {[...items, ...items].map((h, i) => (
            <span key={i} style={{ padding: '0 36px' }}>
              {h.slug ? (
                <Link href={'/samachar/' + h.slug} style={{ color: '#fff', textDecoration: 'none', cursor: 'pointer' }} className="ticker-link">
                  {h.title}
                </Link>
              ) : (
                h.title
              )}
              <span style={{ margin: '0 16px', opacity: 0.4, fontSize: '0.6rem' }}>●</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`.ticker-link:hover { text-decoration: underline !important; }`}</style>
    </div>
  );
}
