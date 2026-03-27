import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { DIRECTORY_CATEGORIES, getCategoryConfig, getListingsByCategory } from '@/lib/directory';
import StateFilter from '@/app/directory/StateFilter';

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

  // Sort: platinum → gold → featured → free
  const sortedListings = [...listings].sort((a: any, b: any) => {
    const tierOrder: Record<string, number> = { platinum: 0, gold: 1 };
    const aTier = tierOrder[a.tier] ?? (a.featured ? 2 : 3);
    const bTier = tierOrder[b.tier] ?? (b.featured ? 2 : 3);
    return aTier - bTier;
  });

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
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[28px] md:text-[34px] shrink-0 overflow-hidden">
                {cat.iconImage ? <img src={cat.iconImage} alt={cat.name} className="w-full h-full object-contain p-1" /> : cat.icon}
              </div>
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

        {/* State Filter */}
        {statesWithListings.length > 0 && (
          <StateFilter states={statesWithListings} counts={Object.fromEntries(statesWithListings.map(s => [s, stateGroups[s].length]))} />
        )}

        {/* Listings — Card Grid */}
        <section className="py-6 md:py-12 px-3 md:px-6 bg-stone-50/50">
          <div className="max-w-[1280px] mx-auto">
            {listings.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-[56px] mb-3">📋</div>
                <h3 className="font-display text-[1.15rem] font-bold text-stone-800 mb-2">{cat.name} — जल्द आ रहा है</h3>
                <p className="font-body text-[0.85rem] text-stone-500 max-w-[380px] mx-auto mb-6">हम इस श्रेणी में लिस्टिंग जोड़ रहे हैं।</p>
                <Link href="/directory/submit" className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.85rem] rounded-xl transition-colors">📋 पहली लिस्टिंग बनें</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedListings.map((listing) => {
                  const ld = listing as any;
                  const isPremium = ld.premium === true;
                  const tier = ld.tier || (isPremium ? 'gold' : 'free');
                  const isPlat = tier === 'platinum';
                  const isGold = tier === 'gold';
                  const isFree = !isPremium;

                  return (
                    <Link key={listing.slug} href={'/directory/' + cat.slug + '/' + listing.slug}
                      data-state={listing.state}
                      className={'group rounded-2xl border-2 overflow-hidden transition-all duration-200 flex flex-col ' +
                        (isPlat ? 'bg-gradient-to-b from-violet-50/50 to-white border-violet-300 hover:shadow-xl hover:shadow-violet-100/50' :
                        isGold ? 'bg-gradient-to-b from-amber-50/50 to-white border-amber-300 hover:shadow-xl hover:shadow-amber-100/50' :
                        'bg-white border-stone-200 hover:shadow-md hover:border-stone-300')}>

                      <div className={'p-4 md:p-5 flex flex-col flex-1'}>
                        {/* Top: badge + location for premium */}
                        {(isPlat || isGold) && (
                          <div className="flex items-center justify-between mb-3">
                            <span className={'text-[0.6rem] font-bold px-2 py-0.5 rounded-full ' +
                              (isPlat ? 'text-violet-800 bg-gradient-to-r from-violet-200 to-purple-200' :
                              'text-amber-800 bg-gradient-to-r from-amber-200 to-yellow-200')}>
                              {isPlat ? '💎 PLATINUM' : '👑 GOLD'}
                            </span>
                            <span className={'text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ' +
                              (isPlat ? 'text-violet-700 bg-violet-50 border-violet-200' :
                              'text-amber-700 bg-amber-50 border-amber-200')}>
                              📍 {listing.district}, {listing.state}
                            </span>
                          </div>
                        )}

                        {/* Logo + Name */}
                        <div className="flex items-start gap-3">
                          {ld.logo ? (
                            <div className={'w-14 h-14 rounded-xl overflow-hidden border bg-white shrink-0 p-0.5 ' +
                              (isPlat ? 'border-violet-300 shadow-sm' : isGold ? 'border-amber-300 shadow-sm' : 'border-stone-200')}>
                              <img src={ld.logo} alt={listing.name} className="w-full h-full object-contain rounded-lg" loading="lazy" />
                            </div>
                          ) : (
                            <div className={'w-11 h-11 rounded-lg border flex items-center justify-center text-[22px] shrink-0 overflow-hidden ' +
                              (isPlat ? 'bg-violet-100 border-violet-200' : isGold ? 'bg-amber-100 border-amber-200' : 'bg-stone-100 border-stone-200')}>
                              {cat.iconImage ? <img src={cat.iconImage} alt="" className="w-full h-full object-contain p-0.5 rounded" /> : cat.icon}
                            </div>
                          )}
                          <div className="min-w-0">
                            <h3 className={'font-display text-[0.95rem] font-bold leading-snug group-hover:text-red-700 transition-colors ' +
                              (isFree ? 'text-stone-700' : 'text-stone-900')}>{listing.name}</h3>
                            {listing.nameEn && <p className="font-body text-[0.68rem] text-stone-400 italic">{listing.nameEn}</p>}
                          </div>
                        </div>

                        {/* Description — shorter for free */}
                        <p className={'font-body text-stone-500 leading-relaxed mt-2.5 ' +
                          (isFree ? 'text-[0.75rem] line-clamp-1' : 'text-[0.8rem] line-clamp-2')}>{listing.description}</p>

                        {/* Specializations — only for premium */}
                        {!isFree && listing.specialization && listing.specialization.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {listing.specialization.slice(0, 3).map((spec: string, i: number) => (
                              <span key={i} className={'text-[0.6rem] font-medium px-1.5 py-0.5 rounded ' +
                                (isPlat ? 'text-violet-600 bg-violet-100/60' : 'text-amber-700 bg-amber-100/60')}>{spec}</span>
                            ))}
                            {listing.specialization.length > 3 && <span className="text-[0.6rem] text-stone-400">+{listing.specialization.length - 3}</span>}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="mt-auto pt-3 border-t border-stone-100 mt-3">
                          {isFree ? (
                            /* Free: only email, no phone */
                            <div className="flex items-center justify-between">
                              {listing.email && <span className="text-[0.68rem] text-stone-400 truncate">📧 {listing.email}</span>}
                              <span className="text-[0.58rem] text-stone-300 font-body shrink-0 ml-auto">Basic</span>
                            </div>
                          ) : (
                            /* Premium: phone, email, contact */
                            <div className="flex flex-wrap items-center gap-2">
                              {ld.phone && ld.phone[0] && <span className="text-[0.7rem] font-semibold text-green-600">📞 {ld.phone[0]}</span>}
                              {ld.email && <span className="text-[0.68rem] text-stone-400">📧 {ld.email}</span>}
                              {ld.contactPerson && <span className={'text-[0.68rem] font-medium ml-auto ' +
                                (isPlat ? 'text-violet-600' : 'text-amber-700')}>👤 {ld.contactPerson}</span>}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
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
              <a href="https://wa.me/919499668831" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-[0.85rem] rounded-xl transition-colors">💬 WhatsApp</a>
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
