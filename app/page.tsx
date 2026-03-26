import Navbar from '@/components/Navbar';
import NewsTicker from '@/components/NewsTicker';
import Hero from '@/components/Hero';
import MandiPricesLive from '@/components/MandiPricesLive';
import { NewsSection, GovSchemes, VarietiesQuick, DirectoryPreview, WhatsAppCTA, Footer } from '@/components/Sections';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        <NewsTicker />
        <Hero />
        <MandiPricesLive />
        <NewsSection />
        <GovSchemes />
        <VarietiesQuick />
        <DirectoryPreview />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
