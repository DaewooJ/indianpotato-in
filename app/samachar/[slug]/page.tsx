import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs, getAllPosts } from '@/lib/blog';
import { markdownToHtml } from '@/lib/markdown';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'लेख नहीं मिला' };
  const ogImage = post.image.startsWith('http') ? post.image : 'https://indianpotato.in' + post.image;
  return {
    title: post.title + ' | Indian Potato',
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, url: 'https://indianpotato.in/samachar/' + post.slug, type: 'article', publishedTime: post.date, authors: [post.author], images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [ogImage] },
    alternates: { canonical: 'https://indianpotato.in/samachar/' + post.slug },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const htmlContent = markdownToHtml(post.content);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  const formatDate = (d: string) => { try { return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return d; } };
  const shareUrl = 'https://indianpotato.in/samachar/' + post.slug;
  const shareText = encodeURIComponent(post.title + ' — Indian Potato');
  const ogImage = post.image.startsWith('http') ? post.image : 'https://indianpotato.in' + post.image;

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'NewsArticle', headline: post.title,
    description: post.excerpt, datePublished: post.date, dateModified: post.date, image: ogImage,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: 'Indian Potato', url: 'https://indianpotato.in', logo: { '@type': 'ImageObject', url: 'https://indianpotato.in/logo.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl }, articleSection: post.category_hindi, inLanguage: 'hi',
  };

  // Parse stats from frontmatter if available
  const stats = (post as any).stats || null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ paddingTop: 70 }}>

        {/* HERO BANNER */}
        <div style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 40%, #7f1d1d 100%)', padding: 'clamp(32px, 6vw, 60px) clamp(20px, 5vw, 48px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50%', right: '-20%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' as const }} />
          <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <span style={{ display: 'inline-block', background: 'rgba(249,115,22,0.9)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' as const, padding: '6px 16px', borderRadius: 50, marginBottom: 16 }}>{post.category_hindi}</span>
            <h1 style={{ fontSize: 'clamp(24px, 5vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, margin: '0 0 16px 0' }}>{post.title}</h1>
            <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: 750, margin: 0 }}>{post.excerpt}</p>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>

          {/* AUTHOR & DATE BAR */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', borderBottom: '1px solid #f0f0f0', marginBottom: 32, flexWrap: 'wrap' as const, gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#666', fontSize: 14 }}>
              <span>📅 {formatDate(post.date)}</span>
              <span>⏱️ {post.readingTime} मिनट</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href={'https://api.whatsapp.com/send?text=' + shareText + '%20' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 16px', borderRadius: 20, background: '#25D366', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>💬 WhatsApp</a>
              <a href={'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 16px', borderRadius: 20, background: '#1DA1F2', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>🐦 Twitter</a>
              <a href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 16px', borderRadius: 20, background: '#1877F2', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>📘 Facebook</a>
            </div>
          </div>

          {/* ARTICLE CONTENT */}
          <article className="premium-article" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {/* TAGS */}
          {post.tags.length > 0 && (
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#666', marginRight: 10 }}>टैग:</span>
              {post.tags.map((tag) => (
                <span key={tag} style={{ display: 'inline-block', background: '#fef2f2', color: '#dc2626', padding: '5px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginRight: 8, marginBottom: 8 }}>#{tag}</span>
              ))}
            </div>
          )}

          {/* CTA SECTION */}
          <div style={{ background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #7f1d1d 100%)', borderRadius: 18, padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center' as const, margin: '48px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-40%', right: '-15%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' as const }} />
            <h2 style={{ color: '#fff', fontSize: 'clamp(20px, 3.5vw, 28px)', fontWeight: 700, margin: '0 0 12px 0', position: 'relative', zIndex: 2 }}>भारत के आलू उद्योग से जुड़ें</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16, margin: '0 0 24px 0', maxWidth: 600, marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 2 }}>आलू आपूर्तिकर्ता, शीतगृह संचालक, या व्यापारिक साझेदार खोज रहे हैं? Indian Potato आपको जोड़ता है।</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' as const, position: 'relative', zIndex: 2 }}>
              <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 50, background: '#25D366', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>💬 WhatsApp पर चैट करें</a>
              <a href="mailto:info@indpotato.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 50, background: '#fff', color: '#dc2626', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>📧 ईमेल भेजें</a>
            </div>
          </div>

          {/* SHARE BAR BOTTOM */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', padding: '20px 0', margin: '32px 0', borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', flexWrap: 'wrap' as const }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>यह लेख शेयर करें:</span>
            <a href={'https://api.whatsapp.com/send?text=' + shareText + '%20' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: '#25D366', color: '#fff', textDecoration: 'none', fontSize: 18 }}>💬</a>
            <a href={'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: '#1DA1F2', color: '#fff', textDecoration: 'none', fontSize: 18 }}>🐦</a>
            <a href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: '#1877F2', color: '#fff', textDecoration: 'none', fontSize: 18 }}>📘</a>
          </div>

          {/* RELATED POSTS */}
          {relatedPosts.length > 0 && (
            <div style={{ margin: '48px 0' }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', marginBottom: 24, textAlign: 'center' as const }}>और पढ़ें</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={'/samachar/' + rp.slug} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 14, padding: 20, textAlign: 'center' as const, transition: 'transform 0.2s, box-shadow 0.2s', height: '100%' }}>
                      <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>🥔</span>
                      <span style={{ color: '#dc2626', fontWeight: 600, fontSize: 14, lineHeight: 1.4, display: 'block' }}>{rp.title}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* BACK */}
          <div style={{ textAlign: 'center' as const, padding: '20px 0 60px' }}>
            <Link href="/samachar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'linear-gradient(135deg, #dc2626, #f97316)', color: '#fff', borderRadius: 24, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>← सभी समाचार देखें</Link>
          </div>
        </div>
      </main>
      <Footer />

      <style>{`
        .premium-article { font-size: 17px; line-height: 1.85; color: #333; }
        .premium-article h2 { font-size: clamp(22px, 3.5vw, 30px); font-weight: 700; color: #dc2626; margin: 48px 0 18px 0; line-height: 1.3; border-bottom: 3px solid #f97316; padding-bottom: 10px; }
        .premium-article h3 { font-size: clamp(18px, 2.8vw, 22px); font-weight: 600; color: #b91c1c; margin: 32px 0 12px 0; line-height: 1.4; }
        .premium-article p { margin: 16px 0; }
        .premium-article strong { color: #1a1a1a; }
        .premium-article blockquote { border-left: 4px solid #dc2626; padding: 16px 20px; margin: 24px 0; background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 100%); border-radius: 0 12px 12px 0; font-style: italic; color: #444; }
        .premium-article ul, .premium-article ol { padding-left: 24px; margin: 12px 0; }
        .premium-article li { margin-bottom: 8px; font-size: 15px; line-height: 1.6; }
        .premium-article a { color: #dc2626; text-decoration: underline; }
        .premium-article a:hover { color: #f97316; }
        .premium-article code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
        .premium-article hr { border: none; height: 1px; background: #e5e5e5; margin: 32px 0; }
        @media (max-width: 768px) { .premium-article { font-size: 15px; } }
      `}</style>
    </>
  );
}
