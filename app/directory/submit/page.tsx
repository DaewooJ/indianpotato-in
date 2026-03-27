'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export default function SubmitListingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        {/* Hero */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
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
              15,000+ किसान और व्यापारी प्रतिसप्ताह हमारी डायरेक्टरी देखते हैं। नीचे फ़ॉर्म भरें।
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
        <section className="py-10 md:py-16 px-3 md:px-6 bg-gradient-to-b from-stone-50 to-white">
          <div className="max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-lg shadow-stone-100/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-stone-900 to-stone-800 px-5 md:px-6 py-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-[1rem] font-bold text-white flex items-center gap-2">📋 लिस्टिंग आवेदन फ़ॉर्म</h2>
                      <p className="font-body text-[0.7rem] text-stone-400 mt-0.5">Listing Application Form</p>
                    </div>
                    <span className="text-[0.6rem] font-bold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full border border-green-700/30">● ऑनलाइन</span>
                  </div>
                  <div className="p-1 md:p-2">
                    <iframe
                      src="https://crm.zoho.in/crm/WebFormServeServlet?rid=f673dbebbb9cf7d7e9dea65261f7ed90cd04aef8845b76f13ee4c9b4bdd1222fdfe598b63b994aa8145f83fcc43879e8gidb7c49cf2db08aaa014c67fa20a58653873b69c36b62428f49708607e6f53c245"
                      width="100%"
                      height="800"
                      style={{ border: 'none', borderRadius: '12px', minHeight: '800px' }}
                      title="लिस्टिंग आवेदन फ़ॉर्म"
                      loading="eager"
                    />
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 px-2">
                  <span className="text-[0.85rem] mt-0.5">🔒</span>
                  <p className="font-body text-[0.72rem] text-stone-400 leading-relaxed">आपकी जानकारी सुरक्षित है। प्रकाशन से पहले सत्यापन किया जाएगा।</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <h3 className="font-display text-[0.88rem] font-bold text-stone-800 mb-3 flex items-center gap-2"><span className="w-1 h-4 bg-amber-500 rounded-full" />लिस्टिंग प्लान</h3>
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
                        <span className="font-body text-[0.7rem] font-bold text-red-600">{plan.price}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/directory/plans" className="block mt-3 text-center font-body text-[0.72rem] font-semibold text-red-600 hover:text-red-700">तुलना देखें →</Link>
                </div>
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <h3 className="font-display text-[0.88rem] font-bold text-stone-800 mb-3 flex items-center gap-2"><span className="w-1 h-4 bg-green-500 rounded-full" />कैसे काम करता है?</h3>
                  <div className="space-y-3">
                    {[{ s: '1', t: 'फ़ॉर्म भरें', d: 'कंपनी की जानकारी भरें' }, { s: '2', t: 'सत्यापन', d: '24 घंटे में सत्यापित' }, { s: '3', t: 'लाइव!', d: 'डायरेक्टरी में दिखेगी' }].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-[0.68rem] font-bold text-green-700 shrink-0">{item.s}</div>
                        <div><span className="font-body text-[0.78rem] font-semibold text-stone-700">{item.t}</span><span className="font-body text-[0.68rem] text-stone-400 ml-1.5">{item.d}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-5">
                  <h3 className="font-body text-[0.82rem] font-bold text-green-800 mb-1.5">💬 फ़ॉर्म नहीं भरना चाहते?</h3>
                  <p className="font-body text-[0.72rem] text-green-700/70 mb-3 leading-relaxed">सीधे WhatsApp पर अपनी कंपनी की जानकारी भेजें — हम आपकी लिस्टिंग बना देंगे।</p>
                  <a href="https://wa.me/919499668831?text=नमस्ते%2C%20मैं%20अपना%20व्यवसाय%20Indian%20Potato%20डायरेक्टरी%20में%20सूचीबद्ध%20करना%20चाहता%20हूँ।" target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-body font-bold text-[0.82rem] rounded-xl transition-colors">💬 WhatsApp पर भेजें</a>
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
