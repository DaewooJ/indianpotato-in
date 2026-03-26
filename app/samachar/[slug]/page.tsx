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
  return {
    title: post.title + ' | Indian Potato',
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, url: 'https://indianpotato.in/samachar/' + post.slug, type: 'article', publishedTime: post.date, authors: [post.author] },
    alternates: { canonical: 'https://indianpotato.in/samachar/' + post.slug },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();
  const htmlContent = markdownToHtml(post.content);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return dateStr; }
  };

  const shareUrl = 'https://indianpotato.in/samachar/' + post.slug;
  const shareText = encodeURIComponent(post.title + ' — Indian Potato');

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'NewsArticle', headline: post.title,
    description: post.excerpt, datePublished: post.date, dateModified: post.date,
    image: post.image.startsWith('http') ? post.image : 'https://indianpotato.in' + post.image,
    author: { '@type': 'Organization', name: post.author, url: 'https://indianpotato.in' },
    publisher: { '@type': 'Organization', name: 'Indian Potato', url: 'https://indianpotato.in' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
    articleSection: post.category_hindi, inLanguage: 'hi',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        <div style={{ width: '100%', maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ aspectRatio: '2/1', borderRadius: 20, overflow: 'hidden', marginBottom: 32, background: 'url(' + post.image + ') center/cover no-repeat', position: 'relative' as const }}>
            <div style={{ position: 'absolute' as const, top: 20, left: 20 }}>
              <span style={{ background: 'rgba(220,38,38,0.9)', color: '#fff', padding: '6px 14px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>{post.category_hindi}</span>
            </div>
          </div>

          <nav style={{ fontSize: 13, color: '#999', marginBottom: 20, display: 'flex', gap: 6, alignItems: 'center' }}>
            <Link href="/" style={{ color: '#dc2626', textDecoration: 'none' }}>होम</Link>
            <span>›</span>
            <Link href="/samachar" style={{ color: '#dc2626', textDecoration: 'none' }}>समाचार</Link>
            <span>›</span>
            <span style={{ color: '#666' }}>{post.category_hindi}</span>
          </nav>

          <h1 style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 16 }}>{post.title}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#999', fontSize: 14, marginBottom: 12, flexWrap: 'wrap' as const }}>
            <span>✍️ {post.author}</span>
            <span>📅 {formatDate(post.date)}</span>
            <span>⏱️ {post.readingTime} मिनट पढ़ें</span>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 40, paddingBottom: 28, borderBottom: '1px solid #f0f0f0' }}>
            <a href={'https://api.whatsapp.com/send?text=' + shareText + '%20' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, background: '#25D366', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>💬 WhatsApp</a>
            <a href={'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, background: '#1DA1F2', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>🐦 Twitter</a>
            <a href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, background: '#1877F2', color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>📘 Facebook</a>
          </div>

          <article style={{ fontSize: 17, lineHeight: 1.9, color: '#333', maxWidth: 720 }} dangerouslySetInnerHTML={{ __html: htmlContent }} />

          {post.tags.length > 0 && (
            <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#666', marginRight: 10 }}>टैग:</span>
              {post.tags.map((tag) => (
                <span key={tag} style={{ display: 'inline-block', background: '#f5f5f5', color: '#666', padding: '4px 12px', borderRadius: 12, fontSize: 13, marginRight: 8, marginBottom: 8 }}>#{tag}</span>
              ))}
            </div>
          )}

          {relatedPosts.length > 0 && (
            <div style={{ marginTop: 60, marginBottom: 60 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 24 }}>संबंधित समाचार</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                {relatedPosts.map((rp) => (
                  <Link key={rp.slug} href={'/samachar/' + rp.slug} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid #f0f0f0' }}>
                      <div style={{ aspectRatio: '16/9', background: 'url(' + rp.image + ') center/cover' }} />
                      <div style={{ padding: 16 }}>
                        <p style={{ fontSize: 12, color: '#dc2626', marginBottom: 4 }}>{rp.category_hindi} • {formatDate(rp.date)}</p>
                        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4 }}>{rp.title}</h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center' as const, padding: '40px 0 60px' }}>
            <Link href="/samachar" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'linear-gradient(135deg, #dc2626, #f97316)', color: '#fff', borderRadius: 24, textDecoration: 'none', fontWeight: 700, fontSize: 14 }}>← सभी समाचार देखें</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
