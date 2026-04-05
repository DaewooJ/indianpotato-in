'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Post {
  slug: string; title: string; excerpt: string; date: string;
  category: string; category_hindi: string; image: string;
  author: string; tags: string[]; featured: boolean; readingTime: number;
}

export default function SamacharClient() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeCategory, setActiveCategory] = useState('सभी');

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(d => setPosts(d.posts || []))
      .catch(() => {});
  }, []);

  const categories = Array.from(new Set(posts.map(p => p.category_hindi)));
  const filtered = activeCategory === 'सभी' ? posts : posts.filter(p => p.category_hindi === activeCategory);
  const featuredPost = filtered.find(p => p.featured) || filtered[0];
  const otherPosts = filtered.filter(p => featuredPost && p.slug !== featuredPost.slug);

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '100px clamp(16px, 4vw, 24px) 60px' }}>
      <div style={{ marginBottom: 48 }}>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, color: '#1a1a1a', marginBottom: 8 }}>ताज़ा समाचार</h1>
        <p style={{ color: '#666', fontSize: 16, maxWidth: 600 }}>भारतीय आलू उद्योग की सबसे ताज़ा ख़बरें, विश्लेषण और अपडेट</p>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 40, flexWrap: 'wrap' as const, overflowX: 'auto' as const }}>
        <button onClick={() => setActiveCategory('सभी')} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeCategory === 'सभी' ? 'linear-gradient(135deg, #05420d, #f97316)' : '#fff', color: activeCategory === 'सभी' ? '#fff' : '#666', boxShadow: activeCategory === 'सभी' ? '0 4px 14px rgba(220,38,38,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' }}>सभी ({posts.length})</button>
        {categories.map(cat => {
          const count = posts.filter(p => p.category_hindi === cat).length;
          return (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 18px', borderRadius: 20, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: activeCategory === cat ? 'linear-gradient(135deg, #05420d, #f97316)' : '#fff', color: activeCategory === cat ? '#fff' : '#666', boxShadow: activeCategory === cat ? '0 4px 14px rgba(220,38,38,0.3)' : '0 1px 4px rgba(0,0,0,0.06)' }}>{cat} ({count})</button>
          );
        })}
      </div>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center' as const, padding: '80px 20px', color: '#999' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#444' }}>लोड हो रहा है...</h2>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center' as const, padding: '60px 20px', color: '#999' }}>
          <p>इस श्रेणी में कोई लेख नहीं है।</p>
        </div>
      ) : (
        <>
          {featuredPost && (
            <Link href={'/samachar/' + featuredPost.slug} style={{ textDecoration: 'none' }}>
              <article style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 0, background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid #f0f0f0', marginBottom: 48 }}>
                <div style={{ aspectRatio: '16/9', background: 'url(' + featuredPost.image + ') center/cover no-repeat', minHeight: 200, maxWidth: '100%' }} />
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <span style={{ background: '#f0fdf4', color: '#05420d', padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 700 }}>🔥 मुख्य ख़बर</span>
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {otherPosts.map(post => (
              <Link key={post.slug} href={'/samachar/' + post.slug} style={{ textDecoration: 'none' }}>
                <article style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', border: '1px solid #f0f0f0', height: '100%', display: 'flex', flexDirection: 'column' as const }}>
                  <div style={{ aspectRatio: '16/9', background: 'url(' + post.image + ') center/cover no-repeat' }} />
                  <div style={{ padding: 20, flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                      <span style={{ background: '#f5f5f5', color: '#666', padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>{post.category_hindi}</span>
                      <span style={{ color: '#aaa', fontSize: 11 }}>{formatDate(post.date)}</span>
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
  );
}
