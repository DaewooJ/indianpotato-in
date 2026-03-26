import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'संपर्क करें — इंडियन पोटैटो | Contact Indian Potato',
  description: 'इंडियन पोटैटो से संपर्क करें — विज्ञापन, साझेदारी, समाचार सबमिशन और सामान्य पूछताछ।',
};

export default function SamparkPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-r from-red-700 to-red-600 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              संपर्क करें
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              विज्ञापन, साझेदारी या किसी भी प्रश्न के लिए हमसे संपर्क करें
            </p>
          </div>
        </div>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-[800px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: '📧', title: 'ईमेल', value: 'info@indpotato.com', desc: 'सामान्य पूछताछ' },
                { icon: '💬', title: 'WhatsApp', value: '9499668498', desc: 'मंडी भाव और अपडेट' },
                { icon: '📢', title: 'विज्ञापन', value: 'ads@indpotato.com', desc: 'विज्ञापन और प्रमोशन' },
                { icon: '📝', title: 'समाचार भेजें', value: 'news@indpotato.com', desc: 'प्रेस रिलीज़ और समाचार' },
              ].map((c, i) => (
                <div key={i} className="bg-stone-50 rounded-[14px] p-6 border border-stone-200">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-2xl mb-4">{c.icon}</div>
                  <h3 className="font-display text-[1.08rem] font-bold text-stone-900 mb-1">{c.title}</h3>
                  <div className="font-mono text-[0.92rem] font-bold text-red-600 mb-1">{c.value}</div>
                  <div className="font-body text-[0.82rem] text-stone-400">{c.desc}</div>
                </div>
              ))}
            </div>

            <div className="bg-stone-50 rounded-2xl p-8 border border-stone-200">
              <h2 className="font-display text-[1.5rem] font-bold text-stone-900 mb-6">हमें संदेश भेजें</h2>
              <form action="https://crm.zoho.in/crm/WebForm" method="POST" acceptCharset="UTF-8" className="space-y-4">
                <input type="hidden" name="xnQsjsdp" value="87300a7df7dcf2dd4440cbfd007f4f11e296f7066d9bf5ff4feffd3397e4e02d" />
                <input type="hidden" name="xmIwtLD" value="feb7cbd2a6998544c1da5a0a2284491d43a6925a92e58245c675b352bb55189c57b7926961fa03a32a168129cb62309f" />
                <input type="hidden" name="actionType" value="Q3VzdG9tTW9kdWxlNQ==" />
                <input type="hidden" name="returnURL" value="https://indianpotato.in/sampark?submitted=true" />
                <input type="hidden" name="zc_gad" value="" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[0.85rem] font-semibold text-stone-700 mb-1.5">नाम <span className="text-red-500">*</span></label>
                    <input type="text" name="NAME" required maxLength={120} placeholder="आपका नाम" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.95rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                  <div>
                    <label className="block font-body text-[0.85rem] font-semibold text-stone-700 mb-1.5">फ़ोन <span className="text-red-500">*</span></label>
                    <input type="text" name="COBJ5CF1" required maxLength={30} placeholder="फ़ोन नंबर" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.95rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[0.85rem] font-semibold text-stone-700 mb-1.5">ईमेल</label>
                    <input type="email" name="Email" maxLength={100} placeholder="ईमेल (वैकल्पिक)" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.95rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                  <div>
                    <label className="block font-body text-[0.85rem] font-semibold text-stone-700 mb-1.5">शहर <span className="text-red-500">*</span></label>
                    <input type="text" name="COBJ5CF3" required maxLength={255} placeholder="आपका शहर" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.95rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[0.85rem] font-semibold text-stone-700 mb-1.5">राज्य</label>
                    <input type="text" name="COBJ5CF2" maxLength={255} placeholder="राज्य" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.95rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                  <div>
                    <label className="block font-body text-[0.85rem] font-semibold text-stone-700 mb-1.5">भूमि (एकड़)</label>
                    <input type="text" name="COBJ5CF51" maxLength={9} placeholder="भूमि क्षेत्रफल" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.95rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[0.85rem] font-semibold text-stone-700 mb-1.5">विवरण</label>
                  <textarea name="COBJ5CF4" rows={4} placeholder="अपना संदेश लिखें..." className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.95rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none" />
                </div>
                <input type="hidden" name="aG9uZXlwb3Q" value="" />
                <button type="submit" className="bg-gradient-to-r from-red-700 to-red-600 text-white px-8 py-3.5 rounded-[10px] font-body text-base font-bold shadow-[0_3px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.3)] transition-all cursor-pointer border-none">
                  संदेश भेजें →
                </button>
              </form>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
