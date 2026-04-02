import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/blog';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'PM किसान सम्मान निधि योजना क्या है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PM किसान सम्मान निधि योजना के तहत सभी किसान परिवारों को ₹6,000 प्रति वर्ष तीन समान किस्तों में सीधे बैंक खाते में दिया जाता है।',
      },
    },
    {
      '@type': 'Question',
      name: 'कोल्ड स्टोरेज सब्सिडी कितनी मिलती है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PMKSY के तहत नए कोल्ड स्टोरेज निर्माण पर 35-50% तक सरकारी अनुदान मिलता है।',
      },
    },
    {
      '@type': 'Question',
      name: 'किसान क्रेडिट कार्ड पर ब्याज दर क्या है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'किसान क्रेडिट कार्ड पर ₹5 लाख तक के फसल ऋण पर 4% ब्याज दर लगती है, समय पर भुगतान करने पर 3% की अतिरिक्त छूट मिलती है।',
      },
    },
    {
      '@type': 'Question',
      name: 'PMFME योजना में आलू प्रसंस्करण पर कितनी सब्सिडी मिलती है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PMFME योजना में आलू चिप्स, फ्लेक्स, स्टार्च जैसे सूक्ष्म प्रसंस्करण उद्यमों के लिए परियोजना लागत का 35% (अधिकतम ₹10 लाख) सब्सिडी मिलती है।',
      },
    },
  ],
};

/* All scheme cards — hardcoded highlights + dynamic blog posts */
const highlightSchemes = [
  { icon: '🌾', name: 'PM किसान सम्मान निधि', benefit: '₹6,000/वर्ष', desc: 'तीन किस्तों में सीधे बैंक खाते में — सभी किसान परिवारों के लिए', status: 'सक्रिय', link: '/samachar/pm-kisan-samman-nidhi-yojana' },
  { icon: '❄️', name: 'कोल्ड स्टोरेज सब्सिडी (PMKSY)', benefit: '35-50% अनुदान', desc: 'नए कोल्ड स्टोरेज निर्माण पर सरकारी सब्सिडी — PMKSY के तहत', status: 'सक्रिय', link: '/samachar/cold-storage-subsidy-scheme-india' },
  { icon: '🧬', name: 'लेडी रोसेटा विस्तार योजना', benefit: '75% सब्सिडी', desc: 'बिहार 17 जिलों में प्रसंस्करण-गुणवत्ता आलू पर ₹93,863/हे. अनुदान', status: 'नई', link: '/samachar/bihar-lady-rosetta-vistar-yojana' },
  { icon: '💰', name: 'किसान क्रेडिट कार्ड (KCC)', benefit: '4% ब्याज दर', desc: '₹5 लाख तक का फसल ऋण — समय पर भुगतान पर 3% छूट', status: 'सक्रिय', link: '/samachar/kisan-credit-card-yojana' },
  { icon: '🏭', name: 'PMFME — सूक्ष्म प्रसंस्करण सब्सिडी', benefit: '35% / ₹10 लाख', desc: 'आलू चिप्स, फ्लेक्स, स्टार्च बनाने के लिए सूक्ष्म उद्यम सब्सिडी', status: 'सक्रिय', link: '/samachar/pmfme-yojana-potato-processing' },
  { icon: '🏦', name: 'NABARD कोल्ड स्टोरेज लोन', benefit: '3% ब्याज छूट', desc: 'AIF से ₹2 करोड़ तक लोन — 7 वर्षों तक 3% ब्याज सहायता + CGTMSE गारंटी', status: 'सक्रिय', link: '/samachar/nabard-cold-storage-subsidy-loan' },
  { icon: '🥔', name: 'UP आलू खेती योजनाएँ', benefit: '50% उपकरण अनुदान', desc: 'उत्तर प्रदेश — प्लांटर, हार्वेस्टर, ड्रिप सिंचाई, बीज अनुदान', status: 'राज्य', link: '/samachar/up-aloo-kheti-yojana' },
  { icon: '🏗️', name: 'गुजरात प्रसंस्करण योजनाएँ', benefit: '35-50% सब्सिडी', desc: 'गुजरात — GIDC भूमि, बिजली छूट, SGST प्रतिपूर्ति, कॉन्ट्रैक्ट फार्मिंग', status: 'राज्य', link: '/samachar/gujarat-aloo-processing-yojana' },
];

export const metadata: Metadata = {
  title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी | Govt Schemes for Potato Farmers',
  description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, PMFME, NABARD लोन, किसान क्रेडिट कार्ड, UP और गुजरात राज्य योजनाएँ।',
  alternates: {
    canonical: 'https://www.indianpotato.in/yojnaye',
  },
  openGraph: {
    title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी',
    description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, PMFME, NABARD लोन, और राज्य स्तरीय योजनाएँ।',
    url: 'https://www.indianpotato.in/yojnaye',
    type: 'website',
  },
};

export default function YojnayePage() {
  // Pull scheme-related blog posts dynamically
  const allPosts = getAllPosts();
  const schemePosts = allPosts.filter(
    (p) => p.category === 'policy' || p.tags.some((t) => t.includes('योजना') || t.includes('सब्सिडी'))
  );

  // Deduplicate: remove posts already in highlightSchemes
  const highlightSlugs = new Set(highlightSchemes.map((s) => s.link.replace('/samachar/', '')));
  const additionalPosts = schemePosts.filter((p) => !highlightSlugs.has(p.slug));

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'योजनाएँ', url: 'https://www.indianpotato.in/yojnaye' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-r from-red-700 to-red-600 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <BreadcrumbNav items={[
              { name: 'होम', url: '/' },
              { name: 'योजनाएँ', url: '/yojnaye' },
            ]} />
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: 12 }}>
              सरकारी योजनाएँ
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.75)', maxWidth: 600 }}>
              आलू किसानों और प्रसंस्करण उद्योग के लिए केंद्र व राज्य सरकार की योजनाएँ, अनुदान और सब्सिडी
            </p>
          </div>
        </div>

        {/* All Scheme Cards */}
        <section style={{ padding: '80px 20px', background: '#f9fafb' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
              <div style={{ width: 4, height: 28, background: '#E53E3E', borderRadius: 2 }} />
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, color: '#333' }}>प्रमुख योजनाएँ</h2>
            </div>
            <div className="scheme-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
              {highlightSchemes.map((s, i) => (
                <Link key={i} href={s.link} className="scheme-card" style={{ background: '#fff', padding: '28px 24px', border: '1px solid #eee', borderLeft: '4px solid #E53E3E', borderRadius: 10, cursor: 'pointer', position: 'relative', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease' }}>
                  <div style={{ position: 'absolute', top: 16, right: 16, padding: '4px 12px', borderRadius: 20, fontSize: '0.62rem', fontWeight: 700,
                    background: s.status === 'नई' ? '#fef2f2' : s.status === 'राज्य' ? '#eff6ff' : '#dcfce7',
                    color: s.status === 'नई' ? '#dc2626' : s.status === 'राज्य' ? '#1d4ed8' : '#166534',
                  }}>{s.status}</div>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 16 }}>{s.icon}</div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#333', marginBottom: 6, lineHeight: 1.3 }}>{s.name}</h3>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#E53E3E', marginBottom: 10 }}>{s.benefit}</div>
                  <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6, marginBottom: 12 }}>{s.desc}</p>
                  <span className="scheme-arrow" style={{ fontSize: '0.78rem', fontWeight: 600, color: '#dc2626', opacity: 0, transition: 'opacity 0.3s' }}>विवरण देखें →</span>
                </Link>
              ))}
            </div>
          </div>
          <style>{`
            .scheme-card:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(220,38,38,0.12); background: linear-gradient(180deg, #fff 0%, #fef8f8 100%) !important; }
            .scheme-card:hover .scheme-arrow { opacity: 1 !important; }
          `}</style>
        </section>

        {/* Additional scheme-related blog posts */}
        {additionalPosts.length > 0 && (
          <section style={{ padding: '0 20px 80px', background: '#f9fafb' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                <div style={{ width: 4, height: 28, background: '#E53E3E', borderRadius: 2 }} />
                <h2 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 700, color: '#333' }}>और योजना-संबंधी लेख</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                {additionalPosts.map((post) => (
                  <Link key={post.slug} href={'/samachar/' + post.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', border: '1px solid #eee', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#333', lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h3>
                      <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.6 }}>{post.excerpt.slice(0, 120)}…</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
