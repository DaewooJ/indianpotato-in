import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { GovSchemes, WhatsAppCTA, Footer } from '@/components/Sections';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/Breadcrumbs';

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
      name: 'लेडी रोसेटा विस्तार योजना क्या है?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'बिहार सरकार की यह योजना 17 जिलों में प्रसंस्करण-गुणवत्ता आलू (लेडी रोसेटा) की खेती पर ₹93,863 प्रति हेक्टेयर (75% तक) अनुदान देती है।',
      },
    },
  ],
};

export const metadata: Metadata = {
  title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी | Govt Schemes for Potato Farmers',
  description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, किसान क्रेडिट कार्ड, और राज्य स्तरीय योजनाएँ।',
  alternates: {
    canonical: 'https://www.indianpotato.in/yojnaye',
  },
  openGraph: {
    title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी',
    description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, किसान क्रेडिट कार्ड, और राज्य स्तरीय योजनाएँ।',
    url: 'https://www.indianpotato.in/yojnaye',
    type: 'website',
  },
};

export default function YojnayePage() {
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
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              सरकारी योजनाएँ
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              आलू किसानों और प्रसंस्करण उद्योग के लिए केंद्र व राज्य सरकार की योजनाएँ, अनुदान और सब्सिडी
            </p>
          </div>
        </div>
        <GovSchemes />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
