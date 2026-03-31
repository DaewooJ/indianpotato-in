import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { GovSchemes, WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी | Govt Schemes for Potato Farmers',
  description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, किसान क्रेडिट कार्ड, और राज्य स्तरीय योजनाएँ।',
  alternates: {
    canonical: 'https://www.indianpotato.in/yojnaye',
  },
  openGraph: {
    title: 'सरकारी योजनाएँ — आलू किसानों के लिए अनुदान और सब्सिडी',
    description: 'आलू किसानों के लिए प्रमुख सरकारी योजनाएँ — PM किसान, कोल्ड स्टोरेज सब्सिडी, किसान क्रेडिट कार्ड, और राज्य स्तरीय योजनाएँ।',
    url: 'https://www.indianpotato.in/yojnaye',
    type: 'website',
  },
};

export default function YojnayePage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-r from-red-700 to-red-600 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              सरकारी योजनाएँ
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              आलू किसानों और प्रसंस्करण उद्योग के लिए केंद्र व राज्य सरकार की योजनाएँ, अनुदान और सब्सिडी
            </p>
          </div>
        </div>
        <GovSchemes />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
