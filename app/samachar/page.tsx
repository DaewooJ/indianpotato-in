import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/blog';
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
  const posts = getAllPosts();
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'आलू उद्योग समाचार',
    description: 'भारतीय आलू उद्योग की ताज़ा ख़बरें',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://www.indianpotato.in/samachar/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'समाचार', url: 'https://www.indianpotato.in/samachar' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <Navbar />
      <SamacharClient />
      <Footer />
    </>
  );
}
