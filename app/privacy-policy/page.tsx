import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'गोपनीयता नीति (Privacy Policy)',
  description: 'इंडियन पोटैटो की गोपनीयता नीति — आपके व्यक्तिगत डेटा का संग्रह, उपयोग और सुरक्षा से संबंधित जानकारी।',
  alternates: { canonical: 'https://www.indianpotato.in/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 80, minHeight: '100vh', background: '#fff' }}>
        {/* Header */}
        <section style={{
          background: '#E53E3E',
          padding: '48px 24px 44px',
        }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <nav style={{ marginBottom: 16 }}>
              <Link href="/" style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              }}>
                होम
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 10px', fontSize: '0.75rem' }}>›</span>
              <span style={{
                fontFamily: "'Noto Sans Devanagari', sans-serif",
                fontSize: '0.82rem', color: '#fff',
              }}>
                गोपनीयता नीति
              </span>
            </nav>
            <h1 style={{
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.3,
              margin: 0,
            }}>
              गोपनीयता नीति (Privacy Policy)
            </h1>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.65)',
              marginTop: 10,
            }}>
              अंतिम अपडेट: 27 मार्च 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ padding: '48px 24px 72px' }}>
          <div style={{
            maxWidth: 820,
            margin: '0 auto',
            fontFamily: "'Noto Sans Devanagari', sans-serif",
            fontSize: '0.95rem',
            color: '#374151',
            lineHeight: 1.9,
          }}>
            <p>
              इंडियन पोटैटो (indianpotato.in), जो Indpotato Pvt Ltd द्वारा संचालित है, आपकी गोपनीयता का सम्मान करता है। यह गोपनीयता नीति बताती है कि हम आपके द्वारा प्रदान की गई या हमारी वेबसाइट के उपयोग से एकत्र की गई जानकारी को कैसे एकत्र, उपयोग, संग्रहीत और सुरक्षित करते हैं।
            </p>

            <h2 style={h2Style}>1. हम कौन सी जानकारी एकत्र करते हैं</h2>
            
            <h3 style={h3Style}>1.1 स्वतः एकत्र जानकारी</h3>
            <p>जब आप हमारी वेबसाइट पर आते हैं, तो निम्नलिखित जानकारी स्वचालित रूप से एकत्र हो सकती है:</p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • आपका IP पता और अनुमानित भौगोलिक स्थान<br />
              • ब्राउज़र का प्रकार और संस्करण<br />
              • ऑपरेटिंग सिस्टम की जानकारी<br />
              • देखे गए पृष्ठ और वेबसाइट पर बिताया गया समय<br />
              • रेफ़रल URL (आप कहाँ से आए)
            </p>

            <h3 style={h3Style}>1.2 आपके द्वारा प्रदान की गई जानकारी</h3>
            <p>जब आप स्वेच्छा से हमें जानकारी प्रदान करते हैं:</p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • संपर्क फ़ॉर्म भरते समय: नाम, ईमेल, फ़ोन नंबर, संदेश<br />
              • WhatsApp ग्रुप जॉइन करते समय: आपका फ़ोन नंबर<br />
              • डायरेक्टरी में लिस्टिंग जोड़ते समय: व्यवसाय विवरण<br />
              • न्यूज़लेटर सब्सक्राइब करते समय: ईमेल पता
            </p>

            <h2 style={h2Style}>2. जानकारी का उपयोग</h2>
            <p>एकत्र की गई जानकारी का उपयोग निम्नलिखित उद्देश्यों के लिए किया जाता है:</p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • वेबसाइट की सामग्री और उपयोगकर्ता अनुभव में सुधार<br />
              • आपकी पूछताछ और संपर्क अनुरोधों का जवाब देना<br />
              • मंडी भाव अपडेट और समाचार भेजना (आपकी सहमति से)<br />
              • वेबसाइट ट्रैफ़िक और उपयोग पैटर्न का विश्लेषण<br />
              • वेबसाइट की सुरक्षा सुनिश्चित करना
            </p>

            <h2 style={h2Style}>3. कुकीज़ और ट्रैकिंग</h2>
            <p>
              हमारी वेबसाइट कुकीज़ और इसी तरह की ट्रैकिंग तकनीकों का उपयोग करती है। कुकीज़ छोटी टेक्स्ट फ़ाइलें होती हैं जो आपके ब्राउज़र में संग्रहीत होती हैं।
            </p>
            <p style={{ marginTop: 12 }}>
              <strong>हम निम्न कुकीज़ का उपयोग करते हैं:</strong>
            </p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • <strong>आवश्यक कुकीज़:</strong> वेबसाइट के सही कामकाज के लिए ज़रूरी<br />
              • <strong>एनालिटिक्स कुकीज़:</strong> Google Analytics — वेबसाइट ट्रैफ़िक को समझने के लिए<br />
              • <strong>विज्ञापन कुकीज़:</strong> प्रासंगिक विज्ञापन दिखाने के लिए (यदि लागू हो)
            </p>
            <p style={{ marginTop: 12 }}>
              आप अपने ब्राउज़र की सेटिंग्स से कुकीज़ को अक्षम या हटा सकते हैं। हालाँकि, इससे वेबसाइट की कुछ सुविधाएँ प्रभावित हो सकती हैं।
            </p>

            <h2 style={h2Style}>4. Google Analytics</h2>
            <p>
              हम Google Analytics का उपयोग करते हैं, जो Google Inc. की एक वेब विश्लेषण सेवा है। Google Analytics कुकीज़ का उपयोग करता है ताकि हम यह समझ सकें कि उपयोगकर्ता वेबसाइट का उपयोग कैसे करते हैं। एकत्र की गई जानकारी (आपके IP पते सहित) Google के सर्वर पर स्थानांतरित और संग्रहीत की जाती है। अधिक जानकारी के लिए <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#E53E3E' }}>Google की गोपनीयता नीति</a> देखें।
            </p>

            <h2 style={h2Style}>5. तीसरे पक्ष के साथ साझा करना</h2>
            <p>
              हम आपकी व्यक्तिगत जानकारी को बेचते, किराए पर देते या व्यापार नहीं करते हैं। निम्नलिखित स्थितियों में जानकारी साझा की जा सकती है:
            </p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • <strong>सेवा प्रदाता:</strong> होस्टिंग (Vercel), ईमेल सेवाएँ और एनालिटिक्स टूल<br />
              • <strong>कानूनी आवश्यकताएँ:</strong> जब कानून द्वारा अनिवार्य हो<br />
              • <strong>सहमति:</strong> आपकी स्पष्ट अनुमति के साथ
            </p>

            <h2 style={h2Style}>6. डेटा सुरक्षा</h2>
            <p>
              हम आपकी जानकारी की सुरक्षा के लिए उचित तकनीकी और संगठनात्मक उपाय अपनाते हैं, जिसमें SSL एन्क्रिप्शन, सुरक्षित सर्वर और नियमित सुरक्षा ऑडिट शामिल हैं। हालाँकि, इंटरनेट पर कोई भी डेटा ट्रांसमिशन 100% सुरक्षित नहीं है।
            </p>

            <h2 style={h2Style}>7. आपके अधिकार</h2>
            <p>आपके पास निम्नलिखित अधिकार हैं:</p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • अपने एकत्र डेटा तक पहुँच का अनुरोध करना<br />
              • गलत जानकारी में सुधार का अनुरोध करना<br />
              • अपने डेटा को हटाने का अनुरोध करना<br />
              • मार्केटिंग संचार से सदस्यता समाप्त करना<br />
              • कुकीज़ को अक्षम करना
            </p>
            <p style={{ marginTop: 12 }}>
              इनमें से किसी भी अधिकार का उपयोग करने के लिए कृपया <a href="mailto:contact@indianpotato.in" style={{ color: '#E53E3E', textDecoration: 'none' }}>contact@indianpotato.in</a> पर ईमेल करें।
            </p>

            <h2 style={h2Style}>8. बच्चों की गोपनीयता</h2>
            <p>
              हमारी वेबसाइट 13 वर्ष से कम आयु के बच्चों के लिए नहीं है। हम जानबूझकर बच्चों से व्यक्तिगत जानकारी एकत्र नहीं करते हैं। यदि हमें पता चलता है कि किसी बच्चे ने हमें व्यक्तिगत जानकारी प्रदान की है, तो हम उसे तुरंत हटा देंगे।
            </p>

            <h2 style={h2Style}>9. नीति में परिवर्तन</h2>
            <p>
              हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। कोई भी बदलाव इस पृष्ठ पर प्रकाशित किया जाएगा और &quot;अंतिम अपडेट&quot; तिथि बदल दी जाएगी। महत्वपूर्ण बदलावों के लिए हम वेबसाइट पर अलग से सूचना दे सकते हैं।
            </p>

            <h2 style={h2Style}>10. संपर्क</h2>
            <p>
              इस गोपनीयता नीति से संबंधित किसी भी प्रश्न या चिंता के लिए:
            </p>
            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: 8,
              padding: '20px 24px',
              marginTop: 12,
            }}>
              <p style={{ margin: '4px 0', fontWeight: 600 }}>इंडियन पोटैटो (Indpotato Pvt Ltd)</p>
              <p style={{ margin: '4px 0' }}>📧 ईमेल: <a href="mailto:contact@indianpotato.in" style={{ color: '#E53E3E', textDecoration: 'none' }}>contact@indianpotato.in</a></p>
              <p style={{ margin: '4px 0' }}>🌐 वेबसाइट: <a href="https://www.indianpotato.in" style={{ color: '#E53E3E', textDecoration: 'none' }}>indianpotato.in</a></p>
              <p style={{ margin: '4px 0' }}>📍 पिंपरी-चिंचवड, पुणे, महाराष्ट्र</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const h2Style: React.CSSProperties = {
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#1F2937',
  marginTop: 36,
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '2px solid #FEE2E2',
};

const h3Style: React.CSSProperties = {
  fontFamily: "'Noto Sans Devanagari', sans-serif",
  fontSize: '1rem',
  fontWeight: 600,
  color: '#374151',
  marginTop: 20,
  marginBottom: 8,
};
