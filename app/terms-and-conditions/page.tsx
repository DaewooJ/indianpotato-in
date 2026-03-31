import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'नियम और शर्तें (Terms & Conditions)',
  description: 'इंडियन पोटैटो वेबसाइट के उपयोग से संबंधित नियम और शर्तें — indianpotato.in',
  alternates: { canonical: 'https://www.indianpotato.in/terms-and-conditions' },
};

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'नियम व शर्तें', url: 'https://www.indianpotato.in/terms-and-conditions' },
      ]} />
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
                fontFamily: 'var(--font-hindi), sans-serif',
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              }}>
                होम
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 10px', fontSize: '0.75rem' }}>›</span>
              <span style={{
                fontFamily: 'var(--font-hindi), sans-serif',
                fontSize: '0.82rem', color: '#fff',
              }}>
                नियम और शर्तें
              </span>
            </nav>
            <h1 style={{
              fontFamily: 'var(--font-hindi), sans-serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.3,
              margin: 0,
            }}>
              नियम और शर्तें (Terms &amp; Conditions)
            </h1>
            <p style={{
              fontFamily: 'var(--font-english), sans-serif',
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
            fontFamily: 'var(--font-hindi), sans-serif',
            fontSize: '0.95rem',
            color: '#374151',
            lineHeight: 1.9,
          }}>
            <p>
              indianpotato.in (इंडियन पोटैटो) वेबसाइट का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। यदि आप इन शर्तों से सहमत नहीं हैं, तो कृपया वेबसाइट का उपयोग न करें।
            </p>

            <h2 style={h2Style}>1. परिभाषाएँ</h2>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • <strong>&quot;वेबसाइट&quot;</strong> — indianpotato.in और इसके सभी उप-पृष्ठ<br />
              • <strong>&quot;हम/हमारी&quot;</strong> — Indpotato Pvt Ltd, पिंपरी-चिंचवड, पुणे<br />
              • <strong>&quot;उपयोगकर्ता/आप&quot;</strong> — वेबसाइट का उपयोग करने वाला कोई भी व्यक्ति<br />
              • <strong>&quot;सामग्री&quot;</strong> — वेबसाइट पर उपलब्ध सभी पाठ, चित्र, डेटा और मल्टीमीडिया<br />
              • <strong>&quot;सेवाएँ&quot;</strong> — वेबसाइट द्वारा प्रदान की जाने वाली सभी सुविधाएँ
            </p>

            <h2 style={h2Style}>2. वेबसाइट का उपयोग</h2>
            <p>वेबसाइट का उपयोग करते समय आप सहमत हैं कि:</p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • आप वेबसाइट का उपयोग केवल वैध और कानूनी उद्देश्यों के लिए करेंगे<br />
              • आप किसी भी ऐसी गतिविधि में शामिल नहीं होंगे जो वेबसाइट के संचालन को बाधित करे<br />
              • आप वेबसाइट की सुरक्षा को भंग करने का प्रयास नहीं करेंगे<br />
              • आप स्वचालित टूल (बॉट, स्क्रेपर) का उपयोग करके डेटा एकत्र नहीं करेंगे बिना हमारी लिखित अनुमति के<br />
              • आप किसी अन्य उपयोगकर्ता के खाते का अनधिकृत उपयोग नहीं करेंगे
            </p>

            <h2 style={h2Style}>3. बौद्धिक संपदा</h2>
            <p>
              वेबसाइट पर उपलब्ध सभी सामग्री — जिसमें लेख, डिज़ाइन, लोगो, ग्राफ़िक्स, डेटा संकलन और सॉफ़्टवेयर शामिल है — Indpotato Pvt Ltd या इसके सामग्री प्रदाताओं की बौद्धिक संपदा है और भारतीय कॉपीराइट अधिनियम, 1957 और अन्य लागू कानूनों द्वारा संरक्षित है।
            </p>
            <p style={{ marginTop: 12 }}><strong>अनुमत उपयोग:</strong></p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • व्यक्तिगत, गैर-व्यावसायिक उद्देश्यों के लिए सामग्री देखना और प्रिंट करना<br />
              • उचित श्रेय के साथ सामग्री का संक्षिप्त उद्धरण (50 शब्दों तक)<br />
              • सोशल मीडिया पर लिंक साझा करना
            </p>
            <p style={{ marginTop: 12 }}><strong>प्रतिबंधित उपयोग:</strong></p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • बिना लिखित अनुमति के सामग्री का पुनर्प्रकाशन<br />
              • व्यावसायिक उद्देश्यों के लिए सामग्री की प्रतिलिपि<br />
              • लोगो, ब्रांड नाम या डिज़ाइन तत्वों का अनधिकृत उपयोग<br />
              • डेटाबेस या सामग्री का थोक डाउनलोड
            </p>

            <h2 style={h2Style}>4. मंडी भाव और डेटा</h2>
            <p>
              मंडी भाव और बाज़ार डेटा सार्वजनिक स्रोतों से एकत्र किया जाता है और केवल संदर्भ के लिए प्रदान किया जाता है। हम इस डेटा की सटीकता, समयबद्धता या पूर्णता की गारंटी नहीं देते हैं। व्यापारिक निर्णयों के लिए कृपया स्थानीय मंडी समिति से वर्तमान भाव की पुष्टि करें।
            </p>

            <h2 style={h2Style}>5. उद्योग डायरेक्टरी</h2>
            <p>
              डायरेक्टरी में सूचीबद्ध होने का अर्थ हमारे द्वारा किसी भी कंपनी या सेवा प्रदाता का समर्थन नहीं है। हम सूचीबद्ध संस्थाओं की जानकारी की सटीकता या उनकी सेवाओं की गुणवत्ता की ज़िम्मेदारी नहीं लेते हैं।
            </p>
            <p style={{ marginTop: 12 }}>
              <strong>सूचीबद्ध संस्थाओं के लिए:</strong> यदि आपकी लिस्टिंग में कोई गलत जानकारी है या आप अपनी लिस्टिंग हटवाना चाहते हैं, तो कृपया <a href="mailto:contact@indianpotato.in" style={{ color: '#E53E3E' }}>contact@indianpotato.in</a> पर संपर्क करें।
            </p>

            <h2 style={h2Style}>6. उपयोगकर्ता द्वारा प्रस्तुत सामग्री</h2>
            <p>
              यदि आप हमें कोई सामग्री (टिप्पणियाँ, सुझाव, लिस्टिंग जानकारी आदि) भेजते हैं, तो आप सहमत हैं कि:
            </p>
            <p style={{ paddingLeft: 20, margin: '8px 0' }}>
              • आपके पास उस सामग्री को साझा करने का अधिकार है<br />
              • सामग्री गैर-कानूनी, अपमानजनक या भ्रामक नहीं है<br />
              • हम उस सामग्री को वेबसाइट पर उपयोग, संपादित या प्रकाशित कर सकते हैं<br />
              • हम किसी भी सामग्री को बिना कारण बताए अस्वीकार करने का अधिकार रखते हैं
            </p>

            <h2 style={h2Style}>7. दायित्व की सीमा</h2>
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderLeft: '4px solid #E53E3E',
              borderRadius: 8,
              padding: '20px 24px',
              margin: '16px 0',
              fontSize: '0.88rem',
              color: '#991B1B',
            }}>
              Indpotato Pvt Ltd, इसके निदेशक, कर्मचारी या सहयोगी — वेबसाइट के उपयोग या उपयोग करने में असमर्थता से उत्पन्न किसी भी प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक, विशेष या परिणामी क्षति के लिए उत्तरदायी नहीं होंगे। इसमें लाभ की हानि, डेटा की हानि या व्यवसायिक बाधा शामिल है।
            </div>

            <h2 style={h2Style}>8. क्षतिपूर्ति</h2>
            <p>
              आप Indpotato Pvt Ltd और इसके अधिकारियों, निदेशकों और कर्मचारियों को — वेबसाइट के आपके उपयोग, इन शर्तों के उल्लंघन, या किसी तीसरे पक्ष के अधिकारों के उल्लंघन से उत्पन्न किसी भी दावे, हानि या व्यय से क्षतिपूर्ति देने और हानिरहित रखने के लिए सहमत हैं।
            </p>

            <h2 style={h2Style}>9. सेवा में बदलाव</h2>
            <p>
              हम बिना पूर्व सूचना के वेबसाइट की सामग्री, सुविधाओं, डिज़ाइन या इन नियमों और शर्तों में बदलाव करने का अधिकार रखते हैं। निरंतर उपयोग को संशोधित शर्तों की स्वीकृति माना जाएगा।
            </p>

            <h2 style={h2Style}>10. समाप्ति</h2>
            <p>
              हम किसी भी उपयोगकर्ता की वेबसाइट तक पहुँच को बिना पूर्व सूचना के और बिना किसी कारण बताए निलंबित या समाप्त कर सकते हैं, विशेषकर यदि इन शर्तों का उल्लंघन हुआ हो।
            </p>

            <h2 style={h2Style}>11. लागू कानून और क्षेत्राधिकार</h2>
            <p>
              ये नियम और शर्तें भारतीय कानून द्वारा शासित हैं। किसी भी विवाद के लिए पुणे, महाराष्ट्र के न्यायालयों का विशेष क्षेत्राधिकार होगा।
            </p>

            <h2 style={h2Style}>12. विभाज्यता</h2>
            <p>
              यदि इन शर्तों का कोई प्रावधान अमान्य या अप्रवर्तनीय पाया जाता है, तो शेष प्रावधान पूरी तरह प्रभावी रहेंगे।
            </p>

            <h2 style={h2Style}>13. संपर्क</h2>
            <p>
              इन नियमों और शर्तों से संबंधित किसी भी प्रश्न के लिए:
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
  fontFamily: 'var(--font-hindi), sans-serif',
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#1F2937',
  marginTop: 36,
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '2px solid #FEE2E2',
};
