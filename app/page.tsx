import Navbar from '@/components/Navbar';
import NewsTicker from '@/components/NewsTicker';
import Hero from '@/components/Hero';
import MandiPrices from '@/components/MandiPrices';
import { GovSchemes, NewsSection, VarietiesQuick, WhatsAppCTA, Footer } from '@/components/Sections';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <NewsTicker />
      <main className="pt-[76px]">
        <Hero />
        <MandiPrices />
        <GovSchemes />
        <NewsSection />
        <VarietiesQuick />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
