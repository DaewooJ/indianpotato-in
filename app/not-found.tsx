import Link from 'next/link';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'पेज नहीं मिला — 404',
  description: 'यह पेज उपलब्ध नहीं है। इंडियन पोटैटो पर मंडी भाव, समाचार और अधिक जानकारी देखें।',
};

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', paddingTop: 76 }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: '0 24px' }}>
          <div style={{ fontSize: 64, fontWeight: 900, color: '#05420d', marginBottom: 16, fontFamily: "'Mukta', sans-serif" }}>404</div>
          <h1 style={{ fontSize: 'clamp(1.4rem, 4vw, 1.8rem)', fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>पेज नहीं मिला</h1>
          <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 32 }}>
            आप जो पेज ढूंढ रहे हैं वह उपलब्ध नहीं है या हटा दिया गया है।
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Link href="/" style={{ display: 'block', background: '#05420d', color: '#fff', padding: '14px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
              होम पेज पर जाएँ
            </Link>
            <Link href="/mandi" style={{ display: 'block', border: '2px solid #05420d', color: '#05420d', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
              मंडी भाव देखें
            </Link>
            <Link href="/samachar" style={{ display: 'block', border: '2px solid #05420d', color: '#05420d', padding: '12px 24px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem' }}>
              ताज़ा समाचार पढ़ें
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
