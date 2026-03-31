import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Devendra Kumar Jha',
  jobTitle: 'Co-Founder and Director',
  worksFor: {
    '@type': 'Organization',
    name: 'Indpotato Pvt Ltd',
    url: 'https://www.indianpotato.in',
  },
  url: 'https://www.linkedin.com/in/potatoes/',
  sameAs: ['https://www.linkedin.com/in/potatoes/'],
};

export const metadata: Metadata = {
  title: 'हमारे बारे में — इंडियन पोटैटो | About Us',
  description: 'इंडियन पोटैटो (Indpotato Pvt Ltd) — भारत का प्रमुख आलू उद्योग मंच। किसानों, व्यापारियों, प्रसंस्करण उद्योग और निर्यातकों को जोड़ता है।',
  alternates: { canonical: 'https://www.indianpotato.in/about' },
  openGraph: {
    title: 'हमारे बारे में — इंडियन पोटैटो',
    description: 'भारत का प्रमुख आलू उद्योग मंच — मंडी भाव, समाचार, किस्में, योजनाएँ और उद्योग डायरेक्टरी।',
    url: 'https://www.indianpotato.in/about',
    type: 'website',
  },
};

/* ─── Reusable Styles ─── */
const sectionPad: React.CSSProperties = { padding: '56px 24px' };
const maxW: React.CSSProperties = { maxWidth: 1080, margin: '0 auto' };
const bodyFont: React.CSSProperties = {
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  fontSize: '0.95rem',
  color: '#374151',
  lineHeight: 1.9,
};
const h2Style: React.CSSProperties = {
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
  fontWeight: 800,
  color: '#1F2937',
  textAlign: 'center',
  marginBottom: 12,
};
const subtitleStyle: React.CSSProperties = {
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  fontSize: '0.9rem',
  color: '#6B7280',
  textAlign: 'center',
  maxWidth: 600,
  margin: '0 auto 40px',
  lineHeight: 1.7,
};
const redDot: React.CSSProperties = {
  width: 48,
  height: 4,
  background: '#E53E3E',
  borderRadius: 2,
  margin: '0 auto 20px',
};

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'हमारे बारे में', url: 'https://www.indianpotato.in/about' },
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Navbar />
      <main style={{ paddingTop: 80, minHeight: '100vh', background: '#fff' }}>

        {/* ─── HERO ─── */}
        <section style={{
          background: '#E53E3E',
          padding: '56px 24px 52px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.06,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='4' fill='white'/%3E%3C/svg%3E")`,
          }} />
          <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <nav style={{ marginBottom: 20 }}>
              <Link href="/" style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              }}>होम</Link>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 10px', fontSize: '0.75rem' }}>›</span>
              <span style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.82rem', color: '#fff',
              }}>हमारे बारे में</span>
            </nav>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: 6,
              padding: '6px 14px',
              marginBottom: 16,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#fff',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}>🥔 ABOUT US</div>
            <h1 style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.6rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.25,
              margin: 0,
              maxWidth: 700,
            }}>
              भारत का प्रमुख आलू उद्योग मंच
            </h1>
            <p style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '1.05rem',
              color: 'rgba(255,255,255,0.85)',
              marginTop: 16,
              lineHeight: 1.8,
              maxWidth: 640,
            }}>
              IndianPotato.com भारत की आलू मूल्य श्रृंखला के हर हितधारक को जोड़ने वाला डिजिटल सेतु है — खेत से कारखाने तक, मंडी से वैश्विक बाज़ार तक।
            </p>
          </div>
        </section>

        {/* ─── OUR STORY ─── */}
        <section style={{ ...sectionPad, background: '#FAFAFA' }}>
          <div style={{ ...maxW, maxWidth: 820 }}>
            <div style={redDot} />
            <h2 style={h2Style}>हमारी कहानी</h2>
            <div style={{
              ...bodyFont,
              background: '#fff',
              borderRadius: 12,
              padding: 'clamp(24px, 4vw, 40px)',
              borderLeft: '4px solid #E53E3E',
              boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
            }}>
              <p style={{ marginBottom: 20 }}>
                भारत विश्व का दूसरा सबसे बड़ा आलू उत्पादक है — हर साल 60 मिलियन टन से अधिक उत्पादन। फिर भी दशकों से यह विशाल उद्योग अलग-अलग खंडों में काम करता रहा है। किसान, व्यापारी, प्रसंस्करणकर्ता, निर्यातक, बीज कंपनियाँ और उपकरण निर्माता — सब मेहनत कर रहे हैं, लेकिन एक-दूसरे से, जानकारी से और अवसरों से कटे हुए।
              </p>
              <p style={{ marginBottom: 20 }}>
                <strong>हमने IndianPotato.com की स्थापना इसी को बदलने के लिए की।</strong>
              </p>
              <p style={{ marginBottom: 20 }}>
                जो एक जुनून की परियोजना के रूप में शुरू हुआ, वह आज भारत के सबसे व्यापक आलू उद्योग ज्ञान मंच के रूप में विकसित हो चुका है — जहाँ सत्यापित बाज़ार डेटा, गहन उद्योग आसूचना और वास्तविक व्यापारिक संपर्क एक छत के नीचे मिलते हैं।
              </p>
              <p style={{ marginBottom: 20 }}>
                <strong>IndianPotato.com, Indpotato Private Limited की प्रमुख पहल है</strong>, जिसका मुख्यालय पुणे, महाराष्ट्र में है। हमारी संस्थापक टीम कृषि इंजीनियरिंग में शैक्षणिक योग्यता के साथ-साथ आलू मूल्य श्रृंखला में प्रत्यक्ष अनुभव रखती है — मिट्टी स्वास्थ्य और बीज विज्ञान से लेकर प्रसंस्करण तकनीक और निर्यात लॉजिस्टिक्स तक।
              </p>
              <p style={{ fontWeight: 600, color: '#E53E3E' }}>
                हम आलू उद्योग के बारे में सिर्फ़ लिखते नहीं — हम इसमें जीते हैं। और यही फ़र्क है।
              </p>
            </div>
          </div>
        </section>

        {/* ─── WHAT WE DO ─── */}
        <section style={sectionPad}>
          <div style={maxW}>
            <div style={redDot} />
            <h2 style={h2Style}>हम क्या करते हैं</h2>
            <p style={subtitleStyle}>हम आलू उद्योग की सेवा छह परस्पर जुड़े स्तंभों पर करते हैं</p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 20,
            }}>
              {[
                { icon: '📊', title: 'बाज़ार आसूचना', desc: 'दैनिक मंडी भाव, बाज़ार विश्लेषण, राज्य-स्तरीय रिपोर्ट और निर्यात डेटा — सरकारी और संस्थागत स्रोतों से सत्यापित।' },
                { icon: '📰', title: 'उद्योग समाचार और प्रकाशन', desc: 'भारत का सबसे सक्रिय आलू समाचार डेस्क — प्रसंस्करण तकनीक, कंपनी समाचार, नीति अपडेट, विज्ञान और व्यापार।' },
                { icon: '📁', title: 'कंपनी डायरेक्टरी', desc: 'बीज कंपनियों, प्रसंस्करणकर्ताओं, निर्यातकों, उपकरण निर्माताओं, कोल्ड स्टोरेज और आपूर्तिकर्ताओं की बढ़ती हुई डायरेक्टरी।' },
                { icon: '💼', title: 'व्यावसायिक सेवाएँ', desc: 'विज्ञापन, परामर्श, लीड जनरेशन, ब्रांड प्रमोशन और निर्यात सहायता — पेशेवर सेवाएँ।' },
                { icon: '🤝', title: 'समुदाय और कनेक्शन', desc: 'सक्रिय WhatsApp समुदाय, LinkedIn एंगेजमेंट और उद्योग नेटवर्किंग — रियल-टाइम कनेक्शन।' },
                { icon: '📖', title: 'गाइड और शिक्षा', desc: 'व्यापक हाउ-टू गाइड — आलू निर्यात से लेकर प्रसंस्करण प्लांट स्थापना, बीज लाइसेंस से कोल्ड स्टोरेज प्रबंधन तक।' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '1px solid #F3F4F6',
                  borderRadius: 10,
                  padding: '28px 24px',
                  transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                  <h3 style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: 8,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '0.88rem',
                    color: '#6B7280',
                    lineHeight: 1.75,
                    margin: 0,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHO WE SERVE ─── */}
        <section style={{ ...sectionPad, background: '#FEF2F2' }}>
          <div style={maxW}>
            <div style={redDot} />
            <h2 style={h2Style}>हम किसकी सेवा करते हैं</h2>
            <p style={subtitleStyle}>हमारा दर्शक वर्ग संपूर्ण आलू मूल्य श्रृंखला में फैला है — भारत और विदेश दोनों में</p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              justifyContent: 'center',
            }}>
              {[
                { icon: '👨‍🌾', label: 'किसान और FPO' },
                { icon: '🏭', label: 'प्रसंस्करणकर्ता' },
                { icon: '🚢', label: 'निर्यातक और व्यापारी' },
                { icon: '⚙️', label: 'उपकरण कंपनियाँ' },
                { icon: '🧊', label: 'कोल्ड स्टोरेज' },
                { icon: '🌱', label: 'बीज कंपनियाँ' },
                { icon: '🧪', label: 'इनपुट सप्लायर' },
                { icon: '🏛️', label: 'अनुसंधान संस्थान' },
                { icon: '💰', label: 'निवेशक और उद्यमी' },
                { icon: '🌍', label: 'अंतरराष्ट्रीय खरीदार' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '1px solid #FECACA',
                  borderRadius: 8,
                  padding: '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: "'Noto Sans Devanagari', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: '#374151',
                }}>
                  <span style={{ fontSize: 20 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
            <p style={{
              ...bodyFont,
              textAlign: 'center',
              maxWidth: 640,
              margin: '32px auto 0',
              fontSize: '0.9rem',
            }}>
              चाहे आप आगरा में मंडी भाव देख रहे किसान हों, गुजरात में उपकरण खरीद रहे प्रसंस्करणकर्ता हों, या सिंगापुर में भारतीय आलू बाज़ार का मूल्यांकन कर रहे निवेशक — <strong style={{ color: '#E53E3E' }}>IndianPotato.com आपके लिए बना है।</strong>
            </p>
          </div>
        </section>

        {/* ─── OUR MISSION ─── */}
        <section style={sectionPad}>
          <div style={maxW}>
            <div style={redDot} />
            <h2 style={h2Style}>हमारा मिशन</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 20,
              marginTop: 32,
            }}>
              {[
                { icon: '🔗', title: 'सूचना अंतर को पाटना', desc: 'सत्यापित बाज़ार डेटा, मूल्य जानकारी और उद्योग ज्ञान को हर हितधारक के लिए मुफ़्त और सुलभ बनाना।' },
                { icon: '🌐', title: 'मूल्य श्रृंखला जोड़ना', desc: 'एक एकीकृत डिजिटल पारिस्थितिकी तंत्र बनाना जहाँ किसान, व्यापारी, प्रसंस्करणकर्ता और निर्यातक एक-दूसरे को खोज सकें।' },
                { icon: '🇮🇳', title: 'भारत को वैश्विक मंच पर लाना', desc: 'भारतीय आलू उद्योग को अंतरराष्ट्रीय मानकों, निर्यात बाज़ारों और वैश्विक प्रतिस्पर्धा के लिए तैयार करना।' },
                { icon: '📈', title: 'उद्योग विकास को गति देना', desc: 'भारत अपने आलू का केवल 7% प्रसंस्करित करता है बनाम विकसित देशों में 70%+। हम इस अंतर को पाटने में मदद कर रहे हैं।' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  border: '1px solid #F3F4F6',
                  borderRadius: 10,
                  padding: '28px 24px',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: '#FEF2F2',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26, margin: '0 auto 16px',
                  }}>{item.icon}</div>
                  <h3 style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#1F2937',
                    marginBottom: 8,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '0.85rem',
                    color: '#6B7280',
                    lineHeight: 1.7,
                    margin: 0,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHAT MAKES US DIFFERENT ─── */}
        <section style={{ ...sectionPad, background: '#FAFAFA' }}>
          <div style={{ ...maxW, maxWidth: 900 }}>
            <div style={redDot} />
            <h2 style={h2Style}>हम क्यों अलग हैं</h2>
            <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
              {[
                { icon: '🥔', title: '100% आलू केंद्रित', desc: 'हम सामान्य कृषि मंच नहीं हैं। IndianPotato.com का हर लेख, हर डेटा पॉइंट, हर कनेक्शन आलू के बारे में है। यह एकल फोकस हमें वह गहराई देता है जो किसी सामान्य मंच में नहीं मिल सकती।' },
                { icon: '🔬', title: 'कृषि इंजीनियर दिल से', desc: 'हमारी संस्थापक टीम कृषि इंजीनियर हैं जिनके पास उद्योग का प्रत्यक्ष अनुभव है। हम फसल के पीछे के विज्ञान, बाज़ार के अर्थशास्त्र और तकनीक को समझते हैं।' },
                { icon: '✅', title: 'सत्यापित, संस्थागत डेटा', desc: 'हर आँकड़ा विश्वसनीय संस्थानों से आता है — कृषि मंत्रालय, ICAR-CPRI, APEDA, NABARD, NHB, FSSAI, FAO। हम अनुमान नहीं लगाते — सत्यापित करते हैं।' },
                { icon: '📱', title: 'बहु-चैनल उपस्थिति', desc: 'वेबसाइट पर गहन सामग्री, WhatsApp पर रियल-टाइम अपडेट, LinkedIn पर पेशेवर नेटवर्किंग और डिजिटल पत्रिकाओं में विस्तृत फ़ीचर।' },
              ].map((item, i) => (
                <div key={i} style={{
                  background: '#fff',
                  borderRadius: 10,
                  padding: '24px 28px',
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                  border: '1px solid #F3F4F6',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    background: '#FEF2F2', border: '1px solid #FECACA',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 24, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '1rem', fontWeight: 700, color: '#1F2937', marginBottom: 6,
                    }}>{item.title}</h3>
                    <p style={{
                      fontFamily: "'Noto Sans Devanagari', sans-serif",
                      fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.75, margin: 0,
                    }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR JOURNEY ─── */}
        <section style={sectionPad}>
          <div style={{ ...maxW, maxWidth: 700 }}>
            <div style={redDot} />
            <h2 style={h2Style}>हमारी यात्रा</h2>
            <div style={{ marginTop: 36, position: 'relative', paddingLeft: 32 }}>
              <div style={{
                position: 'absolute', left: 11, top: 8, bottom: 8,
                width: 2, background: '#FECACA',
              }} />
              {[
                { year: '2024', title: 'मंच की शुरुआत', desc: 'IndianPotato.com लाइव हुआ — पहले लेख, पहला WhatsApp समुदाय, पहले उद्योग संपर्क।' },
                { year: '2025', title: 'विकास और प्रतिष्ठा', desc: '200+ लेख प्रकाशित, दो डिजिटल पत्रिकाएँ लॉन्च, 20,000+ मासिक विज़िटर, पेड सेवाएँ सक्रिय।' },
                { year: '2025', title: 'समुदाय निर्माण', desc: '3,000+ WhatsApp सदस्य, 5,000+ LinkedIn फ़ॉलोअर, 50+ देशों में उपस्थिति।' },
                { year: '2026', title: 'विस्तार', desc: 'कंपनी डायरेक्टरी लॉन्च, निर्यात लीड कनेक्ट, कस्टम सेवाएँ, उद्योग परामर्श और राज्य-स्तरीय रिपोर्ट।' },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: 32, position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: -27, top: 4,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#E53E3E', border: '3px solid #FEE2E2',
                  }} />
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.72rem', fontWeight: 700,
                    color: '#E53E3E', letterSpacing: '0.1em',
                    textTransform: 'uppercase', marginBottom: 4,
                  }}>{item.year}</div>
                  <h3 style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '1.05rem', fontWeight: 700, color: '#1F2937', marginBottom: 4,
                  }}>{item.title}</h3>
                  <p style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.7, margin: 0,
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMPANY INFO ─── */}
        <section style={{ ...sectionPad, background: '#0f0f0f' }}>
          <div style={{ ...maxW, maxWidth: 700 }}>
            <div style={{ ...redDot, background: '#E53E3E' }} />
            <h2 style={{ ...h2Style, color: '#fff' }}>कंपनी की जानकारी</h2>
            <div style={{
              background: '#1a1a1a',
              borderRadius: 12,
              padding: 'clamp(24px, 4vw, 36px)',
              border: '1px solid #2a2a2a',
              marginTop: 32,
            }}>
              {[
                { label: 'कानूनी संस्था', value: 'Indpotato Private Limited' },
                { label: 'पंजीकृत कार्यालय', value: 'पिंपरी-चिंचवड, पुणे, महाराष्ट्र, भारत' },
                { label: 'वेबसाइट (हिंदी)', value: 'indianpotato.in', link: 'https://www.indianpotato.in' },
                { label: 'वेबसाइट (English)', value: 'indianpotato.com', link: 'https://indianpotato.com' },
                { label: 'ईमेल', value: 'info@indpotato.com', link: 'mailto:info@indpotato.com' },
                { label: 'WhatsApp', value: '+91 94996 68498', link: 'https://wa.me/919499668498' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 0',
                  borderBottom: i < 5 ? '1px solid #2a2a2a' : 'none',
                  flexWrap: 'wrap',
                  gap: 8,
                }}>
                  <span style={{
                    fontFamily: "'Noto Sans Devanagari', sans-serif",
                    fontSize: '0.85rem', color: '#9CA3AF', fontWeight: 500,
                  }}>{item.label}</span>
                  {item.link ? (
                    <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.9rem', color: '#E53E3E', textDecoration: 'none', fontWeight: 600,
                    }}>{item.value}</a>
                  ) : (
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '0.9rem', color: '#fff', fontWeight: 600,
                    }}>{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{
          background: '#E53E3E',
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: 12,
            }}>जुड़ना चाहते हैं?</h2>
            <p style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 28,
              lineHeight: 1.7,
            }}>
              चाहे बाज़ार आसूचना हो, विज्ञापन के अवसर हों या व्यापारिक संपर्क — हम आपसे जुड़ना चाहते हैं।
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/sampark" style={{
                background: '#fff',
                color: '#E53E3E',
                padding: '13px 28px',
                borderRadius: 8,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none',
              }}>📝 संपर्क करें</Link>
              <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: 8,
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.3)',
              }}>💬 WhatsApp जॉइन करें</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
