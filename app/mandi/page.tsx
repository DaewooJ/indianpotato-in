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
    locale: 'hi_IN',
    siteName: 'Indian Potato',
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
      <main className="pt-[64px]">

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: '#05420d' }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 text-center">
            <div className="mx-auto mb-7 w-12 h-1 rounded-full" style={{ background: '#f97316' }} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              आज का आलू मंडी भाव
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-lg mx-auto leading-relaxed font-light">
              देश भर की प्रमुख मंडियों से आज के आलू भाव — दैनिक अपडेट
            </p>
            <div className="mt-7 inline-flex items-center gap-2.5 border border-white/10 rounded-full px-5 py-2" style={{ background: 'rgba(249,115,22,0.1)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f97316' }} />
              <span className="text-white/80 text-sm tracking-wide">प्रतिदिन अपडेट</span>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <BreadcrumbNav items={[
            { name: 'होम', url: '/' },
            { name: 'मंडी भाव', url: '/mandi' },
          ]} />
        </div>

        <MandiPricesLive />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
