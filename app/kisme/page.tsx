import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { VarietiesQuick, WhatsAppCTA, Footer } from '@/components/Sections';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'आलू की किस्में — भारत में उगाई जाने वाली प्रमुख किस्में | Potato Varieties India',
  description: 'भारत में उगाई जाने वाली सभी प्रमुख आलू किस्मों की जानकारी — कुफरी ज्योति, कुफरी पुखराज, चिप्सोना, लेडी रोसेटा। उपज, अवधि और क्षेत्र डेटा।',
  alternates: {
    canonical: 'https://www.indianpotato.in/kisme',
  },
  openGraph: {
    title: 'आलू की किस्में — भारत में उगाई जाने वाली प्रमुख किस्में',
    description: 'भारत में उगाई जाने वाली सभी प्रमुख आलू किस्मों की जानकारी — कुफरी ज्योति, कुफरी पुखराज, चिप्सोना, लेडी रोसेटा।',
    url: 'https://www.indianpotato.in/kisme',
    type: 'website',
  },
};

export default function KismePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'किस्में', url: 'https://www.indianpotato.in/kisme' },
      ]} />
      <Navbar />
      <main className="pt-[76px]">
        <section style={{ background: '#fff', padding: 'clamp(60px, 10vw, 100px) 20px clamp(48px, 8vw, 80px)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 50, padding: '4px 14px', marginBottom: 24, fontSize: 12, color: '#dc2626', fontWeight: 600, letterSpacing: '0.05em' }}>
              आलू किस्में
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16, maxWidth: 600 }}>
              भारत की प्रमुख आलू किस्में
            </h1>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, maxWidth: 550, marginBottom: 20 }}>
              ICAR-CPRI द्वारा विकसित उन्नत किस्में — खाने, चिप्स, फ्रेंच फ्राइज़ और स्टार्च उत्पादन के लिए
            </p>
            <span style={{ fontSize: 14, color: '#9ca3af' }}>6 किस्में</span>
          </div>
        </section>
        <VarietiesQuick />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
