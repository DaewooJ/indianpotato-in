import Navbar from '@/components/Navbar';
import NewsTicker from '@/components/NewsTicker';
import Hero from '@/components/Hero';
import MandiPricesLive from '@/components/MandiPricesLive';
import { NewsSection, GovSchemes, VarietiesQuick, DirectoryPreview, WhatsAppCTA, Footer } from '@/components/Sections';
import RevealSection from '@/components/RevealSection';
import { getAllPosts } from '@/lib/blog';
import { getCategoriesWithCounts } from '@/lib/directory-db';

export const revalidate = 300;

export default async function HomePage() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, 6);
  const tickerPosts = allPosts.slice(0, 8).map((p) => ({ slug: p.slug, title: p.title }));
  const dbCategories = await getCategoriesWithCounts();
  const dirCategories = dbCategories.map((cat) => ({
    icon: cat.emoji || '📦',
    name: cat.name_hi || cat.name_en,
    nameEn: cat.name_en,
    slug: cat.slug,
    count: cat.company_count,
  }));

  return (
    <>
      <Navbar />
      <main className="pt-[64px]">
        <NewsTicker posts={tickerPosts} />
        <Hero />

        {/* Trust Bar */}
        <section style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb', padding: '14px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '6px 20px' }}>
            <span style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>डेटा स्रोत:</span>
            {['data.gov.in', 'ICAR-CPRI शिमला', 'कृषि मंत्रालय', '5,000+ WhatsApp सदस्य', '86+ मंडी भाव'].map((src, i) => (
              <span key={i} style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>
                {i > 0 && <span style={{ color: '#d1d5db', margin: '0 2px' }}>·</span>} {src}
              </span>
            ))}
          </div>
        </section>

        <RevealSection>
          <MandiPricesLive />
        </RevealSection>
        <RevealSection delay={100}>
          <NewsSection posts={posts} />
        </RevealSection>
        <RevealSection delay={100}>
          <DirectoryPreview categories={dirCategories} />
        </RevealSection>
        <RevealSection delay={100}>
          <GovSchemes />
        </RevealSection>
        <RevealSection delay={100}>
          <VarietiesQuick />
        </RevealSection>
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
