'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { BreadcrumbNav } from '@/components/Breadcrumbs'

interface Post {
  slug: string; title: string; excerpt: string; date: string;
  category: string; category_hindi: string; image: string;
  author: string; tags: string[]; featured: boolean; readingTime: number;
}

const CATEGORIES = [
  { key: 'सभी', label: 'सभी' },
  { key: 'उत्पादन', label: 'उत्पादन' },
  { key: 'निर्यात', label: 'निर्यात' },
  { key: 'नीति', label: 'नीति' },
  { key: 'तकनीक', label: 'तकनीक' },
  { key: 'अनुसंधान', label: 'अनुसंधान' },
  { key: 'राज्य', label: 'राज्य' },
  { key: 'प्रसंस्करण', label: 'प्रसंस्करण' },
  { key: 'बाज़ार', label: 'बाज़ार' },
]

function formatDate(d: string) {
  try { return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }) }
  catch { return d }
}

export default function SamacharClient({ posts }: { posts: Post[] }) {
  const [activeCategory, setActiveCategory] = useState('सभी')
  const [showCount, setShowCount] = useState(12)

  const filtered = activeCategory === 'सभी'
    ? posts
    : posts.filter(p => p.category_hindi === activeCategory)

  const featuredPost = filtered.find(p => p.featured) || filtered[0]
  const otherPosts = filtered.filter(p => featuredPost && p.slug !== featuredPost.slug)
  const displayPosts = otherPosts.slice(0, showCount)
  const hasMore = otherPosts.length > showCount

  return (
    <main className="pt-[64px] min-h-screen bg-white">

      {/* Hero Header */}
      <section className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
          <BreadcrumbNav items={[
            { name: 'होम', url: '/' },
            { name: 'समाचार', url: '/samachar' },
          ]} />

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-6">ताज़ा समाचार</h1>
          <p className="text-gray-500 mt-2 max-w-xl leading-relaxed">
            भारतीय आलू उद्योग की ताज़ा ख़बरें, विश्लेषण और रिपोर्ट
          </p>

          {/* Category pills */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.key
              const count = cat.key === 'सभी' ? posts.length : posts.filter(p => p.category_hindi === cat.key).length
              if (cat.key !== 'सभी' && count === 0) return null
              return (
                <button
                  key={cat.key}
                  onClick={() => { setActiveCategory(cat.key); setShowCount(12) }}
                  className="shrink-0 rounded-full text-xs font-medium cursor-pointer transition-all duration-200"
                  style={{
                    padding: '7px 16px',
                    background: isActive ? '#05420d' : '#fff',
                    color: isActive ? '#fff' : '#4b5563',
                    border: isActive ? '1.5px solid #05420d' : '1.5px solid #e5e7eb',
                  }}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          <p className="text-xs text-gray-400 mt-4">{filtered.length} लेख</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg mb-2">इस श्रेणी में कोई लेख नहीं है।</p>
            <button
              onClick={() => setActiveCategory('सभी')}
              className="text-sm font-medium cursor-pointer"
              style={{ color: '#05420d' }}
            >
              सभी लेख देखें
            </button>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && (
              <Link href={`/samachar/${featuredPost.slug}`} className="block mb-10 sm:mb-14 group">
                <article className="rounded-xl border border-gray-200 overflow-hidden bg-white transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                  <div className="relative aspect-[2/1] sm:aspect-[5/2] bg-gray-100">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 1152px"
                      priority
                    />
                  </div>
                  <div className="p-5 sm:p-7">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ border: '1px solid #05420d', color: '#05420d' }}>
                        {featuredPost.category_hindi}
                      </span>
                      <span className="text-xs text-gray-400">{formatDate(featuredPost.date)}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{featuredPost.readingTime} मिनट</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#05420d] transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{featuredPost.excerpt}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium mt-4" style={{ color: '#05420d' }}>
                      पूरा पढ़ें
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                  </div>
                </article>
              </Link>
            )}

            {/* Post Grid */}
            {displayPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPosts.map(post => (
                  <Link key={post.slug} href={`/samachar/${post.slug}`} className="group">
                    <article className="rounded-xl border border-gray-200 overflow-hidden bg-white h-full flex flex-col transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                      <div className="relative aspect-[3/2] bg-gray-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ border: '1px solid #05420d', color: '#05420d' }}>
                            {post.category_hindi}
                          </span>
                          <span className="text-[11px] text-gray-400">{formatDate(post.date)}</span>
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#05420d] transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed flex-1">{post.excerpt}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium mt-3" style={{ color: '#05420d' }}>
                          पूरा पढ़ें
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowCount(s => s + 12)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-semibold text-white cursor-pointer transition-all hover:shadow-lg"
                  style={{ background: '#ed6442' }}
                >
                  और लेख लोड करें
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
