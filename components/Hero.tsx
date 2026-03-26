import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ background: '#fff', position: 'relative', overflow: 'hidden', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ position: 'absolute', top: -300, right: -200, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,62,62,0.04) 0%, transparent 70%)' }} />
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 28px 64px', position: 'relative', zIndex: 2 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 4, padding: '7px 16px', marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#E53E3E', animation: 'blink 1.5s infinite' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 700, color: '#E53E3E', letterSpacing: '0.12em', textTransform: 'uppercase' }}>LIVE · आज का अपडेट</span>
            </div>
            <h1 style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', fontWeight: 900, color: '#1a1a1a', lineHeight: 1.15, marginBottom: 20 }}>
              भारत का <span style={{ color: '#E53E3E' }}>#1 आलू</span><br />उद्योग मंच
            </h1>
            <p style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '1.08rem', lineHeight: 1.85, color: '#777', maxWidth: 500, marginBottom: 32 }}>
              मंडी भाव · सरकारी योजनाएँ · किस्मों का डेटाबेस · निर्यात डेटा · उद्योग डायरेक्टरी — किसानों, व्यापारियों और प्रसंस्करण उद्योग के लिए।
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link href="/mandi" style={{ background: '#E53E3E', color: '#fff', textDecoration: 'none', padding: '14px 30px', borderRadius: 5, fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '0.95rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 16px rgba(229,62,62,0.25)' }}>📊 मंडी भाव देखें</Link>
              <Link href="/sampark" style={{ background: '#fff', color: '#E53E3E', textDecoration: 'none', border: '2px solid #E53E3E', padding: '13px 30px', borderRadius: 5, fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '0.95rem', fontWeight: 700 }}>💬 WhatsApp जोड़ें</Link>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { value: '60.18M', label: 'टन उत्पादन', sub: '2024-25 सीज़न', highlight: true },
              { value: '₹527Cr', label: 'फ्लेक्स निर्यात', sub: 'FY2025', highlight: false },
              { value: '#2', label: 'विश्व में स्थान', sub: 'चीन के बाद', highlight: false },
              { value: '15K+', label: 'साप्ताहिक पाठक', sub: 'WhatsApp + वेब', highlight: true },
            ].map((s, i) => (
              <div key={i} style={{
                background: s.highlight ? '#fef2f2' : '#f9fafb', padding: '28px 22px', borderRadius: 8,
                border: s.highlight ? '1.5px solid #fecaca' : '1.5px solid #f0f0f0',
                borderTop: s.highlight ? '4px solid #E53E3E' : '4px solid #e5e5e5',
              }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.9rem', fontWeight: 900, color: s.highlight ? '#E53E3E' : '#1a1a1a', marginBottom: 6, letterSpacing: '-0.03em' }}>{s.value}</div>
                <div style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '0.88rem', fontWeight: 700, color: '#444', marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.68rem', color: '#aaa', fontWeight: 500 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 860px) { .hero-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }`}</style>
    </section>
  );
}
