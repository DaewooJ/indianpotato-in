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
        <div className="bg-gradient-to-r from-red-700 to-red-600 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <BreadcrumbNav items={[
              { name: 'होम', url: '/' },
              { name: 'मंडी भाव', url: '/mandi' },
            ]} />
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              आलू मंडी भाव
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              भारत की सभी प्रमुख मंडियों से आलू के रोज़ाना थोक भाव — राज्यवार फ़िल्टर के साथ
            </p>
          </div>
        </div>
        <MandiPricesLive />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
