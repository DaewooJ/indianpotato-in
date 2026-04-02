import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import MandiPricesLive from '@/components/MandiPricesLive';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'आज का आलू मंडी भाव — ताज़ा थोक भाव | Potato Mandi Price Today',
  description: 'भारत की प्रमुख मंडियों से आलू के ताज़ा थोक भाव — आगरा, लखनऊ, कोलकाता, डीसा, जालंधर, पटना और इंदौर। प्रतिदिन अपडेट।',
  alternates: {
    canonical: 'https://www.indianpotato.in/mandi',
  },
  openGraph: {
    title: 'आज का आलू मंडी भाव — ताज़ा थोक भाव',
    description: 'भारत की प्रमुख मंडियों से आलू के ताज़ा थोक भाव। प्रतिदिन अपडेट।',
    url: 'https://www.indianpotato.in/mandi',
    type: 'website',
    images: [{ url: 'https://www.indianpotato.in/images/mandi-og-image.jpg', width: 1200, height: 630, alt: 'आज का आलू मंडी भाव — Indian Potato' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'आज का आलू मंडी भाव — ताज़ा थोक भाव',
    description: 'भारत की प्रमुख मंडियों से आलू के ताज़ा थोक भाव। प्रतिदिन अपडेट।',
    images: ['https://www.indianpotato.in/images/mandi-og-image.jpg'],
  },
};

export default function MandiPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'मंडी भाव', url: 'https://www.indianpotato.in/mandi' },
      ]} />
      <Navbar />
      <main className="pt-[76px]">
        <section style={{ background: '#fff', padding: 'clamp(48px, 8vw, 80px) 20px clamp(36px, 6vw, 60px)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 50, padding: '4px 14px', marginBottom: 24, fontSize: 12, color: '#dc2626', fontWeight: 600, letterSpacing: '0.05em' }}>
              मंडी भाव
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
              <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: '#111827', lineHeight: 1.2, margin: 0 }}>
                आज का आलू मंडी भाव
              </h1>
              <span style={{ background: '#dcfce7', color: '#166534', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, letterSpacing: '0.05em' }}>LIVE</span>
            </div>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, maxWidth: 550 }}>
              भारत की प्रमुख मंडियों से आलू के ताज़ा थोक भाव — data.gov.in API से लाइव अपडेट
            </p>
          </div>
        </section>
        <MandiPricesLive />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
