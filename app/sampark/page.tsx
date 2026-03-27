'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

/* ─── Contact Cards Data ─── */
const contactChannels = [
  {
    icon: '📧',
    title: 'सामान्य पूछताछ',
    titleEn: 'General Inquiries',
    value: 'info@indpotato.com',
    href: 'mailto:info@indpotato.com',
    desc: 'कोई भी प्रश्न या सुझाव',
  },
  {
    icon: '📢',
    title: 'विज्ञापन और प्रमोशन',
    titleEn: 'Advertising',
    value: 'ads@indpotato.com',
    href: 'mailto:ads@indpotato.com',
    desc: 'ब्रांड प्रमोशन, स्पॉन्सरशिप',
  },
  {
    icon: '📝',
    title: 'समाचार और प्रेस',
    titleEn: 'News & Press',
    value: 'news@indpotato.com',
    href: 'mailto:news@indpotato.com',
    desc: 'प्रेस रिलीज़, उद्योग समाचार',
  },
  {
    icon: '💬',
    title: 'WhatsApp',
    titleEn: 'WhatsApp',
    value: '+91 94996 68498',
    href: 'https://wa.me/919499668498',
    desc: 'मंडी भाव, त्वरित संपर्क',
  },
];

const indianStates = [
  'आंध्र प्रदेश', 'अरुणाचल प्रदेश', 'असम', 'बिहार', 'छत्तीसगढ़', 'गोवा',
  'गुजरात', 'हरियाणा', 'हिमाचल प्रदेश', 'झारखंड', 'कर्नाटक', 'केरल',
  'मध्य प्रदेश', 'महाराष्ट्र', 'मणिपुर', 'मेघालय', 'मिजोरम', 'नागालैंड',
  'ओडिशा', 'पंजाब', 'राजस्थान', 'सिक्किम', 'तमिलनाडु', 'तेलंगाना',
  'त्रिपुरा', 'उत्तर प्रदेश', 'उत्तराखंड', 'पश्चिम बंगाल',
  'दिल्ली', 'जम्मू-कश्मीर', 'लद्दाख',
];

export default function SamparkPage() {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', city: '', state: '', category: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80, minHeight: '100vh', background: '#fff' }}>

        {/* ─── HERO ─── */}
        <section style={{
          background: '#E53E3E',
          padding: '52px 24px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle pattern overlay */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5L55 30L30 55L5 30z' fill='none' stroke='white' stroke-width='0.8'/%3E%3C/svg%3E")`,
          }} />
          <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <nav style={{ marginBottom: 18 }}>
              <Link href="/" style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              }}>होम</Link>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 10px', fontSize: '0.75rem' }}>›</span>
              <span style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.82rem', color: '#fff',
              }}>संपर्क</span>
            </nav>
            <h1 style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.5rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.25,
              margin: 0,
            }}>
              संपर्क करें
            </h1>
            <p style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255,255,255,0.85)',
              marginTop: 12,
              lineHeight: 1.7,
              maxWidth: 560,
            }}>
              विज्ञापन, साझेदारी, समाचार सहयोग या किसी भी प्रश्न के लिए हमसे जुड़ें। हम 24 घंटे के भीतर उत्तर देने का प्रयास करते हैं।
            </p>
          </div>
        </section>

        {/* ─── CONTACT CHANNELS ─── */}
        <section style={{ padding: '48px 24px 0' }}>
          <div style={{
            maxWidth: 1080, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
            gap: 16,
          }}>
            {contactChannels.map((ch, i) => (
              <a
                key={i}
                href={ch.href}
                target={ch.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: '#fff',
                  border: '1px solid #F3F4F6',
                  borderRadius: 12,
                  padding: '24px 22px',
                  textDecoration: 'none',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#FECACA';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(229,62,62,0.08)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = '#F3F4F6';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10,
                  background: '#FEF2F2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22, marginBottom: 14,
                }}>{ch.icon}</div>
                <div style={{
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: '0.78rem', fontWeight: 600,
                  color: '#9CA3AF', marginBottom: 2,
                }}>{ch.desc}</div>
                <div style={{
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: '0.95rem', fontWeight: 700,
                  color: '#1F2937', marginBottom: 4,
                }}>{ch.title}</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem', fontWeight: 600,
                  color: '#E53E3E',
                }}>{ch.value}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ─── MAIN: FORM + SIDEBAR ─── */}
        <section style={{ padding: '52px 24px 64px' }}>
          <div style={{
            maxWidth: 1080, margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 40,
          }} className="sampark-grid">
            
            {/* ─── FORM ─── */}
            <div style={{
              background: '#FAFAFA',
              borderRadius: 16,
              padding: 'clamp(28px, 4vw, 44px)',
              border: '1px solid #F3F4F6',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 8,
              }}>
                <div style={{
                  width: 36, height: 3, background: '#E53E3E', borderRadius: 2,
                }} />
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem', fontWeight: 700,
                  color: '#E53E3E', letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}>CONTACT FORM</span>
              </div>
              <h2 style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                fontWeight: 800, color: '#1F2937',
                marginBottom: 6,
              }}>हमें संदेश भेजें</h2>
              <p style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.85rem', color: '#9CA3AF',
                marginBottom: 32, lineHeight: 1.6,
              }}>
                नीचे फ़ॉर्म भरें — हम जल्द से जल्द आपसे संपर्क करेंगे
              </p>

              {submitted ? (
                <div style={{
                  textAlign: 'center',
                  padding: '48px 20px',
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: '#DCFCE7', border: '3px solid #86EFAC',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 32, margin: '0 auto 20px',
                  }}>✓</div>
                  <h3 style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '1.2rem', fontWeight: 700, color: '#166534',
                    marginBottom: 8,
                  }}>संदेश भेज दिया गया!</h3>
                  <p style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.7,
                  }}>
                    धन्यवाद! हम 24 घंटे के भीतर आपसे संपर्क करेंगे।
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', city: '', state: '', category: '', message: '' }); }}
                    style={{
                      marginTop: 24,
                      background: '#E53E3E', color: '#fff',
                      border: 'none', borderRadius: 8,
                      padding: '12px 28px', cursor: 'pointer',
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '0.88rem', fontWeight: 700,
                    }}
                  >नया संदेश भेजें</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Row 1: Name + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-row">
                    <div>
                      <label style={labelStyle}>नाम <span style={{ color: '#E53E3E' }}>*</span></label>
                      <input
                        type="text" name="name" required value={formData.name} onChange={handleChange}
                        placeholder="आपका पूरा नाम"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>फ़ोन <span style={{ color: '#E53E3E' }}>*</span></label>
                      <input
                        type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                        placeholder="+91 98765 43210"
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Row 2: Email + Category */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-row">
                    <div>
                      <label style={labelStyle}>ईमेल</label>
                      <input
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="email@example.com"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>विषय <span style={{ color: '#E53E3E' }}>*</span></label>
                      <select
                        name="category" required value={formData.category} onChange={handleChange}
                        style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%239CA3AF' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 14px center',
                        }}
                      >
                        <option value="">विषय चुनें</option>
                        <option value="general">सामान्य पूछताछ</option>
                        <option value="advertising">विज्ञापन / प्रमोशन</option>
                        <option value="partnership">साझेदारी / सहयोग</option>
                        <option value="listing">डायरेक्टरी लिस्टिंग</option>
                        <option value="news">समाचार / प्रेस रिलीज़</option>
                        <option value="export">निर्यात सहायता</option>
                        <option value="feedback">सुझाव / फ़ीडबैक</option>
                        <option value="other">अन्य</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: City + State */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="form-row">
                    <div>
                      <label style={labelStyle}>शहर <span style={{ color: '#E53E3E' }}>*</span></label>
                      <input
                        type="text" name="city" required value={formData.city} onChange={handleChange}
                        placeholder="आपका शहर"
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>राज्य</label>
                      <select
                        name="state" value={formData.state} onChange={handleChange}
                        style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%239CA3AF' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 14px center',
                        }}
                      >
                        <option value="">राज्य चुनें</option>
                        {indianStates.map((s, i) => (
                          <option key={i} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 24 }}>
                    <label style={labelStyle}>संदेश <span style={{ color: '#E53E3E' }}>*</span></label>
                    <textarea
                      name="message" required value={formData.message} onChange={handleChange}
                      placeholder="आपका संदेश यहाँ लिखें..."
                      rows={5}
                      style={{
                        ...inputStyle,
                        resize: 'vertical' as const,
                        minHeight: 120,
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      width: '100%',
                      background: sending ? '#F87171' : '#E53E3E',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      padding: '15px 24px',
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '1rem',
                      fontWeight: 700,
                      cursor: sending ? 'wait' : 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 12px rgba(229,62,62,0.2)',
                    }}
                  >
                    {sending ? '⏳ भेजा जा रहा है...' : '📨 संदेश भेजें'}
                  </button>
                </form>
              )}
            </div>

            {/* ─── SIDEBAR INFO ─── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="info-grid">
              
              {/* Office */}
              <div style={{
                background: '#0f0f0f',
                borderRadius: 14,
                padding: 'clamp(24px, 3vw, 32px)',
                gridColumn: '1 / -1',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  marginBottom: 20,
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: '#E53E3E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}>🏢</div>
                  <div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.68rem', fontWeight: 700,
                      color: '#E53E3E', letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                    }}>REGISTERED OFFICE</div>
                    <div style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '0.95rem', fontWeight: 700, color: '#fff',
                    }}>कार्यालय</div>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 20,
                }} className="office-grid">
                  {[
                    { label: 'कंपनी', value: 'Indpotato Private Limited' },
                    { label: 'स्थान', value: 'पिंपरी-चिंचवड, पुणे, महाराष्ट्र' },
                    { label: 'ईमेल', value: 'info@indpotato.com', link: 'mailto:info@indpotato.com' },
                    { label: 'WhatsApp', value: '+91 94996 68498', link: 'https://wa.me/919499668498' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{
                        fontFamily: "'Noto Sans Devanagari', sans-serif",
                        fontSize: '0.75rem', color: '#6B7280', marginBottom: 3,
                      }}>{item.label}</div>
                      {item.link ? (
                        <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.88rem', color: '#E53E3E', textDecoration: 'none', fontWeight: 600,
                        }}>{item.value}</a>
                      ) : (
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.88rem', color: '#E5E7EB', fontWeight: 600,
                        }}>{item.value}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Website links */}
              <div style={{
                background: '#FEF2F2',
                borderRadius: 14,
                padding: 'clamp(20px, 3vw, 28px)',
                border: '1px solid #FECACA',
              }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>🌐</div>
                <h3 style={{
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: '0.95rem', fontWeight: 700, color: '#1F2937', marginBottom: 12,
                }}>हमारी वेबसाइट</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <a href="https://indianpotato.in" style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem', color: '#E53E3E', fontWeight: 600, textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E53E3E', flexShrink: 0 }} />
                    indianpotato.in <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(हिंदी)</span>
                  </a>
                  <a href="https://indianpotato.com" target="_blank" rel="noopener noreferrer" style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem', color: '#E53E3E', fontWeight: 600, textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E53E3E', flexShrink: 0 }} />
                    indianpotato.com <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(English)</span>
                  </a>
                </div>
              </div>

              {/* Founder */}
              <div style={{
                background: '#0f0f0f',
                borderRadius: 14,
                padding: 'clamp(20px, 3vw, 28px)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Subtle red glow */}
                <div style={{
                  position: 'absolute', top: -30, right: -30,
                  width: 100, height: 100, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(229,62,62,0.15) 0%, transparent 70%)',
                }} />
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.62rem', fontWeight: 700,
                  color: '#E53E3E', letterSpacing: '0.16em',
                  textTransform: 'uppercase', marginBottom: 14,
                }}>FOUNDER</div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  marginBottom: 14,
                }}>
                  <Image
                    src="/images/founder-devendra-jha.png"
                    alt="Devendra Kumar Jha — Founder, Indian Potato"
                    width={56}
                    height={56}
                    style={{
                      borderRadius: '50%',
                      border: '2.5px solid #E53E3E',
                      objectFit: 'cover',
                    }}
                  />
                  <div>
                    <div style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '0.95rem', fontWeight: 700, color: '#fff',
                      lineHeight: 1.3,
                    }}>देवेंद्र कुमार झा</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.75rem', color: '#9CA3AF',
                      marginTop: 2,
                    }}>Co-Founder, Indpotato Pvt Ltd</div>
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/potatoes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    width: '100%',
                    background: '#0A66C2',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '11px 16px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    marginBottom: 14,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Follow on LinkedIn
                </a>
                {/* Other social */}
                <div style={{ display: 'flex', gap: 8 }}>
                  {[
                    { label: 'Company', href: 'https://www.linkedin.com/company/indianpotato', icon: '🏢' },
                    { label: 'YouTube', href: 'https://www.youtube.com/@IndianPotatoes', icon: '▶️' },
                    { label: 'WhatsApp', href: 'https://spuds.me/kisan', icon: '💬' },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                      flex: 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 5, padding: '8px 6px',
                      background: '#1a1a1a', borderRadius: 6,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.7rem', color: '#9CA3AF', fontWeight: 600,
                      textDecoration: 'none', border: '1px solid #2a2a2a',
                    }}>
                      <span style={{ fontSize: 13 }}>{s.icon}</span> {s.label}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── WHY CONTACT US ─── */}
        <section style={{ padding: '48px 24px 56px', background: '#FAFAFA' }}>
          <div style={{ maxWidth: 1080, margin: '0 auto' }}>
            <div style={{
              width: 48, height: 3, background: '#E53E3E', borderRadius: 2,
              margin: '0 auto 16px',
            }} />
            <h2 style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              fontWeight: 800, color: '#1F2937',
              textAlign: 'center', marginBottom: 36,
            }}>हमसे क्यों जुड़ें?</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 16,
            }}>
              {[
                { icon: '📊', title: 'विज्ञापन', desc: 'वेबसाइट, WhatsApp और डिजिटल पत्रिका पर ब्रांड प्रमोशन' },
                { icon: '📁', title: 'डायरेक्टरी लिस्टिंग', desc: 'अपनी कंपनी को भारत के #1 आलू मंच पर सूचीबद्ध करें' },
                { icon: '🚢', title: 'निर्यात सहायता', desc: 'वैश्विक बाज़ार में आलू निर्यात के लिए मार्गदर्शन' },
                { icon: '📰', title: 'प्रेस कवरेज', desc: 'अपनी कंपनी समाचार, उत्पाद लॉन्च या उपलब्धि प्रकाशित करें' },
                { icon: '🤝', title: 'साझेदारी', desc: 'उद्योग कार्यक्रम, सम्मेलन या अनुसंधान में सहयोग' },
                { icon: '💡', title: 'सुझाव', desc: 'मंच को बेहतर बनाने के लिए आपकी राय हमारे लिए महत्वपूर्ण है' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: '22px 20px',
                  border: '1px solid #F3F4F6',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: '#FEF2F2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '0.9rem', fontWeight: 700, color: '#1F2937', marginBottom: 3,
                    }}>{item.title}</div>
                    <div style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '0.82rem', color: '#9CA3AF', lineHeight: 1.6,
                    }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RESPONSE PROMISE ─── */}
        <section style={{
          background: '#E53E3E',
          padding: '40px 24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              fontWeight: 800, color: '#fff',
              marginBottom: 10,
            }}>⏱️ 24 घंटे में उत्तर</h2>
            <p style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7, marginBottom: 24,
            }}>
              हम हर संदेश को गंभीरता से लेते हैं। कार्य दिवसों में 24 घंटे के भीतर उत्तर देने का हमारा प्रयास रहता है।
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/919499668498" target="_blank" rel="noopener noreferrer" style={{
                background: '#25D366', color: '#fff',
                padding: '12px 24px', borderRadius: 8,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.9rem', fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>💬 WhatsApp करें</a>
              <a href="mailto:info@indpotato.com" style={{
                background: 'rgba(255,255,255,0.15)', color: '#fff',
                padding: '12px 24px', borderRadius: 8,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.9rem', fontWeight: 700,
                textDecoration: 'none', border: '1px solid rgba(255,255,255,0.3)',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>📧 ईमेल भेजें</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* ─── RESPONSIVE STYLES ─── */}
      <style>{`
        @media (min-width: 768px) {
          .sampark-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
          .info-grid { grid-template-columns: 1fr !important; }
          .office-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

/* ─── Shared Styles ─── */
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  fontSize: '0.82rem',
  fontWeight: 600,
  color: '#374151',
  marginBottom: 6,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  fontSize: '0.9rem',
  color: '#1F2937',
  background: '#fff',
  border: '1.5px solid #E5E7EB',
  borderRadius: 8,
  padding: '12px 14px',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};
