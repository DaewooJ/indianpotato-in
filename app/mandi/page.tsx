import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import MandiPricesLive from '@/components/MandiPricesLive';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'आज का आलू मंडी भाव — ताज़ा थोक भाव | Potato Mandi Price Today',
  description: 'भारत की प्रमुख मंडियों से आलू के ताज़ा थोक भाव — आगरा, लखनऊ, कोलकाता, डीसा, जालंधर, पटना और इंदौर। प्रतिदिन अपडेट।',
  openGraph: {
    title: 'आज का आलू मंडी भाव — ताज़ा थोक भाव',
    description: 'भारत की प्रमुख मंडियों से आलू के ताज़ा थोक भाव। प्रतिदिन अपडेट।',
    type: 'website',
  },
};

export default function MandiPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <div className="bg-gradient-to-r from-red-900 to-orange-700 py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-bold text-white mb-3">
              आलू मंडी भाव
            </h1>
            <p className="font-body text-[1.05rem] text-white/75 max-w-[600px]">
              भारत की सभी प्रमुख मंडियों से आलू के रोज़ाना थोक भाव — राज्यवार फ़िल्टर के साथ
            </p>
          </div>
        </div>
        <MandiPricesLive />
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
