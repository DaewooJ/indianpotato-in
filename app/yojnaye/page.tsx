import type { Metadata } from 'next';
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
    locale: 'hi_IN',
    siteName: 'Indian Potato',
    images: [{ url: 'https://www.indianpotato.in/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी',
    description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, PMFME, NABARD लोन।',
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
      <main className="pt-[64px]">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: '#05420d' }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28 text-center">
            <div className="mx-auto mb-8 w-12 h-1 rounded-full" style={{ background: '#f97316' }} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
              आलू किसानों के लिए सरकारी योजनाएँ
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-lg mx-auto leading-relaxed font-light">
              केंद्र और राज्य सरकार की योजनाएँ जो आलू किसानों, प्रसंस्करण उद्योग और कोल्ड स्टोरेज व्यवसाय को सीधे लाभ पहुँचाती हैं
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border border-white/10 rounded-full px-5 py-2" style={{ background: 'rgba(249,115,22,0.1)' }}>
              <span className="w-2 h-2 rounded-full" style={{ background: '#f97316' }} />
              <span className="text-white/80 text-sm tracking-wide">{schemes.length} योजनाएँ उपलब्ध</span>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <BreadcrumbNav items={[
            { name: 'होम', url: '/' },
            { name: 'योजनाएँ', url: '/yojnaye' },
          ]} />
        </div>

        {/* SCHEME CARDS — client component for filter interactivity */}
        <YojnayeClient schemes={schemes} additionalPosts={additionalPosts.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt }))} />

        {/* ── Bottom CTA ── */}
        <section className="relative overflow-hidden" style={{ background: '#05420d' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)' }} />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
            <div className="mx-auto mb-6 w-10 h-1 rounded-full" style={{ background: '#f97316' }} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              क्या आपको योजना के बारे में और जानकारी चाहिए?
            </h2>
            <p className="mt-4 text-white/60 max-w-md mx-auto leading-relaxed font-light">
              हमारी टीम आपकी सहायता के लिए तैयार है — पात्रता, आवेदन प्रक्रिया, या DPR बनाने में मदद
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://spuds.me/kisan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl"
                style={{ background: '#f97316', boxShadow: '0 4px 14px rgba(249,115,22,0.3)' }}
              >
                WhatsApp पर पूछें
              </a>
              <a
                href="mailto:news@indpotato.com?subject=योजना जानकारी — Indian Potato"
                className="inline-flex items-center gap-2.5 text-sm font-semibold px-7 py-3.5 rounded-full transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
              >
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
