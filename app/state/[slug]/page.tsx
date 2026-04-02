import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Sections';
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { getAllPosts } from '@/lib/blog';
import { getAllListings, DIRECTORY_CATEGORIES } from '@/lib/directory';

/* ─── State Config ─── */
const states: Record<string, { slug: string; name: string; nameEn: string }> = {
  'uttar-pradesh': { slug: 'uttar-pradesh', name: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh' },
};

export async function generateStaticParams() { return Object.keys(states).map((slug) => ({ slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const s = states[params.slug];
  if (!s) return { title: 'राज्य नहीं मिला' };
  return {
    title: `${s.name} आलू उद्योग — मंडी भाव, किस्में, कोल्ड स्टोरेज | Indian Potato`,
    description: `${s.name} में आलू उत्पादन, ताज़ा मंडी भाव, शीर्ष 10 ज़िले, कोल्ड स्टोरेज, सरकारी योजनाएँ और उद्योग डायरेक्टरी। भारत का #1 आलू उत्पादक राज्य।`,
    alternates: { canonical: `https://www.indianpotato.in/state/${s.slug}` },
    openGraph: { title: `${s.name} — भारत का #1 आलू उत्पादक राज्य`, description: `${s.name} में आलू उत्पादन 19.17 मिलियन टन, शीर्ष 10 ज़िले, प्रमुख किस्में, बीज उत्पादन और उद्योग दृष्टिकोण।`, url: `https://www.indianpotato.in/state/${s.slug}`, type: 'website' },
  };
}

/* ─── Section Header ─── */
function SH({ title, sub, link, linkText }: { title: string; sub?: string; link?: string; linkText?: string }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#111827', margin: 0 }}>{title}</h2>
        {link && linkText && <Link href={link} style={{ fontSize: 14, fontWeight: 500, color: '#dc2626', textDecoration: 'none' }}>{linkText}</Link>}
      </div>
      <div style={{ width: 40, height: 3, background: '#dc2626', borderRadius: 2, marginTop: 12 }} />
      {sub && <p style={{ fontSize: 15, color: '#6b7280', marginTop: 12, lineHeight: 1.6 }}>{sub}</p>}
    </div>
  );
}

/* ─── Card wrapper style ─── */
const card = { background: '#fff' as const, borderRadius: 16, border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'transform 0.25s ease, box-shadow 0.25s ease' };

/* ─── Data ─── */
const districts = [
  { rank: 1, name: 'आगरा', prod: '28.0 लाख MT', hl: '71,000 हेक्टेयर, कुफरी बहार प्रमुख किस्म' },
  { rank: 2, name: 'फ़िरोज़ाबाद', prod: '20.8 लाख MT', hl: 'भारत के आलू प्रसंस्करण उद्योग का प्रमुख आपूर्तिकर्ता' },
  { rank: 3, name: 'कन्नौज', prod: '20.4 लाख MT', hl: 'मजबूत कोल्ड स्टोरेज अवसंरचना, साल भर आपूर्ति' },
  { rank: 4, name: 'हाथरस', prod: '19.1 लाख MT', hl: 'आगरा-कानपुर आलू पट्टी का रणनीतिक हिस्सा' },
  { rank: 5, name: 'फर्रुखाबाद', prod: '15.9 लाख MT', hl: 'गुणवत्ता बीज आलू उत्पादन और वितरण पर ध्यान' },
  { rank: 6, name: 'अलीगढ़', prod: '11.0 लाख MT', hl: 'चिप्सोना जैसी प्रसंस्करण किस्मों को अपनाना बढ़ा' },
  { rank: 7, name: 'बदायूँ', prod: '8.5 लाख MT', hl: 'मध्य UP में उभरता हुआ आलू हब' },
  { rank: 8, name: 'मैनपुरी', prod: '7.6 लाख MT', hl: 'पारंपरिक आलू उत्पादन क्षेत्र, स्थापित मंडी नेटवर्क' },
  { rank: 9, name: 'प्रयागराज', prod: '7.3 लाख MT', hl: 'पूर्वी UP के आलू उत्पादन क्षेत्र का प्रमुख केंद्र' },
  { rank: 10, name: 'बाराबंकी', prod: '7.2 लाख MT', hl: 'तेज़ी से बढ़ता खेती क्षेत्र, कोल्ड चेन पहुँच में सुधार' },
];
const varieties = [
  { name: 'कुफरी बहार', use: 'खाने के लिए' as const, desc: 'UP में सबसे लोकप्रिय, मीठा स्वाद, शीघ्र परिपक्व' },
  { name: 'कुफरी पुखराज', use: 'खाने के लिए' as const, desc: 'उच्च उपज, शीघ्र बल्किंग, ताज़ा बाज़ार और निर्यात' },
  { name: 'कुफरी चिप्सोना 1-5', use: 'प्रसंस्करण' as const, desc: 'उच्च शुष्क पदार्थ, अनुबंध खेती में उपयोग' },
  { name: 'कुफरी मोहन', use: 'खाने के लिए' as const, desc: 'अच्छी भंडारण गुणवत्ता' },
  { name: 'कुफरी सूर्या', use: 'खाने के लिए' as const, desc: 'गर्मी-सहनशील, देर से बुवाई के लिए उपयुक्त' },
  { name: 'कुफरी आनंद', use: 'खाने के लिए' as const, desc: 'मध्यम परिपक्व, अच्छी उपज' },
  { name: 'कुफरी बादशाह', use: 'खाने के लिए' as const, desc: 'उच्च उपज, आकर्षक कंद आकार' },
  { name: 'संतान', use: 'प्रसंस्करण' as const, desc: 'फ्रेंच फ्राइज़ के लिए आयातित किस्म, अनुबंध खेती' },
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

const SP = 80; // section padding

export default function StatePage({ params }: { params: { slug: string } }) {
  const state = states[params.slug];
  if (!state) notFound();

  const allPosts = getAllPosts();
  const statePosts = allPosts.filter(
    (p) => p.title.includes(state.name) || p.title.includes(state.nameEn) || p.tags.some((t) => t.includes(state.name) || t.includes(state.nameEn)) || ['आगरा', 'फर्रुखाबाद', 'कानपुर', 'लखनऊ'].some((d) => p.title.includes(d))
  ).slice(0, 6);

  const allListings = getAllListings();
  const stateListings = allListings.filter((l) => l.stateEn === state.nameEn || l.state === state.name);
  const listingsByCategory: Record<string, typeof stateListings> = {};
  for (const l of stateListings) { if (!listingsByCategory[l.category]) listingsByCategory[l.category] = []; listingsByCategory[l.category].push(l); }

  const fmtDate = (d: string) => { try { return new Date(d).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' }); } catch { return d; } };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'होम', url: 'https://www.indianpotato.in' }, { name: state.name, url: `https://www.indianpotato.in/state/${state.slug}` }]} />
      <Navbar />
      <main className="pt-[76px]">

        {/* ─── HERO ─── */}
        <section style={{ background: '#fff', padding: 'clamp(60px, 10vw, 100px) 20px clamp(48px, 8vw, 80px)', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <span style={{ display: 'inline-block', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 50, padding: '4px 14px', marginBottom: 24, fontSize: 12, color: '#dc2626', fontWeight: 600, letterSpacing: '0.05em' }}>राज्य प्रोफ़ाइल</span>
            <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 700, color: '#111827', lineHeight: 1.2, marginBottom: 16, maxWidth: 700 }}>उत्तर प्रदेश — भारत का #1 आलू उत्पादक राज्य</h1>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.6, maxWidth: 600, marginBottom: 36 }}>भारत के कुल आलू उत्पादन का एक-तिहाई। शीर्ष 10 ज़िले, प्रमुख किस्में, बीज उत्पादन, चुनौतियाँ और भविष्य का दृष्टिकोण।</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
              {[{ v: '19.17M टन', l: 'UP उत्पादन 2023-24' }, { v: '33.6%', l: 'भारत के कुल का हिस्सा' }, { v: '7 लाख हे.', l: 'खेती क्षेत्र' }, { v: '29 टन/हे.', l: 'औसत उपज' }].map((s, i) => (
                <div key={i} className="state-card" style={{ ...card, padding: '20px 28px', minWidth: 150, cursor: 'default' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#dc2626', marginBottom: 4, letterSpacing: '-0.02em' }}>{s.v}</div>
                  <div style={{ fontSize: 13, color: '#9ca3af' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── WHY UP LEADS ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="UP आलू उत्पादन में क्यों अग्रणी है" sub="2023-24 में ~7 लाख हेक्टेयर में 19.17 मिलियन टन उत्पादन (APEDA डेटा)। सिंधु-गंगा मैदान की अनुकूल कृषि-जलवायु परिस्थितियाँ।" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              {[
                { icon: '🌱', title: 'उपजाऊ जलोढ़ मिट्टी', desc: 'गंगा के मैदान में गहरी, अच्छी जल-निकासी वाली दोमट मिट्टी — आलू कंद विकास के लिए आदर्श' },
                { icon: '🌡', title: 'अनुकूल शीत ऋतु जलवायु', desc: 'रबी सीजन में 15-25°C दिन का तापमान, ठंडी रातें — कंद बनने के लिए आदर्श' },
                { icon: '📚', title: 'अनुसंधान अवसंरचना', desc: 'ICAR-CPRI मोदीपुरम (मेरठ), अंतर्राष्ट्रीय आलू केंद्र (CIP) आगरा कार्यालय' },
                { icon: '👥', title: 'अनुभवी कृषि समुदाय', desc: 'आगरा, फर्रुखाबाद, कन्नौज में पीढ़ियों से आलू खेती का गहरा अनुभव' },
              ].map((c, i) => (
                <div key={i} className="state-card" style={{ ...card, padding: 28 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NATIONAL CONTRIBUTION ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="राष्ट्रीय उत्पादन में UP का योगदान" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>भारत का कुल आलू उत्पादन 2024-25 में 60.18 मिलियन टन (दूसरा अग्रिम अनुमान) रहा — विश्व में चीन के बाद दूसरा सबसे बड़ा उत्पादक।</p>
              <p style={{ marginBottom: 16 }}>2022-23 में UP ने अपना सर्वोच्च उत्पादन 20.13 MT दर्ज किया — राष्ट्रीय कुल 60.14 MT का 33.46%। 2023-24 में अक्टूबर के उच्च तापमान के कारण उत्पादन 19.17 MT (57.05 MT का 33.61%) पर आ गया।</p>
              <p style={{ marginBottom: 0 }}>UP + पश्चिम बंगाल + बिहार मिलकर भारत के ~68% खेती क्षेत्र और ~78% उत्पादन का योगदान करते हैं। UP से ~105 लाख MT विपणन योग्य अधिशेष दक्षिण और पूर्वोत्तर भारत को वितरित किया जाता है।</p>
            </div>
            <div style={{ ...card, padding: '24px 28px', marginTop: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>प्रमुख तथ्य</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#111827', marginBottom: 8 }}>आगरा-कानपुर आलू पट्टी</div>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>भारत का सबसे गहन आलू उत्पादन क्षेत्र — 6.94 लाख हेक्टेयर, 29 टन/हे. औसत उपज। आगरा, फ़िरोज़ाबाद, कन्नौज, हाथरस, फर्रुखाबाद, मैनपुरी ज़िले शामिल।</p>
            </div>
          </div>
        </section>

        {/* ─── TOP 10 DISTRICTS ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="शीर्ष 10 आलू उत्पादक ज़िले" sub="राज्य सरकार और ICAR-CPRI डेटा; 2022-23 के अनुमानों पर आधारित" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              {districts.map((d) => (
                <div key={d.rank} className="state-card" style={{ ...card, padding: 28, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: d.rank <= 3 ? '#dc2626' : '#d1d5db', lineHeight: 1, minWidth: 36, flexShrink: 0 }}>
                    {String(d.rank).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: '#1f2937', marginBottom: 6 }}>{d.name}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#dc2626', marginBottom: 8 }}>{d.prod}</div>
                    <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{d.hl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── AGRA ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="आगरा — UP की आलू राजधानी" />
            <div style={{ ...card, padding: 32, background: '#fffbfb', borderColor: '#fecaca' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
                {[{ v: '28 लाख MT', l: 'वार्षिक उत्पादन' }, { v: '71,000 हे.', l: 'खेती क्षेत्र' }, { v: '~27%', l: 'UP उत्पादन का हिस्सा' }, { v: '~7 लाख MT', l: 'बीज आवश्यकता/वर्ष' }].map((s, i) => (
                  <div key={i} style={{ flex: 1, minWidth: 120, padding: '12px 16px', background: '#fff', borderRadius: 12, border: '1px solid #fef2f2' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#dc2626' }}>{s.v}</div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 12 }}>प्रमुख किस्म <strong>कुफरी बहार</strong> — मिठास और बाज़ार माँग। अन्य: कुफरी मोहन, कुफरी पुखराज, कुफरी आनंद, कुफरी चिप्सोना 1-5।</p>
                <p style={{ marginBottom: 12 }}>प्रमुख ब्लॉक: खंडौली, शम्साबाद, एत्मादपुर, फतेहाबाद, किरावली। यमुना नहर सिंचाई और गहरी जलोढ़ मिट्टी आगरा की ताकत।</p>
                <p style={{ margin: 0 }}>अंतर्राष्ट्रीय आलू अनुसंधान केंद्र (CIP) आगरा कार्यालय — 2019 में मंजूरी, प्रगति धीमी।</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── VARIETIES ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="खेती का मौसम और प्रमुख किस्में" sub="रबी सीजन: बुवाई अक्टूबर-नवंबर, कटाई फरवरी-मार्च। 90-110 दिन फसल चक्र।" link="/kisme" linkText="सभी किस्में →" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {varieties.map((v, i) => (
                <div key={i} className="state-card" style={{ ...card, padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: '#1f2937' }}>{v.name}</span>
                    <span style={{ fontSize: 14, color: '#6b7280', marginLeft: 10 }}>— {v.desc}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 50, background: v.use === 'प्रसंस्करण' ? '#fff7ed' : '#f0fdf4', color: v.use === 'प्रसंस्करण' ? '#c2410c' : '#166534' }}>{v.use}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SEED ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="बीज आलू — आवश्यकता और उत्पादन" link="/directory/seed-suppliers" linkText="बीज आपूर्तिकर्ता →" />
            <div style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.8 }}>
              <p style={{ marginBottom: 16 }}>UP को प्रतिवर्ष ~7 लाख MT बीज आलू की आवश्यकता है (40+ क्विंटल/हेक्टेयर)। बीज प्रतिस्थापन दर (SRR) अन्य राज्यों से कम — किसान कई सीजन तक अपना बीज उपयोग करते हैं, जिससे वायरस संचय और उपज में गिरावट।</p>
              <p><strong>एरोपोनिक बीज केंद्र:</strong> कुशीनगर और हापुड़ में मिट्टी-रहित खेती — पोषक-समृद्ध धुंध में जड़ें उगती हैं, वायरस-मुक्त मिनी-ट्यूबर मिलते हैं।</p>
            </div>
          </div>
        </section>

        {/* ─── CHALLENGES ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="चुनौतियाँ" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              {challenges.map((c, i) => (
                <div key={i} className="state-card" style={{ ...card, padding: 28 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#fef2f2', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 16 }}>{c.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 8 }}>{c.title}</h3>
                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FUTURE ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="भविष्य का दृष्टिकोण" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { title: 'एरोपोनिक बीज तकनीक', desc: 'कुशीनगर और हापुड़ केंद्रों से उच्च गुणवत्ता, वायरस-मुक्त बीज। TPS, टिश्यू कल्चर, एपिकल रूटेड कटिंग का विस्तार।' },
                { title: 'प्रसंस्करण क्षेत्र विस्तार', desc: 'UP में ₹50,000 करोड़ निवेश प्रस्तावित, 328 LOC जारी। चिप्सोना और संतान की बढ़ती माँग के साथ अनुबंध खेती में वृद्धि।' },
                { title: 'CIP आगरा कार्यालय', desc: 'किस्म विकास, जलवायु अनुकूलन अनुसंधान, दक्षिण एशिया के लिए क्षेत्रीय समन्वय केंद्र।' },
              ].map((f, i) => (
                <div key={i} style={{ ...card, padding: 24, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#dc2626', marginTop: 8, flexShrink: 0 }} />
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', marginBottom: 6 }}>{f.title}</h3>
                    <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEWS ─── */}
        {statePosts.length > 0 && (
          <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <SH title="संबंधित समाचार" link="/samachar" linkText="सभी समाचार →" />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
                {statePosts.map((post) => (
                  <Link key={post.slug} href={'/samachar/' + post.slug} className="state-card" style={{ ...card, padding: 0, overflow: 'hidden', display: 'block', textDecoration: 'none', color: 'inherit' }}>
                    <img src={post.image} alt={post.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} loading="lazy" />
                    <div style={{ padding: '20px 24px' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{post.category_hindi}</span>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 8, marginBottom: 8 }}>{post.title}</h3>
                      <div style={{ fontSize: 13, color: '#9ca3af' }}>{fmtDate(post.date)}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── DIRECTORY ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="उद्योग डायरेक्टरी" link="/directory" linkText="पूरी डायरेक्टरी →" />
            {stateListings.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {Object.entries(listingsByCategory).map(([catSlug, listings]) => {
                  const cat = DIRECTORY_CATEGORIES.find((c) => c.slug === catSlug);
                  return (
                    <div key={catSlug}>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#6b7280', marginBottom: 12 }}>{cat?.name || catSlug} ({listings.length})</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }} className="state-grid">
                        {listings.slice(0, 4).map((l) => (
                          <Link key={l.slug} href={`/directory/${l.category}/${l.slug}`} className="state-card" style={{ ...card, padding: 20, display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ fontSize: 15, fontWeight: 600, color: '#1f2937', marginBottom: 4 }}>{l.name}</div>
                            <div style={{ fontSize: 13, color: '#9ca3af' }}>{l.district}</div>
                            <span style={{ display: 'inline-block', marginTop: 10, fontSize: 13, fontWeight: 500, color: '#dc2626' }}>देखें →</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ ...card, padding: '40px 24px', textAlign: 'center' }}>
                <p style={{ fontSize: 15, color: '#9ca3af', marginBottom: 16 }}>जल्द ही UP की कंपनियाँ यहाँ दिखेंगी</p>
                <Link href="/directory" style={{ fontSize: 14, fontWeight: 500, color: '#dc2626', textDecoration: 'none' }}>डायरेक्टरी देखें →</Link>
              </div>
            )}
          </div>
        </section>

        {/* ─── SCHEMES ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="सरकारी योजनाएँ" link="/yojnaye" linkText="सभी योजनाएँ →" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }} className="state-grid">
              <Link href="/samachar/up-aloo-kheti-yojana" className="state-card" style={{ ...card, padding: 28, display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>राज्य योजना</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 10 }}>UP आलू खेती योजनाएँ — 50% उपकरण अनुदान</h3>
                <span style={{ display: 'inline-block', marginTop: 14, fontSize: 14, fontWeight: 500, color: '#dc2626' }}>विवरण पढ़ें →</span>
              </Link>
              <Link href="/yojnaye" className="state-card" style={{ ...card, padding: 28, display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>केंद्र सरकार</span>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1f2937', lineHeight: 1.4, marginTop: 10 }}>PM किसान, KCC, PMFME, NABARD और अन्य</h3>
                <span style={{ display: 'inline-block', marginTop: 14, fontSize: 14, fontWeight: 500, color: '#dc2626' }}>सभी योजनाएँ देखें →</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ padding: `${SP}px 20px`, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <SH title="अक्सर पूछे जाने वाले प्रश्न" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {faqs.map((f, i) => (
                <details key={i} style={{ ...card, overflow: 'hidden', borderRadius: 12 }}>
                  <summary style={{ padding: '18px 24px', cursor: 'pointer', fontSize: 15, fontWeight: 600, color: '#1f2937', listStyle: 'none' }}>{f.q}</summary>
                  <div style={{ padding: '0 24px 18px', fontSize: 14, color: '#6b7280', lineHeight: 1.7 }}>{f.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section style={{ padding: '80px 20px', background: '#111827' }}>
          <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.6rem)', fontWeight: 600, color: '#fff', marginBottom: 12 }}>UP के आलू उद्योग से जुड़ें</h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>5,000+ किसान और व्यापारी WhatsApp पर जुड़े हैं</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://spuds.me/kisan" target="_blank" rel="noopener noreferrer" className="wa-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', borderRadius: 50, background: '#fff', color: '#111827', textDecoration: 'none', fontWeight: 600, fontSize: 15, transition: 'background 0.25s' }}>WhatsApp ग्रुप जॉइन करें</a>
              <a href="mailto:info@indpotato.com" style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 32px', borderRadius: 50, background: 'transparent', border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>ईमेल करें</a>
            </div>
          </div>
          <style>{`.wa-cta-btn:hover { background: #f3f4f6 !important; }`}</style>
        </section>

      </main>
      <Footer />
      <style>{`
        .state-card:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.08) !important; }
        @media (max-width: 768px) { .state-grid { grid-template-columns: 1fr !important; } }
        details summary::-webkit-details-marker { display: none; }
        details summary::before { content: '+'; display: inline-block; width: 20px; font-weight: 400; color: #9ca3af; margin-right: 8px; }
        details[open] summary::before { content: '−'; }
      `}</style>
    </>
  );
}
