export const BRAND = {
  name: 'इंडियन पोटैटो',
  nameEn: 'IndianPotato',
  company: 'Indpotato Private Limited',
  director: 'Devendra K Jha',
  siteUrl: 'https://www.indianpotato.in',
  directoryUrl: 'https://www.indianpotato.in/directory',
  email: 'info@indpotato.com',
  phone: '+91 94996 68831',
  tagline: 'भारत का प्रमुख आलू उद्योग B2B मंच',
  description:
    'IndianPotato.in भारतीय आलू उद्योग का प्रमुख B2B डायरेक्टरी और इंटेलिजेंस प्लेटफ़ॉर्म है — बीज कंपनियाँ, प्रसंस्करण, निर्यातक, कोल्ड स्टोरेज और अन्य सभी को जोड़ता है।',
} as const

export const PLANS = [
  {
    tier: 'free',
    name: 'निःशुल्क',
    priceMonthly: 0,
    priceAnnual: 0,
    tagline: 'आपके व्यवसाय की बुनियादी दृश्यता',
    isPopular: false,
    features: [
      'बेसिक कंपनी लिस्टिंग',
      'कंपनी का नाम और विवरण',
      'शहर और राज्य प्रदर्शन',
      'श्रेणी में प्लेसमेंट',
      'स्टैंडर्ड सर्च रैंकिंग',
    ],
    cta: 'निःशुल्क लिस्ट करें',
  },
  {
    tier: 'verified',
    name: 'सत्यापित',
    priceMonthly: 999,
    priceAnnual: 9990,
    tagline: 'सत्यापन से विश्वास बनाएँ',
    isPopular: false,
    features: [
      'निःशुल्क की सभी सुविधाएँ, साथ ही:',
      'सत्यापित बैज',
      'फ़ोन, ईमेल और WhatsApp दिखाएँ',
      'वेबसाइट लिंक',
      'सर्च में प्राथमिकता',
      'कंपनी लोगो प्रदर्शन',
      'मासिक एनालिटिक्स रिपोर्ट',
    ],
    cta: 'सत्यापित करें',
  },
  {
    tier: 'premium',
    name: 'प्रीमियम',
    priceMonthly: 4999,
    priceAnnual: 49990,
    tagline: 'लीड्स और दृश्यता के साथ बढ़ें',
    isPopular: true,
    features: [
      'सत्यापित की सभी सुविधाएँ, साथ ही:',
      'सीधे RFQ इन्क्वायरी प्राप्त करें',
      'श्रेणी साइडबार में फ़ीचर्ड',
      'फ़ोटो गैलरी (10 तक)',
      'उत्पाद और सेवाएँ शोकेस',
      'सोशल मीडिया लिंक',
      'विस्तृत एनालिटिक्स डैशबोर्ड',
      'प्राथमिकता सहायता',
    ],
    cta: 'प्रीमियम लें',
  },
  {
    tier: 'platinum',
    name: 'प्लैटिनम',
    priceMonthly: 14999,
    priceAnnual: 149990,
    tagline: 'अधिकतम दृश्यता और लीड्स',
    isPopular: false,
    features: [
      'प्रीमियम की सभी सुविधाएँ, साथ ही:',
      'होमपेज पर फ़ीचर्ड',
      'सभी सर्च में शीर्ष प्लेसमेंट',
      'रिच कंपनी प्रोफ़ाइल पेज',
      'वीडियो शोकेस',
      'प्राथमिकता RFQ वितरण',
      'समर्पित अकाउंट मैनेजर',
      'कस्टम ब्रांडिंग विकल्प',
      'तिमाही प्रदर्शन समीक्षा',
    ],
    cta: 'प्लैटिनम लें',
  },
]

export const COMPARISON_FEATURES = [
  { name: 'बेसिक कंपनी लिस्टिंग', free: true, verified: true, premium: true, platinum: true },
  { name: 'कंपनी का नाम और विवरण', free: true, verified: true, premium: true, platinum: true },
  { name: 'शहर और राज्य प्रदर्शन', free: true, verified: true, premium: true, platinum: true },
  { name: 'श्रेणी में प्लेसमेंट', free: true, verified: true, premium: true, platinum: true },
  { name: 'सत्यापित बैज', free: false, verified: true, premium: true, platinum: true },
  { name: 'फ़ोन, ईमेल और WhatsApp दिखाएँ', free: false, verified: true, premium: true, platinum: true },
  { name: 'वेबसाइट लिंक', free: false, verified: true, premium: true, platinum: true },
  { name: 'कंपनी लोगो प्रदर्शन', free: false, verified: true, premium: true, platinum: true },
  { name: 'सर्च में प्राथमिकता', free: false, verified: true, premium: true, platinum: true },
  { name: 'मासिक एनालिटिक्स रिपोर्ट', free: false, verified: true, premium: true, platinum: true },
  { name: 'RFQ इन्क्वायरी प्राप्त करें', free: false, verified: false, premium: true, platinum: true },
  { name: 'श्रेणी साइडबार में फ़ीचर्ड', free: false, verified: false, premium: true, platinum: true },
  { name: 'फ़ोटो गैलरी (10 तक)', free: false, verified: false, premium: true, platinum: true },
  { name: 'उत्पाद और सेवाएँ शोकेस', free: false, verified: false, premium: true, platinum: true },
  { name: 'सोशल मीडिया लिंक', free: false, verified: false, premium: true, platinum: true },
  { name: 'विस्तृत एनालिटिक्स डैशबोर्ड', free: false, verified: false, premium: true, platinum: true },
  { name: 'प्राथमिकता सहायता', free: false, verified: false, premium: true, platinum: true },
  { name: 'होमपेज पर फ़ीचर्ड', free: false, verified: false, premium: false, platinum: true },
  { name: 'सभी सर्च में शीर्ष प्लेसमेंट', free: false, verified: false, premium: false, platinum: true },
  { name: 'वीडियो शोकेस', free: false, verified: false, premium: false, platinum: true },
  { name: 'प्राथमिकता RFQ वितरण', free: false, verified: false, premium: false, platinum: true },
  { name: 'समर्पित अकाउंट मैनेजर', free: false, verified: false, premium: false, platinum: true },
  { name: 'कस्टम ब्रांडिंग विकल्प', free: false, verified: false, premium: false, platinum: true },
]

export const FAQS = [
  {
    question: 'IndianPotato पर अपनी कंपनी कैसे लिस्ट करें?',
    answer:
      '"अपनी कंपनी जोड़ें" पर क्लिक करें और अपनी कंपनी का विवरण भरें। निःशुल्क लिस्टिंग 48 घंटे में प्रकाशित होती है। पेड प्लान भुगतान के तुरंत बाद सक्रिय होते हैं।',
  },
  {
    question: 'सत्यापन प्रक्रिया क्या है?',
    answer:
      'सत्यापन में GST नंबर, FSSAI लाइसेंस, या अन्य सरकारी दस्तावेजों के माध्यम से आपकी व्यावसायिक पहचान की पुष्टि की जाती है। हमारी टीम 3-5 कार्यदिवसों में आपके विवरण की जाँच करती है।',
  },
  {
    question: 'कौन सी भुगतान विधियाँ स्वीकार की जाती हैं?',
    answer:
      'हम Razorpay के माध्यम से सभी प्रमुख भुगतान विधियाँ स्वीकार करते हैं — UPI, क्रेडिट/डेबिट कार्ड, नेट बैंकिंग और वॉलेट। सभी पेड प्लान मासिक या वार्षिक (वार्षिक पर 2 महीने बचाएँ) बिल किए जा सकते हैं।',
  },
  {
    question: 'क्या मैं बाद में अपना प्लान अपग्रेड या डाउनग्रेड कर सकता हूँ?',
    answer:
      'हाँ, आप किसी भी समय अपना प्लान अपग्रेड कर सकते हैं और मूल्य अंतर प्रोरेटेड होगा। डाउनग्रेड के लिए, परिवर्तन आपके वर्तमान बिलिंग चक्र के अंत में प्रभावी होते हैं।',
  },
  {
    question: 'मेरी सदस्यता समाप्त होने के बाद क्या होता है?',
    answer:
      'आपकी लिस्टिंग निःशुल्क टियर फ़ीचर्स पर वापस आ जाती है। आपकी कंपनी प्रोफ़ाइल और डेटा बरकरार रहता है — आप बस प्रीमियम फ़ीचर्स खो देते हैं जब तक आप नवीनीकरण नहीं करते।',
  },
  {
    question: 'क्या आप रिफ़ंड देते हैं?',
    answer:
      'हम सभी पेड प्लान पर 7 दिन की मनी-बैक गारंटी देते हैं। यदि आप संतुष्ट नहीं हैं, तो पूर्ण रिफ़ंड के लिए भुगतान के 7 दिनों के भीतर हमसे संपर्क करें।',
  },
]

export const COMPANY_SIZE_LABELS: Record<string, string> = {
  '1-10': '1–10 कर्मचारी',
  '11-50': '11–50 कर्मचारी',
  '51-200': '51–200 कर्मचारी',
  '201-500': '201–500 कर्मचारी',
  '500+': '500+ कर्मचारी',
}

export const TURNOVER_LABELS: Record<string, string> = {
  'below-10l': '₹10 लाख से कम',
  '10l-50l': '₹10–50 लाख',
  '50l-1cr': '₹50 लाख – ₹1 करोड़',
  '1cr-5cr': '₹1–5 करोड़',
  '5cr-25cr': '₹5–25 करोड़',
  '25cr-100cr': '₹25–100 करोड़',
  'above-100cr': '₹100 करोड़ से ऊपर',
}

export const CERTIFICATIONS = [
  'FSSAI',
  'ISO 9001',
  'ISO 22000',
  'HACCP',
  'BRC',
  'Organic India (NPOP)',
  'APEDA Registered',
  'GMP Certified',
  'MSME Registered',
  'Startup India',
  'Import Export Code (IEC)',
  'BIS Certified',
] as const

export const DEFAULT_PAGE_SIZE = 20
