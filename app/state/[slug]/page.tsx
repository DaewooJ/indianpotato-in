import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/blog';
import { getAllListings, DIRECTORY_CATEGORIES } from '@/lib/directory';

/* ─── State Config ─── */
interface StateConfig {
  slug: string; name: string; nameEn: string;
}

const states: Record<string, StateConfig> = {
  'uttar-pradesh': { slug: 'uttar-pradesh', name: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh' },
};

export async function generateStaticParams() {
  return Object.keys(states).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = states[params.slug];
  if (!s) return { title: 'राज्य नहीं मिला' };
  return {
    title: `${s.name} आलू उद्योग — मंडी भाव, किस्में, कोल्ड स्टोरेज | Indian Potato`,
    description: `${s.name} में आलू उत्पादन, ताज़ा मंडी भाव, शीर्ष 10 ज़िले, कोल्ड स्टोरेज, सरकारी योजनाएँ और उद्योग डायरेक्टरी। भारत का #1 आलू उत्पादक राज्य।`,
    alternates: { canonical: `https://www.indianpotato.in/state/${s.slug}` },
    openGraph: {
      title: `${s.name} — भारत का #1 आलू उत्पादक राज्य`,
      description: `${s.name} में आलू उत्पादन 19.17 मिलियन टन, शीर्ष 10 ज़िले, प्रमुख किस्में, बीज उत्पादन और उद्योग दृष्टिकोण।`,
      url: `https://www.indianpotato.in/state/${s.slug}`,
      type: 'website',
    },
  };
}

/* ─── Reusable Section Header ─── */
function SH({ title, link, linkText }: { title: string; link?: string; linkText?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
      <h2 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', fontWeight: 700, color: '#111827' }}>{title}</h2>
      {link && linkText && <Link href={link} style={{ fontSize: 14, fontWeight: 500, color: '#dc2626', textDecoration: 'none' }}>{linkText}</Link>}
    </div>
  );
}

/* ─── District Data ─── */
const districts = [
  { rank: 1, name: 'आगरा', production: '28.0 लाख MT', highlight: '71,000 हेक्टेयर, कुफरी बहार प्रमुख किस्म' },
  { rank: 2, name: 'फ़िरोज़ाबाद', production: '20.8 लाख MT', highlight: 'भारत के आलू प्रसंस्करण उद्योग का प्रमुख आपूर्तिकर्ता' },
  { rank: 3, name: 'कन्नौज', production: '20.4 लाख MT', highlight: 'मजबूत कोल्ड स्टोरेज अवसंरचना, साल भर आपूर्ति' },
  { rank: 4, name: 'हाथरस', production: '19.1 लाख MT', highlight: 'आगरा-कानपुर आलू पट्टी का रणनीतिक हिस्सा' },
  { rank: 5, name: 'फर्रुखाबाद', production: '15.9 लाख MT', highlight: 'गुणवत्ता बीज आलू उत्पादन और वितरण पर ध्यान' },
  { rank: 6, name: 'अलीगढ़', production: '11.0 लाख MT', highlight: 'चिप्सोना जैसी प्रसंस्करण किस्मों को अपनाना बढ़ा' },
  { rank: 7, name: 'बदायूँ', production: '8.5 लाख MT', highlight: 'मध्य UP में उभरता हुआ आलू हब' },
  { rank: 8, name: 'मैनपुरी', production: '7.6 लाख MT', highlight: 'पारंपरिक आलू उत्पादन क्षेत्र, स्थापित मंडी नेटवर्क' },
  { rank: 9, name: 'प्रयागराज', production: '7.3 लाख MT', highlight: 'पूर्वी UP के आलू उत्पादन क्षेत्र का प्रमुख केंद्र' },
  { rank: 10, name: 'बाराबंकी', production: '7.2 लाख MT', highlight: 'तेज़ी से बढ़ता खेती क्षेत्र, कोल्ड चेन पहुँच में सुधार' },
];

const varieties = [
  { name: 'कुफरी बहार', use: 'खाने के लिए', desc: 'UP में सबसे लोकप्रिय, मीठा स्वाद, शीघ्र परिपक्व' },
  { name: 'कुफरी पुखराज', use: 'खाने के लिए', desc: 'उच्च उपज, शीघ्र बल्किंग, ताज़ा बाज़ार और निर्यात' },
  { name: 'कुफरी चिप्सोना 1-5', use: 'प्रसंस्करण', desc: 'उच्च शुष्क पदार्थ, अनुबंध खेती में उपयोग' },
  { name: 'कुफरी मोहन', use: 'खाने के लिए', desc: 'अच्छी भंडारण गुणवत्ता' },
  { name: 'कुफरी सूर्या', use: 'खाने के लिए', desc: 'गर्मी-सहनशील, देर से बुवाई के लिए उपयुक्त' },
  { name: 'कुफरी आनंद', use: 'खाने के लिए', desc: 'मध्यम परिपक्व, अच्छी उपज' },
  { name: 'कुफरी बादशाह', use: 'खाने के लिए', desc: 'उच्च उपज, आकर्षक कंद आकार' },
  { name: 'संतान', use: 'प्रसंस्करण', desc: 'फ्रेंच फ्राइज़ के लिए आयातित किस्म, अनुबंध खेती' },
];

const challenges = [
  { icon: '🌡', title: 'जलवायु परिवर्तन', desc: 'अक्टूबर में बढ़ता तापमान, अंकुरण और उपज प्रभावित। 2024-25 में ~35°C से प्रसंस्करण किस्मों में गिरावट।' },
  { icon: '❄', title: 'अपर्याप्त कोल्ड स्टोरेज', desc: 'फसलोत्तर नुकसान। किसान कटाई के समय कम भाव पर बेचने को मजबूर।' },
  { icon: '💰', title: 'बाज़ार मूल्य अस्थिरता', desc: 'बम्पर फसल में भाव ₹200-400/क्विंटल तक गिरता है (उत्पादन लागत ₹500-600)।' },
  { icon: '🏭', title: 'सीमित प्रसंस्करण', desc: '90%+ आलू ताज़ा उपभोग में जाता है। मूल्य-वर्धन (चिप्स, फ्लेक्स, स्टार्च) का अवसर बड़ा।' },
  { icon: '🐞', title: 'कीट और रोग', desc: 'लेट ब्लाइट (Phytophthora), बैक्टीरियल विल्ट, ट्यूबर मॉथ — फसल को भारी नुकसान।' },
  { icon: '🌱', title: 'कम बीज प्रतिस्थापन दर', desc: 'किसान कई सीजन तक अपना बीज उपयोग करते हैं। वायरस संचय से उपज में धीरे-धीरे गिरावट।' },
];

const faqs = [
  { q: 'UP में सबसे ज़्यादा आलू कौन सा ज़िला उगाता है', a: 'आगरा ज़िला UP का सबसे बड़ा आलू उत्पादक है — ~28 लाख MT वार्षिक उत्पादन, ~71,000 हेक्टेयर क्षेत्र। इसके बाद फ़िरोज़ाबाद (20.8 लाख MT) और कन्नौज (20.4 लाख MT) आते हैं।' },
  { q: 'UP सालाना कितना आलू उत्पादन करता है', a: '2023-24 में UP ने 19.17 मिलियन टन आलू का उत्पादन किया। 2022-23 में यह 20.13 MT था — UP का अब तक का सर्वोच्च। ~7 लाख हेक्टेयर क्षेत्र में खेती होती है।' },
  { q: 'भारत के कुल आलू उत्पादन में UP का कितना हिस्सा है', a: 'लगभग 33-34%। 2023-24 में भारत के कुल 57.05 MT में UP का हिस्सा 19.17 MT (33.61%) था। UP + पश्चिम बंगाल + बिहार मिलकर ~78% उत्पादन करते हैं।' },
  { q: 'UP में कौन सी आलू किस्में सबसे लोकप्रिय हैं', a: 'कुफरी बहार (सबसे लोकप्रिय — मीठा स्वाद), कुफरी पुखराज (उच्च उपज), कुफरी चिप्सोना 1-5 (प्रसंस्करण), कुफरी मोहन, कुफरी सूर्या (गर्मी-सहनशील), और संतान (फ्रेंच फ्राइज़)।' },
  { q: 'UP में आलू की बुवाई और कटाई कब होती है', a: 'रबी सीजन: बुवाई अक्टूबर-नवंबर, कटाई फरवरी-मार्च। 90-110 दिन का फसल चक्र। अक्टूबर में उच्च तापमान अंकुरण को प्रभावित कर सकता है।' },
  { q: 'आगरा-कानपुर आलू पट्टी क्या है', a: 'भारत का सबसे गहन आलू उत्पादन क्षेत्र — आगरा से कानपुर तक ~6.94 लाख हेक्टेयर, 29 टन/हे. औसत उपज। आगरा, फ़िरोज़ाबाद, कन्नौज, हाथरस, फर्रुखाबाद, मैनपुरी शामिल।' },
  { q: 'UP को हर साल कितने बीज आलू चाहिए', a: '~7 लाख MT प्रतिवर्ष (40+ क्विंटल/हेक्टेयर)। बीज प्रतिस्थापन दर अन्य राज्यों से कम है। कुशीनगर और हापुड़ में एरोपोनिक बीज केंद्र स्थापित हो रहे हैं।' },
  { q: 'UP में आलू किसानों की मुख्य चुनौतियाँ क्या हैं', a: 'जलवायु परिवर्तन (अक्टूबर में बढ़ता तापमान), बाज़ार मूल्य अस्थिरता (बम्पर फसल में ₹200-400/क्विंटल), अपर्याप्त कोल्ड स्टोरेज, सीमित प्रसंस्करण (90%+ ताज़ा उपभोग), और कम बीज प्रतिस्थापन दर।' },
];

export default function StatePage({ params }: { params: { slug: string } }) {
  const state = states[params.slug];
  if (!state) notFound();

  const allPosts = getAllPosts();
  const statePosts = allPosts.filter(
    (p) => p.title.includes(state.name) || p.title.includes(state.nameEn) ||
           p.tags.some((t) => t.includes(state.name) || t.includes(state.nameEn)) ||
           ['आगरा', 'फर्रुखाबाद', 'कानपुर', 'लखनऊ'].some((d) => p.title.includes(d))
  ).slice(0, 6);

  const allListings = getAllListings();
  const stateListings = allListings.filter((l) => l.stateEn === state.nameEn || l.state === state.name);
  const listingsByCategory: Record<string, typeof stateListings> = {};
  for (const l of stateListings) {
    if (!listingsByCategory[l.category]) listingsByCategory[l.category] = [];
    listingsByCategory[l.category].push(l);
  }

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'होम', url: 'https://www.indianpotato.in' },
        { name: state.name, url: `https://www.indianpotato.in/state/${state.slug}` },
      ]} />
      <Navbar />
      <main className="pt-[76px]">

        {/* ─── HERO ─── */}
        <section style={{ background: '#fff', padding: 'clamp(60px, 10vw, 100px) 20px clamp(48px, 8vw, 80px)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 50, padding: '4px 14px', marginBottom: 24, fontSize: 12, color: '#dc2626', fontWeight: 600, letterSpacing: '0.05em' }}>
              राज्य प्रोफ़ाइल
            </span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16, maxWidth: 700 }}>
              उत्तर प्रदेश — भारत का #1 आलू उत्पादक राज्य
            </h1>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, maxWidth: 600, marginBottom: 32 }}>
              भारत के कुल आलू उत्पादन का एक-तिहाई। शीर्ष 10 ज़िले, प्रमुख किस्में, बीज उत्पादन, चुनौतियाँ और भविष्य का दृष्टिकोण।
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              {[
                { value: '19.17M टन', label: 'UP उत्पादन 2023-24' },
                { value: '33.6%', label: 'भारत के कुल का हिस्सा' },
                { value: '7 लाख हे.', label: 'खेती क्षेत्र' },
                { value: '29 टन/हे.', label: 'औसत उपज' },
              ].map((s, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, padding: '16px 24px', minWidth: 140, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#dc2626', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 1: क्यों अग्रणी ─── */}
        <section style={{ padding: '64px 20px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="UP आलू उत्पादन में क्यों अग्रणी है" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, marginBottom: 32 }}>
              <p style={{ marginBottom: 16 }}>उत्तर प्रदेश भारत का सबसे बड़ा आलू उत्पादक राज्य है — देश के कुल उत्पादन का लगभग एक-तिहाई यहीं से आता है। 2023-24 में राज्य ने ~7 लाख हेक्टेयर में 19.17 मिलियन टन आलू का उत्पादन किया (APEDA डेटा)। सिंधु-गंगा मैदान में फैले इस विशाल क्षेत्र की अनुकूल कृषि-जलवायु परिस्थितियाँ इसे आलू के लिए आदर्श बनाती हैं।</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              {[
                { title: 'उपजाऊ जलोढ़ मिट्टी', desc: 'गंगा के मैदान में गहरी, अच्छी जल-निकासी वाली दोमट मिट्टी — आलू कंद विकास के लिए आदर्श' },
                { title: 'अनुकूल शीत ऋतु जलवायु', desc: 'रबी सीजन में 15-25°C दिन का तापमान, ठंडी रातें — कंद बनने के लिए आदर्श' },
                { title: 'अनुसंधान अवसंरचना', desc: 'ICAR-CPRI मोदीपुरम (मेरठ), अंतर्राष्ट्रीय आलू केंद्र (CIP) आगरा कार्यालय' },
                { title: 'अनुभवी कृषि समुदाय', desc: 'आगरा, फर्रुखाबाद, कन्नौज में पीढ़ियों से आलू खेती का गहरा अनुभव' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: राष्ट्रीय योगदान ─── */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="राष्ट्रीय उत्पादन में UP का योगदान" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>भारत का कुल आलू उत्पादन 2024-25 में 60.18 मिलियन टन (दूसरा अग्रिम अनुमान) रहा — विश्व में चीन के बाद दूसरा सबसे बड़ा उत्पादक।</p>
              <p style={{ marginBottom: 16 }}>2022-23 में UP ने अपना सर्वोच्च उत्पादन 20.13 MT दर्ज किया — राष्ट्रीय कुल 60.14 MT का 33.46%। 2023-24 में अक्टूबर के उच्च तापमान के कारण उत्पादन 19.17 MT (57.05 MT का 33.61%) पर आ गया।</p>
              <p style={{ marginBottom: 16 }}>UP + पश्चिम बंगाल + बिहार मिलकर भारत के ~68% खेती क्षेत्र और ~78% उत्पादन का योगदान करते हैं। UP से ~105 लाख MT विपणन योग्य अधिशेष दक्षिण और पूर्वोत्तर भारत को वितरित किया जाता है।</p>
            </div>
            {/* Key fact box */}
            <div style={{ background: '#fafafa', border: '1px solid #f0f0f0', borderRadius: 16, padding: '24px 28px', marginTop: 24 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>प्रमुख तथ्य</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>आगरा-कानपुर आलू पट्टी</div>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>भारत का सबसे गहन आलू उत्पादन क्षेत्र — 6.94 लाख हेक्टेयर, 29 टन/हे. औसत उपज। आगरा, फ़िरोज़ाबाद, कन्नौज, हाथरस, फर्रुखाबाद, मैनपुरी ज़िले शामिल।</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: शीर्ष 10 ज़िले ─── */}
        <section style={{ padding: '64px 20px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="शीर्ष 10 आलू उत्पादक ज़िले" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              {districts.map((d) => (
                <div key={d.rank} className="state-card" style={{ background: '#fff', borderRadius: 16, padding: '24px 24px 24px 20px', border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', gap: 16, alignItems: 'flex-start', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: d.rank <= 3 ? '#fef2f2' : '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: d.rank <= 3 ? '#dc2626' : '#9ca3af', flexShrink: 0, border: d.rank <= 3 ? '1px solid #fecaca' : '1px solid #e5e7eb' }}>
                    {d.rank}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>{d.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#dc2626', marginBottom: 6 }}>{d.production}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{d.highlight}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#9ca3af', marginTop: 20, textAlign: 'center' }}>स्रोत: राज्य सरकार और ICAR-CPRI डेटा; 2022-23 के अनुमानों पर आधारित</p>
          </div>
        </section>

        {/* ─── SECTION 4: आगरा ─── */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="आगरा — UP की आलू राजधानी" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>आगरा UP के कुल आलू उत्पादन का ~27% — लगभग 28 लाख MT — ~71,000 हेक्टेयर क्षेत्र से उत्पादित करता है। यह भारत का सबसे बड़ा आलू उत्पादक ज़िला है।</p>
              <p style={{ marginBottom: 16 }}>प्रमुख किस्म <strong>कुफरी बहार</strong> है — मिठास और बाज़ार माँग के कारण। अन्य: कुफरी मोहन, कुफरी पुखराज, कुफरी आनंद, कुफरी चिप्सोना 1-5। प्रमुख ब्लॉक: खंडौली, शम्साबाद, एत्मादपुर, फतेहाबाद, किरावली।</p>
              <p style={{ marginBottom: 16 }}>यमुना नहर सिंचाई और गहरी जलोढ़ मिट्टी आगरा की ताकत हैं। ज़िले को प्रतिवर्ष ~7 लाख MT बीज आलू की आवश्यकता है।</p>
              <p>अंतर्राष्ट्रीय आलू अनुसंधान केंद्र (CIP) के आगरा कार्यालय को 2019 में मंजूरी मिली, लेकिन प्रगति धीमी रही है।</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: किस्में ─── */}
        <section style={{ padding: '64px 20px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="खेती का मौसम और प्रमुख किस्में" link="/kisme" linkText="सभी किस्में →" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8, marginBottom: 24 }}>
              <p style={{ marginBottom: 16 }}>रबी सीजन: बुवाई अक्टूबर-नवंबर, कटाई फरवरी-मार्च। 90-110 दिन का फसल चक्र। 2024-25 में अक्टूबर में ~35°C तापमान से अंकुरण प्रभावित हुआ — विशेषकर प्रसंस्करण किस्म संतान में गिरावट आई।</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {varieties.map((v, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 12, padding: '16px 20px', border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#1f2937' }}>{v.name}</span>
                    <span style={{ fontSize: 13, color: '#6b7280', marginLeft: 8 }}>— {v.desc}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 50, background: v.use === 'प्रसंस्करण' ? '#fff7ed' : '#f0fdf4', color: v.use === 'प्रसंस्करण' ? '#c2410c' : '#166534' }}>{v.use}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: बीज ─── */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="बीज आलू — आवश्यकता और उत्पादन" link="/directory/seed-suppliers" linkText="बीज आपूर्तिकर्ता →" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>UP को प्रतिवर्ष ~7 लाख MT बीज आलू की आवश्यकता है (40+ क्विंटल/हेक्टेयर)। हालाँकि, बीज प्रतिस्थापन दर (SRR) अन्य राज्यों से कम है — कई किसान कई सीजन तक अपना बीज उपयोग करते हैं, जिससे वायरस संचय होता है और उपज में धीरे-धीरे गिरावट आती है।</p>
              <p style={{ marginBottom: 16 }}><strong>एरोपोनिक बीज केंद्र:</strong> कुशीनगर और हापुड़ में मिट्टी-रहित खेती से बीज उत्पादन शुरू हुआ है — पोषक-समृद्ध धुंध में जड़ें उगती हैं, जिससे वायरस-मुक्त मिनी-ट्यूबर मिलते हैं। यह तकनीक UP की बीज गुणवत्ता समस्या का समाधान हो सकती है।</p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 7: चुनौतियाँ ─── */}
        <section style={{ padding: '64px 20px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="चुनौतियाँ" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              {challenges.map((c, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 8: भविष्य ─── */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="भविष्य का दृष्टिकोण" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}><strong>एरोपोनिक बीज तकनीक</strong> — कुशीनगर और हापुड़ केंद्रों से उच्च गुणवत्ता, वायरस-मुक्त बीज उत्पादन। TPS (True Potato Seed), टिश्यू कल्चर, और एपिकल रूटेड कटिंग जैसी उन्नत तकनीकों का विस्तार।</p>
              <p style={{ marginBottom: 16 }}><strong>प्रसंस्करण क्षेत्र विस्तार</strong> — UP में ₹50,000 करोड़ निवेश प्रस्तावित, 328 लेटर ऑफ कम्फर्ट (LOC) जारी। चिप्सोना और संतान किस्मों की बढ़ती माँग के साथ अनुबंध खेती में वृद्धि।</p>
              <p><strong>CIP आगरा कार्यालय</strong> — किस्म विकास, जलवायु अनुकूलन अनुसंधान, और दक्षिण एशिया के लिए क्षेत्रीय समन्वय केंद्र के रूप में विकसित होने की सम्भावना।</p>
            </div>
          </div>
        </section>

        {/* ─── संबंधित समाचार ─── */}
        {statePosts.length > 0 && (
          <section style={{ padding: '64px 20px', background: '#fafafa' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <SH title="संबंधित समाचार" link="/samachar" linkText="सभी समाचार →" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
                {statePosts.map((post) => (
                  <Link key={post.slug} href={'/samachar/' + post.slug} className="state-card" style={{ display: 'block', background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', textDecoration: 'none', color: 'inherit', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category_hindi}</span>
                    <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 8, marginBottom: 8 }}>{post.title}</h3>
                    <div style={{ fontSize: 13, color: '#9ca3af' }}>{formatDate(post.date)}</div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── उद्योग डायरेक्टरी ─── */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="उद्योग डायरेक्टरी" link="/directory" linkText="पूरी डायरेक्टरी →" />
            {stateListings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {Object.entries(listingsByCategory).map(([catSlug, listings]) => {
                  const catConfig = DIRECTORY_CATEGORIES.find((c) => c.slug === catSlug);
                  return (
                    <div key={catSlug}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>{catConfig?.name || catSlug} ({listings.length})</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="state-grid">
                        {listings.slice(0, 4).map((l) => (
                          <Link key={l.slug} href={`/directory/${l.category}/${l.slug}`} className="state-card" style={{ display: 'block', background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', textDecoration: 'none', color: 'inherit', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>{l.name}</div>
                            <div style={{ fontSize: 13, color: '#9ca3af' }}>{l.district}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ background: '#fafafa', borderRadius: 12, padding: '32px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 16 }}>जल्द ही UP की कंपनियाँ यहाँ दिखेंगी</p>
                <Link href="/directory" style={{ fontSize: 14, fontWeight: 500, color: '#dc2626', textDecoration: 'none' }}>डायरेक्टरी देखें →</Link>
              </div>
            )}
          </div>
        </section>

        {/* ─── योजनाएँ ─── */}
        <section style={{ padding: '64px 20px', background: '#fafafa' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="सरकारी योजनाएँ" link="/yojnaye" linkText="सभी योजनाएँ →" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              <Link href="/samachar/up-aloo-kheti-yojana" className="state-card" style={{ display: 'block', background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', textDecoration: 'none', color: 'inherit', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>राज्य योजना</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 8 }}>UP आलू खेती योजनाएँ — 50% उपकरण अनुदान</h3>
                <span style={{ display: 'inline-block', marginTop: 12, fontSize: 13, fontWeight: 500, color: '#dc2626' }}>विवरण पढ़ें →</span>
              </Link>
              <Link href="/yojnaye" className="state-card" style={{ display: 'block', background: '#fff', borderRadius: 16, padding: 24, border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', textDecoration: 'none', color: 'inherit', transition: 'transform 0.25s ease, box-shadow 0.25s ease' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>केंद्र सरकार</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 8 }}>PM किसान, KCC, PMFME, NABARD और अन्य</h3>
                <span style={{ display: 'inline-block', marginTop: 12, fontSize: 13, fontWeight: 500, color: '#dc2626' }}>सभी योजनाएँ देखें →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: '64px 20px', background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="अक्सर पूछे जाने वाले प्रश्न" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {faqs.map((f, i) => (
                <details key={i} style={{ background: '#fff', border: '1px solid #f0f0f0', borderRadius: 12, overflow: 'hidden' }}>
                  <summary style={{ padding: '16px 20px', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#1f2937', listStyle: 'none' }}>
                    {f.q}
                  </summary>
                  <div style={{ padding: '0 20px 16px', fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: '64px 20px', background: '#111827' }}>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 600, color: '#fff', marginBottom: 12 }}>
              UP के आलू उद्योग से जुड़ें
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
              5,000+ किसान और व्यापारी WhatsApp पर जुड़े हैं
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" className="wa-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 50, background: '#fff', color: '#111827', textDecoration: 'none', fontWeight: 600, fontSize: 15, transition: 'background 0.25s' }}>
                WhatsApp ग्रुप जॉइन करें
              </a>
              <a href="mailto:info@indpotato.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 32px', borderRadius: 50, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>
                ईमेल करें
              </a>
            </div>
          </div>
          <style>{`.wa-cta-btn:hover { background: #f3f4f6 !important; }`}</style>
        </section>

      </main>
      <Footer />

      <style>{`
        .state-card:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.08) !important; }
        @media (max-width: 768px) { .state-grid { grid-template-columns: 1fr !important; } }
        details summary::-webkit-details-marker { display: none; }
        details summary::before { content: '+'; display: inline-block; width: 20px; font-weight: 400; color: #9ca3af; margin-right: 8px; }
        details[open] summary::before { content: '−'; }
      `}</style>
    </>
  );
}
