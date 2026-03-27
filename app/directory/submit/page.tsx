import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'अपना व्यवसाय सूचीबद्ध करें — डायरेक्टरी लिस्टिंग फ़ॉर्म | Indian Potato',
  description: 'Indian Potato डायरेक्टरी में अपना व्यवसाय निःशुल्क सूचीबद्ध करें। कोल्ड स्टोरेज, व्यापारी, निर्यातक, बीज आपूर्तिकर्ता, प्रसंस्करण कंपनियाँ — अभी आवेदन करें।',
  openGraph: {
    title: 'अपना व्यवसाय सूचीबद्ध करें — Indian Potato Directory',
    description: 'भारत के #1 आलू प्लेटफ़ॉर्म पर अपना व्यवसाय सूचीबद्ध करें',
    type: 'website',
    url: 'https://indianpotato.in/directory/submit',
  },
  alternates: { canonical: 'https://indianpotato.in/directory/submit' },
};

export default function SubmitListingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        {/* Hero */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-red-900 py-12 md:py-16 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '36px 36px' }} />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

          <div className="max-w-[800px] mx-auto relative z-10 text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center justify-center gap-1.5 text-[0.72rem] font-body text-white/40 mb-5">
              <Link href="/" className="hover:text-white/70">होम</Link><span>/</span>
              <Link href="/directory" className="hover:text-white/70">डायरेक्टरी</Link><span>/</span>
              <span className="text-white/80">लिस्टिंग जोड़ें</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/15 border border-red-500/20 rounded-full mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-[0.7rem] font-bold text-red-300 tracking-wide uppercase">निःशुल्क लिस्टिंग उपलब्ध</span>
            </div>

            <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold text-white mb-3 leading-tight">
              अपना व्यवसाय<br className="sm:hidden" /> <span className="text-red-400">सूचीबद्ध करें</span>
            </h1>
            <p className="font-body text-[0.9rem] text-stone-400 max-w-[480px] mx-auto leading-relaxed">
              भारत के सबसे बड़े आलू उद्योग प्लेटफ़ॉर्म पर अपनी कंपनी, कोल्ड स्टोरेज या सेवा को सूचीबद्ध करें।
              15,000+ व्यापारी और किसान प्रतिसप्ताह हमारी डायरेक्टरी देखते हैं।
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {[
                { icon: '✅', text: 'सत्यापित लिस्टिंग' },
                { icon: '🔒', text: 'डेटा सुरक्षित' },
                { icon: '⚡', text: '24 घंटे में लाइव' },
              ].map((t, i) => (
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
              {/* Main Form Area */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                  {/* Form header */}
                  <div className="bg-gradient-to-r from-red-600 to-orange-600 px-5 md:px-6 py-4">
                    <h2 className="font-display text-[1.05rem] font-bold text-white flex items-center gap-2">
                      📋 लिस्टिंग आवेदन फ़ॉर्म
                    </h2>
                    <p className="font-body text-[0.75rem] text-white/70 mt-0.5">
                      Listing Application Form — सभी फ़ील्ड हिंदी या अंग्रेज़ी में भरें
                    </p>
                  </div>

                  {/* Zoho Form Embed */}
                  <div className="p-5 md:p-6">
                    <ZohoFormEmbed />
                  </div>
                </div>

                {/* Privacy note */}
                <div className="mt-4 flex items-start gap-2 px-2">
                  <span className="text-[0.85rem] mt-0.5">🔒</span>
                  <p className="font-body text-[0.72rem] text-stone-400 leading-relaxed">
                    आपकी जानकारी पूरी तरह सुरक्षित है। हम आपका डेटा किसी तीसरे पक्ष के साथ साझा नहीं करते।
                    लिस्टिंग प्रकाशन से पहले हमारी टीम द्वारा सत्यापन किया जाएगा।
                    <span className="text-stone-500 font-medium"> Your data is secure and verified before publishing.</span>
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Plan selector */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <h3 className="font-display text-[0.92rem] font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-red-500 rounded-full" />
                    लिस्टिंग प्लान
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Basic', price: 'निःशुल्क', icon: '📋', desc: 'नाम, पता, ईमेल', color: 'border-stone-200 bg-stone-50' },
                      { name: 'Silver', price: '₹4,999/वर्ष', icon: '🥈', desc: 'प्रोफ़ाइल + लोगो + 2 फ़ोटो', color: 'border-slate-200 bg-slate-50' },
                      { name: 'Gold', price: '₹7,999/वर्ष', icon: '👑', desc: 'प्रीमियम बैज + कॉल/WA बटन', color: 'border-amber-200 bg-amber-50', popular: true },
                      { name: 'Platinum', price: '₹9,999/वर्ष', icon: '💎', desc: 'सर्वोच्च प्राथमिकता + रेफ़रल', color: 'border-violet-200 bg-violet-50' },
                    ].map((plan, i) => (
                      <div key={i} className={'flex items-center gap-3 p-3 rounded-xl border ' + plan.color + (plan.popular ? ' ring-1 ring-amber-400' : '')}>
                        <span className="text-[1.1rem]">{plan.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-body text-[0.82rem] font-bold text-stone-800">{plan.name}</span>
                            <span className="font-body text-[0.72rem] font-bold text-red-600">{plan.price}</span>
                          </div>
                          <p className="font-body text-[0.65rem] text-stone-400">{plan.desc}</p>
                        </div>
                        {plan.popular && (<span className="text-[0.55rem] font-bold text-amber-700 bg-amber-200 px-1.5 py-0.5 rounded shrink-0">लोकप्रिय</span>)}
                      </div>
                    ))}
                  </div>
                  <Link href="/directory/plans" className="block mt-3 text-center font-body text-[0.75rem] font-semibold text-red-600 hover:text-red-700 transition-colors">
                    सभी प्लान की तुलना देखें →
                  </Link>
                </div>

                {/* How it works */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <h3 className="font-display text-[0.92rem] font-bold text-stone-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-green-500 rounded-full" />
                    कैसे काम करता है?
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: '1', title: 'फ़ॉर्म भरें', desc: 'अपनी कंपनी की जानकारी भरें', icon: '📝' },
                      { step: '2', title: 'सत्यापन', desc: 'हमारी टीम 24 घंटे में सत्यापित करेगी', icon: '🔍' },
                      { step: '3', title: 'लाइव!', desc: 'आपकी लिस्टिंग डायरेक्टरी में दिखेगी', icon: '🚀' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center text-[14px] shrink-0 font-display font-bold text-green-700">{s.step}</div>
                        <div>
                          <h4 className="font-body text-[0.82rem] font-semibold text-stone-700">{s.title}</h4>
                          <p className="font-body text-[0.7rem] text-stone-400">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp alternative */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-5">
                  <h3 className="font-body text-[0.85rem] font-bold text-green-800 mb-2">
                    💬 फ़ॉर्म नहीं भरना चाहते?
                  </h3>
                  <p className="font-body text-[0.75rem] text-green-700/70 mb-3 leading-relaxed">
                    सीधे WhatsApp पर अपनी कंपनी की जानकारी भेजें — हम आपकी लिस्टिंग बना देंगे।
                  </p>
                  <a
                    href="https://wa.me/919XXXXXXXXX?text=नमस्ते%2C%20मैं%20अपना%20व्यवसाय%20Indian%20Potato%20डायरेक्टरी%20में%20सूचीबद्ध%20करना%20चाहता%20हूँ।"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-body font-bold text-[0.82rem] rounded-xl transition-colors"
                  >
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
    </>
  );
}

// ─── Zoho Form Embed (Client Component) ───
function ZohoFormEmbed() {
  return (
    <div className="zoho-form-container">
      {/* Anti-spam: Honeypot + time-delay strategy */}
      <style dangerouslySetInnerHTML={{ __html: `
        .zoho-form-container iframe {
          width: 100%;
          min-height: 800px;
          border: none;
          border-radius: 12px;
        }
        /* Honeypot trap — hidden from real users, bots fill it */
        .hp-field { 
          position: absolute; 
          left: -9999px; 
          opacity: 0; 
          height: 0; 
          width: 0; 
          overflow: hidden;
          pointer-events: none;
        }
        @media (max-width: 640px) {
          .zoho-form-container iframe {
            min-height: 900px;
          }
        }
      `}} />

      {/* Honeypot field — invisible to humans, bots auto-fill it */}
      <div className="hp-field" aria-hidden="true" tabIndex={-1}>
        <label htmlFor="hp-email-check">Leave empty</label>
        <input type="email" id="hp-email-check" name="hp_email_check" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Zoho CRM Web Form Script */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<script id="formScript907916000002339307" src="https://crm.zoho.in/crm/WebFormServeServlet?rid=b7492b778a7a9c90cfb80a2474159bd127a5c6cce031cc1411fb163fd9a66c3bf9ea45e583794656f524041de8944517gid884a4a74283b0831189a240eeba11b36714ce6c04a9684918c667f6761aec55d&script=$sYG"></script>`
        }}
      />

      {/* Fallback if script doesn't load */}
      <noscript>
        <div className="text-center py-8">
          <p className="font-body text-[0.88rem] text-stone-600 mb-4">
            फ़ॉर्म लोड करने के लिए JavaScript सक्षम करें या WhatsApp पर संपर्क करें।
          </p>
          <a
            href="https://wa.me/919XXXXXXXXX"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-body font-bold rounded-xl"
          >
            💬 WhatsApp पर संपर्क करें
          </a>
        </div>
      </noscript>
    </div>
  );
}
