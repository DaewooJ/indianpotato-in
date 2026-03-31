import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { DIRECTORY_CATEGORIES, getCategoryCounts, getFeaturedListings } from '@/lib/directory';

export const metadata: Metadata = {
  title: 'आलू उद्योग डायरेक्टरी — कोल्ड स्टोरेज, व्यापारी, निर्यातक | Indian Potato Directory',
  description: 'भारत की सबसे बड़ी आलू उद्योग डायरेक्टरी — कोल्ड स्टोरेज, व्यापारी, निर्यातक, प्रसंस्करण कंपनियाँ, बीज आपूर्तिकर्ता, मशीनरी और प्रगतिशील किसान। राज्यवार खोजें।',
  openGraph: { title: 'आलू उद्योग डायरेक्टरी — Indian Potato', description: 'भारत की सबसे बड़ी आलू उद्योग डायरेक्टरी', type: 'website', url: 'https://www.indianpotato.in/directory' },
  alternates: { canonical: 'https://www.indianpotato.in/directory' },
};

const colorMap: Record<string, { text: string; iconBg: string; iconBorder: string; accent: string }> = {
  blue: { text: 'text-blue-600', iconBg: 'bg-blue-50', iconBorder: 'border-blue-200', accent: 'group-hover:border-blue-300' },
  amber: { text: 'text-amber-600', iconBg: 'bg-amber-50', iconBorder: 'border-amber-200', accent: 'group-hover:border-amber-300' },
  green: { text: 'text-green-600', iconBg: 'bg-green-50', iconBorder: 'border-green-200', accent: 'group-hover:border-green-300' },
  red: { text: 'text-red-600', iconBg: 'bg-red-50', iconBorder: 'border-red-200', accent: 'group-hover:border-red-300' },
  emerald: { text: 'text-emerald-600', iconBg: 'bg-emerald-50', iconBorder: 'border-emerald-200', accent: 'group-hover:border-emerald-300' },
  slate: { text: 'text-slate-600', iconBg: 'bg-slate-50', iconBorder: 'border-slate-200', accent: 'group-hover:border-slate-300' },
  violet: { text: 'text-violet-600', iconBg: 'bg-violet-50', iconBorder: 'border-violet-200', accent: 'group-hover:border-violet-300' },
  orange: { text: 'text-orange-600', iconBg: 'bg-orange-50', iconBorder: 'border-orange-200', accent: 'group-hover:border-orange-300' },
  zinc: { text: 'text-zinc-600', iconBg: 'bg-zinc-50', iconBorder: 'border-zinc-200', accent: 'group-hover:border-zinc-300' },
  lime: { text: 'text-lime-600', iconBg: 'bg-lime-50', iconBorder: 'border-lime-200', accent: 'group-hover:border-lime-300' },
  yellow: { text: 'text-yellow-600', iconBg: 'bg-yellow-50', iconBorder: 'border-yellow-200', accent: 'group-hover:border-yellow-300' },
};

export default function DirectoryPage() {
  const counts = getCategoryCounts();
  const featured = getFeaturedListings().slice(0, 6);
  const totalListings = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'डायरेक्टरी', url: 'https://www.indianpotato.in/directory' },
      ]} />
      <Navbar />
      <main className="pt-[76px]">
        {/* Hero — compact */}
        <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-700 py-10 md:py-16 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 mb-3">
              <span className="text-[0.68rem] font-semibold text-orange-200 tracking-wide uppercase">🇮🇳 भारत की #1 आलू डायरेक्टरी</span>
            </div>
            <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.8rem)] font-bold text-white mb-2 leading-tight">आलू उद्योग डायरेक्टरी</h1>
            <p className="font-body text-[0.88rem] md:text-[1rem] text-white/60 max-w-[550px] leading-relaxed mb-6">कोल्ड स्टोरेज · व्यापारी · निर्यातक · प्रसंस्करण · मशीनरी · बीज · किसान — राज्यवार खोजें, सीधे संपर्क करें।</p>
            <div className="flex flex-wrap gap-4 md:gap-8">
              {[{ value: totalListings > 0 ? totalListings + '+' : '1,200+', label: 'सूचीबद्ध' }, { value: '11', label: 'श्रेणियाँ' }, { value: '23+', label: 'राज्य' }].map((s, i) => (
                <div key={i} className="flex items-baseline gap-1.5">
                  <span className="font-display text-[1.4rem] md:text-[1.8rem] font-bold text-white leading-none">{s.value}</span>
                  <span className="font-body text-[0.7rem] text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories — compact 2-col mobile grid */}
        <section className="py-6 md:py-12 px-3 md:px-6 bg-stone-50/80">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-[1.15rem] md:text-[1.5rem] font-bold text-stone-900 mb-1 md:mb-2">श्रेणियाँ चुनें</h2>
            <p className="font-body text-[0.78rem] md:text-[0.88rem] text-stone-400 mb-4 md:mb-6">टैप करें और अपनी ज़रूरत की श्रेणी में सीधे जाएँ</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2.5 md:gap-3.5">
              {DIRECTORY_CATEGORIES.map((cat) => {
                const colors = colorMap[cat.color] || colorMap.red;
                const count = counts[cat.slug] || 0;
                return (
                  <Link key={cat.slug} href={'/directory/' + cat.slug} className={'group bg-white rounded-xl p-3 md:p-4 border border-stone-200 hover:shadow-md transition-all duration-200 flex flex-col ' + colors.accent}>
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className={'w-9 h-9 md:w-11 md:h-11 rounded-lg ' + colors.iconBg + ' border ' + colors.iconBorder + ' flex items-center justify-center text-[18px] md:text-[22px] shrink-0 group-hover:scale-105 transition-transform'}>{cat.iconImage ? <img src={cat.iconImage} alt={cat.name} className="w-full h-full object-contain p-0.5 rounded-lg" /> : cat.icon}</div>
                      <div className="min-w-0">
                        <h3 className="font-display text-[0.82rem] md:text-[0.95rem] font-bold text-stone-800 leading-tight truncate">{cat.name}</h3>
                        <p className="font-body text-[0.62rem] md:text-[0.68rem] text-stone-400 italic truncate">{cat.nameEn}</p>
                      </div>
                    </div>
                    <p className="font-body text-[0.68rem] md:text-[0.75rem] text-stone-400 leading-snug mb-2 line-clamp-2 hidden md:block">{cat.description}</p>
                    <div className="flex justify-between items-center mt-auto pt-2 border-t border-stone-100">
                      <span className={'font-body text-[0.65rem] md:text-[0.72rem] font-bold ' + colors.text}>{count > 0 ? count + ' लिस्टिंग' : 'जल्द'}</span>
                      <span className="text-[0.6rem] md:text-[0.68rem] font-semibold text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured — premium cards */}
        {featured.length > 0 && (
          <section className="py-8 md:py-14 px-3 md:px-6 bg-white">
            <div className="max-w-[1280px] mx-auto">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[1.2rem]">👑</span>
                <h2 className="font-display text-[1.15rem] md:text-[1.4rem] font-bold text-stone-900">प्रीमियम लिस्टिंग</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((listing) => {
                  const catConfig = DIRECTORY_CATEGORIES.find((c) => c.slug === listing.category);
                  const ld = listing as any;
                  const isPremium = ld.premium === true;
                  return (
                    <Link key={listing.category + '-' + listing.slug} href={'/directory/' + listing.category + '/' + listing.slug} className={'group rounded-xl border overflow-hidden transition-all duration-300 ' + (isPremium ? 'bg-gradient-to-b from-amber-50/50 to-white border-amber-200 hover:shadow-xl hover:shadow-amber-100/60 hover:border-amber-300' : 'bg-stone-50 border-stone-200 hover:shadow-lg hover:border-red-200')}>
                      <div className="p-4 md:p-5">
                        {isPremium && (
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-[0.62rem] font-bold text-amber-800 bg-gradient-to-r from-amber-200 to-yellow-200 px-2 py-0.5 rounded-full">👑 PREMIUM</span>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          {ld.logo ? (
                            <div className={'w-14 h-14 rounded-xl overflow-hidden border bg-white shrink-0 p-0.5 ' + (isPremium ? 'border-amber-300' : 'border-stone-200')}>
                              <img src={ld.logo} alt={listing.name} className="w-full h-full object-contain rounded-lg" />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-[22px] shrink-0">{catConfig?.icon}</div>
                          )}
                          <div className="min-w-0">
                            <h3 className="font-display text-[0.95rem] md:text-[1.05rem] font-bold text-stone-900 group-hover:text-red-700 transition-colors leading-snug mb-0.5">{listing.name}</h3>
                            <div className="flex items-center gap-1.5 text-[0.7rem] text-stone-400 mb-2">
                              <span>{catConfig?.icon}</span>
                              <span>{catConfig?.name}</span>
                              <span>·</span>
                              <span>📍 {listing.district}, {listing.state}</span>
                            </div>
                          </div>
                        </div>
                        <p className="font-body text-[0.78rem] text-stone-500 leading-relaxed mt-2 line-clamp-2">{listing.description}</p>
                        {listing.specialization && listing.specialization.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {listing.specialization.slice(0, 4).map((spec: string, i: number) => (<span key={i} className="text-[0.6rem] font-medium text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">{spec}</span>))}
                            {listing.specialization.length > 4 && (<span className="text-[0.6rem] text-stone-400">+{listing.specialization.length - 4}</span>)}
                          </div>
                        )}
                        {ld.phone && ld.phone[0] && (
                          <div className="flex gap-2 mt-3 pt-2 border-t border-stone-100">
                            <span className="text-[0.68rem] font-semibold text-green-600">📞 {ld.phone[0]}</span>
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-10 md:py-16 px-4 md:px-6 bg-gradient-to-br from-stone-900 to-stone-800">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="font-display text-[clamp(1.3rem,3.5vw,2rem)] font-bold text-white mb-3">अपना व्यवसाय सूचीबद्ध करें</h2>
            <p className="font-body text-[0.88rem] text-stone-400 mb-6">निःशुल्क लिस्टिंग — भारत के सबसे बड़े आलू प्लेटफ़ॉर्म पर</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/directory/submit" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.88rem] rounded-xl transition-colors">📋 निःशुल्क लिस्टिंग</Link>
              <a href="https://wa.me/919499668831?text=मैं%20अपना%20व्यवसाय%20सूचीबद्ध%20करना%20चाहता%20हूँ" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-[0.88rem] rounded-xl transition-colors">💬 WhatsApp</a>
            </div>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'आलू उद्योग डायरेक्टरी', url: 'https://www.indianpotato.in/directory', publisher: { '@type': 'Organization', name: 'Indian Potato', url: 'https://www.indianpotato.in' }, numberOfItems: totalListings }) }} />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
