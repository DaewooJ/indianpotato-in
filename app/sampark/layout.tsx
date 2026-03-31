import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'संपर्क करें — इंडियन पोटैटो | Contact Us',
  description: 'इंडियन पोटैटो से संपर्क करें — विज्ञापन, प्रेस, सामान्य पूछताछ। ईमेल: info@indpotato.com | WhatsApp: +91 94996 68831',
  alternates: {
    canonical: 'https://www.indianpotato.in/sampark',
  },
  openGraph: {
    title: 'संपर्क करें — इंडियन पोटैटो',
    description: 'इंडियन पोटैटो से संपर्क करें — विज्ञापन, प्रेस, सामान्य पूछताछ।',
    url: 'https://www.indianpotato.in/sampark',
    type: 'website',
  },
};

export default function SamparkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
