'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'मंडी भाव', href: '/mandi' },
  { label: 'समाचार', href: '/samachar' },
  { label: 'डायरेक्टरी', href: '/directory', hasDropdown: true },
  { label: 'किस्में', href: '/kisme' },
  { label: 'योजनाएँ', href: '/yojnaye' },
  { label: 'संपर्क', href: '/sampark' },
];

const dirCategories = [
  { label: 'सभी कंपनियाँ', href: '/directory' },
  { label: 'बीज कंपनियाँ', href: '/directory/seed-companies' },
  { label: 'प्रसंस्करण कंपनियाँ', href: '/directory/processors' },
  { label: 'निर्यातक और व्यापारी', href: '/directory/exporters' },
  { label: 'उपकरण और मशीनरी', href: '/directory/equipment' },
  { label: 'कोल्ड स्टोरेज', href: '/directory/cold-storage' },
  { label: 'अनुसंधान और संस्थान', href: '/directory/research' },
  { label: 'उद्योग संघ', href: '/directory/associations' },
];

const dirActions = [
  { label: 'अपनी कंपनी जोड़ें', href: '/directory/submit', color: '#ed6442' },
  { label: 'प्लान देखें', href: '/directory/pricing', color: '#05420d' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dirOpen, setDirOpen] = useState(false);
  const [mobileDirOpen, setMobileDirOpen] = useState(false);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  function handleDropdownEnter() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setDirOpen(true);
  }

  function handleDropdownLeave() {
    dropdownTimeout.current = setTimeout(() => setDirOpen(false), 150);
  }

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
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.href}
                style={{ position: 'relative' }}
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <Link href={item.href} style={{
                  textDecoration: 'none', padding: '8px 14px',
                  fontSize: '0.85rem', fontWeight: 500, color: dirOpen ? '#05420d' : '#4b5563',
                  borderRadius: 8, transition: 'all 0.15s',
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                }}>
                  {item.label}
                  <span style={{
                    fontSize: '0.6rem', transition: 'transform 0.2s',
                    transform: dirOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}>▼</span>
                </Link>

                {/* Desktop dropdown */}
                <div style={{
                  position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                  paddingTop: 8,
                  opacity: dirOpen ? 1 : 0,
                  pointerEvents: dirOpen ? 'auto' : 'none',
                  transition: 'opacity 0.15s ease, transform 0.15s ease',
                  zIndex: 50,
                }}>
                  <div style={{
                    background: '#fff', borderRadius: 12,
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                    minWidth: 240, overflow: 'hidden',
                  }}>
                    <div style={{ padding: '6px 0' }}>
                      {dirCategories.map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          onClick={() => setDirOpen(false)}
                          className="dir-dropdown-item"
                          style={{
                            display: 'block', padding: '9px 16px',
                            fontSize: '0.82rem', fontWeight: 500, color: '#374151',
                            textDecoration: 'none', transition: 'all 0.1s',
                          }}
                        >{cat.label}</Link>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid #f3f4f6', padding: '6px 0' }}>
                      {dirActions.map((action) => (
                        <Link
                          key={action.href}
                          href={action.href}
                          onClick={() => setDirOpen(false)}
                          className="dir-dropdown-item"
                          style={{
                            display: 'block', padding: '9px 16px',
                            fontSize: '0.82rem', fontWeight: 600, color: action.color,
                            textDecoration: 'none', transition: 'all 0.1s',
                          }}
                        >{action.label}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} style={{
                textDecoration: 'none', padding: '8px 14px',
                fontSize: '0.85rem', fontWeight: 500, color: '#4b5563',
                borderRadius: 8, transition: 'all 0.15s',
              }}>{item.label}</Link>
            )
          )}
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

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid #f3f4f6', padding: '8px 24px 16px' }}>
          {navItems.map((item) =>
            item.hasDropdown ? (
              <div key={item.href}>
                <button
                  onClick={() => setMobileDirOpen(!mobileDirOpen)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '14px 0',
                    fontSize: '0.95rem', fontWeight: 500, color: '#374151',
                    borderBottom: '1px solid #f5f5f5',
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {item.label}
                  <span style={{
                    fontSize: '0.7rem', color: '#9ca3af',
                    transition: 'transform 0.2s',
                    transform: mobileDirOpen ? 'rotate(180deg)' : 'rotate(0)',
                  }}>▼</span>
                </button>

                {mobileDirOpen && (
                  <div style={{ paddingBottom: 8 }}>
                    {dirCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => { setMenuOpen(false); setMobileDirOpen(false); }}
                        style={{
                          display: 'block', padding: '10px 0 10px 16px',
                          fontSize: '0.88rem', fontWeight: 400, color: '#6b7280',
                          textDecoration: 'none', borderBottom: '1px solid #fafafa',
                        }}
                      >{cat.label}</Link>
                    ))}
                    <div style={{ borderTop: '1px solid #f3f4f6', marginTop: 4, paddingTop: 4 }}>
                      {dirActions.map((action) => (
                        <Link
                          key={action.href}
                          href={action.href}
                          onClick={() => { setMenuOpen(false); setMobileDirOpen(false); }}
                          style={{
                            display: 'block', padding: '10px 0 10px 16px',
                            fontSize: '0.88rem', fontWeight: 600, color: action.color,
                            textDecoration: 'none',
                          }}
                        >{action.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
                display: 'block', textDecoration: 'none', padding: '14px 0',
                fontSize: '0.95rem', fontWeight: 500, color: '#374151',
                borderBottom: '1px solid #f5f5f5',
              }}>{item.label}</Link>
            )
          )}
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
        .dir-dropdown-item:hover { background: #f9fafb !important; color: #05420d !important; }
      `}</style>
    </nav>
  );
}
