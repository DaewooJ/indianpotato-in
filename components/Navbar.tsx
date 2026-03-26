'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'होम', href: '/' },
  { label: 'मंडी भाव', href: '/mandi' },
  { label: 'समाचार', href: '/samachar' },
  { label: 'किस्में', href: '/kisme' },
  { label: 'योजनाएँ', href: '/yojnaye' },
  { label: 'डायरेक्टरी', href: '/directory' },
  { label: 'संपर्क', href: '/sampark' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: '#1a1a1a',
      borderBottom: '3px solid #E53E3E',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '0 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textDecoration: 'none' }}>
          <div style={{
            background: '#E53E3E', width: 36, height: 36, borderRadius: 5,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}>🥔</div>
          <div>
            <div style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1.05,
            }}>इंडियन पोटैटो</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.52rem', fontWeight: 700, color: '#E53E3E',
              letterSpacing: '0.3em', textTransform: 'uppercase',
            }}>INDIANPOTATO.IN</div>
          </div>
        </Link>

        <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              textDecoration: 'none', padding: '22px 14px',
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '0.86rem', fontWeight: 600, color: '#aaa',
              borderBottom: '3px solid transparent', marginBottom: -3,
              transition: 'all 0.15s',
            }}>{item.label}</Link>
          ))}
          <div style={{ width: 1, height: 24, background: '#333', margin: '0 14px' }} />
          <Link href="/sampark" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#E53E3E', color: '#fff',
            textDecoration: 'none', padding: '8px 20px', borderRadius: 4,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: '0.8rem', fontWeight: 700,
          }}>💬 जुड़ें</Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mob-btn" style={{
          display: 'none', background: 'none', border: 'none',
          fontSize: 24, cursor: 'pointer', color: '#fff',
        }}>{menuOpen ? '✕' : '☰'}</button>
      </div>

      {menuOpen && (
        <div style={{ background: '#1a1a1a', borderTop: '1px solid #252525', padding: '8px 28px 16px' }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', textDecoration: 'none', padding: '13px 0',
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '1rem', fontWeight: 600, color: '#ccc',
              borderBottom: '1px solid #222',
            }}>{item.label}</Link>
          ))}
          <Link href="/sampark" onClick={() => setMenuOpen(false)} style={{
            display: 'block', textAlign: 'center', textDecoration: 'none',
            background: '#E53E3E', color: '#fff',
            padding: '13px', borderRadius: 4, marginTop: 10,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: '0.95rem', fontWeight: 700,
          }}>💬 WhatsApp पर जुड़ें</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desk-nav { display: none !important; }
          .mob-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
