import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import SamacharClient from './SamacharClient';

export const metadata: Metadata = {
  title: 'आलू समाचार — भारतीय आलू उद्योग की ताज़ा ख़बरें | Potato News India',
  description: 'भारतीय आलू उद्योग की सबसे ताज़ा ख़बरें, विश्लेषण और अपडेट — उत्पादन, निर्यात, सरकारी नीति, मंडी रुझान और तकनीक।',
  alternates: {
    canonical: 'https://www.indianpotato.in/samachar',
  },
  openGraph: {
    title: 'आलू समाचार — भारतीय आलू उद्योग की ताज़ा ख़बरें',
    description: 'भारतीय आलू उद्योग की सबसे ताज़ा ख़बरें, विश्लेषण और अपडेट।',
    url: 'https://www.indianpotato.in/samachar',
    type: 'website',
  },
};

export default function SamacharPage() {
  return (
    <>
      <Navbar />
      <SamacharClient />
      <Footer />
    </>
  );
}
