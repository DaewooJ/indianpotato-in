import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/blog';
import { getAllListings, INDIAN_STATES, DIRECTORY_CATEGORIES } from '@/lib/directory';

/* ─── State Data ─── */
interface StateData {
  slug: string;
  name: string;
  nameEn: string;
  tagline: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  overview: string[];
  topDistricts: string[];
  varieties: string[];
  mandiPostSlug?: string;
  schemePostSlug?: string;
}

const stateDataMap: Record<string, StateData> = {
  'uttar-pradesh': {
    slug: 'uttar-pradesh', name: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh',
    tagline: 'भारत का #1 आलू उत्पादक राज्य',
    subtitle: 'उत्पादन, मंडी भाव, प्रमुख ज़िले, कोल्ड स्टोरेज और उद्योग डायरेक्टरी',
    stats: [
      { value: '16.8M टन', label: 'वार्षिक उत्पादन' },
      { value: '6.16 लाख हे.', label: 'खेती क्षेत्र' },
      { value: '#1', label: 'भारत में सबसे बड़ा उत्पादक' },
      { value: '2,500+', label: 'कोल्ड स्टोरेज' },
    ],
    overview: [
      'उत्तर प्रदेश भारत के कुल आलू उत्पादन का लगभग 31-33% अकेले उत्पादित करता है — 2024-25 में अनुमानित 16-17 मिलियन टन।',
      'राज्य के पश्चिमी और मध्य ज़िलों की उपजाऊ गंगा-यमुना दोआब की मिट्टी, सर्दियों का अनुकूल तापमान, और व्यापक सिंचाई सुविधा ने इसे आलू उत्पादन का केंद्र बनाया है।',
      'UP में आलू रबी फसल के रूप में उगाया जाता है — अक्टूबर-नवम्बर में बुवाई और फ़रवरी-मार्च में कटाई। राज्य में 2,500+ कोल्ड स्टोरेज हैं — भारत में सर्वाधिक।',
      'PepsiCo (Lay\'s), Haldiram\'s, ITC (Bingo) जैसी प्रसंस्करण कंपनियाँ UP से बड़ी मात्रा में आलू ख़रीदती हैं। कॉन्ट्रैक्ट फार्मिंग का विस्तार हो रहा है।',
    ],
    topDistricts: ['आगरा', 'फर्रुखाबाद', 'हाथरस', 'मैनपुरी', 'कानपुर', 'फ़िरोज़ाबाद', 'बरेली', 'अलीगढ़', 'मथुरा', 'लखनऊ'],
    varieties: ['कुफरी ज्योति', 'कुफरी पुखराज', 'कुफरी बहार', 'कुफरी चिप्सोना-1'],
    mandiPostSlug: 'uttar-pradesh-aloo-mandi-bhav',
    schemePostSlug: 'up-aloo-kheti-yojana',
  },
};

export async function generateStaticParams() {
  return Object.keys(stateDataMap).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const state = stateDataMap[params.slug];
  if (!state) return { title: 'राज्य नहीं मिला' };
  return {
    title: `${state.name} आलू उद्योग — मंडी भाव, किस्में, कोल्ड स्टोरेज | Indian Potato`,
    description: `${state.name} में आलू उत्पादन, ताज़ा मंडी भाव, प्रमुख ज़िले, कोल्ड स्टोरेज, सरकारी योजनाएँ और उद्योग डायरेक्टरी।`,
    alternates: { canonical: `https://www.indianpotato.in/state/${state.slug}` },
    openGraph: {
      title: `${state.name} — ${state.tagline}`,
      description: `${state.name} में आलू उत्पादन, मंडी भाव, किस्में, कोल्ड स्टोरेज और सरकारी योजनाएँ।`,
      url: `https://www.indianpotato.in/state/${state.slug}`,
      type: 'website',
    },
  };
}

export default function StatePage({ params }: { params: { slug: string } }) {
  const state = stateDataMap[params.slug];
  if (!state) notFound();

  // Filter blog posts for this state
  const allPosts = getAllPosts();
  const statePosts = allPosts.filter(
    (p) => p.title.includes(state.name) || p.title.includes(state.nameEn) ||
           p.tags.some((t) => t.includes(state.name) || t.includes(state.nameEn)) ||
           (state.topDistricts.some((d) => p.title.includes(d)))
  ).slice(0, 6);

  // Filter directory listings for this state
  const allListings = getAllListings();
  const stateListings = allListings.filter(
    (l) => l.stateEn === state.nameEn || l.state === state.name
  );

  // Group listings by category
  const listingsByCategory: Record<string, typeof stateListings> = {};
  for (const l of stateListings) {
    if (!listingsByCategory[l.category]) listingsByCategory[l.category] = [];
    listingsByCategory[l.category].push(l);
  }

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: state.name, url: `https://www.indianpotato.in/state/${state.slug}` },
      ]} />
      <Navbar />
      <main className="pt-[76px]">

        {/* HERO */}
        <section style={{ background: '#fff', padding: 'clamp(60px, 10vw, 100px) 20px clamp(48px, 8vw, 80px)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 50, padding: '4px 14px', marginBottom: 24, fontSize: 12, color: '#dc2626', fontWeight: 600, letterSpacing: '0.05em' }}>
              राज्य
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16, maxWidth: 700 }}>
              {state.name} — {state.tagline}
            </h1>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, maxWidth: 550, marginBottom: 32 }}>
              {state.subtitle}
            </p>

            {/* Stat cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              {state.stats.map((s, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: '16px 24px', minWidth: 140, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#dc2626', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 1 — Overview */}
        <section style={{ padding: '64px 20px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SectionHeader title="राज्य अवलोकन" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
              {state.overview.map((p, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{p}</p>
              ))}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginTop: 28, marginBottom: 12 }}>शीर्ष 10 आलू उत्पादक ज़िले</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {state.topDistricts.map((d, i) => (
                <span key={i} style={{ padding: '6px 14px', borderRadius: 50, background: '#fff', border: '1px solid #e5e7eb', fontSize: 13, color: '#374151', fontWeight: 500 }}>{d}</span>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — Mandi Prices */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SectionHeader title="ताज़ा मंडी भाव" />
            <div style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 16, padding: 28, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.6, marginBottom: 20 }}>
                {state.name} की प्रमुख मंडियों से आलू के ताज़ा थोक भाव — data.gov.in API से लाइव अपडेट
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/mandi" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px', borderRadius: 50,
                  background: '#dc2626', color: '#fff',
                  fontWeight: 600, fontSize: 14, textDecoration: 'none',
                }}>
                  {state.name} मंडी भाव देखें →
                </Link>
                {state.mandiPostSlug && (
                  <Link href={`/samachar/${state.mandiPostSlug}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '12px 24px', borderRadius: 50,
                    background: '#fff', border: '1.5px solid #e5e7eb', color: '#1f2937',
                    fontWeight: 600, fontSize: 14, textDecoration: 'none',
                  }}>
                    विस्तृत मंडी गाइड पढ़ें
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — Related Blog Posts */}
        {statePosts.length > 0 && (
          <section style={{ padding: '64px 20px', background: '#fafafa' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <SectionHeader title="संबंधित समाचार" link="/samachar" linkText="सभी समाचार →" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
                {statePosts.map((post) => (
                  <Link key={post.slug} href={'/samachar/' + post.slug} className="state-card" style={{
                    display: 'block', background: '#fff', borderRadius: 16, padding: 24,
                    border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    textDecoration: 'none', color: 'inherit',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category_hindi}</span>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 8, marginBottom: 8 }}>{post.title}</h3>
                    <div style={{ fontSize: 13, color: '#9ca3af' }}>{formatDate(post.date)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SECTION 4 — Directory */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SectionHeader title="उद्योग डायरेक्टरी" link="/directory" linkText="पूरी डायरेक्टरी →" />
            {stateListings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {Object.entries(listingsByCategory).map(([catSlug, listings]) => {
                  const catConfig = DIRECTORY_CATEGORIES.find((c) => c.slug === catSlug);
                  return (
                    <div key={catSlug}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>
                        {catConfig?.name || catSlug} ({listings.length})
                      </h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="state-grid">
                        {listings.slice(0, 4).map((l) => (
                          <Link key={l.slug} href={`/directory/${l.category}/${l.slug}`} className="state-card" style={{
                            display: 'block', background: '#fff', borderRadius: 12, padding: 20,
                            border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                            textDecoration: 'none', color: 'inherit',
                            transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                          }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>{l.name}</div>
                            <div style={{ fontSize: 13, color: '#9ca3af' }}>{l.district}, {l.state}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: '#fafafa', borderRadius: 12, padding: '32px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 16 }}>जल्द ही {state.name} की कंपनियाँ यहाँ दिखेंगी</p>
                <Link href="/directory" style={{ fontSize: 14, fontWeight: 500, color: '#dc2626', textDecoration: 'none' }}>डायरेक्टरी देखें →</Link>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 5 — Varieties */}
        <section style={{ padding: '64px 20px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SectionHeader title="प्रमुख आलू किस्में" link="/kisme" linkText="सभी किस्में →" />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {state.varieties.map((v, i) => (
                <Link key={i} href="/kisme" className="state-card" style={{
                  display: 'block', background: '#fff', borderRadius: 12, padding: '16px 24px',
                  border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  textDecoration: 'none', fontSize: 15, fontWeight: 600, color: '#1f2937',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}>
                  {v}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6 — Schemes */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SectionHeader title="सरकारी योजनाएँ" link="/yojnaye" linkText="सभी योजनाएँ →" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              {state.schemePostSlug && (
                <Link href={`/samachar/${state.schemePostSlug}`} className="state-card" style={{
                  display: 'block', background: '#fff', borderRadius: 16, padding: 24,
                  border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  textDecoration: 'none', color: 'inherit',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>राज्य योजना</span>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 8 }}>{state.name} आलू खेती योजनाएँ</h3>
                  <span style={{ display: 'inline-block', marginTop: 12, fontSize: 13, fontWeight: 500, color: '#dc2626' }}>विवरण पढ़ें →</span>
                </Link>
              )}
              <Link href="/yojnaye" className="state-card" style={{
                display: 'block', background: '#fff', borderRadius: 16, padding: 24,
                border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                textDecoration: 'none', color: 'inherit',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>केंद्र सरकार</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 8 }}>PM किसान, KCC, PMFME, NABARD और अन्य</h3>
                <span style={{ display: 'inline-block', marginTop: 12, fontSize: 13, fontWeight: 500, color: '#dc2626' }}>सभी योजनाएँ देखें →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section style={{ padding: '64px 20px', background: '#111827' }}>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 600, color: '#fff', marginBottom: 12 }}>
              {state.name} के आलू उद्योग से जुड़ें
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
              5,000+ किसान और व्यापारी WhatsApp पर जुड़े हैं
            </p>
            <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" className="wa-cta-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 32px', borderRadius: 50,
              background: '#fff', color: '#111827',
              textDecoration: 'none', fontWeight: 600, fontSize: 15,
              transition: 'background 0.25s',
            }}>
              WhatsApp ग्रुप जॉइन करें
            </a>
          </div>
          <style>{`.wa-cta-btn:hover { background: #f3f4f6 !important; }`}</style>
        </section>

      </main>
      <Footer />

      <style>{`
        .state-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important; }
        @media (max-width: 768px) { .state-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}

/* ─── Reusable Section Header ─── */
function SectionHeader({ title, link, linkText }: { title: string; link?: string; linkText?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
      <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700, color: '#111827' }}>{title}</h2>
      {link && linkText && (
        <Link href={link} style={{ fontSize: 14, fontWeight: 500, color: '#dc2626', textDecoration: 'none' }}>{linkText}</Link>
      )}
    </div>
  );
}
