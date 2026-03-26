import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getCategories } from '@/lib/blog';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'आलू समाचार — ताज़ा ख़बरें और अपडेट | Indian Potato',
  description: 'भारतीय आलू उद्योग की ताज़ा ख़बरें, सरकारी योजनाएँ, मंडी भाव अपडेट, निर्यात डेटा और तकनीकी जानकारी।',
  openGraph: { title: 'आलू समाचार — Indian Potato', description: 'भारतीय आलू उद्योग की ताज़ा ख़बरें और अपडेट', url: 'https://indianpotato.in/samachar', type: 'website' },
  alternates: { canonical: 'https://indianpotato.in/samachar' },
};

export default function SamacharPage() {
  const posts = getAllPosts();
  const categories = getCategories();
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  const formatDate = (dateStr: string) => {
    try { return new Date(dateStr).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return dateStr; }
  };

  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Blog', name: 'इंडियन पोटैटो समाचार',
    url: 'https://indianpotato.in/samachar',
    blogPost: posts.slice(0, 10).map((p) => ({
      '@type': 'BlogPosting', headline: p.title, datePublished: p.date,
      author: { '@type': 'Organization', name: 'Indian Potato' },
      url: 'https://indianpotato.in/samachar/' + p.slug,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '100px 24px 60px' }}>
        <div style={{ marginBottom: 48 }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 8 }}>ताज़ा समाचार</h1>
          <p style={{ color: '#666', fontSize: 16, maxWidth: 600 }}>भारतीय आलू उद्योग की सबसे ताज़ा ख़बरें, विश्लेषण और अपडेट</p>
        </div>

        {categories.length > 0 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' as const }}>
            <span style={{ padding: '8px 18px', borderRadius: 20, background: 'linear-gradient(135deg, #dc2626, #f97316)', color: '#fff', fontSize: 13, fontWeight: 600 }}>सभी ({posts.length})</span>
            {categories.map((cat) => (
              <span key={cat.name} style={{ padding: '8px 18px', borderRadius: 20, background: '#fff', border: '1px solid #e5e5e5', color: '#666', fontSize: 13, fontWeight: 600 }}>{cat.hindi} ({cat.count})</span>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center' as const, padding: '80px 20px', color: '#999' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#444' }}>अभी कोई लेख नहीं है</h2>
            <p>content/blog/ फ़ोल्डर में .md फ़ाइलें जोड़ें</p>
          </div>
        ) : (
          <>
            {featuredPost && (
              <Link href={'/samachar/' + featuredPost.slug} style={{ textDecoration: 'none' }}>
                <article style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #f0f0f0', marginBottom: 48 }}>
                  <div style={{ aspectRatio: '16/9', background: 'url(' + featuredPost.image + ') center/cover no-repeat', minHeight: 200, maxWidth: '100%' }} />
                  <div style={{ padding: '24px', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                      <span style={{ background: '#fef2f2', color: '#dc2626', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>🔥 मुख्य ख़बर</span>
                      <span style={{ background: '#f5f5f5', color: '#666', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>{featuredPost.category_hindi}</span>
                    </div>
                    <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.3, marginBottom: 12 }}>{featuredPost.title}</h2>
                    <p style={{ color: '#666', fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>{featuredPost.excerpt}</p>
                    <div style={{ display: 'flex', gap: 12, color: '#999', fontSize: 13 }}>
                      <span>{formatDate(featuredPost.date)}</span><span>•</span><span>{featuredPost.readingTime} मिनट पढ़ें</span>
                    </div>
                  </div>
                </article>
              </Link>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
              {otherPosts.map((post) => (
                <Link key={post.slug} href={'/samachar/' + post.slug} style={{ textDecoration: 'none' }}>
                  <article style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f0f0f0', height: '100%', display: 'flex', flexDirection: 'column' as const }}>
                    <div style={{ aspectRatio: '16/9', background: 'url(' + post.image + ') center/cover no-repeat' }} />
                    <div style={{ padding: 20, flex: 1 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                        <span style={{ background: '#f5f5f5', color: '#666', padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{post.category_hindi}</span>
                        <span style={{ color: '#aaa', fontSize: 11, display: 'flex', alignItems: 'center' }}>{formatDate(post.date)}</span>
                      </div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.4, marginBottom: 8 }}>{post.title}</h3>
                      <p style={{ color: '#888', fontSize: 14, lineHeight: 1.5 }}>{post.excerpt.slice(0, 120)}…</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
