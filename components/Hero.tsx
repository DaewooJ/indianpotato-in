import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ position: 'absolute', top: -300, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'transparent' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 28px 64px', position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 4, padding: '7px 16px', marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#05420d', animation: 'blink 1.5s infinite' }} />
              <span style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.72rem', fontWeight: 700, color: '#05420d', letterSpacing: '0.12em', textTransform: 'uppercase' }}>LIVE · आज का अपडेट</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.15, marginBottom: 20 }}>
              भारत का <span style={{ color: '#05420d' }}>#1 आलू</span><br />उद्योग मंच
            </h1>
            <p style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.08rem', lineHeight: 1.85, color: '#777', maxWidth: 500, marginBottom: 32 }}>
              मंडी भाव · सरकारी योजनाएँ · किस्मों का डेटाबेस · निर्यात डेटा · उद्योग डायरेक्टरी — किसानों, व्यापारियों और प्रसंस्करण उद्योग के लिए।
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40, alignItems: 'flex-start' }}>
              <Link href="/mandi" className="hero-cta" style={{
                background: '#05420d',
                color: '#fff', textDecoration: 'none',
                padding: '16px 36px', borderRadius: 50,
                fontSize: '1rem', fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 6px 20px rgba(220,38,38,0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}>
                मंडी भाव देखें →
              </Link>
              <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" style={{
                fontSize: '0.85rem', color: '#999', textDecoration: 'none',
                fontWeight: 500, paddingLeft: 4,
                transition: 'color 0.2s',
              }}>
                या <span style={{ color: '#05420d', fontWeight: 600 }}>WhatsApp ग्रुप जॉइन करें →</span>
              </a>
            </div>
            {/* Stats row below buttons */}
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {[
                { value: '60.18M टन', label: 'उत्पादन 2024-25' },
                { value: '₹527 Cr', label: 'निर्यात FY25' },
                { value: '#2 विश्व', label: 'चीन के बाद' },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: i === 0 ? 'none' : '1px solid #eee', paddingLeft: i === 0 ? 0 : 28 }}>
                  <div style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.3rem', fontWeight: 900, color: '#05420d', letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.75rem', color: '#aaa', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — Hero Image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
              border: '1px solid #f0f0f0',
            }}>
              <img
                src="/images/hero-side.jpg"
                alt="भारत में आलू — Indian Potato"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="eager"
              />
            </div>
            {/* Floating stat card */}
            <div style={{
              position: 'absolute', bottom: -16, left: -16,
              background: '#fff', borderRadius: 10,
              padding: '16px 22px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
              border: '1px solid #f0f0f0',
              borderLeft: '4px solid #05420d',
            }}>
              <div style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.4rem', fontWeight: 900, color: '#05420d' }}>15K+</div>
              <div style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.72rem', color: '#888' }}>साप्ताहिक पाठक</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(220,38,38,0.45) !important; filter: brightness(1.05); }
      `}</style>
    </section>
  );
}
