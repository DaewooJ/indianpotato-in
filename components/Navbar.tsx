'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'मंडी भाव', href: '/mandi' },
  { label: 'समाचार', href: '/samachar' },
  { label: 'डायरेक्टरी', href: '/directory' },
  { label: 'किस्में', href: '/kisme' },
  { label: 'योजनाएँ', href: '/yojnaye' },
  { label: 'संपर्क', href: '/sampark' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: '#fff',
      borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid #f3f4f6',
      boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.04)' : 'none',
      transition: 'all 0.3s',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/logo.png" alt="इंडियन पोटैटो लोगो" style={{ width: 36, height: 36, borderRadius: 8 }} />
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#05420d', lineHeight: 1.1 }}>इंडियन पोटैटो</div>
            <div style={{ fontSize: '0.5rem', fontWeight: 600, color: '#9ca3af', letterSpacing: '0.2em', textTransform: 'uppercase' }}>INDIAN POTATO</div>
          </div>
        </Link>

        <div className="desk-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{
              textDecoration: 'none', padding: '8px 14px',
              fontSize: '0.85rem', fontWeight: 500, color: '#4b5563',
              borderRadius: 8, transition: 'all 0.15s',
            }}>{item.label}</Link>
          ))}
          <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 8px' }} />
          <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#ed6442', color: '#fff',
            textDecoration: 'none', padding: '8px 18px', borderRadius: 8,
            fontSize: '0.82rem', fontWeight: 600,
            transition: 'background 0.15s',
          }}>WhatsApp जुड़ें</a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="mob-btn" style={{
          display: 'none', background: 'none', border: 'none',
          fontSize: 24, cursor: 'pointer', color: '#374151',
        }}>{menuOpen ? '✕' : '☰'}</button>
      </div>

      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '8px 24px 16px' }}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', textDecoration: 'none', padding: '14px 0',
              fontSize: '0.95rem', fontWeight: 500, color: '#374151',
              borderBottom: '1px solid #f5f5f5',
            }}>{item.label}</Link>
          ))}
          <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{
            display: 'block', textAlign: 'center', textDecoration: 'none',
            background: '#ed6442', color: '#fff',
            padding: '14px', borderRadius: 8, marginTop: 12,
            fontSize: '0.95rem', fontWeight: 600,
          }}>WhatsApp ग्रुप जॉइन करें</a>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desk-nav { display: none !important; }
          .mob-btn { display: block !important; }
        }
        .desk-nav a:hover { background: #f9fafb; color: #111827; }
      `}</style>
    </nav>
  );
}
