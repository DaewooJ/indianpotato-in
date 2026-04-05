'use client';

import Link from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export default function SubmitListingPage() {
  const [formLoaded, setFormLoaded] = useState(false);

  return (
    <>
      {/* Preconnect to Zoho for faster iframe load */}
      <link rel="preconnect" href="https://crm.zoho.in" />
      <link rel="dns-prefetch" href="https://crm.zoho.in" />

      <Navbar />
      <main className="pt-[76px]">
        {/* Hero */}
        <div className="bg-[#05420d] py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundColor: 'transparent', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-600" />

          <div className="max-w-[800px] mx-auto relative z-10 text-center">
            <nav className="flex items-center justify-center gap-1.5 text-[0.72rem] font-body text-white/40 mb-5">
              <Link href="/" className="hover:text-white/70">होम</Link><span>/</span>
              <Link href="/directory" className="hover:text-white/70">डायरेक्टरी</Link><span>/</span>
              <span className="text-white/80">लिस्टिंग जोड़ें</span>
            </nav>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[0.7rem] font-bold text-amber-400 tracking-wide uppercase">निःशुल्क लिस्टिंग उपलब्ध</span>
            </div>
            <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold text-white mb-3 leading-tight">
              अपना व्यवसाय भारत के<br className="hidden sm:block" /> <span className="text-amber-400">सबसे बड़े आलू प्लेटफ़ॉर्म</span> पर सूचीबद्ध करें
            </h1>
            <p className="font-body text-[0.9rem] text-stone-400 max-w-[480px] mx-auto leading-relaxed">
              5,000+ किसान और व्यापारी प्रतिसप्ताह हमारी डायरेक्टरी देखते हैं। नीचे फ़ॉर्म भरें।
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[{ icon: '✅', text: 'सत्यापित लिस्टिंग' }, { icon: '🔒', text: 'डेटा सुरक्षित' }, { icon: '⚡', text: '24 घंटे में लाइव' }].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[0.68rem] text-white/60 font-body">
                  <span>{t.icon}</span>{t.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Form Section */}
        <section className="py-10 md:py-16 px-3 md:px-6 bg-stone-50 relative">
          {/* Subtle texture */}
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

          <div className="max-w-[900px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-xl shadow-stone-200/40 overflow-hidden">
                  {/* Premium header bar */}
                  <div className="bg-[#05420d] px-5 md:px-6 py-4 relative">
                    <div className="absolute top-0 left-0 right-0 h-px bg-amber-500/50" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                          <span className="text-[1rem]">📋</span>
                        </div>
                        <div>
                          <h2 className="font-display text-[0.95rem] font-bold text-white">लिस्टिंग आवेदन फ़ॉर्म</h2>
                          <p className="font-body text-[0.65rem] text-stone-500">Listing Application Form</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline text-[0.58rem] text-stone-500 font-body">Powered by Zoho</span>
                        <span className="text-[0.6rem] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                          ऑनलाइन
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Form container with loading skeleton */}
                  <div className="relative bg-white">
                    {/* Loading skeleton — visible until iframe loads */}
                    {!formLoaded && (
                      <div className="absolute inset-0 z-10 bg-white p-6 md:p-8 animate-pulse">
                        <div className="space-y-6">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i}>
                              <div className="h-3 w-24 bg-stone-200 rounded mb-2" />
                              <div className="h-10 w-full bg-stone-100 rounded-xl border border-stone-200" />
                            </div>
                          ))}
                          <div>
                            <div className="h-3 w-32 bg-stone-200 rounded mb-2" />
                            <div className="h-24 w-full bg-stone-100 rounded-xl border border-stone-200" />
                          </div>
                          <div className="h-12 w-full bg-green-100 rounded-xl" />
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-6">
                          <div className="w-4 h-4 border-2 border-stone-300 border-t-[#05420d] rounded-full animate-spin" />
                          <span className="text-[0.78rem] text-stone-400 font-body">फ़ॉर्म लोड हो रहा है...</span>
                        </div>
                      </div>
                    )}

                    {/* Iframe */}
                    <div className="p-2 md:p-3">
                      <iframe
                        src="https://crm.zoho.in/crm/WebFormServeServlet?rid=f673dbebbb9cf7d7e9dea65261f7ed90cd04aef8845b76f13ee4c9b4bdd1222fdfe598b63b994aa8145f83fcc43879e8gidb7c49cf2db08aaa014c67fa20a58653873b69c36b62428f49708607e6f53c245"
                        width="100%"
                        height="800"
                        style={{ border: 'none', borderRadius: '10px', minHeight: '800px', background: 'transparent' }}
                        title="लिस्टिंग आवेदन फ़ॉर्म"
                        loading="eager"
                        onLoad={() => setFormLoaded(true)}
                      />
                    </div>
                  </div>

                  {/* Bottom bar */}
                  <div className="bg-stone-50 border-t border-stone-200 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[0.75rem]">🔒</span>
                      <span className="font-body text-[0.65rem] text-stone-400">SSL Encrypted · डेटा सुरक्षित</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[0.75rem]">✅</span>
                      <span className="font-body text-[0.65rem] text-stone-400">सत्यापित प्लेटफ़ॉर्म</span>
                    </div>
                  </div>
                </div>

                {/* Trust note below form */}
                <div className="mt-4 bg-stone-50 rounded-xl border border-stone-200 p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                    <span className="text-[0.9rem]">🛡️</span>
                  </div>
                  <div>
                    <p className="font-body text-[0.75rem] font-semibold text-stone-700 mb-0.5">आपकी जानकारी सुरक्षित है</p>
                    <p className="font-body text-[0.68rem] text-stone-400 leading-relaxed">
                      हम आपका डेटा किसी तीसरे पक्ष के साथ साझा नहीं करते। लिस्टिंग प्रकाशन से पहले हमारी टीम द्वारा सत्यापन किया जाएगा। Your data is verified before publishing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Plan selector */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <h3 className="font-display text-[0.88rem] font-bold text-stone-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-amber-500 rounded-full" />लिस्टिंग प्लान
                  </h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Basic', price: 'निःशुल्क', icon: '📋', color: 'border-stone-200 bg-stone-50' },
                      { name: 'Silver', price: '₹4,999/वर्ष', icon: '🥈', color: 'border-slate-200 bg-slate-50' },
                      { name: 'Gold', price: '₹7,999/वर्ष', icon: '👑', color: 'border-amber-200 bg-amber-50', popular: true },
                      { name: 'Platinum', price: '₹9,999/वर्ष', icon: '💎', color: 'border-violet-200 bg-violet-50' },
                    ].map((plan: any, i) => (
                      <div key={i} className={'flex items-center gap-2.5 p-2.5 rounded-lg border ' + plan.color + (plan.popular ? ' ring-1 ring-amber-400' : '')}>
                        <span className="text-[1rem]">{plan.icon}</span>
                        <span className="font-body text-[0.78rem] font-semibold text-stone-700 flex-1">{plan.name}</span>
                        <span className="font-body text-[0.7rem] font-bold text-[#05420d]">{plan.price}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/directory/plans" className="block mt-3 text-center font-body text-[0.72rem] font-semibold text-[#05420d] hover:text-[#032808]">तुलना देखें →</Link>
                </div>

                {/* How it works */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <h3 className="font-display text-[0.88rem] font-bold text-stone-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-green-500 rounded-full" />कैसे काम करता है?
                  </h3>
                  <div className="space-y-3">
                    {[{ s: '1', t: 'फ़ॉर्म भरें', d: 'कंपनी की जानकारी भरें' }, { s: '2', t: 'सत्यापन', d: '24 घंटे में सत्यापित' }, { s: '3', t: 'लाइव!', d: 'डायरेक्टरी में दिखेगी' }].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-[0.68rem] font-bold text-green-700 shrink-0">{item.s}</div>
                        <div><span className="font-body text-[0.78rem] font-semibold text-stone-700">{item.t}</span><span className="font-body text-[0.68rem] text-stone-400 ml-1.5">{item.d}</span></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                  <h3 className="font-body text-[0.82rem] font-bold text-[#021f06] mb-3">📊 डायरेक्टरी आँकड़े</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '15K+', label: 'साप्ताहिक विज़िटर' },
                      { value: '10+', label: 'श्रेणियाँ' },
                      { value: '23+', label: 'राज्य कवर' },
                      { value: '#1', label: 'आलू प्लेटफ़ॉर्म' },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="font-display text-[1rem] font-bold text-[#032808]">{stat.value}</div>
                        <div className="font-body text-[0.6rem] text-[#05420d]/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                  <h3 className="font-body text-[0.82rem] font-bold text-green-800 mb-1.5">💬 फ़ॉर्म नहीं भरना चाहते?</h3>
                  <p className="font-body text-[0.72rem] text-green-700/70 mb-3 leading-relaxed">
                    सीधे WhatsApp पर अपनी कंपनी की जानकारी भेजें — हम आपकी लिस्टिंग बना देंगे।
                  </p>
                  <a href="https://wa.me/919499668831?text=नमस्ते%2C%20मैं%20अपना%20व्यवसाय%20Indian%20Potato%20डायरेक्टरी%20में%20सूचीबद्ध%20करना%20चाहता%20हूँ।" target="_blank" rel="noopener"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-body font-bold text-[0.82rem] rounded-xl transition-colors shadow-md shadow-green-200">
                    💬 WhatsApp पर भेजें
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <WhatsAppCTA />
      </main>
      <Footer />

      <script dangerouslySetInnerHTML={{ __html: `
        function wfa_pstMesgFrmFom(evt){
          if(evt.origin==='https://crm.zoho.in'||evt.origin==='https://crm.zohopublic.in'){
            var loc_obj=JSON.stringify({origin:window.location.origin,pathname:window.location.pathname,search:window.location.search,hash:window.location.hash});
            evt.source.postMessage(('prnt_wnd_pg_lc_rc_frm_prwindow_'+loc_obj),evt.origin);
          }
        }
        window.addEventListener('message',wfa_pstMesgFrmFom,false);
      `}} />
    </>
  );
}
