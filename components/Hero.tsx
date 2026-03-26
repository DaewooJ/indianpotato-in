import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{
      background: '#1a1a1a', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23ffffff'/%3E%3C/svg%3E")`,
      }} />

      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '80px 28px 64px',
        position: 'relative', zIndex: 2,
      }}>
        <div className="hero-grid" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 48, alignItems: 'center',
        }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'rgba(229,62,62,0.12)',
              border: '1px solid rgba(229,62,62,0.25)',
              borderRadius: 4, padding: '7px 16px', marginBottom: 24,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#E53E3E', animation: 'blink 1.5s infinite',
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.72rem', fontWeight: 700,
                color: '#E53E3E', letterSpacing: '0.12em', textTransform: 'uppercase',
              }}>LIVE · आज का अपडेट</span>
            </div>

            <h1 style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900, color: '#fff',
              lineHeight: 1.15, marginBottom: 20,
            }}>
              भारत का <span style={{
                color: '#E53E3E',
                textDecoration: 'underline',
                textDecorationColor: 'rgba(229,62,62,0.3)',
                textUnderlineOffset: '6px',
                textDecorationThickness: '3px',
              }}>#1 आलू</span><br />
              उद्योग मंच
            </h1>

            <p style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '1.05rem', lineHeight: 1.85,
              color: '#777', maxWidth: 480, marginBottom: 32,
            }}>
              मंडी भाव · सरकारी योजनाएँ · किस्मों का डेटाबेस · 
              निर्यात डेटा · उद्योग डायरेक्टरी — किसानों, व्यापारियों 
              और प्रसंस्करण उद्योग के लिए।
            </p>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/mandi" style={{
                background: '#E53E3E', color: '#fff', textDecoration: 'none',
                padding: '13px 28px', borderRadius: 4,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.92rem', fontWeight: 700,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                boxShadow: '0 0 24px rgba(229,62,62,0.25)',
              }}>📊 आज का मंडी भाव</Link>
              <Link href="/sampark" style={{
                background: 'transparent', color: '#ccc', textDecoration: 'none',
                border: '1.5px solid #333', padding: '13px 28px', borderRadius: 4,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.92rem', fontWeight: 600,
              }}>💬 WhatsApp जोड़ें</Link>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            {[
              { value: '60.18M', label: 'टन उत्पादन', sub: '2024-25 सीज़न', highlight: true },
              { value: '₹527Cr', label: 'फ्लेक्स निर्यात', sub: 'FY2025', highlight: false },
              { value: '#2', label: 'विश्व में स्थान', sub: 'चीन के बाद', highlight: false },
              { value: '15K+', label: 'साप्ताहिक पाठक', sub: 'WhatsApp + वेब', highlight: true },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.highlight ? '#222' : '#1f1f1f',
                padding: '30px 22px',
                borderTop: s.highlight ? '3px solid #E53E3E' : '3px solid #2a2a2a',
                borderRadius: i === 0 ? '6px 0 0 0' : i === 1 ? '0 6px 0 0' : i === 2 ? '0 0 0 6px' : '0 0 6px 0',
              }}>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '1.9rem', fontWeight: 900,
                  color: s.highlight ? '#E53E3E' : '#fff',
                  marginBottom: 6, letterSpacing: '-0.03em',
                }}>{s.value}</div>
                <div style={{
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: '0.88rem', fontWeight: 700, color: '#ccc', marginBottom: 3,
                }}>{s.label}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.68rem', color: '#555', fontWeight: 500,
                }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 3, background: '#E53E3E' }} />

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </section>
  );
}
