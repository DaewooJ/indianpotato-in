'use client';

import Link from 'next/link';

/* ─── NEWS ─── */
const articles = [
  { tag: 'उत्पादन', title: 'भारत में आलू उत्पादन 60.18 मिलियन टन — नया रिकॉर्ड', date: '24 मार्च 2026', img: '/images/news-1.jpg' },
  { tag: 'निर्यात', title: 'आलू फ्लेक्स निर्यात ₹527 करोड़ — तीन वर्षों में 450% वृद्धि', date: '22 मार्च 2026', img: '/images/news-2.jpg' },
  { tag: 'नीति', title: 'बिहार सरकार ने लेडी रोसेटा आलू विस्तार योजना शुरू की', date: '20 मार्च 2026', img: '/images/news-3.jpg' },
  { tag: 'तकनीक', title: 'LUCRA ने भारतीय खेतों के लिए CH200-SRS हार्वेस्टर लॉन्च किया', date: '18 मार्च 2026', img: '/images/processing.jpg' },
  { tag: 'अनुसंधान', title: 'ICAR ने चार नई उन्नत आलू किस्मों को मंजूरी दी', date: '15 मार्च 2026', img: '/images/potatoes-top.jpg' },
  { tag: 'राज्य', title: 'त्रिपुरा का 2030 तक आलू में आत्मनिर्भर बनने का लक्ष्य', date: '12 मार्च 2026', img: '/images/potato-group.jpg' },
];

export function NewsSection() {
  return (
    <section id="news" style={{ padding: '64px 28px 72px', background: '#fff' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 4, height: 28, background: '#E53E3E', borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1a1a1a' }}>ताज़ा समाचार</h2>
          </div>
          <Link href="/samachar" style={{ textDecoration: 'none', fontFamily: "'Noto Sans Devanagari'", fontSize: '0.85rem', fontWeight: 700, color: '#E53E3E', borderBottom: '2px solid #E53E3E', paddingBottom: 2 }}>सभी समाचार →</Link>
        </div>
        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12 }}>
          {/* Featured with image */}
          <div style={{
            borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative', minHeight: 340,
            backgroundImage: `url(/images/news-featured.jpg)`,
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}>
            {/* Red overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(180,20,20,0.95) 0%, rgba(229,62,62,0.7) 50%, rgba(229,62,62,0.3) 100%)' }} />
            <div style={{ position: 'relative', zIndex: 2, padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
              <div style={{ position: 'absolute', top: 16, left: 16, background: '#fff', padding: '5px 14px', borderRadius: 4, fontFamily: "'DM Sans'", fontSize: '0.65rem', fontWeight: 800, color: '#E53E3E', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🔥 मुख्य ख़बर</div>
              <span style={{ display: 'inline-block', width: 'fit-content', background: 'rgba(255,255,255,0.2)', color: '#fff', padding: '3px 12px', borderRadius: 3, fontFamily: "'Noto Sans Devanagari'", fontSize: '0.72rem', fontWeight: 700, marginBottom: 14 }}>{articles[0].tag}</span>
              <h3 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '1.45rem', fontWeight: 800, color: '#fff', lineHeight: 1.4, marginBottom: 14 }}>{articles[0].title}</h3>
              <div style={{ fontFamily: "'DM Sans'", fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>{articles[0].date}</div>
            </div>
          </div>

          {/* List with thumbnails */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {articles.slice(1).map((a, i) => (
              <div key={i} style={{ padding: '14px 18px', background: '#f9fafb', cursor: 'pointer', borderRadius: 8, flex: 1, display: 'flex', gap: 14, alignItems: 'center', border: '1px solid #f0f0f0' }}>
                <img src={a.img} alt={a.title} style={{ width: 72, height: 52, borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.62rem', fontWeight: 700, color: '#E53E3E', background: '#fef2f2', padding: '1px 7px', borderRadius: 3 }}>{a.tag}</span>
                    <span style={{ fontFamily: "'DM Sans'", fontSize: '0.62rem', color: '#ccc' }}>{a.date}</span>
                  </div>
                  <h4 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.88rem', fontWeight: 700, color: '#222', lineHeight: 1.4 }}>{a.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .news-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ─── GOV SCHEMES ─── */
const schemes = [
  { icon: '🌾', name: 'PM किसान सम्मान निधि', benefit: '₹6,000/वर्ष', desc: 'तीन किस्तों में सीधे बैंक खाते में — सभी किसान परिवारों के लिए', status: 'सक्रिय' },
  { icon: '❄️', name: 'कोल्ड स्टोरेज सब्सिडी', benefit: '35-50% अनुदान', desc: 'नए कोल्ड स्टोरेज निर्माण पर सरकारी सब्सिडी — PMKSY के तहत', status: 'सक्रिय' },
  { icon: '🧬', name: 'लेडी रोसेटा विस्तार योजना', benefit: 'बीज अनुदान', desc: 'प्रसंस्करण गुणवत्ता किस्म के लिए किसानों को विशेष सहायता', status: 'नई' },
  { icon: '💰', name: 'किसान क्रेडिट कार्ड', benefit: '4% ब्याज दर', desc: '₹3 लाख तक का फसल ऋण — समय पर भुगतान पर 3% छूट', status: 'सक्रिय' },
];

export function GovSchemes() {
  return (
    <section id="schemes" style={{ padding: '64px 28px 72px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 4, height: 28, background: '#E53E3E', borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1a1a1a' }}>सरकारी योजनाएँ</h2>
        </div>
        <div className="scheme-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {schemes.map((s, i) => (
            <div key={i} style={{ background: '#fff', padding: '26px 24px', border: '1px solid #eee', borderLeft: '4px solid #E53E3E', borderRadius: 8, cursor: 'pointer', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 14, right: 14, background: s.status === 'नई' ? '#E53E3E' : '#f0f0f0', color: s.status === 'नई' ? '#fff' : '#666', padding: '3px 10px', borderRadius: 4, fontFamily: "'Noto Sans Devanagari'", fontSize: '0.62rem', fontWeight: 700 }}>{s.status}</div>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '1.02rem', fontWeight: 800, color: '#1a1a1a', marginBottom: 6, lineHeight: 1.3 }}>{s.name}</h3>
              <div style={{ fontFamily: "'DM Sans'", fontSize: '1.1rem', fontWeight: 900, color: '#E53E3E', marginBottom: 10 }}>{s.benefit}</div>
              <p style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── VARIETIES WITH IMAGES ─── */
const varieties = [
  { name: 'कुफरी ज्योति', use: 'खाने के लिए', days: '90-100 दिन', yield: '25-30 टन/हे.', states: 'UP, पंजाब, HP', proc: false, img: '/images/variety-1.jpg' },
  { name: 'कुफरी पुखराज', use: 'खाने के लिए', days: '80-90 दिन', yield: '35-40 टन/हे.', states: 'बिहार, UP, WB', proc: false, img: '/images/variety-2.jpg' },
  { name: 'कुफरी चिप्सोना-1', use: 'प्रसंस्करण', days: '95-105 दिन', yield: '28-32 टन/हे.', states: 'गुजरात, MP', proc: true, img: '/images/variety-3.jpg' },
  { name: 'लेडी रोसेटा', use: 'प्रसंस्करण', days: '100-110 दिन', yield: '22-26 टन/हे.', states: 'गुजरात, पंजाब', proc: true, img: '/images/variety-4.jpg' },
  { name: 'कुफरी बहार', use: 'खाने के लिए', days: '90-100 दिन', yield: '30-35 टन/हे.', states: 'बिहार, UP, झारखंड', proc: false, img: '/images/potato-single.jpg' },
  { name: 'कुफरी सिंधुरी', use: 'खाने के लिए', days: '120-130 दिन', yield: '25-30 टन/हे.', states: 'UP, बिहार', proc: false, img: '/images/potatoes-top.jpg' },
];

export function VarietiesQuick() {
  return (
    <section id="varieties" style={{ padding: '64px 28px 72px', background: '#fff' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 4, height: 28, background: '#E53E3E', borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1a1a1a' }}>आलू की प्रमुख किस्में</h2>
          </div>
          <Link href="/kisme" style={{ textDecoration: 'none', fontFamily: "'Noto Sans Devanagari'", fontSize: '0.85rem', fontWeight: 700, color: '#E53E3E', borderBottom: '2px solid #E53E3E', paddingBottom: 2 }}>सभी किस्में →</Link>
        </div>
        <div className="variety-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 10 }}>
          {varieties.map((v, i) => (
            <div key={i} style={{ background: '#f9fafb', borderRadius: 8, padding: '18px 20px', border: '1px solid #eee', cursor: 'pointer', display: 'flex', gap: 16, alignItems: 'center' }}>
              <img src={v.img} alt={v.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 8 }}>
                  <h3 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '1rem', fontWeight: 800, color: '#1a1a1a', marginBottom: 3 }}>{v.name}</h3>
                  <span style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.65rem', fontWeight: 700, color: v.proc ? '#E53E3E' : '#16a34a', background: v.proc ? '#fef2f2' : '#f0fdf4', padding: '2px 8px', borderRadius: 3 }}>{v.use}</span>
                </div>
                <div style={{ display: 'flex', gap: 18 }}>
                  {[{ label: 'अवधि', val: v.days }, { label: 'उपज', val: v.yield }, { label: 'क्षेत्र', val: v.states }].map((d, j) => (
                    <div key={j}>
                      <div style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.55rem', fontWeight: 600, color: '#bbb', marginBottom: 1 }}>{d.label}</div>
                      <div style={{ fontFamily: "'DM Sans', 'Noto Sans Devanagari'", fontSize: '0.78rem', fontWeight: 600, color: '#444' }}>{d.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 720px) { .variety-cards { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

/* ─── DIRECTORY ─── */
export function DirectoryPreview() {
  const cats = [
    { icon: '🏭', name: 'प्रसंस्करण कंपनियाँ', count: '245+' },
    { icon: '📦', name: 'निर्यातक', count: '180+' },
    { icon: '❄️', name: 'कोल्ड स्टोरेज', count: '520+' },
    { icon: '⚙️', name: 'उपकरण', count: '95+' },
    { icon: '🌱', name: 'बीज आपूर्ति', count: '130+' },
    { icon: '🧪', name: 'अनुसंधान', count: '42+' },
  ];
  return (
    <section id="directory" style={{ padding: '64px 28px 72px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
          <div style={{ width: 4, height: 28, background: '#E53E3E', borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#1a1a1a' }}>उद्योग डायरेक्टरी</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10 }}>
          {cats.map((c, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 8, padding: '28px 20px', border: '1px solid #eee', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
              <div style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: '0.85rem', fontWeight: 800, color: '#E53E3E' }}>{c.count}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHATSAPP CTA ─── */
export function WhatsAppCTA() {
  return (
    <section id="whatsapp" style={{ padding: '56px 28px', background: '#E53E3E' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ width: 64, height: 64, borderRadius: 10, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, flexShrink: 0 }}>💬</div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <h2 style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: 6 }}>WhatsApp पर रोज़ अपडेट पाएँ</h2>
          <p style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>मंडी भाव · योजनाएँ · खेती टिप्स · समाचार — मुफ्त · 15,000+ सदस्य</p>
        </div>
        <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#E53E3E', textDecoration: 'none', padding: '14px 32px', borderRadius: 6, fontFamily: "'Noto Sans Devanagari'", fontSize: '0.95rem', fontWeight: 800, flexShrink: 0 }}>📲 अभी जॉइन करें</a>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
export function Footer() {
  return (
    <footer style={{ background: '#f9fafb', padding: '52px 28px 20px', borderTop: '1px solid #eee' }}>
      <div className="footer-g" style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ background: '#E53E3E', width: 32, height: 32, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🥔</div>
            <span style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '1.05rem', fontWeight: 800, color: '#E53E3E' }}>इंडियन पोटैटो</span>
          </div>
          <p style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.82rem', color: '#888', lineHeight: 1.7, maxWidth: 280 }}>भारत का #1 आलू उद्योग मंच — किसानों, व्यापारियों और प्रसंस्करण उद्योग को जोड़ता है।</p>
        </div>
        {[
          { title: 'जानकारी', links: [{ l: 'मंडी भाव', h: '/mandi' }, { l: 'किस्में', h: '/kisme' }, { l: 'निर्यात डेटा', h: '/samachar' }, { l: 'खेती गाइड', h: '/samachar' }, { l: 'सरकारी योजनाएँ', h: '/yojnaye' }] },
          { title: 'उद्योग', links: [{ l: 'डायरेक्टरी', h: '/directory' }, { l: 'कार्यक्रम', h: '/samachar' }, { l: 'प्रसंस्करण', h: '/directory' }, { l: 'कोल्ड स्टोरेज', h: '/directory' }] },
          { title: 'कंपनी', links: [{ l: 'हमारे बारे में', h: '/sampark' }, { l: 'संपर्क', h: '/sampark' }, { l: 'विज्ञापन', h: '/sampark' }, { l: 'गोपनीयता नीति', h: '/sampark' }] },
        ].map((col, i) => (
          <div key={i}>
            <h4 style={{ fontFamily: "'DM Sans'", fontSize: '0.7rem', fontWeight: 700, color: '#E53E3E', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>{col.title}</h4>
            {col.links.map((link, j) => (
              <Link key={j} href={link.h} style={{ display: 'block', fontFamily: "'Noto Sans Devanagari'", fontSize: '0.82rem', color: '#888', padding: '4px 0', textDecoration: 'none' }}>{link.l}</Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1320, margin: '36px auto 0', paddingTop: 16, borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontFamily: "'Noto Sans Devanagari'", fontSize: '0.72rem', color: '#aaa' }}>© 2026 इंडियन पोटैटो। सर्वाधिकार सुरक्षित।</span>
        <span style={{ fontFamily: "'DM Sans'", fontSize: '0.72rem', color: '#aaa' }}>indianpotato.in</span>
      </div>
      <style>{`
        @media (max-width: 800px) { .footer-g { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .footer-g { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
