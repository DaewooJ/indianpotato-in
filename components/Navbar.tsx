'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'होम', href: '/' },
  { label: 'मंडी भाव', href: '/mandi' },
  { label: 'डायरेक्टरी', href: '/directory' },
  { label: 'समाचार', href: '/samachar' },
  { label: 'किस्में', href: '/kisme' },
  { label: 'योजनाएँ', href: '/yojnaye' },
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
      background: '#fff',
      borderBottom: '3px solid #E53E3E',
      boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.08)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto', padding: '0 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 66,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', textDecoration: 'none' }}>
          <div style={{ background: '#E53E3E', width: 40, height: 40, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🥔</div>
          <div>
            <div style={{ fontFamily: "'Noto Sans Devanagari', sans-serif", fontSize: '1.2rem', fontWeight: 800, color: '#E53E3E', lineHeight: 1.05 }}>इंडियन पोटैटो</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.52rem', fontWeight: 700, color: '#999', letterSpacing: '0.3em', textTransform: 'uppercase' }}>INDIANPOTATO.IN</div>
          </div>
        </Link>

        <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              textDecoration: 'none', padding: '22px 14px',
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '0.88rem', fontWeight: 600, color: '#555',
              borderBottom: '3px solid transparent', marginBottom: -3,
              transition: 'all 0.15s',
            }}>{item.label}</Link>
          ))}
          <div style={{ width: 1, height: 24, background: '#e5e5e5', margin: '0 14px' }} />
          <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#E53E3E', color: '#fff',
            textDecoration: 'none', padding: '9px 22px', borderRadius: 5,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: '0.82rem', fontWeight: 700,
          }}>💬 जुड़ें</a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mob-btn" style={{
          display: 'none', background: 'none', border: 'none',
          fontSize: 26, cursor: 'pointer', color: '#E53E3E',
        }}>{menuOpen ? '✕' : '☰'}</button>
      </div>

      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #f0f0f0', padding: '8px 28px 16px' }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', textDecoration: 'none', padding: '13px 0',
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '1rem', fontWeight: 600, color: '#444',
              borderBottom: '1px solid #f5f5f5',
            }}>{item.label}</Link>
          ))}
          <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{
            display: 'block', textAlign: 'center', textDecoration: 'none',
            background: '#E53E3E', color: '#fff',
            padding: '13px', borderRadius: 5, marginTop: 10,
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: '0.95rem', fontWeight: 700,
          }}>💬 WhatsApp पर जुड़ें</a>
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
