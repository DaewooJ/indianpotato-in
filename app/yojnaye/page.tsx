import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/blog';
import YojnayeClient from './YojnayeClient';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'PM किसान सम्मान निधि योजना क्या है?', acceptedAnswer: { '@type': 'Answer', text: 'PM किसान सम्मान निधि योजना के तहत सभी किसान परिवारों को ₹6,000 प्रति वर्ष तीन समान किस्तों में सीधे बैंक खाते में दिया जाता है।' } },
    { '@type': 'Question', name: 'कोल्ड स्टोरेज सब्सिडी कितनी मिलती है?', acceptedAnswer: { '@type': 'Answer', text: 'PMKSY के तहत नए कोल्ड स्टोरेज निर्माण पर 35-50% तक सरकारी अनुदान मिलता है।' } },
    { '@type': 'Question', name: 'किसान क्रेडिट कार्ड पर ब्याज दर क्या है?', acceptedAnswer: { '@type': 'Answer', text: 'किसान क्रेडिट कार्ड पर ₹5 लाख तक के फसल ऋण पर 4% ब्याज दर लगती है, समय पर भुगतान करने पर 3% की अतिरिक्त छूट मिलती है।' } },
    { '@type': 'Question', name: 'PMFME योजना में आलू प्रसंस्करण पर कितनी सब्सिडी मिलती है?', acceptedAnswer: { '@type': 'Answer', text: 'PMFME योजना में आलू चिप्स, फ्लेक्स, स्टार्च जैसे सूक्ष्म प्रसंस्करण उद्यमों के लिए परियोजना लागत का 35% (अधिकतम ₹10 लाख) सब्सिडी मिलती है।' } },
  ],
};

const schemes = [
  { icon: '🌾', name: 'PM किसान सम्मान निधि', benefit: '₹6,000/वर्ष', desc: 'तीन किस्तों में सीधे बैंक खाते में — सभी किसान परिवारों के लिए', status: 'सक्रिय' as const, type: 'केंद्र' as const, tags: ['किसान', 'आय सहायता'], link: '/samachar/pm-kisan-samman-nidhi-yojana', eligibility: 'सभी भूमिधारक किसान' },
  { icon: '❄️', name: 'कोल्ड स्टोरेज सब्सिडी (PMKSY)', benefit: '35-50% अनुदान', desc: 'नए कोल्ड स्टोरेज निर्माण पर सरकारी सब्सिडी — अधिकतम ₹10 करोड़', status: 'सक्रिय' as const, type: 'केंद्र' as const, tags: ['कोल्ड स्टोरेज', 'अवसंरचना'], link: '/samachar/cold-storage-subsidy-scheme-india', eligibility: 'किसान, FPO, कंपनियाँ' },
  { icon: '🧬', name: 'लेडी रोसेटा विस्तार योजना', benefit: '75% सब्सिडी', desc: 'बिहार 17 ज़िलों में प्रसंस्करण-गुणवत्ता आलू पर ₹93,863/हे. अनुदान', status: 'नई' as const, type: 'राज्य' as const, tags: ['बिहार', 'प्रसंस्करण'], link: '/samachar/bihar-lady-rosetta-vistar-yojana', eligibility: 'बिहार के किसान (17 ज़िले)' },
  { icon: '💰', name: 'किसान क्रेडिट कार्ड (KCC)', benefit: '4% ब्याज दर', desc: '₹5 लाख तक का फसल ऋण — समय पर भुगतान पर वास्तविक ब्याज सिर्फ 1%', status: 'सक्रिय' as const, type: 'केंद्र' as const, tags: ['ऋण', 'किसान'], link: '/samachar/kisan-credit-card-yojana', eligibility: 'सभी किसान' },
  { icon: '🏭', name: 'PMFME — सूक्ष्म प्रसंस्करण', benefit: '35% / ₹10 लाख', desc: 'आलू चिप्स, फ्लेक्स, स्टार्च — सूक्ष्म खाद्य प्रसंस्करण उद्यम सब्सिडी', status: 'सक्रिय' as const, type: 'केंद्र' as const, tags: ['प्रसंस्करण', 'उद्यम'], link: '/samachar/pmfme-yojana-potato-processing', eligibility: 'उद्यमी, SHG, FPO' },
  { icon: '🏦', name: 'NABARD कोल्ड स्टोरेज लोन', benefit: '3% ब्याज छूट', desc: 'AIF से ₹2 करोड़ तक लोन — 7 वर्षों तक ब्याज सहायता + CGTMSE गारंटी', status: 'सक्रिय' as const, type: 'केंद्र' as const, tags: ['कोल्ड स्टोरेज', 'लोन'], link: '/samachar/nabard-cold-storage-subsidy-loan', eligibility: 'किसान, FPO, कंपनियाँ' },
  { icon: '🥔', name: 'UP आलू खेती योजनाएँ', benefit: '50% उपकरण अनुदान', desc: 'उत्तर प्रदेश — प्लांटर, हार्वेस्टर, ड्रिप सिंचाई, बीज अनुदान', status: 'सक्रिय' as const, type: 'राज्य' as const, tags: ['उत्तर प्रदेश', 'उपकरण'], link: '/samachar/up-aloo-kheti-yojana', eligibility: 'UP के किसान' },
  { icon: '🏗️', name: 'गुजरात प्रसंस्करण योजनाएँ', benefit: '35-50% सब्सिडी', desc: 'GIDC भूमि, बिजली छूट, SGST प्रतिपूर्ति, कॉन्ट्रैक्ट फार्मिंग सहायता', status: 'सक्रिय' as const, type: 'राज्य' as const, tags: ['गुजरात', 'प्रसंस्करण'], link: '/samachar/gujarat-aloo-processing-yojana', eligibility: 'गुजरात के उद्यमी' },
];

export const metadata: Metadata = {
  title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी | Govt Schemes for Potato Farmers',
  description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, PMFME, NABARD लोन, किसान क्रेडिट कार्ड, UP और गुजरात राज्य योजनाएँ।',
  alternates: { canonical: 'https://www.indianpotato.in/yojnaye' },
  openGraph: {
    title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी',
    description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, PMFME, NABARD लोन, और राज्य स्तरीय योजनाएँ।',
    url: 'https://www.indianpotato.in/yojnaye',
    type: 'website',
  },
};

export default function YojnayePage() {
  const allPosts = getAllPosts();
  const schemePosts = allPosts.filter(
    (p) => p.category === 'policy' || p.tags.some((t) => t.includes('योजना') || t.includes('सब्सिडी'))
  );
  const highlightSlugs = new Set(schemes.map((s) => s.link.replace('/samachar/', '')));
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

        {/* HERO */}
        <section style={{
          background: '#fff',
          padding: 'clamp(60px, 10vw, 100px) 20px clamp(48px, 8vw, 80px)',
          borderBottom: '1px solid #f0f0f0',
        }}>
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', border: '1px solid #e5e7eb', borderRadius: 50, padding: '4px 14px', marginBottom: 24, fontSize: 12, color: '#05420d', background: '#f0fdf4', letterSpacing: '0.05em', fontWeight: 600 }}>
              सरकारी योजनाएँ
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16, maxWidth: 600 }}>
              आलू किसानों के लिए योजनाएँ और सब्सिडी
            </h1>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, maxWidth: 500, marginBottom: 20 }}>
              केंद्र और राज्य सरकार की योजनाएँ जो आलू किसानों, प्रसंस्करण उद्योग और कोल्ड स्टोरेज व्यवसाय को सीधे लाभ पहुँचाती हैं
            </p>
            <span style={{ fontSize: 14, color: '#9ca3af' }}>{schemes.length} योजनाएँ उपलब्ध</span>
          </div>
        </section>

        {/* SCHEME CARDS — client component for filter interactivity */}
        <YojnayeClient schemes={schemes} additionalPosts={additionalPosts.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt }))} />

        {/* BOTTOM CTA */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: 700, color: '#333', marginBottom: 12 }}>
              क्या आपको योजना के बारे में और जानकारी चाहिए?
            </h2>
            <p style={{ fontSize: '0.95rem', color: '#888', lineHeight: 1.7, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
              हमारी टीम आपकी सहायता के लिए तैयार है — पात्रता, आवेदन प्रक्रिया, या DPR बनाने में मदद
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 50,
                background: '#25D366',
                color: '#fff', fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none', boxShadow: '0 4px 15px rgba(37,211,102,0.3)',
              }}>
                WhatsApp पर पूछें
              </a>
              <a href="mailto:news@indpotato.com?subject=योजना जानकारी — Indian Potato" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 28px', borderRadius: 50,
                background: '#fff', border: '2px solid #05420d',
                color: '#05420d', fontWeight: 700, fontSize: '0.95rem',
                textDecoration: 'none',
              }}>
                ईमेल करें
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
