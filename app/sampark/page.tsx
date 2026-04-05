'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { BreadcrumbNav } from '@/components/Breadcrumbs'

const CONTACTS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ),
    label: 'सामान्य पूछताछ',
    value: 'info@indpotato.com',
    desc: 'सामान्य प्रश्न, सुझाव, फीडबैक या सहयोग के लिए',
    href: 'mailto:info@indpotato.com',
    color: 'from-red-500 to-red-600',
    bg: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10s3-3 8-3 8 3 8 3"/><path d="M2 14s3 3 8 3 8-3 8-3"/><circle cx="10" cy="12" r="1"/><path d="M22 12h-2"/></svg>
    ),
    label: 'विज्ञापन और साझेदारी',
    value: 'ads@indpotato.com',
    desc: 'डायरेक्टरी लिस्टिंग, बैनर विज्ञापन, स्पॉन्सर्ड कंटेंट',
    href: 'mailto:ads@indpotato.com',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
    ),
    label: 'समाचार और कंटेंट',
    value: 'news@indpotato.com',
    desc: 'प्रेस रिलीज़, किसान कहानियाँ, उद्योग समाचार सबमिट करें',
    href: 'mailto:news@indpotato.com',
    color: 'from-emerald-500 to-green-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
]

const QUICK_LINKS = [
  { label: 'डायरेक्टरी में लिस्ट करें', href: '/directory/submit', desc: 'अपनी आलू कंपनी मुफ़्त में सूचीबद्ध करें' },
  { label: 'मंडी भाव देखें', href: '/mandi-bhav', desc: 'आज के ताज़ा आलू भाव' },
  { label: 'ब्लॉग पढ़ें', href: '/blog', desc: 'खेती, बाज़ार और उद्योग की ख़बरें' },
  { label: 'सरकारी योजनाएँ', href: '/yojnaye', desc: 'किसानों के लिए सरकारी सहायता' },
]

export default function SamparkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[64px] min-h-screen bg-white">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 text-center">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="text-white/90 text-sm font-medium">24 घंटे में उत्तर</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              हमसे संपर्क करें
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/80 max-w-lg mx-auto leading-relaxed">
              विज्ञापन, सहयोग, समाचार सबमिशन या सामान्य पूछताछ — हम आपकी मदद के लिए तैयार हैं
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="py-4">
            <BreadcrumbNav items={[
              { name: 'होम', url: '/' },
              { name: 'संपर्क', url: '/sampark' },
            ]} />
          </div>

          {/* Contact Cards */}
          <section className="py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {CONTACTS.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50"
                >
                  {/* Top gradient bar */}
                  <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${c.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${c.bg} ${c.iconColor} mb-5`}>
                    {c.icon}
                  </div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{c.label}</p>
                  <p className="mt-2 text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors">{c.value}</p>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">{c.desc}</p>
                </a>
              ))}
            </div>
          </section>

          {/* WhatsApp + Phone Row */}
          <section className="pb-8 sm:pb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* WhatsApp */}
              <div className="relative rounded-2xl border border-gray-100 bg-white p-6 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -translate-y-8 translate-x-8" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 text-green-600 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">WhatsApp</p>
                  <p className="mt-2 text-lg font-bold text-gray-900">+91 94996 68831</p>
                  <p className="mt-1 text-sm text-gray-500">सीधे WhatsApp पर बात करें</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-5 relative">
                  <a
                    href="https://wa.me/919499668831"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors shadow-sm shadow-green-200"
                  >
                    चैट शुरू करें
                  </a>
                  <a
                    href="https://spuds.me/kisan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-700 text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-50 transition-colors"
                  >
                    ग्रुप जॉइन करें
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="relative rounded-2xl border border-gray-100 bg-white p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -translate-y-8 translate-x-8" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-50 text-red-600 mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">कार्यालय</p>
                  <p className="mt-2 text-lg font-bold text-gray-900">Indpotato Pvt Ltd</p>
                  <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                    पिंपरी-चिंचवाड, पुणे<br />
                    महाराष्ट्र, भारत
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <a
                      href="https://www.linkedin.com/in/potatoes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors font-medium"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="pb-8 sm:pb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-5">सहायक लिंक</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUICK_LINKS.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="group flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 hover:border-red-200 hover:bg-red-50/30 transition-all"
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-gray-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-red-600 transition-colors"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors">{link.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* CTA Banner */}
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-16 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              भारत का सबसे बड़ा आलू उद्योग नेटवर्क
            </h2>
            <p className="mt-3 text-gray-500 max-w-md mx-auto leading-relaxed">
              5,000+ किसान, व्यापारी और उद्योग विशेषज्ञ हमारे नेटवर्क का हिस्सा हैं। आज ही जुड़ें।
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:info@indpotato.com"
                className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-red-700 transition-colors shadow-sm shadow-red-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                ईमेल भेजें
              </a>
              <a
                href="https://wa.me/919499668831"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-6 py-3 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-green-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp करें
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
