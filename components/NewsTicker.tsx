'use client';

const headlines = [
  'भारत में आलू उत्पादन 60.18 मिलियन टन के रिकॉर्ड स्तर पर पहुँचा',
  'गुजरात प्रसंस्कृत आलू उत्पादन और निर्यात में अग्रणी',
  'आलू फ्लेक्स निर्यात ₹527 करोड़ — तीन वर्षों में 450% की वृद्धि',
  'त्रिपुरा का लक्ष्य 2030 तक आलू में पूर्ण आत्मनिर्भरता',
  'बिहार सरकार ने लेडी रोसेटा आलू विस्तार योजना शुरू की',
  'ICAR ने चार नई उन्नत आलू किस्मों को मंजूरी दी',
];

export default function NewsTicker() {
  return (
    <div style={{
      background: '#E53E3E', color: '#fff',
      overflow: 'hidden', whiteSpace: 'nowrap',
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{
        background: '#fff', color: '#E53E3E',
        padding: '11px 20px', fontWeight: 800,
        fontSize: '0.7rem', letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontFamily: "'DM Sans', sans-serif",
        flexShrink: 0, display: 'flex', alignItems: 'center', gap: 7,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: '#E53E3E', animation: 'blink 1.5s infinite',
        }} />
        ताज़ा
      </div>
      <div style={{ overflow: 'hidden', flex: 1, padding: '11px 0' }}>
        <div style={{
          display: 'inline-block', animation: 'ticker 50s linear infinite',
          fontFamily: "'Noto Sans Devanagari', sans-serif",
          fontSize: '0.84rem', fontWeight: 500,
        }}>
          {[...headlines, ...headlines].map((h, i) => (
            <span key={i} style={{ padding: '0 36px' }}>
              {h}
              <span style={{ margin: '0 16px', opacity: 0.4, fontSize: '0.6rem' }}>●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
