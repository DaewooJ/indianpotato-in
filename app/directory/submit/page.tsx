'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export default function SubmitListingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        {/* Hero — matching /directory/plans style */}
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
              15,000+ किसान और व्यापारी प्रतिसप्ताह हमारी डायरेक्टरी देखते हैं। अपनी पहुँच बढ़ाएँ।
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

                  {/* Elegant form wrapper with custom styling */}
                  <div className="p-5 md:p-6">
                    <ZohoFormEmbed />
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 px-2">
                  <span className="text-[0.85rem] mt-0.5">🔒</span>
                  <p className="font-body text-[0.72rem] text-stone-400 leading-relaxed">
                    आपकी जानकारी पूरी तरह सुरक्षित है। लिस्टिंग प्रकाशन से पहले हमारी टीम द्वारा सत्यापन किया जाएगा।
                  </p>
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
                    ].map((plan, i) => (
                      <div key={i} className={'flex items-center gap-2.5 p-2.5 rounded-lg border ' + plan.color + (plan.popular ? ' ring-1 ring-amber-400' : '')}>
                        <span className="text-[1rem]">{plan.icon}</span>
                        <span className="font-body text-[0.78rem] font-semibold text-stone-700 flex-1">{plan.name}</span>
                        <span className="font-body text-[0.7rem] font-bold text-red-600">{plan.price}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/directory/plans" className="block mt-3 text-center font-body text-[0.72rem] font-semibold text-red-600 hover:text-red-700">तुलना देखें →</Link>
                </div>

                {/* How it works */}
                <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                  <h3 className="font-display text-[0.88rem] font-bold text-stone-800 mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-green-500 rounded-full" />कैसे काम करता है?
                  </h3>
                  <div className="space-y-3">
                    {[
                      { step: '1', title: 'फ़ॉर्म भरें', desc: 'कंपनी की जानकारी भरें' },
                      { step: '2', title: 'सत्यापन', desc: '24 घंटे में सत्यापित' },
                      { step: '3', title: 'लाइव!', desc: 'डायरेक्टरी में दिखेगी' },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-[0.68rem] font-bold text-green-700 shrink-0">{s.step}</div>
                        <div>
                          <span className="font-body text-[0.78rem] font-semibold text-stone-700">{s.title}</span>
                          <span className="font-body text-[0.68rem] text-stone-400 ml-1.5">{s.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-5">
                  <h3 className="font-body text-[0.82rem] font-bold text-green-800 mb-1.5">💬 फ़ॉर्म नहीं भरना चाहते?</h3>
                  <p className="font-body text-[0.72rem] text-green-700/70 mb-3 leading-relaxed">
                    सीधे WhatsApp पर अपनी कंपनी की जानकारी भेजें — हम आपकी लिस्टिंग बना देंगे।
                  </p>
                  <a href="https://wa.me/919499668831?text=नमस्ते%2C%20मैं%20अपना%20व्यवसाय%20Indian%20Potato%20डायरेक्टरी%20में%20सूचीबद्ध%20करना%20चाहता%20हूँ।" target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-body font-bold text-[0.82rem] rounded-xl transition-colors">
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

      {/* Global styles to make Zoho form elegant */}
      <style jsx global>{`
        /* ─── Zoho Form Premium Styling ─── */
        #webform907916000002339307,
        [id^="webform"] {
          font-family: 'DM Sans', sans-serif !important;
        }

        /* Form container */
        [id^="webform"] table {
          width: 100% !important;
          border-collapse: separate !important;
          border-spacing: 0 12px !important;
        }

        /* Labels */
        [id^="webform"] td[style*="font-size"],
        [id^="webform"] label,
        [id^="webform"] .zf-labelName {
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.82rem !important;
          font-weight: 600 !important;
          color: #44403c !important;
          letter-spacing: 0.01em !important;
          margin-bottom: 4px !important;
          display: block !important;
        }

        /* Input fields */
        [id^="webform"] input[type="text"],
        [id^="webform"] input[type="email"],
        [id^="webform"] input[type="tel"],
        [id^="webform"] input[type="number"],
        [id^="webform"] input[type="url"],
        [id^="webform"] textarea,
        [id^="webform"] select {
          width: 100% !important;
          padding: 10px 14px !important;
          border: 1.5px solid #e7e5e4 !important;
          border-radius: 10px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.88rem !important;
          color: #1c1917 !important;
          background: #fafaf9 !important;
          transition: all 0.2s ease !important;
          outline: none !important;
          box-sizing: border-box !important;
        }

        [id^="webform"] input:focus,
        [id^="webform"] textarea:focus,
        [id^="webform"] select:focus {
          border-color: #dc2626 !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.08) !important;
        }

        [id^="webform"] textarea {
          min-height: 100px !important;
          resize: vertical !important;
        }

        [id^="webform"] select {
          appearance: none !important;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2378716c' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 12px center !important;
          padding-right: 36px !important;
        }

        /* Submit button */
        [id^="webform"] input[type="submit"],
        [id^="webform"] input[type="button"],
        [id^="webform"] button[type="submit"],
        [id^="webform"] .formsubmit input,
        [id^="webform"] .zf-submitColor {
          width: 100% !important;
          padding: 12px 24px !important;
          background: linear-gradient(135deg, #dc2626, #ea580c) !important;
          color: #fff !important;
          border: none !important;
          border-radius: 12px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.92rem !important;
          font-weight: 700 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
          letter-spacing: 0.02em !important;
          margin-top: 8px !important;
        }

        [id^="webform"] input[type="submit"]:hover,
        [id^="webform"] button[type="submit"]:hover {
          background: linear-gradient(135deg, #b91c1c, #c2410c) !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3) !important;
        }

        /* Reset/Clear button */
        [id^="webform"] input[type="reset"] {
          width: 100% !important;
          padding: 10px 24px !important;
          background: #f5f5f4 !important;
          color: #78716c !important;
          border: 1.5px solid #e7e5e4 !important;
          border-radius: 12px !important;
          font-family: 'DM Sans', sans-serif !important;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          margin-top: 4px !important;
        }

        /* Required asterisk */
        [id^="webform"] .zf-important,
        [id^="webform"] font[color="red"],
        [id^="webform"] span[style*="color:red"],
        [id^="webform"] span[style*="color: red"] {
          color: #dc2626 !important;
          font-weight: 700 !important;
        }

        /* Error messages */
        [id^="webform"] .zf-errorMessage,
        [id^="webform"] td[style*="color:red"] {
          color: #dc2626 !important;
          font-size: 0.72rem !important;
          font-family: 'DM Sans', sans-serif !important;
          margin-top: 4px !important;
        }

        /* Remove ugly borders */
        [id^="webform"] table,
        [id^="webform"] td,
        [id^="webform"] tr {
          border: none !important;
        }

        /* Hide Zoho branding */
        [id^="webform"] img[src*="zoho"],
        [id^="webform"] a[href*="zoho"],
        [id^="webform"] div[style*="text-align: center"] a {
          display: none !important;
        }

        /* Checkboxes and radios */
        [id^="webform"] input[type="checkbox"],
        [id^="webform"] input[type="radio"] {
          accent-color: #dc2626 !important;
          width: 16px !important;
          height: 16px !important;
        }

        /* CAPTCHA styling */
        [id^="webform"] .zf-captcha img,
        [id^="webform"] img[src*="captcha"] {
          border-radius: 8px !important;
          border: 1.5px solid #e7e5e4 !important;
        }

        /* Row spacing */
        [id^="webform"] tr {
          margin-bottom: 8px !important;
        }

        [id^="webform"] td {
          padding: 4px 0 !important;
          vertical-align: top !important;
        }

        /* Responsive */
        @media (max-width: 640px) {
          [id^="webform"] table {
            display: block !important;
          }
          [id^="webform"] tr,
          [id^="webform"] td {
            display: block !important;
            width: 100% !important;
          }
          [id^="webform"] input[type="text"],
          [id^="webform"] input[type="email"],
          [id^="webform"] input[type="tel"],
          [id^="webform"] textarea,
          [id^="webform"] select {
            font-size: 16px !important; /* prevents iOS zoom */
          }
        }

        /* Honeypot */
        .hp-trap {
          position: absolute;
          left: -9999px;
          opacity: 0;
          height: 0;
          width: 0;
          overflow: hidden;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}

function ZohoFormEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    // Load Zoho form script
    const script = document.createElement('script');
    script.id = 'formScript907916000002339307';
    script.src = 'https://crm.zoho.in/crm/WebFormServeServlet?rid=b7492b778a7a9c90cfb80a2474159bd127a5c6cce031cc1411fb163fd9a66c3bf9ea45e583794656f524041de8944517gid884a4a74283b0831189a240eeba11b36714ce6c04a9684918c667f6761aec55d&script=$sYG';
    script.onload = () => setLoaded(true);
    containerRef.current.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.getElementById('formScript907916000002339307');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[400px]">
      {/* Honeypot */}
      <div className="hp-trap" aria-hidden="true"><input type="email" name="hp_check" tabIndex={-1} autoComplete="off" /></div>

      {/* Loading state */}
      {!loaded && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-10 h-10 border-3 border-stone-200 border-t-red-600 rounded-full animate-spin mb-4" />
          <p className="font-body text-[0.85rem] text-stone-500">फ़ॉर्म लोड हो रहा है...</p>
          <p className="font-body text-[0.7rem] text-stone-400 mt-1">Loading form...</p>
        </div>
      )}
    </div>
  );
}
