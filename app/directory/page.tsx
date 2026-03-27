import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { DIRECTORY_CATEGORIES, getCategoryCounts, getFeaturedListings } from '@/lib/directory';

export const metadata: Metadata = {
  title: 'आलू उद्योग डायरेक्टरी — कोल्ड स्टोरेज, व्यापारी, निर्यातक | Indian Potato Directory',
  description: 'भारत की सबसे बड़ी आलू उद्योग डायरेक्टरी — कोल्ड स्टोरेज, व्यापारी, निर्यातक, प्रसंस्करण कंपनियाँ, बीज आपूर्तिकर्ता, मशीनरी और प्रगतिशील किसान। राज्यवार खोजें।',
  openGraph: {
    title: 'आलू उद्योग डायरेक्टरी — Indian Potato',
    description: 'भारत की सबसे बड़ी आलू उद्योग डायरेक्टरी',
    type: 'website',
    url: 'https://indianpotato.in/directory',
  },
  alternates: { canonical: 'https://indianpotato.in/directory' },
};

const colorMap: Record<string, { text: string; iconBg: string; iconBorder: string }> = {
  blue: { text: 'text-blue-700', iconBg: 'bg-blue-100', iconBorder: 'border-blue-200' },
  amber: { text: 'text-amber-700', iconBg: 'bg-amber-100', iconBorder: 'border-amber-200' },
  green: { text: 'text-green-700', iconBg: 'bg-green-100', iconBorder: 'border-green-200' },
  red: { text: 'text-red-700', iconBg: 'bg-red-100', iconBorder: 'border-red-200' },
  emerald: { text: 'text-emerald-700', iconBg: 'bg-emerald-100', iconBorder: 'border-emerald-200' },
  slate: { text: 'text-slate-700', iconBg: 'bg-slate-100', iconBorder: 'border-slate-200' },
  violet: { text: 'text-violet-700', iconBg: 'bg-violet-100', iconBorder: 'border-violet-200' },
  orange: { text: 'text-orange-700', iconBg: 'bg-orange-100', iconBorder: 'border-orange-200' },
  zinc: { text: 'text-zinc-700', iconBg: 'bg-zinc-100', iconBorder: 'border-zinc-200' },
  lime: { text: 'text-lime-700', iconBg: 'bg-lime-100', iconBorder: 'border-lime-200' },
  yellow: { text: 'text-yellow-700', iconBg: 'bg-yellow-100', iconBorder: 'border-yellow-200' },
};

export default function DirectoryPage() {
  const counts = getCategoryCounts();
  const featured = getFeaturedListings().slice(0, 6);
  const totalListings = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-700 py-16 md:py-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <span className="text-[0.75rem] font-semibold text-orange-200 tracking-wide uppercase">🇮🇳 भारत की सबसे बड़ी आलू डायरेक्टरी</span>
            </div>
            <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-bold text-white mb-3 leading-tight">आलू उद्योग डायरेक्टरी</h1>
            <p className="font-body text-[1.05rem] text-white/70 max-w-[620px] leading-relaxed mb-8">कोल्ड स्टोरेज, व्यापारी, निर्यातक, प्रसंस्करण कंपनियाँ, मशीनरी निर्माता, बीज आपूर्तिकर्ता और प्रगतिशील किसान — सब एक जगह। राज्यवार खोजें और सीधे संपर्क करें।</p>
            <div className="flex flex-wrap gap-6 md:gap-10">
              {[{ value: totalListings > 0 ? totalListings + '+' : '1,200+', label: 'कुल सूचीबद्ध' }, { value: '11', label: 'श्रेणियाँ' }, { value: '23+', label: 'राज्य कवर' }].map((s, i) => (
                <div key={i}>
                  <div className="font-display text-[1.8rem] md:text-[2.2rem] font-bold text-white leading-none">{s.value}</div>
                  <div className="font-body text-[0.8rem] text-white/50 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="py-14 md:py-20 px-6 bg-stone-50/50">
          <div className="max-w-[1280px] mx-auto">
            <div className="mb-10">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-stone-900 mb-2">श्रेणियाँ</h2>
              <p className="font-body text-[0.92rem] text-stone-500">अपनी ज़रूरत के अनुसार श्रेणी चुनें और आलू उद्योग से जुड़े लोगों और कंपनियों को खोजें</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {DIRECTORY_CATEGORIES.map((cat) => {
                const colors = colorMap[cat.color] || colorMap.red;
                const count = counts[cat.slug] || 0;
                return (
                  <Link key={cat.slug} href={'/directory/' + cat.slug} className="group bg-white rounded-2xl p-6 border border-stone-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/50 transition-all duration-300 flex flex-col">
                    <div className={'w-14 h-14 rounded-xl ' + colors.iconBg + ' border ' + colors.iconBorder + ' flex items-center justify-center text-[28px] mb-4 group-hover:scale-110 transition-transform duration-300'}>{cat.icon}</div>
                    <h3 className="font-display text-[1.1rem] font-bold text-stone-900 mb-1">{cat.name}</h3>
                    <p className="font-body text-[0.78rem] text-stone-400 mb-1 italic">{cat.nameEn}</p>
                    <p className="font-body text-[0.82rem] text-stone-500 leading-relaxed flex-1 mb-4">{cat.description}</p>
                    <div className="flex justify-between items-center mt-auto pt-3 border-t border-stone-100">
                      <span className={'font-body text-[0.8rem] font-bold ' + colors.text}>{count > 0 ? count + ' सूचीबद्ध' : 'जल्द आ रहा है'}</span>
                      <span className="font-body text-[0.75rem] font-semibold text-red-500 group-hover:translate-x-1 transition-transform duration-300">देखें →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {featured.length > 0 && (
          <section className="py-14 md:py-20 px-6 bg-white">
            <div className="max-w-[1280px] mx-auto">
              <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] font-bold text-stone-900 mb-2">⭐ प्रमुख सूचीबद्ध</h2>
              <p className="font-body text-[0.92rem] text-stone-500 mb-10">भारत के शीर्ष आलू उद्योग व्यवसाय</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map((listing) => {
                  const catConfig = DIRECTORY_CATEGORIES.find((c) => c.slug === listing.category);
                  return (
                    <Link key={listing.category + '-' + listing.slug} href={'/directory/' + listing.category + '/' + listing.slug} className="group bg-stone-50 rounded-2xl border border-stone-200 overflow-hidden hover:shadow-lg hover:border-red-200 transition-all duration-300">
                      {listing.image && (<div className="h-40 bg-stone-200 overflow-hidden"><img src={listing.image} alt={listing.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>)}
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[14px]">{catConfig?.icon}</span>
                          <span className="text-[0.7rem] font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">{catConfig?.name}</span>
                        </div>
                        <h3 className="font-display text-[1.05rem] font-bold text-stone-900 mb-1 group-hover:text-red-700 transition-colors">{listing.name}</h3>
                        <p className="font-body text-[0.82rem] text-stone-500 mb-3 line-clamp-2">{listing.description}</p>
                        <div className="flex items-center gap-2 text-[0.78rem] text-stone-400"><span>📍</span><span>{listing.district}, {listing.state}</span></div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="py-14 md:py-20 px-6 bg-gradient-to-br from-stone-900 to-stone-800">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] font-bold text-white mb-4">अपना व्यवसाय सूचीबद्ध करें</h2>
            <p className="font-body text-[1rem] text-stone-400 mb-8 max-w-[500px] mx-auto leading-relaxed">क्या आप आलू उद्योग से जुड़े हैं? अपनी कंपनी, कोल्ड स्टोरेज या सेवा को भारत के सबसे बड़े आलू प्लेटफ़ॉर्म पर निःशुल्क सूचीबद्ध करें।</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sampark" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.95rem] rounded-xl transition-colors">📋 निःशुल्क लिस्टिंग</Link>
              <a href="https://wa.me/919XXXXXXXXX?text=मैं%20अपना%20व्यवसाय%20सूचीबद्ध%20करना%20चाहता%20हूँ" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-[0.95rem] rounded-xl transition-colors">💬 WhatsApp पर संपर्क</a>
            </div>
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'आलू उद्योग डायरेक्टरी — Indian Potato', description: 'भारत की सबसे बड़ी आलू उद्योग डायरेक्टरी', url: 'https://indianpotato.in/directory', publisher: { '@type': 'Organization', name: 'Indian Potato', url: 'https://indianpotato.in' }, numberOfItems: totalListings, hasPart: DIRECTORY_CATEGORIES.map((cat) => ({ '@type': 'CollectionPage', name: cat.name + ' — ' + cat.nameEn, url: 'https://indianpotato.in/directory/' + cat.slug })) }) }} />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
