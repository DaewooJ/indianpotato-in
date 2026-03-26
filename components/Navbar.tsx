'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'होम', href: '/' },
  { label: 'मंडी भाव', href: '/mandi' },
  { label: 'समाचार', href: '/samachar' },
  { label: 'किस्में', href: '/kisme' },
  { label: 'सरकारी योजनाएँ', href: '/yojnaye' },
  { label: 'डायरेक्टरी', href: '/directory' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/97 shadow-[0_2px_24px_rgba(220,38,38,0.08)] border-b border-red-100'
          : 'bg-white/92 border-b border-transparent'
      }`}
      style={{ backdropFilter: 'blur(16px)' }}
    >
      <div
        className={`max-w-[1280px] mx-auto px-6 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-16' : 'h-[76px]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-2xl shadow-[0_3px_12px_rgba(220,38,38,0.3)]">
            🥔
          </div>
          <div>
            <div className="font-display text-[1.35rem] font-bold text-red-700 leading-none">
              इंडियन पोटैटो
            </div>
            <div className="font-mono text-[0.58rem] font-bold text-orange-600 tracking-[0.22em] uppercase">
              indianpotato.in
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 rounded-lg font-body text-[0.92rem] font-semibold text-stone-600 hover:text-red-700 hover:bg-red-50 transition-all no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/sampark"
            className="ml-3 inline-flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white px-5 py-2.5 rounded-lg font-body text-[0.85rem] font-bold shadow-[0_2px_10px_rgba(220,38,38,0.3)] hover:shadow-[0_4px_16px_rgba(220,38,38,0.35)] transition-all no-underline"
          >
            <span className="text-base">💬</span> WhatsApp जोड़ें
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden bg-transparent border-none text-[28px] cursor-pointer text-red-600"
          aria-label="मेन्यू खोलें"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-red-100 px-6 py-3 flex flex-col gap-0.5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 rounded-lg font-body text-base font-semibold text-stone-600 hover:bg-red-50 no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/sampark"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-3 rounded-lg font-body text-[0.95rem] font-bold no-underline"
          >
            💬 WhatsApp पर जुड़ें
          </Link>
        </div>
      )}
    </nav>
  );
}
