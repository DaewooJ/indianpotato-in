import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';
import { DIRECTORY_CATEGORIES, getCategoryConfig, getListingBySlug, getListingsByCategory } from '@/lib/directory';

export function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  for (const cat of DIRECTORY_CATEGORIES) {
    const listings = getListingsByCategory(cat.slug);
    for (const listing of listings) {
      params.push({ category: cat.slug, slug: listing.slug });
    }
  }
  return params;
}

export function generateMetadata({ params }: { params: { category: string; slug: string } }): Metadata {
  const listing = getListingBySlug(params.category, params.slug);
  const cat = getCategoryConfig(params.category);
  if (!listing || !cat) return { title: 'Not Found' };
  const title = listing.name + ' — ' + cat.name + ', ' + listing.district + ', ' + listing.state + ' | Indian Potato';
  const description = listing.name + ' — ' + listing.description.slice(0, 160);
  return {
    title, description,
    openGraph: { title: listing.name, description, type: 'website', url: 'https://www.indianpotato.in/directory/' + params.category + '/' + params.slug, ...(listing.image && { images: [{ url: listing.image }] }) },
    alternates: { canonical: 'https://www.indianpotato.in/directory/' + params.category + '/' + params.slug },
  };
}

export default function ListingPage({ params }: { params: { category: string; slug: string } }) {
  const listing = getListingBySlug(params.category, params.slug) as any;
  const cat = getCategoryConfig(params.category);
  if (!listing || !cat) notFound();
  const related = getListingsByCategory(params.category).filter((l) => l.slug !== params.slug).slice(0, 4);
  const isPremium = listing.premium === true;
  const whatsappNumber = listing.whatsapp || (listing.phone && listing.phone[0]) || '';
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        {/* Premium top bar */}
        {isPremium && (
          <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 py-2 px-4 text-center">
            <span className="text-[0.78rem] font-bold text-amber-900 tracking-wide">
              ⭐ प्रीमियम लिस्टिंग — PREMIUM VERIFIED LISTING ⭐
            </span>
          </div>
        )}

        {/* Hero */}
        <div className={'relative overflow-hidden ' + (isPremium ? 'bg-gradient-to-br from-amber-900 via-[#032808] to-[#d94e2a]' : 'bg-gradient-to-br from-[#032808] via-[#05420d] to-[#ed6442]')}>
          {listing.image && (<div className="absolute inset-0"><img src={listing.image} alt={listing.name} className="w-full h-full object-cover opacity-15" /><div className={'absolute inset-0 ' + (isPremium ? 'bg-gradient-to-t from-amber-900/95 via-[#032808]/85 to-[#011503]/70' : 'bg-gradient-to-t from-[#032808]/95 via-[#032808]/80 to-[#011503]/60')} /></div>)}
          <div className="relative z-10 py-14 md:py-18 px-6">
            <div className="max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-[0.78rem] font-body text-white/50 mb-6 flex-wrap">
                <Link href="/" className="hover:text-white/80 transition-colors">होम</Link><span>/</span>
                <Link href="/directory" className="hover:text-white/80 transition-colors">डायरेक्टरी</Link><span>/</span>
                <Link href={'/directory/' + cat.slug} className="hover:text-white/80 transition-colors">{cat.name}</Link><span>/</span>
                <span className="text-white/90">{listing.name}</span>
              </nav>

              <div className="flex items-start gap-5 mb-4">
                {/* Logo or icon */}
                {listing.logo ? (
                  <div className={'w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 shrink-0 bg-white ' + (isPremium ? 'border-amber-400 shadow-lg shadow-amber-500/30' : 'border-white/20')}>
                    <img src={listing.logo} alt={listing.name + ' logo'} className="w-full h-full object-contain p-1" />
                  </div>
                ) : (
                  <div className={'w-16 h-16 md:w-20 md:h-20 rounded-2xl backdrop-blur-sm border flex items-center justify-center text-[36px] md:text-[44px] shrink-0 ' + (isPremium ? 'bg-amber-500/20 border-amber-400/40' : 'bg-white/10 border-white/20')}>{cat.iconImage ? <img src={cat.iconImage} alt="" className="w-full h-full object-contain p-1 rounded" /> : cat.icon}</div>
                )}
                <div>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {isPremium && (
                      <span className="inline-flex items-center gap-1 text-[0.72rem] font-bold text-amber-900 bg-gradient-to-r from-amber-300 to-yellow-300 px-3 py-1 rounded-full shadow-md">
                        👑 प्रीमियम सत्यापित · PREMIUM VERIFIED
                      </span>
                    )}
                    {listing.featured && !isPremium && (
                      <span className="inline-block text-[0.68rem] font-bold text-amber-200 bg-amber-900/40 border border-amber-500/30 px-2 py-0.5 rounded-full">⭐ प्रमुख लिस्टिंग</span>
                    )}
                  </div>
                  <h1 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-bold text-white leading-tight">{listing.name}</h1>
                  {listing.nameEn && (<p className="font-body text-[0.88rem] text-white/50 italic mt-1">{listing.nameEn}</p>)}
                </div>
              </div>

              <p className="font-body text-[1rem] text-white/70 max-w-[700px] leading-relaxed mt-4">{listing.description.slice(0, 200)}...</p>

              {/* Quick info pills */}
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[0.78rem] text-white/80 font-body">📍 {listing.district}, {listing.state}</span>
                {listing.contactPerson && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[0.78rem] text-white/80 font-body">👤 {listing.contactPerson}</span>
                )}
                {listing.capacity && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[0.78rem] text-white/80 font-body">📊 {listing.capacity}</span>
                )}
                <span className={'inline-flex items-center gap-1.5 px-3 py-1.5 backdrop-blur-sm border rounded-full text-[0.78rem] font-body font-semibold ' + (isPremium ? 'bg-amber-500/20 border-amber-400/30 text-amber-200' : 'bg-green-500/20 border-emerald-600/20 text-green-200')}>{cat.icon} {cat.name}</span>
              </div>

              {/* CTA Buttons in hero for premium */}
              {isPremium && listing.phone && listing.phone[0] && (
                <div className="flex flex-wrap gap-3 mt-8">
                  <a href={'tel:' + listing.phone[0]} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#032808] font-body font-bold text-[0.95rem] rounded-xl hover:bg-green-50 transition-colors shadow-lg">📞 अभी कॉल करें</a>
                  <a href={'https://wa.me/' + cleanWhatsapp + '?text=' + encodeURIComponent('नमस्ते, मुझे आलू बीज के बारे में जानकारी चाहिए।')} target="_blank" rel="noopener" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-body font-bold text-[0.95rem] rounded-xl hover:bg-green-600 transition-colors shadow-lg">💬 WhatsApp करें</a>
                  {listing.email && (
                    <a href={'mailto:' + listing.email} className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-body font-semibold text-[0.95rem] rounded-xl hover:bg-white/20 transition-colors">📧 ईमेल भेजें</a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <section className="py-10 md:py-16 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className={'rounded-2xl p-6 md:p-8 border ' + (isPremium ? 'bg-amber-50/50 border-amber-200' : 'bg-stone-50 border-stone-200')}>
                  <h2 className="font-display text-[1.15rem] font-bold text-stone-900 mb-4 flex items-center gap-2">
                    <span className={'w-1 h-5 rounded-full ' + (isPremium ? 'bg-amber-500' : 'bg-green-500')} />
                    विवरण
                  </h2>
                  <p className="font-body text-[0.92rem] text-stone-600 leading-relaxed">{listing.description}</p>
                  {listing.descriptionEn && (<p className="font-body text-[0.85rem] text-stone-400 italic mt-4 leading-relaxed">{listing.descriptionEn}</p>)}
                </div>

                {/* Varieties Grid — for seed suppliers */}
                {listing.varieties && listing.varieties.length > 0 && (
                  <div className="rounded-2xl p-6 md:p-8 border border-stone-200 bg-stone-50">
                    <h2 className="font-display text-[1.15rem] font-bold text-stone-900 mb-6 flex items-center gap-2">
                      <span className="w-1 h-5 bg-green-500 rounded-full" />
                      उपलब्ध किस्में
                      <span className="ml-auto text-[0.75rem] font-body font-normal text-stone-400">{listing.varieties.length} किस्में</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {listing.varieties.map((v: any, i: number) => (
                        <div key={i} className={'rounded-xl p-4 border ' + (v.type === 'processing' ? 'bg-green-50/50 border-green-100' : 'bg-green-50/50 border-green-100')}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={'text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ' + (v.type === 'processing' ? 'text-[#032808] bg-green-100' : 'text-green-700 bg-green-100')}>
                              {v.type === 'processing' ? '🏭 प्रसंस्करण' : '🥔 टेबल'}
                            </span>
                          </div>
                          <h4 className="font-display text-[0.95rem] font-bold text-stone-800 mb-0.5">{v.name}</h4>
                          <p className="font-body text-[0.72rem] text-stone-400 italic mb-2">{v.nameEn}</p>
                          <p className="font-body text-[0.8rem] text-stone-500 leading-relaxed">{v.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specializations */}
                {listing.specialization && listing.specialization.length > 0 && (
                  <div className="rounded-2xl p-6 md:p-8 border border-stone-200 bg-stone-50">
                    <h2 className="font-display text-[1.15rem] font-bold text-stone-900 mb-4 flex items-center gap-2">
                      <span className="w-1 h-5 bg-green-500 rounded-full" />
                      विशेषज्ञता
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {listing.specialization.map((spec: string, i: number) => (
                        <span key={i} className={'px-3 py-1.5 border rounded-full text-[0.82rem] font-body font-medium ' + (isPremium ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-white border-stone-200 text-stone-600')}>{spec}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Certifications */}
                {listing.certifications && listing.certifications.length > 0 && (
                  <div className="rounded-2xl p-6 md:p-8 border border-stone-200 bg-stone-50">
                    <h2 className="font-display text-[1.15rem] font-bold text-stone-900 mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-green-500 rounded-full" />प्रमाणपत्र</h2>
                    <div className="flex flex-wrap gap-2">{listing.certifications.map((cert: string, i: number) => (<span key={i} className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-[0.82rem] font-body text-green-700 font-medium">✅ {cert}</span>))}</div>
                  </div>
                )}

                {/* Main Image */}
                {listing.image && (
                  <div className="rounded-2xl overflow-hidden border border-stone-200">
                    <img src={listing.image} alt={listing.name} className="w-full h-auto" />
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* Contact Card */}
                <div className={'rounded-2xl p-6 sticky top-[140px] ' + (isPremium ? 'bg-gradient-to-b from-amber-50 to-white border-2 border-amber-300 shadow-lg shadow-amber-100/50' : 'bg-white border-2 border-green-100')}>
                  {isPremium && (
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber-200">
                      <span className="text-[1.2rem]">👑</span>
                      <span className="text-[0.72rem] font-bold text-amber-800 uppercase tracking-wider">Premium Verified Listing</span>
                    </div>
                  )}
                  <h3 className="font-display text-[1.05rem] font-bold text-stone-900 mb-5">📞 संपर्क जानकारी</h3>

                  <div className="space-y-4">
                    {/* Contact Person */}
                    {listing.contactPerson && (
                      <div className="flex items-start gap-3">
                        <span className="text-[1rem] mt-0.5 shrink-0">👤</span>
                        <div>
                          <div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">संपर्क व्यक्ति</div>
                          <p className="font-body text-[0.92rem] text-stone-800 font-semibold">{listing.contactPerson}</p>
                          {listing.contactPersonEn && (<p className="font-body text-[0.78rem] text-stone-400 italic">{listing.contactPersonEn}</p>)}
                        </div>
                      </div>
                    )}

                    {/* Address */}
                    {listing.address && (
                      <div className="flex items-start gap-3">
                        <span className="text-[1rem] mt-0.5 shrink-0">📍</span>
                        <div>
                          <div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">पता</div>
                          <p className="font-body text-[0.88rem] text-stone-700 leading-relaxed">{listing.address}</p>
                        </div>
                      </div>
                    )}

                    {/* Phone */}
                    {isPremium && listing.phone && listing.phone.length > 0 && (
                      <div className="flex items-start gap-3">
                        <span className="text-[1rem] mt-0.5 shrink-0">☎️</span>
                        <div>
                          <div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">फ़ोन</div>
                          <div className="space-y-1">{listing.phone.map((ph: string, i: number) => (<a key={i} href={'tel:' + ph} className="block font-body text-[0.92rem] text-[#05420d] hover:text-[#021f06] font-bold transition-colors">{ph}</a>))}</div>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {isPremium && listing.email && (
                      <div className="flex items-start gap-3">
                        <span className="text-[1rem] mt-0.5 shrink-0">📧</span>
                        <div>
                          <div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">ईमेल</div>
                          <a href={'mailto:' + listing.email} className="font-body text-[0.88rem] text-[#05420d] hover:text-[#021f06] font-medium transition-colors break-all">{listing.email}</a>
                        </div>
                      </div>
                    )}

                    {/* Website */}
                    {listing.website && (
                      <div className="flex items-start gap-3">
                        <span className="text-[1rem] mt-0.5 shrink-0">🌐</span>
                        <div>
                          <div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">वेबसाइट / सोशल</div>
                          <a href={listing.website} target="_blank" rel="noopener noreferrer" className="font-body text-[0.88rem] text-[#05420d] hover:text-[#021f06] font-medium transition-colors break-all">{listing.website.replace('https://www.', '').replace('https://', '').replace('http://', '')}</a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 space-y-3">
                    {isPremium && listing.phone && listing.phone[0] && (
                      <a href={'tel:' + listing.phone[0]} className={'flex items-center justify-center gap-2 w-full py-3.5 font-body font-bold text-[0.95rem] rounded-xl transition-all ' + (isPremium ? 'bg-gradient-to-r from-[#0a6b18] to-[#0a6b18] hover:from-[#05420d] hover:to-[#021f06] text-white shadow-lg shadow-green-200' : 'bg-[#05420d] hover:bg-[#032808] text-white')}>
                        📞 अभी कॉल करें
                      </a>
                    )}
                    {isPremium && cleanWhatsapp && (
                      <a href={'https://wa.me/' + cleanWhatsapp + '?text=' + encodeURIComponent('नमस्ते ' + (listing.contactPerson || '') + ', मुझे आलू बीज के बारे में जानकारी चाहिए। (indianpotato.in से)')} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-body font-bold text-[0.95rem] rounded-xl transition-colors shadow-lg shadow-green-200">
                        💬 WhatsApp पर बात करें
                      </a>
                    )}
                    {isPremium && listing.email && (
                      <a href={'mailto:' + listing.email + '?subject=' + encodeURIComponent('आलू बीज जानकारी — indianpotato.in') + '&body=' + encodeURIComponent('नमस्ते ' + (listing.contactPerson || '') + ',\n\nमुझे आलू बीज के बारे में जानकारी चाहिए।\n\nधन्यवाद।')} className="flex items-center justify-center gap-2 w-full py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-body font-semibold text-[0.95rem] rounded-xl transition-colors border border-stone-200">
                        📧 ईमेल भेजें
                      </a>
                    )}
                  </div>

                  {/* Premium trust badges */}
                  {isPremium && (
                    <div className="mt-5 pt-4 border-t border-amber-200">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[0.68rem] font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-lg">✅ सत्यापित व्यवसाय</span>
                        <span className="text-[0.68rem] font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-lg">🤝 विश्वसनीय आपूर्तिकर्ता</span>
                        <span className="text-[0.68rem] font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">📞 सीधा संपर्क</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {listing.tags && listing.tags.length > 0 && (
                  <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
                    <h4 className="font-body text-[0.78rem] font-semibold text-stone-400 uppercase tracking-wide mb-3">टैग</h4>
                    <div className="flex flex-wrap gap-1.5">{listing.tags.map((tag: string, i: number) => (<span key={i} className="text-[0.72rem] font-body text-stone-500 bg-white border border-stone-200 px-2 py-1 rounded-lg">#{tag}</span>))}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Listings */}
            {related.length > 0 && (
              <div className="mt-16 pt-12 border-t border-stone-200">
                <h2 className="font-display text-[1.3rem] font-bold text-stone-900 mb-6">अन्य {cat.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {related.map((r) => (<Link key={r.slug} href={'/directory/' + cat.slug + '/' + r.slug} className="group p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-green-200 hover:shadow-md transition-all"><h4 className="font-body text-[0.9rem] font-semibold text-stone-800 group-hover:text-[#032808] transition-colors mb-1 line-clamp-1">{r.name}</h4><p className="font-body text-[0.75rem] text-stone-400">📍 {r.district}, {r.state}</p></Link>))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: listing.name, description: listing.description, url: 'https://www.indianpotato.in/directory/' + params.category + '/' + params.slug, ...(listing.image && { image: listing.image }), address: { '@type': 'PostalAddress', addressLocality: listing.district, addressRegion: listing.state, addressCountry: 'IN', ...(listing.address && { streetAddress: listing.address }) }, ...(listing.phone && listing.phone[0] && { telephone: listing.phone[0] }), ...(listing.email && { email: listing.email }), ...(listing.website && { sameAs: listing.website }), ...(listing.established && { foundingDate: listing.established }) }) }} />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
