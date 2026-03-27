import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { DIRECTORY_CATEGORIES, INDIAN_STATES, getCategoryConfig, getListingsByCategory } from '@/lib/directory';

export function generateStaticParams() {
  return DIRECTORY_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getCategoryConfig(params.category);
  if (!cat) return { title: 'Not Found' };
  return {
    title: cat.name + ' — आलू ' + cat.nameEn + ' डायरेक्टरी | Indian Potato',
    description: cat.description,
    openGraph: { title: cat.name + ' | Indian Potato Directory', description: cat.descriptionEn, type: 'website', url: 'https://indianpotato.in/directory/' + cat.slug },
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
        {/* Hero */}
        <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-700 py-10 md:py-14 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <nav className="flex items-center gap-1.5 text-[0.72rem] font-body text-white/40 mb-4 flex-wrap">
              <Link href="/" className="hover:text-white/70">होम</Link><span>/</span>
              <Link href="/directory" className="hover:text-white/70">डायरेक्टरी</Link><span>/</span>
              <span className="text-white/80">{cat.name}</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[28px] md:text-[34px] shrink-0">{cat.iconImage ? <img src={cat.iconImage} alt={cat.name} className="w-full h-full object-contain p-1" /> : cat.icon}</div>
              <div>
                <h1 className="font-display text-[clamp(1.4rem,4vw,2.4rem)] font-bold text-white leading-tight">{cat.name}</h1>
                <p className="font-body text-[0.78rem] text-white/40 italic">{cat.nameEn}</p>
              </div>
            </div>
            <p className="font-body text-[0.88rem] text-white/60 max-w-[550px] mt-3 leading-relaxed">{cat.description}</p>
            <div className="flex gap-6 mt-5">
              <div className="flex items-baseline gap-1"><span className="font-display text-[1.3rem] font-bold text-white">{listings.length}</span><span className="font-body text-[0.68rem] text-white/40">सूचीबद्ध</span></div>
              <div className="flex items-baseline gap-1"><span className="font-display text-[1.3rem] font-bold text-white">{statesWithListings.length}</span><span className="font-body text-[0.68rem] text-white/40">राज्य</span></div>
            </div>
          </div>
        </div>

        {/* State Filter Pills */}
        {statesWithListings.length > 0 && (
          <div className="bg-white border-b border-stone-200 py-3 px-4 md:px-6 sticky top-[76px] z-30 overflow-x-auto">
            <div className="max-w-[1280px] mx-auto flex gap-2 items-center">
              <span className="font-body text-[0.72rem] text-stone-400 font-semibold shrink-0 mr-1">राज्य:</span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
                <span className="shrink-0 px-3 py-1.5 bg-red-600 text-white text-[0.72rem] font-body font-semibold rounded-full cursor-pointer">सभी ({listings.length})</span>
                {statesWithListings.map((state) => (
                  <a key={state} href={'#state-' + encodeURIComponent(state)} className="shrink-0 px-3 py-1.5 bg-stone-100 hover:bg-red-50 text-stone-600 hover:text-red-700 text-[0.72rem] font-body font-medium rounded-full cursor-pointer transition-colors border border-stone-200 hover:border-red-200 whitespace-nowrap">
                    {state} ({stateGroups[state].length})
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listings */}
        <section className="py-6 md:py-12 px-3 md:px-6 bg-stone-50/50">
          <div className="max-w-[1280px] mx-auto">
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-[56px] mb-3">📋</div>
                <h3 className="font-display text-[1.15rem] font-bold text-stone-800 mb-2">{cat.name} — जल्द आ रहा है</h3>
                <p className="font-body text-[0.85rem] text-stone-500 max-w-[380px] mx-auto mb-6">हम इस श्रेणी में लिस्टिंग जोड़ रहे हैं।</p>
                <Link href="/sampark" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.85rem] rounded-xl transition-colors">📋 पहली लिस्टिंग बनें</Link>
              </div>
            ) : (
              <>
                {/* Listings grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {listings.map((listing) => {
                    const ld = listing as any;
                    const isPremium = ld.premium === true;
                    return (
                      <Link key={listing.slug} href={'/directory/' + cat.slug + '/' + listing.slug} className={'group rounded-xl border overflow-hidden transition-all duration-200 ' + (isPremium ? 'bg-gradient-to-b from-amber-50/60 to-white border-amber-200 hover:shadow-lg hover:shadow-amber-100/50 hover:border-amber-300' : 'bg-white border-stone-200 hover:shadow-md hover:border-red-200')}>
                        <div className="p-4 md:p-5">
                          {/* Premium badge */}
                          {isPremium && (
                            <div className="mb-2.5"><span className="text-[0.6rem] font-bold text-amber-800 bg-gradient-to-r from-amber-200 to-yellow-200 px-2 py-0.5 rounded-full">👑 PREMIUM VERIFIED</span></div>
                          )}

                          <div className="flex items-start gap-3">
                            {/* Logo or icon */}
                            {ld.logo ? (
                              <div className={'w-14 h-14 rounded-xl overflow-hidden border bg-white shrink-0 p-0.5 ' + (isPremium ? 'border-amber-300 shadow-sm' : 'border-stone-200')}>
                                <img src={ld.logo} alt={listing.name} className="w-full h-full object-contain rounded-lg" loading="lazy" />
                              </div>
                            ) : (
                              <div className="w-11 h-11 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-[22px] shrink-0 group-hover:scale-105 transition-transform">{cat.iconImage ? <img src={cat.iconImage} alt="" className="w-full h-full object-contain p-0.5 rounded" /> : cat.icon}</div>
                            )}
                            <div className="min-w-0 flex-1">
                              <h3 className="font-display text-[0.95rem] font-bold text-stone-900 group-hover:text-red-700 transition-colors leading-snug">{listing.name}</h3>
                              {listing.nameEn && (<p className="font-body text-[0.68rem] text-stone-400 italic">{listing.nameEn}</p>)}
                            </div>
                          </div>

                          <p className="font-body text-[0.78rem] text-stone-500 leading-relaxed mt-2.5 line-clamp-2">{listing.description}</p>

                          {/* Location + contact */}
                          <div className="flex items-center gap-3 mt-3 text-[0.72rem] text-stone-400">
                            <span>📍 {listing.district}, {listing.state}</span>
                            {ld.phone && ld.phone[0] && (<span className="text-green-600 font-semibold">📞 {ld.phone[0]}</span>)}
                          </div>

                          {/* Specializations */}
                          {listing.specialization && listing.specialization.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2.5">
                              {listing.specialization.slice(0, 3).map((spec: string, i: number) => (<span key={i} className="text-[0.6rem] font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">{spec}</span>))}
                            </div>
                          )}

                          {/* Footer row */}
                          <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-stone-100">
                            {listing.capacity && (<span className="text-[0.68rem] text-stone-400">📊 {listing.capacity}</span>)}
                            {listing.established && (<span className="text-[0.68rem] text-stone-400">🗓️ {listing.established}</span>)}
                            {isPremium && ld.contactPerson && (<span className="text-[0.68rem] text-amber-700 font-medium ml-auto">👤 {ld.contactPerson}</span>)}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* State sections with anchors */}
                {statesWithListings.length > 1 && (
                  <div className="mt-12">
                    <h2 className="font-display text-[1.2rem] font-bold text-stone-900 mb-6">राज्यवार सूची</h2>
                    {statesWithListings.map((state) => (
                      <div key={state} className="mb-8" id={'state-' + state}>
                        <h3 className="font-display text-[1rem] font-bold text-stone-800 mb-3 flex items-center gap-2">
                          <span className="w-1 h-5 bg-red-500 rounded-full" />{state}
                          <span className="font-body text-[0.72rem] font-normal text-stone-400">({stateGroups[state].length})</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {stateGroups[state].map((listing) => {
                            const ld = listing as any;
                            return (
                              <Link key={listing.slug} href={'/directory/' + cat.slug + '/' + listing.slug} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-stone-200 hover:border-red-200 hover:shadow-sm transition-all group">
                                {ld.logo ? (
                                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-stone-200 bg-white shrink-0 p-0.5"><img src={ld.logo} alt={listing.name} className="w-full h-full object-contain rounded" /></div>
                                ) : (
                                  <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[18px] shrink-0">{cat.iconImage ? <img src={cat.iconImage} alt="" className="w-full h-full object-contain p-0.5 rounded" /> : cat.icon}</div>
                                )}
                                <div className="min-w-0">
                                  <h4 className="font-body text-[0.82rem] font-semibold text-stone-800 group-hover:text-red-700 transition-colors truncate">{listing.name}</h4>
                                  <p className="font-body text-[0.68rem] text-stone-400 truncate">📍 {listing.district}{ld.phone && ld.phone[0] ? ' · ☎ ' + ld.phone[0] : ''}</p>
                                </div>
                                {ld.premium && (<span className="ml-auto text-[0.55rem] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded shrink-0">👑</span>)}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-8 px-4 bg-red-50 border-t border-red-100">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-display text-[1.1rem] font-bold text-stone-900 mb-2">अपना {cat.name} यहाँ सूचीबद्ध करें</h2>
            <p className="font-body text-[0.82rem] text-stone-500 mb-4">निःशुल्क लिस्टिंग — WhatsApp या ईमेल</p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
              <Link href="/directory/submit" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.85rem] rounded-xl transition-colors">📋 लिस्टिंग जोड़ें</Link>
              <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-[0.85rem] rounded-xl transition-colors">💬 WhatsApp</a>
            </div>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: cat.name + ' — Indian Potato', url: 'https://indianpotato.in/directory/' + cat.slug, numberOfItems: listings.length }) }} />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
