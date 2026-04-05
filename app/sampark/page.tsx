'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { BreadcrumbNav } from '@/components/Breadcrumbs'

const CONTACTS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ),
    label: 'सामान्य पूछताछ',
    value: 'info@indpotato.com',
    desc: 'सामान्य प्रश्न, सुझाव, फीडबैक या सहयोग के लिए',
    href: 'mailto:info@indpotato.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
    ),
    label: 'विज्ञापन और साझेदारी',
    value: 'ads@indpotato.com',
    desc: 'डायरेक्टरी लिस्टिंग, बैनर विज्ञापन, स्पॉन्सर्ड कंटेंट',
    href: 'mailto:ads@indpotato.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/></svg>
    ),
    label: 'समाचार और कंटेंट',
    value: 'news@indpotato.com',
    desc: 'प्रेस रिलीज़, किसान कहानियाँ, उद्योग समाचार सबमिट करें',
    href: 'mailto:news@indpotato.com',
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

        {/* ── Hero ── */}
        <section className="relative overflow-hidden" style={{ background: '#05420d' }}>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-32 -left-32 w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)' }} />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-24 lg:py-28 text-center">
            {/* Accent line */}
            <div className="mx-auto mb-8 w-12 h-1 rounded-full" style={{ background: '#f97316' }} />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              हमसे संपर्क करें
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-lg mx-auto leading-relaxed font-light">
              विज्ञापन, सहयोग, समाचार सबमिशन या सामान्य पूछताछ — हम आपकी मदद के लिए तैयार हैं
            </p>
            <div className="mt-8 inline-flex items-center gap-2.5 border border-white/10 rounded-full px-5 py-2" style={{ background: 'rgba(249,115,22,0.1)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#f97316' }} />
              <span className="text-white/80 text-sm tracking-wide">कार्य दिवसों में 24 घंटे में उत्तर</span>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="py-4">
            <BreadcrumbNav items={[
              { name: 'होम', url: '/' },
              { name: 'संपर्क', url: '/sampark' },
            ]} />
          </div>

          {/* ── Contact Cards ── */}
          <section className="py-10 sm:py-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONTACTS.map((c, i) => (
                <a
                  key={i}
                  href={c.href}
                  className="group relative rounded-2xl bg-white p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{ border: '1px solid #e8ece9', boxShadow: '0 1px 3px rgba(5,66,13,0.04)' }}
                >
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ background: 'linear-gradient(90deg, #05420d, #f97316)' }} />

                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: '#f0fdf4', color: '#05420d' }}>
                    {c.icon}
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#f97316' }}>{c.label}</p>
                  <p className="mt-2.5 text-lg font-bold text-gray-900 group-hover:text-[#05420d] transition-colors">{c.value}</p>
                  <p className="mt-2.5 text-[13.5px] text-gray-500 leading-relaxed">{c.desc}</p>

                  {/* Arrow */}
                  <div className="mt-5 flex items-center gap-1.5 text-[13px] font-medium opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all duration-300" style={{ color: '#05420d' }}>
                    <span>ईमेल भेजें</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* ── WhatsApp + Office ── */}
          <section className="pb-10 sm:pb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* WhatsApp */}
              <div className="relative rounded-2xl p-7 overflow-hidden" style={{ border: '1px solid #e8ece9', background: '#fff' }}>
                {/* Corner glow */}
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(37,211,102,0.08) 0%, transparent 70%)' }} />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: '#f0fdf4' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#25D366' }}>WhatsApp</p>
                  <p className="mt-2.5 text-lg font-bold text-gray-900">+91 94996 68831</p>
                  <p className="mt-1.5 text-[13.5px] text-gray-500">सीधे WhatsApp पर बात करें या ग्रुप जॉइन करें</p>
                </div>
                <div className="flex flex-wrap gap-3 mt-6 relative">
                  <a
                    href="https://wa.me/919499668831"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white text-[13px] font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg"
                    style={{ background: '#25D366', boxShadow: '0 2px 8px rgba(37,211,102,0.25)' }}
                  >
                    चैट शुरू करें
                  </a>
                  <a
                    href="https://spuds.me/kisan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-semibold px-5 py-2.5 rounded-full border transition-colors hover:bg-green-50"
                    style={{ borderColor: '#d1fae5', color: '#16a34a' }}
                  >
                    ग्रुप जॉइन करें
                  </a>
                </div>
              </div>

              {/* Office */}
              <div className="relative rounded-2xl p-7 overflow-hidden" style={{ border: '1px solid #e8ece9', background: '#fff' }}>
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }} />

                <div className="relative">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: 'rgba(249,115,22,0.08)', color: '#f97316' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: '#f97316' }}>कार्यालय</p>
                  <p className="mt-2.5 text-lg font-bold text-gray-900">Indpotato Pvt Ltd</p>
                  <p className="mt-1.5 text-[13.5px] text-gray-500 leading-relaxed">
                    पिंपरी-चिंचवाड, पुणे<br />
                    महाराष्ट्र, भारत
                  </p>
                  <div className="mt-6">
                    <a
                      href="https://www.linkedin.com/in/potatoes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
                      style={{ color: '#05420d' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn प्रोफ़ाइल
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="flex items-center gap-4 pb-10 sm:pb-14">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs font-medium tracking-wider text-gray-300 uppercase">सहायक लिंक</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* ── Quick Links ── */}
          <section className="pb-14 sm:pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {QUICK_LINKS.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="group flex items-center gap-4 rounded-xl bg-white p-5 transition-all duration-200"
                  style={{ border: '1px solid #e8ece9' }}
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ background: '#f0fdf4' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" style={{ color: '#05420d' }}><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-[#05420d] transition-colors">{link.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* ── CTA Banner ── */}
        <section className="relative overflow-hidden" style={{ background: '#05420d' }}>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 60%)' }} />

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
            <div className="mx-auto mb-6 w-10 h-1 rounded-full" style={{ background: '#f97316' }} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              भारत का सबसे बड़ा आलू उद्योग नेटवर्क
            </h2>
            <p className="mt-4 text-white/60 max-w-md mx-auto leading-relaxed font-light">
              5,000+ किसान, व्यापारी और उद्योग विशेषज्ञ हमारे नेटवर्क का हिस्सा हैं। आज ही जुड़ें।
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:info@indpotato.com"
                className="inline-flex items-center gap-2.5 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200 hover:shadow-xl"
                style={{ background: '#f97316', boxShadow: '0 4px 14px rgba(249,115,22,0.3)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                ईमेल भेजें
              </a>
              <a
                href="https://wa.me/919499668831"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-sm font-semibold px-7 py-3.5 rounded-full transition-colors"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
