import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{ background: '#fff', borderBottom: '1px solid #f3f4f6' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px 56px' }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#111827', lineHeight: 1.15, marginBottom: 16 }}>
              भारत का <span style={{ color: '#05420d' }}>#1 आलू</span><br />उद्योग मंच
            </h1>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#6b7280', maxWidth: 480, marginBottom: 32 }}>
              मंडी भाव, सरकारी योजनाएँ, किस्मों का डेटाबेस, निर्यात डेटा और उद्योग डायर���क्टरी — किसानों, व्यापारियों और प्रसंस्करण उद्योग के लिए।
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
              <Link href="/mandi" style={{
                background: '#ed6442', color: '#fff', textDecoration: 'none',
                padding: '14px 32px', borderRadius: 10,
                fontSize: '0.95rem', fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'background 0.2s',
              }}>
                मंडी भाव देखें →
              </Link>
              <Link href="/directory" style={{
                background: '#fff', color: '#05420d', textDecoration: 'none',
                padding: '14px 32px', borderRadius: 10,
                fontSize: '0.95rem', fontWeight: 600,
                border: '1.5px solid #05420d',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                transition: 'all 0.2s',
              }}>
                डायरेक्टरी
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { value: '60.18M टन', label: 'उत्पादन 2024-25' },
                { value: '₹527 Cr', label: 'निर्यात FY25' },
                { value: '#2 विश्व', label: 'चीन के बाद' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: '#f9fafb', border: '1px solid #e5e7eb',
                  borderRadius: 8, padding: '8px 16px',
                }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#111827' }}>{s.value}</span>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af', marginLeft: 6 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid #e5e7eb',
            }}>
              <img
                src="/images/hero-side.jpg"
                alt="भारत में आलू — Indian Potato"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
