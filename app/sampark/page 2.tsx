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
        <div className="bg-gradient-to-r from-red-900 to-orange-700 py-16 px-6">
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
                { icon: '📧', title: 'ईमेल', value: 'contact@indianpotato.in', desc: 'सामान्य पूछताछ' },
                { icon: '💬', title: 'WhatsApp', value: 'ग्रुप जॉइन करें', desc: 'मंडी भाव और अपडेट' },
                { icon: '📢', title: 'विज्ञापन', value: 'ads@indianpotato.in', desc: 'विज्ञापन और प्रमोशन' },
                { icon: '📝', title: 'समाचार भेजें', value: 'news@indianpotato.in', desc: 'प्रेस रिलीज़ और समाचार' },
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
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-body text-[0.82rem] font-semibold text-stone-600 mb-1.5">नाम</label>
                    <input type="text" placeholder="आपका नाम" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.92rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                  <div>
                    <label className="block font-body text-[0.82rem] font-semibold text-stone-600 mb-1.5">फ़ोन / ईमेल</label>
                    <input type="text" placeholder="फ़ोन नंबर या ईमेल" className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.92rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block font-body text-[0.82rem] font-semibold text-stone-600 mb-1.5">विषय</label>
                  <select className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.92rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all bg-white">
                    <option>सामान्य पूछताछ</option>
                    <option>विज्ञापन</option>
                    <option>साझेदारी</option>
                    <option>समाचार सबमिशन</option>
                    <option>तकनीकी सहायता</option>
                  </select>
                </div>
                <div>
                  <label className="block font-body text-[0.82rem] font-semibold text-stone-600 mb-1.5">संदेश</label>
                  <textarea rows={5} placeholder="अपना संदेश लिखें..." className="w-full px-4 py-3 rounded-[10px] border border-stone-300 font-body text-[0.92rem] outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all resize-none" />
                </div>
                <button className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3.5 rounded-[10px] font-body text-base font-bold shadow-[0_3px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_4px_20px_rgba(220,38,38,0.3)] transition-all cursor-pointer border-none">
                  संदेश भेजें →
                </button>
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
