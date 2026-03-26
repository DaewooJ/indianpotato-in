'use client';

import Link from 'next/link';

/* ─── Government Schemes ─── */
const schemes = [
  { icon: '🌾', name: 'PM किसान सम्मान निधि', ministry: 'कृषि एवं किसान कल्याण मंत्रालय', benefit: '₹6,000 प्रति वर्ष', desc: 'तीन किस्तों में सीधे बैंक खाते में — सभी किसान परिवारों के लिए', status: 'सक्रिय' },
  { icon: '❄️', name: 'कोल्ड स्टोरेज सब्सिडी योजना', ministry: 'खाद्य प्रसंस्करण उद्योग मंत्रालय', benefit: '35-50% सब्सिडी', desc: 'नए कोल्ड स्टोरेज निर्माण पर सरकारी अनुदान — PMKSY के तहत', status: 'सक्रिय' },
  { icon: '🧬', name: 'लेडी रोसेटा विस्तार योजना', ministry: 'बिहार कृषि विभाग', benefit: 'बीज पर अनुदान', desc: 'प्रसंस्करण गुणवत्ता वाली किस्म के लिए किसानों को विशेष सहायता', status: 'नई' },
  { icon: '💰', name: 'किसान क्रेडिट कार्ड', ministry: 'वित्त मंत्रालय', benefit: '4% ब्याज दर', desc: '₹3 लाख तक का फसल ऋण — समय पर भुगतान पर 3% छूट', status: 'सक्रिय' },
];

export function GovSchemes() {
  return (
    <section id="schemes" className="py-20 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-10">
          <div className="font-mono text-[0.72rem] font-bold text-orange-600 tracking-[0.15em] uppercase mb-2">GOVERNMENT</div>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-stone-900 mb-2">सरकारी योजनाएँ</h2>
          <p className="font-body text-[0.95rem] text-stone-500 max-w-[600px]">आलू किसानों और प्रसंस्करण उद्योग के लिए उपलब्ध प्रमुख सरकारी योजनाएँ और अनुदान</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemes.map((s, i) => (
            <div key={i} className="bg-stone-50 rounded-[14px] p-[26px] border border-stone-200 cursor-pointer hover:shadow-lg hover:border-red-200 transition-all relative">
              <div className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-md font-body text-[0.68rem] font-bold ${s.status === 'नई' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>{s.status}</div>
              <div className="w-[52px] h-[52px] rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-[26px] mb-[18px]">{s.icon}</div>
              <h3 className="font-display text-[1.12rem] font-bold text-stone-900 mb-1.5 leading-snug">{s.name}</h3>
              <div className="font-body text-[0.75rem] text-stone-400 mb-3">{s.ministry}</div>
              <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 px-3.5 py-1 rounded-lg font-mono text-[0.92rem] font-extrabold text-red-600 mb-3.5">{s.benefit}</div>
              <p className="font-body text-[0.88rem] text-stone-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── News Section ─── */
const articles = [
  { tag: 'उत्पादन', title: 'भारत में आलू उत्पादन 60.18 मिलियन टन — नया रिकॉर्ड', date: '24 मार्च 2026', color: 'text-red-600 bg-red-50' },
  { tag: 'निर्यात', title: 'आलू फ्लेक्स निर्यात ₹527 करोड़ — तीन वर्षों में 450% वृद्धि', date: '22 मार्च 2026', color: 'text-orange-600 bg-orange-50' },
  { tag: 'नीति', title: 'बिहार सरकार ने लेडी रोसेटा आलू विस्तार योजना शुरू की', date: '20 मार्च 2026', color: 'text-red-700 bg-red-50' },
  { tag: 'तकनीक', title: 'LUCRA ने भारतीय खेतों के लिए CH200-SRS आलू हार्वेस्टर लॉन्च किया', date: '18 मार्च 2026', color: 'text-orange-700 bg-orange-50' },
  { tag: 'अनुसंधान', title: 'ICAR ने चार नई उन्नत आलू किस्मों को मंजूरी दी', date: '15 मार्च 2026', color: 'text-pink-700 bg-pink-50' },
  { tag: 'राज्य', title: 'त्रिपुरा का 2030 तक आलू में आत्मनिर्भर बनने का लक्ष्य', date: '12 मार्च 2026', color: 'text-orange-600 bg-orange-50' },
];

export function NewsSection() {
  return (
    <section id="news" className="py-20 px-6" style={{ background: 'linear-gradient(180deg, #fafaf9, #fff7ed)' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[0.72rem] font-bold text-orange-600 tracking-[0.15em] uppercase mb-2">NEWS</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-stone-900">ताज़ा समाचार</h2>
          </div>
          <Link href="/samachar" className="no-underline bg-transparent border-[1.5px] border-stone-300 px-6 py-2.5 rounded-lg font-body text-[0.88rem] font-semibold text-stone-600 hover:border-red-300 transition-all">सभी समाचार →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((a, i) => (
            <article key={i} className="bg-white rounded-[14px] p-6 border border-stone-200 cursor-pointer hover:shadow-lg hover:border-red-200 transition-all flex flex-col">
              <span className={`inline-block w-fit px-3 py-0.5 rounded-md text-[0.72rem] font-bold font-body mb-3.5 ${a.color}`}>{a.tag}</span>
              <h3 className="font-display text-[1.08rem] font-bold text-stone-900 leading-[1.45] mb-3.5 flex-1">{a.title}</h3>
              <div className="font-body text-[0.78rem] text-stone-400">{a.date}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Varieties Quick View ─── */
const varieties = [
  { name: 'कुफरी ज्योति', use: 'खाने के लिए', days: '90-100 दिन', yield: '25-30 टन/हे.', states: 'UP, पंजाब, HP', color: '#dc2626' },
  { name: 'कुफरी पुखराज', use: 'खाने के लिए', days: '80-90 दिन', yield: '35-40 टन/हे.', states: 'बिहार, UP, WB', color: '#ea580c' },
  { name: 'कुफरी चिप्सोना-1', use: 'प्रसंस्करण', days: '95-105 दिन', yield: '28-32 टन/हे.', states: 'गुजरात, MP', color: '#f97316' },
  { name: 'लेडी रोसेटा', use: 'प्रसंस्करण', days: '100-110 दिन', yield: '22-26 टन/हे.', states: 'गुजरात, पंजाब', color: '#b91c1c' },
];

export function VarietiesQuick() {
  return (
    <section id="varieties" className="py-20 px-6 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <div className="font-mono text-[0.72rem] font-bold text-orange-600 tracking-[0.15em] uppercase mb-2">DATABASE</div>
            <h2 className="font-display text-[clamp(1.8rem,4vw,2.5rem)] font-bold text-stone-900 mb-1.5">आलू की प्रमुख किस्में</h2>
            <p className="font-body text-[0.92rem] text-stone-500">भारत में उगाई जाने वाली प्रमुख आलू किस्मों की पूरी जानकारी</p>
          </div>
          <Link href="/kisme" className="no-underline bg-transparent border-[1.5px] border-stone-300 px-6 py-2.5 rounded-lg font-body text-[0.88rem] font-semibold text-stone-600 hover:border-red-300 transition-all">सभी किस्में →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {varieties.map((v, i) => (
            <div key={i} className="bg-stone-50 rounded-[14px] p-6 border border-stone-200 cursor-pointer hover:shadow-lg transition-all" style={{ borderLeft: `4px solid ${v.color}` }}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-display text-[1.15rem] font-bold text-stone-900 mb-1">{v.name}</h3>
                  <span className="font-body text-[0.72rem] font-semibold px-2.5 py-0.5 rounded" style={{ color: v.color, background: `${v.color}15` }}>{v.use}</span>
                </div>
                <div className="w-10 h-10 rounded-[10px] flex items-center justify-center text-xl" style={{ background: `${v.color}10` }}>🥔</div>
              </div>
              <div className="grid grid-cols-3 gap-2.5">
                {[{ label: 'अवधि', val: v.days }, { label: 'उपज', val: v.yield }, { label: 'क्षेत्र', val: v.states }].map((d, j) => (
                  <div key={j}>
                    <div className="font-body text-[0.62rem] font-semibold text-stone-400 mb-0.5">{d.label}</div>
                    <div className="font-mono text-[0.82rem] font-semibold text-stone-700">{d.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── WhatsApp CTA ─── */
export function WhatsAppCTA() {
  return (
    <section id="whatsapp" className="py-[72px] px-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7f1d1d, #b91c1c, #dc2626, #ea580c)' }}>
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")` }} />
      <div className="max-w-[640px] mx-auto text-center relative z-10">
        <div className="w-[72px] h-[72px] rounded-full bg-[#25D366] mx-auto mb-6 flex items-center justify-center text-4xl shadow-[0_8px_32px_rgba(37,211,102,0.4)]">💬</div>
        <h2 className="font-display text-[clamp(1.5rem,4vw,2.2rem)] font-bold text-white mb-3.5">WhatsApp पर जुड़ें</h2>
        <p className="font-body text-[1.05rem] text-white/80 mb-8 leading-[1.8]">
          रोज़ाना मंडी भाव, सरकारी योजनाओं की जानकारी, खेती के टिप्स और उद्योग समाचार — सीधे WhatsApp पर पाएँ। बिल्कुल मुफ्त।
        </p>
        <a href="https://chat.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 bg-[#25D366] text-white px-9 py-4 rounded-xl font-body text-[1.08rem] font-bold shadow-[0_6px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_32px_rgba(37,211,102,0.5)] transition-all no-underline">
          <span className="text-[22px]">📲</span> अभी WhatsApp ग्रुप जॉइन करें
        </a>
        <p className="font-body text-[0.78rem] text-white/45 mt-[18px]">15,000+ सदस्य · कोई स्पैम नहीं · कभी भी छोड़ सकते हैं</p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
const footerCols = [
  { title: 'जानकारी', links: [{ label: 'मंडी भाव', href: '/mandi' }, { label: 'किस्में', href: '/kisme' }, { label: 'निर्यात डेटा', href: '/samachar' }, { label: 'खेती गाइड', href: '/samachar' }, { label: 'सरकारी योजनाएँ', href: '/yojnaye' }] },
  { title: 'उद्योग', links: [{ label: 'डायरेक्टरी', href: '/directory' }, { label: 'कार्यक्रम', href: '/samachar' }, { label: 'प्रसंस्करण', href: '/directory' }, { label: 'कोल्ड स्टोरेज', href: '/directory' }, { label: 'अनुसंधान', href: '/samachar' }] },
  { title: 'कंपनी', links: [{ label: 'हमारे बारे में', href: '/sampark' }, { label: 'संपर्क करें', href: '/sampark' }, { label: 'विज्ञापन', href: '/sampark' }, { label: 'गोपनीयता नीति', href: '/sampark' }, { label: 'नियम व शर्तें', href: '/sampark' }] },
];

export function Footer() {
  return (
    <footer className="bg-[#0c0a09] px-6 pt-[60px] pb-7 text-white">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2.5 mb-[18px]">
            <div className="w-[38px] h-[38px] rounded-[10px] bg-gradient-to-br from-red-600 to-orange-500 flex items-center justify-center text-xl">🥔</div>
            <div className="font-display text-[1.15rem] font-bold">इंडियन पोटैटो</div>
          </div>
          <p className="font-body text-[0.88rem] text-stone-400 leading-[1.75] max-w-[320px]">
            भारत का प्रमुख आलू उद्योग मंच — किसानों, व्यापारियों, प्रसंस्करण उद्योग और निर्यातकों को जोड़ता है।
          </p>
          <div className="flex gap-2.5 mt-5">
            {['𝕏', '▶', '💬', '📷'].map((s, i) => (
              <div key={i} className="w-9 h-9 rounded-lg bg-[#1c1917] border border-[#292524] flex items-center justify-center text-sm text-stone-400 cursor-pointer hover:text-white hover:border-stone-600 transition-all">{s}</div>
            ))}
          </div>
        </div>
        {footerCols.map((col, i) => (
          <div key={i}>
            <h4 className="font-body text-[0.82rem] font-bold text-white mb-[18px]">{col.title}</h4>
            {col.links.map((link, j) => (
              <Link key={j} href={link.href} className="block font-body text-[0.88rem] text-stone-500 py-[5px] hover:text-stone-300 transition-colors no-underline">{link.label}</Link>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-[1280px] mx-auto mt-11 pt-5 border-t border-[#1c1917] flex justify-between flex-wrap gap-2.5">
        <span className="font-body text-[0.78rem] text-stone-600">© 2026 इंडियन पोटैटो। सर्वाधिकार सुरक्षित।</span>
        <span className="font-mono text-[0.78rem] text-stone-600">indianpotato.in</span>
      </div>
    </footer>
  );
}
