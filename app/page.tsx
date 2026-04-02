import Navbar from '@/components/Navbar';
import NewsTicker from '@/components/NewsTicker';
import Hero from '@/components/Hero';
import MandiPricesLive from '@/components/MandiPricesLive';
import { NewsSection, GovSchemes, VarietiesQuick, DirectoryPreview, WhatsAppCTA, Footer } from '@/components/Sections';
import RevealSection from '@/components/RevealSection';
import { getAllPosts } from '@/lib/blog';
import { DIRECTORY_CATEGORIES, getCategoryCounts } from '@/lib/directory';

export default function HomePage() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, 6);
  const tickerPosts = allPosts.slice(0, 8).map((p) => ({ slug: p.slug, title: p.title }));
  const dirCounts = getCategoryCounts();
  const dirCategories = DIRECTORY_CATEGORIES.slice(0, 6).map((cat) => ({
    icon: cat.icon,
    name: cat.name,
    slug: cat.slug,
    count: dirCounts[cat.slug] || 0,
  }));

  return (
    <>
      <Navbar />
      <main className="pt-[66px]">
        <NewsTicker posts={tickerPosts} />
        <Hero />

        {/* Trust / Credibility Bar */}
        <section style={{
          background: '#fafafa',
          borderTop: '1px solid #f0f0f0',
          borderBottom: '1px solid #f0f0f0',
          padding: '20px 0',
          overflow: 'hidden',
        }}>
          <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '24px',
          }}>
            <span style={{ fontSize: 13, color: '#999', fontWeight: 500 }}>डेटा स्रोत:</span>
            <span style={{ fontSize: 13, color: '#555', fontWeight: 600, opacity: 0.7 }}>🏛️ data.gov.in</span>
            <span style={{ fontSize: 13, color: '#555', fontWeight: 600, opacity: 0.7 }}>🔬 ICAR-CPRI शिमला</span>
            <span style={{ fontSize: 13, color: '#555', fontWeight: 600, opacity: 0.7 }}>🌾 कृषि मंत्रालय</span>
            <span style={{ fontSize: 13, color: '#555', fontWeight: 600, opacity: 0.7 }}>💬 5,000+ WhatsApp सदस्य</span>
            <span style={{ fontSize: 13, color: '#555', fontWeight: 600, opacity: 0.7 }}>📊 86+ मंडी भाव</span>
          </div>
        </section>

        <RevealSection>
          <MandiPricesLive />
        </RevealSection>
        <RevealSection delay={100}>
          <NewsSection posts={posts} />
        </RevealSection>
        <RevealSection delay={100}>
          <GovSchemes />
        </RevealSection>
        <RevealSection delay={100}>
          <VarietiesQuick />
        </RevealSection>
        <RevealSection delay={100}>
          <DirectoryPreview categories={dirCategories} />
        </RevealSection>
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
