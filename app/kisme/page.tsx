import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { VarietiesQuick, WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'आलू की किस्में — भारत में उगाई जाने वाली प्रमुख किस्में | Potato Varieties India',
  description: 'भारत में उगाई जाने वाली सभी प्रमुख आलू किस्मों की जानकारी — कुफरी ज्योति, कुफरी पुखराज, चिप्सोना, लेडी रोसेटा। उपज, अवधि और क्षेत्र डेटा।',
};

export default function KismePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-r from-red-700 to-red-600 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              आलू की किस्में
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              भारत में उगाई जाने वाली प्रमुख आलू किस्मों का विस्तृत डेटाबेस — उपज, अवधि, उपयोग और उपयुक्त क्षेत्र
            </p>
          </div>
        </div>
        <VarietiesQuick />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
