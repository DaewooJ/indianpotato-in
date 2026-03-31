import GoogleAnalytics from '@/components/GoogleAnalytics';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import type { Metadata } from 'next';
import { Mukta, DM_Sans } from 'next/font/google';
import './globals.css';

const mukta = Mukta({
  subsets: ['devanagari', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hindi',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-english',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.indianpotato.in'),
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
    'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
  },
  title: {
    default: 'इंडियन पोटैटो — भारत का प्रमुख आलू उद्योग मंच | Indian Potato',
    template: '%s | इंडियन पोटैटो',
  },
  description:
    'भारत का प्रमुख आलू उद्योग मंच — रोज़ाना मंडी भाव, सरकारी योजनाएँ, आलू किस्में, खेती तकनीक, निर्यात डेटा और उद्योग डायरेक्टरी। किसानों, व्यापारियों और प्रसंस्करण उद्योग के लिए।',
  keywords: [
    'आलू भाव', 'मंडी भाव', 'आलू की खेती', 'potato price India',
    'आलू किस्में', 'कोल्ड स्टोरेज', 'आलू निर्यात', 'potato market India',
    'आलू समाचार', 'सरकारी योजनाएँ किसान', 'potato varieties India',
    'Indian potato industry', 'आलू उत्पादन भारत', 'mandi bhav today',
  ],
  authors: [{ name: 'Indian Potato', url: 'https://www.indianpotato.in' }],
  creator: 'Indian Potato',
  publisher: 'Indian Potato',
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    url: 'https://www.indianpotato.in',
    siteName: 'इंडियन पोटैटो | Indian Potato',
    title: 'इंडियन पोटैटो — भारत का प्रमुख आलू उद्योग मंच',
    description:
      'रोज़ाना मंडी भाव, सरकारी योजनाएँ, आलू किस्में, खेती तकनीक और उद्योग डायरेक्टरी।',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'इंडियन पोटैटो — भारत का प्रमुख आलू उद्योग मंच',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'इंडियन पोटैटो — भारत का प्रमुख आलू उद्योग मंच',
    description:
      'रोज़ाना मंडी भाव, सरकारी योजनाएँ, आलू किस्में, खेती तकनीक और उद्योग डायरेक्टरी।',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.indianpotato.in',
    types: {
      'application/rss+xml': 'https://www.indianpotato.in/feed.xml',
    },
  },
};

// JSON-LD Structured Data for AI crawlability & SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.indianpotato.in/#website',
      url: 'https://www.indianpotato.in',
      name: 'इंडियन पोटैटो | Indian Potato',
      description: 'भारत का प्रमुख आलू उद्योग मंच',
      inLanguage: 'hi',
      publisher: { '@id': 'https://www.indianpotato.in/#organization' },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.indianpotato.in/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.indianpotato.in/#organization',
      name: 'Indian Potato',
      alternateName: 'इंडियन पोटैटो',
      url: 'https://www.indianpotato.in',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.indianpotato.in/logo.png',
      },
      sameAs: [
        'https://www.linkedin.com/in/potatoes/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Hindi', 'English'],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" dir="ltr" className={`${mukta.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#dc2626" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body><GoogleAnalytics />{children}<FloatingWhatsApp /></body>
    </html>
  );
}
