'use client';

import Link from 'next/link';

interface TickerPost {
  slug: string;
  title: string;
}

export default function NewsTicker({ posts }: { posts: TickerPost[] }) {
  const items = posts.length > 0 ? posts : [
    { slug: '', title: 'भारत में आलू उत्पादन 60.18 मिलियन टन के रिक���र्ड स्तर पर पहुँचा' },
  ];

  return (
    <div style={{
      background: '#05420d', color: '#fff',
      overflow: 'hidden', whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center',
      height: 36,
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.15)',
        padding: '0 16px', height: '100%',
        fontWeight: 700, fontSize: '0.65rem',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#ed6442', animation: 'blink 1.5s infinite',
        }} />
        ताज़ा
      </div>
      <div style={{ overflow: 'hidden', flex: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'inline-block', animation: 'ticker 50s linear infinite',
          fontSize: '0.78rem', fontWeight: 400,
        }}>
          {[...items, ...items].map((h, i) => (
            <span key={i} style={{ padding: '0 28px' }}>
              {h.slug ? (
                <Link href={'/samachar/' + h.slug} style={{ color: '#fff', textDecoration: 'none' }} className="ticker-link">
                  {h.title}
                </Link>
              ) : (
                h.title
              )}
              <span style={{ margin: '0 12px', opacity: 0.3, fontSize: '0.5rem' }}>●</span>
            </span>
          ))}
        </div>
      </div>
      <style>{`.ticker-link:hover { text-decoration: underline !important; }`}</style>
    </div>
  );
}
