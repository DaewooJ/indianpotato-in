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
    <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white overflow-hidden whitespace-nowrap text-[0.85rem] font-body py-2.5">
      <div className="inline-block animate-ticker">
        {[...headlines, ...headlines].map((h, i) => (
          <span key={i} className="px-12">
            <span className="text-yellow-200 font-bold mr-2.5">◆</span>
            {h}
          </span>
        ))}
      </div>
    </div>
  );
}
