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
  const description = listing.name + ' — ' + listing.description;
  return {
    title, description,
    openGraph: { title: listing.name, description, type: 'website', url: 'https://indianpotato.in/directory/' + params.category + '/' + params.slug, ...(listing.image && { images: [{ url: listing.image }] }) },
    alternates: { canonical: 'https://indianpotato.in/directory/' + params.category + '/' + params.slug },
  };
}

export default function ListingPage({ params }: { params: { category: string; slug: string } }) {
  const listing = getListingBySlug(params.category, params.slug);
  const cat = getCategoryConfig(params.category);
  if (!listing || !cat) notFound();
  const related = getListingsByCategory(params.category).filter((l) => l.slug !== params.slug).slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-700 relative overflow-hidden">
          {listing.image && (<div className="absolute inset-0"><img src={listing.image} alt={listing.name} className="w-full h-full object-cover opacity-20" /><div className="absolute inset-0 bg-gradient-to-t from-red-900/95 via-red-900/80 to-red-900/60" /></div>)}
          <div className="relative z-10 py-14 md:py-18 px-6">
            <div className="max-w-[1280px] mx-auto">
              <nav className="flex items-center gap-2 text-[0.78rem] font-body text-white/50 mb-6 flex-wrap">
                <Link href="/" className="hover:text-white/80 transition-colors">होम</Link><span>/</span>
                <Link href="/directory" className="hover:text-white/80 transition-colors">डायरेक्टरी</Link><span>/</span>
                <Link href={'/directory/' + cat.slug} className="hover:text-white/80 transition-colors">{cat.name}</Link><span>/</span>
                <span className="text-white/90">{listing.name}</span>
              </nav>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-[32px] shrink-0">{cat.icon}</div>
                <div>
                  {listing.featured && (<span className="inline-block text-[0.68rem] font-bold text-amber-200 bg-amber-900/40 border border-amber-500/30 px-2 py-0.5 rounded-full mb-2">⭐ प्रमुख लिस्टिंग</span>)}
                  <h1 className="font-display text-[clamp(1.6rem,4vw,2.6rem)] font-bold text-white leading-tight">{listing.name}</h1>
                  {listing.nameEn && (<p className="font-body text-[0.88rem] text-white/50 italic mt-1">{listing.nameEn}</p>)}
                </div>
              </div>
              <p className="font-body text-[1rem] text-white/70 max-w-[700px] leading-relaxed mt-4">{listing.description}</p>
              <div className="flex flex-wrap gap-3 mt-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[0.78rem] text-white/80 font-body">📍 {listing.district}, {listing.state}</span>
                {listing.established && (<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[0.78rem] text-white/80 font-body">🗓️ स्थापित {listing.established}</span>)}
                {listing.capacity && (<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[0.78rem] text-white/80 font-body">📊 {listing.capacity}</span>)}
              </div>
            </div>
          </div>
        </div>

        <section className="py-10 md:py-16 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200">
                  <h2 className="font-display text-[1.15rem] font-bold text-stone-900 mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-red-500 rounded-full" />विवरण</h2>
                  <p className="font-body text-[0.92rem] text-stone-600 leading-relaxed">{listing.description}</p>
                  {listing.descriptionEn && (<p className="font-body text-[0.85rem] text-stone-400 italic mt-3 leading-relaxed">{listing.descriptionEn}</p>)}
                </div>
                {listing.specialization && listing.specialization.length > 0 && (
                  <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200">
                    <h2 className="font-display text-[1.15rem] font-bold text-stone-900 mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-red-500 rounded-full" />विशेषज्ञता</h2>
                    <div className="flex flex-wrap gap-2">{listing.specialization.map((spec: string, i: number) => (<span key={i} className="px-3 py-1.5 bg-white border border-stone-200 rounded-full text-[0.82rem] font-body text-stone-600">{spec}</span>))}</div>
                  </div>
                )}
                {listing.certifications && listing.certifications.length > 0 && (
                  <div className="bg-stone-50 rounded-2xl p-6 md:p-8 border border-stone-200">
                    <h2 className="font-display text-[1.15rem] font-bold text-stone-900 mb-4 flex items-center gap-2"><span className="w-1 h-5 bg-green-500 rounded-full" />प्रमाणपत्र</h2>
                    <div className="flex flex-wrap gap-2">{listing.certifications.map((cert: string, i: number) => (<span key={i} className="px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-[0.82rem] font-body text-green-700 font-medium">✅ {cert}</span>))}</div>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                <div className="bg-white rounded-2xl border-2 border-red-100 p-6 sticky top-[140px]">
                  <h3 className="font-display text-[1.05rem] font-bold text-stone-900 mb-5">📞 संपर्क जानकारी</h3>
                  <div className="space-y-4">
                    {listing.address && (<div className="flex items-start gap-3"><span className="text-[1rem] mt-0.5 shrink-0">📍</span><div><div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">पता</div><p className="font-body text-[0.88rem] text-stone-700 leading-relaxed">{listing.address}</p></div></div>)}
                    {listing.phone && listing.phone.length > 0 && (<div className="flex items-start gap-3"><span className="text-[1rem] mt-0.5 shrink-0">☎️</span><div><div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">फ़ोन</div><div className="space-y-1">{listing.phone.map((ph: string, i: number) => (<a key={i} href={'tel:' + ph} className="block font-body text-[0.88rem] text-red-600 hover:text-red-800 font-medium transition-colors">{ph}</a>))}</div></div></div>)}
                    {listing.email && (<div className="flex items-start gap-3"><span className="text-[1rem] mt-0.5 shrink-0">📧</span><div><div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">ईमेल</div><a href={'mailto:' + listing.email} className="font-body text-[0.88rem] text-red-600 hover:text-red-800 font-medium transition-colors break-all">{listing.email}</a></div></div>)}
                    {listing.website && (<div className="flex items-start gap-3"><span className="text-[1rem] mt-0.5 shrink-0">🌐</span><div><div className="font-body text-[0.75rem] text-stone-400 font-semibold uppercase tracking-wide mb-0.5">वेबसाइट</div><a href={listing.website} target="_blank" rel="noopener noreferrer" className="font-body text-[0.88rem] text-red-600 hover:text-red-800 font-medium transition-colors break-all">{listing.website.replace('https://', '').replace('http://', '')}</a></div></div>)}
                  </div>
                  <div className="mt-6 space-y-3">
                    {listing.phone && listing.phone[0] && (<a href={'tel:' + listing.phone[0]} className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-[0.9rem] rounded-xl transition-colors">📞 कॉल करें</a>)}
                    {listing.phone && listing.phone[0] && (<a href={'https://wa.me/' + listing.phone[0].replace(/[^0-9]/g, '')} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white font-body font-semibold text-[0.9rem] rounded-xl transition-colors">💬 WhatsApp</a>)}
                  </div>
                </div>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-16 pt-12 border-t border-stone-200">
                <h2 className="font-display text-[1.3rem] font-bold text-stone-900 mb-6">अन्य {cat.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {related.map((r) => (<Link key={r.slug} href={'/directory/' + cat.slug + '/' + r.slug} className="group p-4 bg-stone-50 rounded-xl border border-stone-200 hover:border-red-200 hover:shadow-md transition-all"><h4 className="font-body text-[0.9rem] font-semibold text-stone-800 group-hover:text-red-700 transition-colors mb-1 line-clamp-1">{r.name}</h4><p className="font-body text-[0.75rem] text-stone-400">📍 {r.district}, {r.state}</p></Link>))}
                </div>
              </div>
            )}
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'LocalBusiness', name: listing.name, description: listing.description, url: 'https://indianpotato.in/directory/' + params.category + '/' + params.slug, ...(listing.image && { image: listing.image }), address: { '@type': 'PostalAddress', addressLocality: listing.district, addressRegion: listing.state, addressCountry: 'IN', ...(listing.address && { streetAddress: listing.address }) }, ...(listing.phone && listing.phone[0] && { telephone: listing.phone[0] }), ...(listing.email && { email: listing.email }), ...(listing.website && { sameAs: listing.website }), ...(listing.established && { foundingDate: listing.established }) }) }} />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
