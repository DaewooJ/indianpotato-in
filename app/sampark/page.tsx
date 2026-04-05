'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

export default function SamparkPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 76, minHeight: '100vh', background: '#fff' }}>

        {/* HERO */}
        <section style={{ padding: 'clamp(60px, 10vw, 100px) 20px clamp(48px, 8vw, 64px)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ display: 'inline-block', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 50, padding: '4px 14px', marginBottom: 24, fontSize: 12, color: '#05420d', fontWeight: 600, letterSpacing: '0.05em' }}>
              संपर्क
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16 }}>
              हमसे संपर्क करें
            </h1>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, maxWidth: 500 }}>
              विज्ञापन, सहयोग, समाचार सबमिशन या सामान्य पूछताछ — हम आपकी मदद के लिए तैयार हैं
            </p>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section style={{ padding: '64px 20px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="sampark-cards">
            {[
              { label: 'सामान्य पूछताछ', email: 'info@indpotato.com', desc: 'सामान्य प्रश्न, सुझाव या फीडबैक' },
              { label: 'विज्ञापन और साझेदारी', email: 'ads@indpotato.com', desc: 'डायरेक्टरी लिस्टिंग, बैनर विज्ञापन, स्पॉन्सर्ड कंटेंट' },
              { label: 'समाचार और कंटेंट', email: 'news@indpotato.com', desc: 'प्रेस रिलीज़, किसान कहानियाँ, उद्योग समाचार सबमिट करें' },
            ].map((c, i) => (
              <a key={i} href={`mailto:${c.email}`} className="sampark-card" style={{
                display: 'block', background: '#fff', borderRadius: 16, padding: 28,
                border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                textDecoration: 'none', color: 'inherit',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</span>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginTop: 12, marginBottom: 8 }}>{c.email}</div>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* WHATSAPP */}
        <section style={{ padding: '0 20px 64px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="sampark-card" style={{
              background: '#fff', borderRadius: 16, padding: '32px 28px',
              border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 20,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>WhatsApp</span>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#1f2937', marginTop: 8, marginBottom: 4 }}>WhatsApp पर सीधे बात करें</div>
                <div style={{ fontSize: 14, color: '#6b7280' }}>+91 94996 68831</div>
              </div>
              <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 50,
                background: '#25D366',
                color: '#fff', fontWeight: 600, fontSize: 14,
                textDecoration: 'none', boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
                transition: 'box-shadow 0.25s',
                flexShrink: 0,
              }}>
                WhatsApp ग्रुप जॉइन करें
              </a>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section style={{ padding: '0 20px 64px' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div className="sampark-card" style={{
              background: '#fff', borderRadius: 16, padding: '32px 28px',
              border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>संस्थापक</span>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#1f2937', marginTop: 12, marginBottom: 4 }}>Devendra Kumar Jha</div>
              <div style={{ fontSize: 14, color: '#6b7280', marginBottom: 4 }}>Co-Founder and Director</div>
              <div style={{ fontSize: 14, color: '#9ca3af', marginBottom: 16 }}>Indpotato Pvt Ltd, Pimpri-Chinchwad, Pune, Maharashtra</div>
              <a href="https://www.linkedin.com/in/potatoes/" target="_blank" rel="noopener noreferrer" style={{
                fontSize: 14, fontWeight: 500, color: '#05420d', textDecoration: 'none',
              }}>
                LinkedIn प्रोफ़ाइल →
              </a>
            </div>
          </div>
        </section>

        {/* RESPONSE PROMISE */}
        <section style={{ padding: '64px 20px', background: '#fafafa', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 700, color: '#111827', marginBottom: 12 }}>
              24 घंटे में उत्तर
            </div>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6, marginBottom: 28 }}>
              हम हर संदेश को गंभीरता से लेते हैं। कार्य दिवसों में 24 घंटे के भीतर उत्तर देने का हमारा प्रयास रहता है।
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:info@indpotato.com" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 50,
                background: '#05420d', color: '#fff',
                fontWeight: 600, fontSize: 14, textDecoration: 'none',
              }}>
                ईमेल भेजें
              </a>
              <a href="https://wa.me/919499668831" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 50,
                background: '#fff', border: '1.5px solid #e5e7eb', color: '#1f2937',
                fontWeight: 600, fontSize: 14, textDecoration: 'none',
              }}>
                WhatsApp करें
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .sampark-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important; }
        @media (max-width: 768px) { .sampark-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
