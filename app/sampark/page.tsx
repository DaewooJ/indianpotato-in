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
              <iframe
                src="https://crm.zoho.in/crm/WebFormServeServlet?rid=feb7cbd2a6998544c1da5a0a2284491d43a6925a92e58245c675b352bb55189c57b7926961fa03a32a168129cb62309f&grpid=87300a7df7dcf2dd4440cbfd007f4f11e296f7066d9bf5ff4feffd3397e4e02d"
                style={{ width: '100%', minHeight: 600, border: 'none', borderRadius: 12 }}
                title="संपर्क फ़ॉर्म"
              />
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
