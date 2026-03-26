import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'उद्योग डायरेक्टरी — आलू प्रसंस्करण, निर्यात, कोल्ड स्टोरेज | Potato Industry Directory India',
  description: 'भारत के आलू उद्योग की सम्पूर्ण डायरेक्टरी — प्रसंस्करण कंपनियाँ, निर्यातक, कोल्ड स्टोरेज, उपकरण निर्माता, बीज आपूर्तिकर्ता और अनुसंधान संस्थान।',
};

const categories = [
  { icon: '🏭', name: 'प्रसंस्करण कंपनियाँ', count: 245, desc: 'चिप्स, फ्रेंच फ्राइज़ और डिहाइड्रेटेड उत्पाद निर्माता' },
  { icon: '📦', name: 'निर्यातक', count: 180, desc: 'ताज़ा और प्रसंस्कृत आलू निर्यातक' },
  { icon: '❄️', name: 'कोल्ड स्टोरेज', count: 520, desc: 'पूरे भारत में आलू भंडारण सुविधाएँ' },
  { icon: '⚙️', name: 'उपकरण निर्माता', count: 95, desc: 'कृषि और प्रसंस्करण मशीनरी प्रदाता' },
  { icon: '🌱', name: 'बीज आपूर्तिकर्ता', count: 130, desc: 'प्रमाणित बीज आलू उत्पादक' },
  { icon: '🧪', name: 'अनुसंधान संस्थान', count: 42, desc: 'कृषि विश्वविद्यालय और शोध केंद्र' },
];

export default function DirectoryPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-r from-red-700 to-red-600 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              उद्योग डायरेक्टरी
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              भारत के आलू उद्योग से जुड़ी कंपनियाँ, संस्थान और सेवा प्रदाता खोजें
            </p>
          </div>
        </div>

        <section className="py-20 px-6 bg-white">
          <div className="max-w-[1280px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c, i) => (
                <div key={i} className="bg-stone-50 rounded-[14px] p-[30px_26px] border border-stone-200 cursor-pointer hover:shadow-lg hover:border-red-200 transition-all flex flex-col">
                  <div className="w-14 h-14 rounded-[14px] bg-red-50 border border-red-200 flex items-center justify-center text-[28px] mb-[18px]">
                    {c.icon}
                  </div>
                  <h3 className="font-display text-[1.2rem] font-bold text-stone-900 mb-1.5">{c.name}</h3>
                  <p className="font-body text-[0.85rem] text-stone-500 mb-4 leading-relaxed flex-1">{c.desc}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-mono text-[0.82rem] font-extrabold text-red-600">{c.count}+ सूचीबद्ध</span>
                    <span className="font-body text-[0.78rem] font-semibold text-orange-600">देखें →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
