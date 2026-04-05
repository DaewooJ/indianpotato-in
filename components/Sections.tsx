'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ─── REVEAL CARD WRAPPER ─── */
function RevealCard({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── SECTION HEADER HELPER ─── */
function SectionHeader({ title, subtitle, linkText, linkHref }: { title: string; subtitle?: string; linkText?: string; linkHref?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
      <div>
        <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 1.85rem)', fontWeight: 700, color: '#111827', margin: 0 }}>{title}</h2>
        {subtitle && <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginTop: 6 }}>{subtitle}</p>}
      </div>
      {linkText && linkHref && (
        <Link href={linkHref} style={{ textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, color: '#05420d', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
          {linkText} <span style={{ fontSize: '1rem' }}>→</span>
        </Link>
      )}
    </div>
  );
}

/* ─── NEWS ─── */
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
    <section id="news" style={{ padding: '64px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader title="ताज़ा समाचार" linkText="सभी समाचार" linkHref="/samachar" />
        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
          <Link href={'/samachar/' + featured.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb', background: '#fff', display: 'flex', flexDirection: 'column', height: '100%', transition: 'box-shadow 0.25s' }} className="news-featured">
              <div style={{ position: 'relative' }}>
                <img src={featured.image} alt={featured.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} loading="lazy" />
              </div>
              <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#05420d', background: '#f0fdf4', border: '1px solid #dcfce7', padding: '2px 10px', borderRadius: 4 }}>{featured.category_hindi}</span>
                  <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{formatDate(featured.date)}</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', lineHeight: 1.4, margin: 0 }}>{featured.title}</h3>
              </div>
            </div>
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {others.map((a) => (
              <Link key={a.slug} href={'/samachar/' + a.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ padding: '14px 16px', background: '#fff', borderRadius: 10, flex: 1, display: 'flex', gap: 14, alignItems: 'center', border: '1px solid #e5e7eb', transition: 'box-shadow 0.2s' }} className="news-item">
                  <img src={a.image} alt={a.title} style={{ width: 80, aspectRatio: '16/9', borderRadius: 8, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: '0.62rem', fontWeight: 600, color: '#05420d', background: '#f0fdf4', padding: '1px 8px', borderRadius: 3 }}>{a.category_hindi}</span>
                      <span style={{ fontSize: '0.62rem', color: '#d1d5db' }}>{formatDate(a.date)}</span>
                    </div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111827', lineHeight: 1.4, margin: 0 }}>{a.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .news-featured:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
        .news-item:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
        @media (max-width: 760px) { .news-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── DIRECTORY PREVIEW ─── */
interface DirCat { icon: string; name: string; nameEn: string; slug: string; count: number }

export function DirectoryPreview({ categories }: { categories: DirCat[] }) {
  return (
    <section id="directory" style={{ padding: '64px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader title="आलू उद्योग डायरेक्टरी" subtitle="बीज कंपनियाँ, प्रोसेसर, निर्यातक, उपकरण — सब एक जगह" />
        <div className="dir-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {categories.map((c, idx) => (
            <RevealCard key={c.slug} delay={idx * 80}>
            <Link href={'/directory/' + c.slug} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{
                background: '#fff', borderRadius: 12, padding: '24px 20px',
                border: '1px solid #e5e7eb', cursor: 'pointer',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }} className="dir-card">
                <div style={{ fontSize: 28, marginBottom: 12 }}>{c.icon}</div>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#111827', marginBottom: 2 }}>{c.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginBottom: 8 }}>{c.nameEn}</div>
                {c.count > 0 ? (
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#05420d', background: '#f0fdf4', padding: '2px 10px', borderRadius: 4 }}>{c.count} कंपनियाँ</span>
                ) : (
                  <span style={{ fontSize: '0.72rem', color: '#d1d5db' }}>जल्द आ रहा है</span>
                )}
              </div>
            </Link>
            </RevealCard>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/directory" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#ed6442', color: '#fff', textDecoration: 'none',
            padding: '12px 28px', borderRadius: 10,
            fontSize: '0.9rem', fontWeight: 600,
            transition: 'background 0.2s',
          }}>सभी कंपनियाँ देखें →</Link>
        </div>
      </div>
      <style>{`
        .dir-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); transform: translateY(-2px); }
        @media (max-width: 860px) { .dir-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .dir-grid { grid-template-columns: 1fr !important; } }
      `}</style>
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
    <section id="schemes" style={{ padding: '64px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader title="सरकारी योजनाएँ" subtitle="आलू किसानों के लिए प्रमुख केंद्रीय और राज्य सरकारी योजनाएँ" linkText="सभी योजनाएँ" linkHref="/yojnaye" />
        <div className="scheme-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {schemes.map((s, i) => (
            <RevealCard key={i} delay={i * 100}>
            <Link href={s.link || '/yojnaye'} className="scheme-card" style={{
              background: '#fff', padding: '24px', borderRadius: 12,
              border: '1px solid #e5e7eb', borderLeft: '3px solid #05420d',
              textDecoration: 'none', color: 'inherit',
              display: 'flex', flexDirection: 'column',
              transition: 'box-shadow 0.25s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.04em' }}>केंद्र सरकार</span>
                <span style={{
                  padding: '3px 10px', borderRadius: 4, fontSize: '0.68rem', fontWeight: 600,
                  background: s.status === 'नई' ? '#eff6ff' : '#f0fdf4',
                  color: s.status === 'नई' ? '#1d4ed8' : '#05420d',
                }}>{s.status}</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', lineHeight: 1.35, marginBottom: 8, margin: 0 }}>{s.name}</h3>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#05420d', marginBottom: 8 }}>{s.benefit}</div>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.6, margin: 0, flex: 1 }}>{s.desc}</p>
            </Link>
            </RevealCard>
          ))}
        </div>
      </div>
      <style>{`
        .scheme-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        @media (max-width: 768px) { .scheme-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── VARIETIES ─── */
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
    <section id="varieties" style={{ padding: '64px 0', background: '#f9fafb' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeader title="प्रमुख आलू किस्में" subtitle="भारत में उगाई जाने वाली प्रमुख आलू किस्मों का डेटाबेस" linkText="सभी किस्में" linkHref="/kisme" />
        <div className="variety-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
          {varieties.map((v, i) => (
            <RevealCard key={i} delay={i * 80}>
            <div className="variety-card" style={{
              background: '#fff', borderRadius: 12, padding: '20px',
              border: '1px solid #e5e7eb',
              display: 'flex', gap: 16, alignItems: 'flex-start',
              transition: 'box-shadow 0.25s',
            }}>
              <img src={v.img} alt={v.name + ' — भारतीय आलू किस्म'} style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} loading="lazy" />
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 10 }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#111827', marginBottom: 6, margin: 0 }}>{v.name}</h3>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 600, padding: '2px 8px', borderRadius: 4,
                    color: v.proc ? '#c2410c' : '#05420d',
                    background: v.proc ? '#fff7ed' : '#f0fdf4',
                  }}>{v.use}</span>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  {[{ label: 'अवधि', val: v.days }, { label: 'उपज', val: v.yield }, { label: 'क्षेत्र', val: v.states }].map((d, j) => (
                    <div key={j}>
                      <div style={{ fontSize: '0.58rem', fontWeight: 600, color: '#9ca3af', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{d.label}</div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#374151' }}>{d.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            </RevealCard>
          ))}
        </div>
      </div>
      <style>{`
        .variety-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
        @media (max-width: 720px) { .variety-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ─── WHATSAPP CTA ─── */
export function WhatsAppCTA() {
  return (
    <section id="whatsapp" style={{ padding: '40px 0', background: '#fff', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: 0, marginBottom: 4 }}>
            आलू उद्योग से जुड़े रहें
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af', margin: 0 }}>
            5,000+ सदस्य · रोज़ाना मंडी भाव · योजनाएँ · समाचार
          </p>
        </div>
        <a
          href="https://spuds.me/kisan"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 28px', borderRadius: 10,
            background: '#ed6442', color: '#fff',
            textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem',
            transition: 'background 0.2s',
          }}
        >
          WhatsApp ग्रुप जॉइन करें →
        </a>
      </div>
    </section>
  );
}

/* ─── FOOTER ─── */
export function Footer() {
  return (
    <footer style={{ background: '#f9fafb', padding: '0 24px 24px', borderTop: '1px solid #e5e7eb' }}>
      {/* Stats Row */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 0', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 40, borderBottom: '1px solid #e5e7eb', marginBottom: 32 }}>
        {[
          { number: '15+', label: 'लेख और गाइड' },
          { number: '54+', label: 'कंपनियाँ डायरेक्टरी में' },
          { number: '5,000+', label: 'WhatsApp सदस्य' },
          { number: '86+', label: 'मंडी भाव रोज़ाना' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: 100 }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#05420d' }}>{stat.number}</div>
            <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="footer-g" style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.8fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <img src="/logo.png" alt="इंडियन पोटैटो" style={{ width: 32, height: 32, borderRadius: 6 }} />
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#05420d' }}>इंडियन पोटैटो</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: '#6b7280', lineHeight: 1.7, maxWidth: 280 }}>भारत का #1 आलू उद्योग मंच — किसानों, व्यापारियों और प्रसंस्करण उद्योग को जोड़ता है।</p>
        </div>
        {[
          { title: 'जानकारी', links: [{ l: 'मंडी भाव', h: '/mandi' }, { l: 'किस्में', h: '/kisme' }, { l: 'निर्यात डेटा', h: '/samachar' }, { l: 'खेती गाइड', h: '/samachar' }, { l: 'सरकारी योजनाएँ', h: '/yojnaye' }] },
          { title: 'उद्योग', links: [{ l: 'डायरेक्टरी', h: '/directory' }, { l: 'कार्यक्रम', h: '/samachar' }, { l: 'प्रसंस्करण', h: '/directory' }, { l: 'कोल्ड स्टोरेज', h: '/directory' }] },
          { title: 'कंपनी', links: [{ l: 'हमारे बारे में', h: '/about' }, { l: 'संपर्क', h: '/sampark' }, { l: 'विज्ञापन', h: '/sampark' }, { l: 'गोपनीयता नीति', h: '/privacy-policy' }, { l: 'नियम व शर्तें', h: '/terms-and-conditions' }, { l: 'अस्वीकरण', h: '/disclaimer' }] },
        ].map((col, i) => (
          <div key={i}>
            <h4 style={{ fontSize: '0.7rem', fontWeight: 700, color: '#05420d', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>{col.title}</h4>
            {col.links.map((link, j) => (
              <Link key={j} href={link.h} style={{ display: 'block', fontSize: '0.82rem', color: '#6b7280', padding: '4px 0', textDecoration: 'none' }}>{link.l}</Link>
            ))}
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1280, margin: '36px auto 0', paddingTop: 16, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>© 2026 इंडियन पोटैटो। सर्वाधिकार सुरक्षित।</span>
        <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>indianpotato.in</span>
      </div>
      <style>{`
        @media (max-width: 800px) { .footer-g { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 500px) { .footer-g { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
