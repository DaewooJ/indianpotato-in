'use client';

import Link from 'next/link';

/* ─── NEWS (dynamic — receives posts as props) ─── */
interface NewsPost {
  slug: string; title: string; image: string; date: string;
  category_hindi: string; excerpt: string; readingTime: number;
}

export function NewsSection({ posts }: { posts: NewsPost[] }) {
  const featured = posts[0];
  const others = posts.slice(1, 6);
  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return d; }
  };

  if (!featured) return null;

  return (
    <section id="news" style={{ padding: '80px 20px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 4, height: 28, background: '#05420d', borderRadius: 2 }} />
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#333' }}>ताज़ा समाचार</h2>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#999', marginTop: 4, paddingLeft: 16 }}>अपडेट: {formatDate(featured.date)}</div>
          </div>
          <Link href="/samachar" style={{ textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, color: '#05420d', borderBottom: '2px solid #05420d', paddingBottom: 2 }}>सभी समाचार →</Link>
        </div>
        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
          <Link href={'/samachar/' + featured.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #eee', background: '#fff', display: 'flex', flexDirection: 'column', height: '100%', transition: 'box-shadow 0.3s' }}>
              <div style={{ position: 'relative' }}>
                <img src={featured.image} alt={featured.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} loading="lazy" />
                <div style={{ position: 'absolute', top: 12, left: 12, background: '#05420d', padding: '5px 14px', borderRadius: 4, fontSize: '0.65rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>🔥 मुख्य ख़बर</div>
              </div>
              <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ display: 'inline-block', width: 'fit-content', background: '#f0fdf4', color: '#05420d', padding: '3px 12px', borderRadius: 3, fontSize: '0.72rem', fontWeight: 700, marginBottom: 14 }}>{featured.category_hindi}</span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#333', lineHeight: 1.4, marginBottom: 14 }}>{featured.title}</h3>
                <div style={{ fontSize: '0.78rem', color: '#aaa' }}>{formatDate(featured.date)}</div>
              </div>
            </div>
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {others.map((a) => (
              <Link key={a.slug} href={'/samachar/' + a.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '14px 18px', background: '#f9fafb', borderRadius: 8, flex: 1, display: 'flex', gap: 14, alignItems: 'center', border: '1px solid #f0f0f0', transition: 'box-shadow 0.2s' }}>
                  <img src={a.image} alt={a.title} style={{ width: 88, aspectRatio: '16/9', borderRadius: 6, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, color: '#05420d', background: '#f0fdf4', padding: '1px 7px', borderRadius: 3 }}>{a.category_hindi}</span>
                      <span style={{ fontSize: '0.62rem', color: '#ccc' }}>{formatDate(a.date)}</span>
                    </div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#333', lineHeight: 1.4 }}>{a.title}</h4>
                  </div>
                </div>
              </Link>
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
  { icon: '🌾', name: 'PM किसान सम्मान निधि', benefit: '₹6,000/वर्ष', desc: 'तीन किस्तों में सीधे बैंक खाते में — सभी किसान परिवारों के लिए', status: 'सक्रिय', link: '/samachar/pm-kisan-samman-nidhi-yojana' },
  { icon: '❄️', name: 'कोल्ड स्टोरेज सब्सिडी', benefit: '35-50% अनुदान', desc: 'नए कोल्ड स्टोरेज निर्माण पर सरकारी सब्सिडी — PMKSY के तहत', status: 'सक्रिय', link: '/samachar/cold-storage-subsidy-scheme-india' },
  { icon: '🧬', name: 'लेडी रोसेटा विस्तार योजना', benefit: '75% सब्सिडी', desc: 'बिहार 17 जिलों में प्रसंस्करण-गुणवत्ता आलू पर ₹93,863/हे. अनुदान', status: 'नई', link: '/samachar/bihar-lady-rosetta-vistar-yojana' },
  { icon: '💰', name: 'किसान क्रेडिट कार्ड', benefit: '4% ब्याज दर', desc: '₹5 लाख तक का फसल ऋण — समय पर भुगतान पर 3% छूट', status: 'सक्रिय', link: '/samachar/kisan-credit-card-yojana' },
];

export function GovSchemes() {
  return (
    <section id="schemes" style={{ padding: '80px 20px', background: '#fafafa' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 4, height: 28, background: '#05420d', borderRadius: 2 }} />
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#333' }}>सरकारी योजनाएँ</h2>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#999', marginTop: 4, paddingLeft: 16 }}>अपडेट: अप्रैल 2026</div>
          </div>
          <Link href="/yojnaye" style={{ textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, color: '#05420d', borderBottom: '2px solid #05420d', paddingBottom: 2 }}>सभी योजनाएँ →</Link>
        </div>
        <div className="scheme-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {schemes.map((s, i) => (
            <Link key={i} href={s.link || '/yojnaye'} className="scheme-card" style={{
              background: '#fff', padding: 28, borderRadius: 16,
              border: '1px solid #f0f0f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              textDecoration: 'none', color: 'inherit',
              display: 'flex', flexDirection: 'column',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>केंद्र सरकार</span>
                <span style={{ padding: '4px 10px', borderRadius: 50, fontSize: 11, fontWeight: 600,
                  background: s.status === 'नई' ? '#dbeafe' : '#dcfce7',
                  color: s.status === 'नई' ? '#1d4ed8' : '#166534',
                }}>{s.status}</span>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: '#1f2937', lineHeight: 1.35, marginBottom: 10 }}>{s.name}</h3>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#05420d', marginBottom: 12, letterSpacing: '-0.02em' }}>{s.benefit}</div>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 16, flex: 1 }}>{s.desc}</p>
              <span className="scheme-cta" style={{ fontSize: 14, fontWeight: 500, color: '#05420d', transition: 'opacity 0.25s' }}>विवरण पढ़ें →</span>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        .scheme-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important; }
        .scheme-card:hover .scheme-cta { text-decoration: underline; }
        @media (max-width: 768px) { .scheme-cards { grid-template-columns: 1fr !important; gap: 16px !important; } }
      `}</style>
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
    <section id="varieties" style={{ padding: '80px 20px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 4, height: 28, background: '#05420d', borderRadius: 2 }} />
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#333' }}>आलू की प्रमुख किस्में</h2>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#999', marginTop: 4, paddingLeft: 16 }}>अपडेट: मार्च 2026</div>
          </div>
          <Link href="/kisme" style={{ textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, color: '#05420d', borderBottom: '2px solid #05420d', paddingBottom: 2 }}>सभी किस्में →</Link>
        </div>
        <div className="variety-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {varieties.map((v, i) => (
            <div key={i} className="variety-card" style={{ background: '#fff', borderRadius: 12, padding: '20px', border: '1px solid #bbf7d0', cursor: 'default', display: 'flex', gap: 18, alignItems: 'flex-start', transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease' }}>
              <img src={v.img} alt={v.name + ' — भारतीय आलू किस्म'} style={{ width: 80, height: 80, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 10 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#333', marginBottom: 5 }}>{v.name}</h3>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                    color: v.proc ? '#c2410c' : '#166534',
                    background: v.proc ? '#fff7ed' : '#f0fdf4',
                  }}>{v.use}</span>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                  {[{ label: 'अवधि', val: v.days }, { label: 'उपज', val: v.yield }, { label: 'क्षेत्र', val: v.states }].map((d, j) => (
                    <div key={j}>
                      <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#aaa', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.label}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#444' }}>{d.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 12, color: '#9ca3af', fontStyle: 'italic', marginTop: 10 }}>जल्द ही विवरण उपलब्ध</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) { .variety-cards { grid-template-columns: 1fr !important; } }
        .variety-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.08); border-color: #05420d !important; }
      `}</style>
    </section>
  );
}

/* ─── DIRECTORY ─── */
interface DirCat { icon: string; name: string; slug: string; count: number }

export function DirectoryPreview({ categories }: { categories: DirCat[] }) {
  return (
    <section id="directory" style={{ padding: '80px 20px', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 4, height: 28, background: '#05420d', borderRadius: 2 }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#333' }}>उद्योग डायरेक्टरी</h2>
          </div>
          <Link href="/directory" style={{ textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, color: '#05420d', borderBottom: '2px solid #05420d', paddingBottom: 2 }}>पूरी डायरेक्टरी →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
          {categories.map((c) => (
            <Link key={c.slug} href={'/directory/' + c.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: '#fff', borderRadius: 10, padding: '28px 20px', border: '1px solid #eee', cursor: 'pointer', textAlign: 'center', transition: 'box-shadow 0.2s, transform 0.2s' }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{c.icon}</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#333', marginBottom: 4 }}>{c.name}</div>
                {c.count > 0 && <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#05420d' }}>{c.count} कंपनियाँ</div>}
                {c.count === 0 && <div style={{ fontSize: '0.78rem', color: '#aaa' }}>जल्द आ रहा है</div>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WHATSAPP CTA ─── */
export function WhatsAppCTA() {
  return (
    <section id="whatsapp" style={{ padding: '80px 20px', background: '#111827' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.75rem)', fontWeight: 600, color: '#fff', lineHeight: 1.3, marginBottom: 12 }}>
          आलू उद्योग से जुड़े रहें
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 32 }}>
          5,000+ सदस्य · मंडी भाव · योजनाएँ · समाचार
        </p>
        <a
          href="https://spuds.me/kisan"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-cta-btn"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 32px', borderRadius: 50,
            background: '#fff', color: '#111827',
            textDecoration: 'none', fontWeight: 600, fontSize: 15,
            transition: 'background 0.25s ease',
          }}
        >
          WhatsApp ग्रुप जॉइन करें
        </a>
      </div>
      <style>{`.wa-cta-btn:hover { background: #f3f4f6 !important; }`}</style>
    </section>
  );
}

/* ─── FOOTER ─── */
export function Footer() {
  return (
    <footer style={{ background: '#f9fafb', padding: '0 28px 20px', borderTop: '1px solid #eee' }}>
      {/* Stats Row */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 0', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 40, borderBottom: '1px solid #e5e7eb', marginBottom: 32 }}>
        {[
          { number: '15+', label: 'लेख और गाइड' },
          { number: '54+', label: 'कंपनियाँ डायरेक्टरी में' },
          { number: '5,000+', label: 'WhatsApp सदस्य' },
          { number: '86+', label: 'मंडी भाव रोज़ाना' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: 120 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#05420d' }}>{stat.number}</div>
            <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="footer-g" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ background: '#05420d', width: 32, height: 32, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🥔</div>
            <span style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '1.05rem', fontWeight: 800, color: '#05420d' }}>इंडियन पोटैटो</span>
          </div>
          <p style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.82rem', color: '#888', lineHeight: 1.7, maxWidth: 280 }}>भारत का #1 आलू उद्योग मंच — किसानों, व्यापारियों और प्रसंस्करण उद्योग को जोड़ता है।</p>
        </div>
        {[
          { title: 'जानकारी', links: [{ l: 'मंडी भाव', h: '/mandi' }, { l: 'किस्में', h: '/kisme' }, { l: 'निर्यात डेटा', h: '/samachar' }, { l: 'खेती गाइड', h: '/samachar' }, { l: 'सरकारी योजनाएँ', h: '/yojnaye' }] },
          { title: 'उद्योग', links: [{ l: 'डायरेक्टरी', h: '/directory' }, { l: 'कार्यक्रम', h: '/samachar' }, { l: 'प्रसंस्करण', h: '/directory' }, { l: 'कोल्ड स्टोरेज', h: '/directory' }] },
          { title: 'कंपनी', links: [{ l: 'हमारे बारे में', h: '/about' }, { l: 'संपर्क', h: '/sampark' }, { l: 'विज्ञापन', h: '/sampark' }, { l: 'गोपनीयता नीति', h: '/privacy-policy' }, { l: 'नियम व शर्तें', h: '/terms-and-conditions' }, { l: 'अस्वीकरण', h: '/disclaimer' }] },
        ].map((col, i) => (
          <div key={i}>
            <h4 style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.7rem', fontWeight: 700, color: '#05420d', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 14 }}>{col.title}</h4>
            {col.links.map((link, j) => (
              <Link key={j} href={link.h} style={{ display: 'block', fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.82rem', color: '#888', padding: '4px 0', textDecoration: 'none' }}>{link.l}</Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1320, margin: '36px auto 0', paddingTop: 16, borderTop: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.72rem', color: '#aaa' }}>© 2026 इंडियन पोटैटो। सर्वाधिकार सुरक्षित।</span>
        <span style={{ fontFamily: 'var(--font-poppins), sans-serif', fontSize: '0.72rem', color: '#aaa' }}>indianpotato.in</span>
      </div>
      <style>{`
        @media (max-width: 800px) { .footer-g { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .footer-g { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
