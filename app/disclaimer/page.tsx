import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'अस्वीकरण (Disclaimer)',
  description: 'इंडियन पोटैटो वेबसाइट का अस्वीकरण — indianpotato.in पर उपलब्ध जानकारी के उपयोग से संबंधित शर्तें और सीमाएँ।',
  alternates: { canonical: 'https://www.indianpotato.in/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: 'अस्वीकरण', url: 'https://www.indianpotato.in/disclaimer' },
      ]} />
      <Navbar />
      <main style={{ paddingTop: 80, minHeight: '100vh', background: '#fff' }}>
        {/* Header */}
        <section style={{
          background: '#05420d',
          padding: '48px 24px 44px',
        }}>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            <nav style={{ marginBottom: 16 }}>
              <Link href="/" style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
              }}>
                होम
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.4)', margin: '0 10px', fontSize: '0.75rem' }}>›</span>
              <span style={{
                fontFamily: 'var(--font-poppins), sans-serif',
                fontSize: '0.82rem', color: '#fff',
              }}>
                अस्वीकरण
              </span>
            </nav>
            <h1 style={{
              fontFamily: 'var(--font-poppins), sans-serif',
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.3,
              margin: 0,
            }}>
              अस्वीकरण (Disclaimer)
            </h1>
            <p style={{
              fontFamily: 'var(--font-poppins), sans-serif',
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
            fontFamily: 'var(--font-poppins), sans-serif',
            fontSize: '0.95rem',
            color: '#374151',
            lineHeight: 1.9,
          }}>
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderLeft: '4px solid #05420d',
              borderRadius: 8,
              padding: '20px 24px',
              marginBottom: 40,
              fontSize: '0.88rem',
              color: '#991B1B',
            }}>
              <strong>महत्वपूर्ण:</strong> indianpotato.in पर उपलब्ध सभी जानकारी केवल सामान्य सूचना और शैक्षिक उद्देश्यों के लिए है। कृपया किसी भी व्यावसायिक निर्णय से पहले संबंधित विशेषज्ञ से परामर्श लें।
            </div>

            <h2 style={h2Style}>1. सामान्य अस्वीकरण</h2>
            <p>
              indianpotato.in (इंडियन पोटैटो) वेबसाइट पर उपलब्ध सभी सामग्री — जिसमें लेख, मंडी भाव, सरकारी योजनाओं की जानकारी, आलू किस्मों का विवरण, उद्योग डायरेक्टरी और अन्य सामग्री शामिल है — केवल सामान्य सूचना और शैक्षिक उद्देश्यों के लिए प्रदान की गई है। यह किसी भी प्रकार की पेशेवर, कानूनी, वित्तीय या कृषि सलाह का विकल्प नहीं है।
            </p>

            <h2 style={h2Style}>2. मंडी भाव और बाज़ार डेटा</h2>
            <p>
              हमारी वेबसाइट पर प्रदर्शित मंडी भाव और बाज़ार से संबंधित डेटा विभिन्न सार्वजनिक स्रोतों, सरकारी पोर्टलों (जैसे Agmarknet) और उद्योग के सूत्रों से एकत्र किया जाता है। हम इस डेटा की सटीकता, पूर्णता या समयबद्धता की गारंटी नहीं देते हैं। वास्तविक बाज़ार भाव स्थानीय मंडी, आपूर्ति-माँग, मौसम और अन्य कारकों के आधार पर भिन्न हो सकते हैं।
            </p>
            <p>
              कृपया किसी भी व्यापारिक लेनदेन से पहले स्थानीय मंडी समिति या संबंधित अधिकारियों से वर्तमान भाव की पुष्टि अवश्य करें।
            </p>

            <h2 style={h2Style}>3. सरकारी योजनाएँ और नीतियाँ</h2>
            <p>
              सरकारी योजनाओं, सब्सिडी, अनुदान और नीतियों से संबंधित जानकारी सार्वजनिक रूप से उपलब्ध सरकारी अधिसूचनाओं और प्रेस विज्ञप्तियों पर आधारित है। ये योजनाएँ समय-समय पर बदल सकती हैं। पात्रता, आवेदन प्रक्रिया और लाभ की पूर्ण जानकारी के लिए कृपया संबंधित सरकारी विभाग या जिला कृषि कार्यालय से संपर्क करें।
            </p>

            <h2 style={h2Style}>4. उद्योग डायरेक्टरी</h2>
            <p>
              डायरेक्टरी में सूचीबद्ध कंपनियों, व्यापारियों, कोल्ड स्टोरेज और सेवा प्रदाताओं की जानकारी सार्वजनिक स्रोतों और स्वयं उनके द्वारा प्रदान किए गए विवरण पर आधारित है। इंडियन पोटैटो इन सूचीबद्ध संस्थाओं की सेवाओं, उत्पादों की गुणवत्ता या विश्वसनीयता की कोई गारंटी या समर्थन नहीं देता है। किसी भी व्यवसायिक संबंध स्थापित करने से पहले स्वयं उचित जाँच (due diligence) अवश्य करें।
            </p>

            <h2 style={h2Style}>5. बाहरी लिंक</h2>
            <p>
              हमारी वेबसाइट में अन्य वेबसाइटों के लिंक हो सकते हैं। ये लिंक केवल सुविधा के लिए दिए गए हैं। इंडियन पोटैटो इन बाहरी वेबसाइटों की सामग्री, गोपनीयता नीतियों या प्रथाओं के लिए जिम्मेदार नहीं है।
            </p>

            <h2 style={h2Style}>6. कृषि सलाह</h2>
            <p>
              खेती तकनीकों, कीटनाशकों के उपयोग, उर्वरक प्रबंधन और फसल प्रबंधन से संबंधित सामग्री सामान्य मार्गदर्शन के लिए है। विशिष्ट कृषि समस्याओं के लिए अपने क्षेत्र के कृषि विज्ञान केंद्र (KVK), कृषि विश्वविद्यालय या कृषि विस्तार अधिकारी से व्यक्तिगत सलाह लें।
            </p>

            <h2 style={h2Style}>7. देयता की सीमा</h2>
            <p>
              इंडियन पोटैटो, इसके संस्थापक, संचालक, लेखक और सहयोगी — वेबसाइट पर उपलब्ध जानकारी के उपयोग से होने वाली किसी भी प्रत्यक्ष या अप्रत्यक्ष हानि, नुकसान या असुविधा के लिए उत्तरदायी नहीं होंगे। वेबसाइट का उपयोग पूर्णतः आपके स्वयं के जोखिम पर है।
            </p>

            <h2 style={h2Style}>8. सामग्री में परिवर्तन</h2>
            <p>
              हम बिना पूर्व सूचना के वेबसाइट की सामग्री, संरचना और इस अस्वीकरण में बदलाव करने का अधिकार रखते हैं। नियमित रूप से इस पृष्ठ की जाँच करने की अनुशंसा की जाती है।
            </p>

            <h2 style={h2Style}>9. संपर्क</h2>
            <p>
              इस अस्वीकरण या वेबसाइट की सामग्री से संबंधित किसी भी प्रश्न के लिए कृपया हमसे संपर्क करें:
            </p>
            <div style={{
              background: '#F9FAFB',
              border: '1px solid #E5E7EB',
              borderRadius: 8,
              padding: '20px 24px',
              marginTop: 12,
            }}>
              <p style={{ margin: '4px 0', fontWeight: 600 }}>इंडियन पोटैटो (Indpotato Pvt Ltd)</p>
              <p style={{ margin: '4px 0' }}>📧 ईमेल: <a href="mailto:contact@indianpotato.in" style={{ color: '#05420d', textDecoration: 'none' }}>contact@indianpotato.in</a></p>
              <p style={{ margin: '4px 0' }}>🌐 वेबसाइट: <a href="https://www.indianpotato.in" style={{ color: '#05420d', textDecoration: 'none' }}>indianpotato.in</a></p>
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
  fontFamily: 'var(--font-poppins), sans-serif',
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#1F2937',
  marginTop: 36,
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '2px solid #FEE2E2',
};
