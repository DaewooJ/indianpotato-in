import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { DIRECTORY_CATEGORIES, getCategoryConfig, getListingsByCategory } from '@/lib/directory';

export function generateStaticParams() {
  return DIRECTORY_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getCategoryConfig(params.category);
  if (!cat) return { title: 'Not Found' };
  return {
    title: cat.name + ' — आलू ' + cat.nameEn + ' डायरेक्टरी | Indian Potato',
    description: cat.description,
    openGraph: { title: cat.name + ' — ' + cat.nameEn + ' | Indian Potato Directory', description: cat.descriptionEn, type: 'website', url: 'https://indianpotato.in/directory/' + cat.slug },
    alternates: { canonical: 'https://indianpotato.in/directory/' + cat.slug },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const cat = getCategoryConfig(params.category);
  if (!cat) notFound();
  const listings = getListingsByCategory(params.category);

  const stateGroups: Record<string, typeof listings> = {};
  for (const listing of listings) {
    const stateKey = listing.state || 'अन्य';
    if (!stateGroups[stateKey]) stateGroups[stateKey] = [];
    stateGroups[stateKey].push(listing);
  }
  const statesWithListings = Object.keys(stateGroups).sort();

  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-700 py-14 md:py-18 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <nav className="flex items-center gap-2 text-[0.78rem] font-body text-white/50 mb-4 flex-wrap">
              <Link href="/" className="hover:text-white/80 transition-colors">होम</Link><span>/</span>
              <Link href="/directory" className="hover:text-white/80 transition-colors">डायरेक्टरी</Link><span>/</span>
              <span className="text-white/90">{cat.name}</span>
            </nav>
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[36px] md:text-[44px] shrink-0">{cat.icon}</div>
              <div>
                <h1 className="font-display text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold text-white mb-1 leading-tight">{cat.name}</h1>
                <p className="font-body text-[0.85rem] text-white/50 italic mb-2">{cat.nameEn}</p>
                <p className="font-body text-[1rem] text-white/70 max-w-[600px] leading-relaxed">{cat.description}</p>
              </div>
            </div>
            <div className="flex gap-8 mt-8">
              <div><div className="font-display text-[1.6rem] font-bold text-white">{listings.length}</div><div className="font-body text-[0.75rem] text-white/50">कुल सूचीबद्ध</div></div>
              <div><div className="font-display text-[1.6rem] font-bold text-white">{statesWithListings.length}</div><div className="font-body text-[0.75rem] text-white/50">राज्य</div></div>
            </div>
          </div>
        </div>

        <section className="py-10 md:py-16 px-6 bg-stone-50/50">
          <div className="max-w-[1280px] mx-auto">
            {listings.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-[64px] mb-4">📋</div>
                <h3 className="font-display text-[1.3rem] font-bold text-stone-800 mb-2">{cat.name} — जल्द आ रहा है</h3>
                <p className="font-body text-[0.92rem] text-stone-500 max-w-[400px] mx-auto mb-8">हम इस श्रेणी में लिस्टिंग जोड़ रहे हैं। अपना व्यवसाय सूचीबद्ध करने के लिए हमसे संपर्क करें।</p>
                <Link href="/sampark" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.9rem] rounded-xl transition-colors">📋 पहली लिस्टिंग बनें</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {listings.map((listing) => (
                  <Link key={listing.slug} href={'/directory/' + cat.slug + '/' + listing.slug} className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:shadow-red-100/40 hover:border-red-200 transition-all duration-300">
                    {listing.image ? (
                      <div className="h-44 bg-stone-100 overflow-hidden"><img src={listing.image} alt={listing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" /></div>
                    ) : (
                      <div className="h-32 bg-gradient-to-br from-stone-100 to-stone-50 flex items-center justify-center"><span className="text-[48px] opacity-30">{cat.icon}</span></div>
                    )}
                    <div className="p-5">
                      {listing.featured && (<span className="inline-block text-[0.68rem] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full mb-3">⭐ प्रमुख</span>)}
                      <h3 className="font-display text-[1.08rem] font-bold text-stone-900 mb-1.5 group-hover:text-red-700 transition-colors leading-snug">{listing.name}</h3>
                      {listing.nameEn && (<p className="font-body text-[0.75rem] text-stone-400 italic mb-2">{listing.nameEn}</p>)}
                      <p className="font-body text-[0.82rem] text-stone-500 leading-relaxed mb-4 line-clamp-2">{listing.description}</p>
                      <div className="flex items-center gap-1.5 text-[0.78rem] text-stone-400 mb-2"><span>📍</span><span>{listing.district}, {listing.state}</span></div>
                      {listing.specialization && listing.specialization.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {listing.specialization.slice(0, 3).map((spec: string, i: number) => (<span key={i} className="text-[0.68rem] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">{spec}</span>))}
                        </div>
                      )}
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-stone-100">
                        {listing.capacity && (<span className="text-[0.75rem] text-stone-400">📊 {listing.capacity}</span>)}
                        {listing.established && (<span className="text-[0.75rem] text-stone-400">🗓️ स्थापित {listing.established}</span>)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-12 px-6 bg-red-50 border-t border-red-100">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="font-display text-[1.3rem] font-bold text-stone-900 mb-3">अपना {cat.name} यहाँ सूचीबद्ध करें</h2>
            <p className="font-body text-[0.9rem] text-stone-500 mb-6">निःशुल्क लिस्टिंग — WhatsApp पर संपर्क करें या ईमेल भेजें</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/sampark" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.9rem] rounded-xl transition-colors">📋 लिस्टिंग जोड़ें</Link>
              <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-[0.9rem] rounded-xl transition-colors">💬 WhatsApp</a>
            </div>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: cat.name + ' — Indian Potato Directory', description: cat.description, url: 'https://indianpotato.in/directory/' + cat.slug, numberOfItems: listings.length, publisher: { '@type': 'Organization', name: 'Indian Potato', url: 'https://indianpotato.in' } }) }} />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
