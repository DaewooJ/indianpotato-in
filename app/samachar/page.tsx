import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { NewsSection, WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'आलू समाचार — ताज़ा उद्योग समाचार | Potato News India',
  description: 'भारत और विश्व के आलू उद्योग से ताज़ा समाचार — उत्पादन, निर्यात, सरकारी नीतियाँ, तकनीक और अनुसंधान।',
};

export default function SamacharPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-r from-red-900 to-orange-700 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              आलू समाचार
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              भारतीय आलू उद्योग की ताज़ा ख़बरें — उत्पादन, निर्यात, तकनीक और सरकारी नीतियाँ
            </p>
          </div>
        </div>
        <NewsSection />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
