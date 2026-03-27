import fs from 'fs';
import path from 'path';

export interface CategoryConfig {
  slug: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  descriptionEn: string;
  color: string;
}

export const DIRECTORY_CATEGORIES: CategoryConfig[] = [
  { slug: 'cold-storage', name: 'कोल्ड स्टोरेज', nameEn: 'Cold Storage', icon: '❄️', description: 'भारत भर में आलू कोल्ड स्टोरेज सुविधाएँ — क्षमता, संपर्क और पता', descriptionEn: 'Potato cold storage facilities across India', color: 'blue' },
  { slug: 'traders', name: 'व्यापारी / आढ़तिया', nameEn: 'Traders / Commission Agents', icon: '🤝', description: 'आलू के थोक व्यापारी, आढ़तिया और कमीशन एजेंट', descriptionEn: 'Wholesale potato traders and commission agents', color: 'amber' },
  { slug: 'farming-machines', name: 'कृषि मशीनें', nameEn: 'Potato Farming Machines', icon: '🚜', description: 'आलू बुआई, खुदाई, ग्रेडिंग और सॉर्टिंग मशीनें', descriptionEn: 'Potato planting, harvesting, grading and sorting machines', color: 'lime' },
  { slug: 'seed-suppliers', name: 'बीज आपूर्तिकर्ता', nameEn: 'Seed Suppliers', icon: '🌱', description: 'प्रमाणित बीज आलू उत्पादक और आपूर्तिकर्ता', descriptionEn: 'Certified seed potato producers and suppliers', color: 'emerald' },
  { slug: 'processors', name: 'प्रसंस्करण कंपनियाँ', nameEn: 'Processors', icon: '🏭', description: 'चिप्स, फ्राइज़, डिहाइड्रेटेड और फ्रोज़न आलू उत्पाद निर्माता', descriptionEn: 'Chips, fries, dehydrated & frozen potato manufacturers', color: 'red' },
  { slug: 'equipment', name: 'उपकरण / मशीनरी', nameEn: 'Equipment & Machinery', icon: '⚙️', description: 'आलू उद्योग के लिए मशीनरी और तकनीक प्रदाता', descriptionEn: 'Machinery and technology providers for the potato industry', color: 'slate' },
  { slug: 'research', name: 'अनुसंधान संस्थान', nameEn: 'Research Institutes', icon: '🧪', description: 'आलू अनुसंधान संस्थान, विश्वविद्यालय और प्रयोगशालाएँ', descriptionEn: 'Potato research institutes, universities, and labs', color: 'violet' },
  { slug: 'transport', name: 'परिवहन / लॉजिस्टिक्स', nameEn: 'Transport & Logistics', icon: '🚛', description: 'रेफ्रिजरेटेड ट्रांसपोर्ट और आलू लॉजिस्टिक्स सेवाएँ', descriptionEn: 'Refrigerated transport and potato logistics services', color: 'orange' },
  { slug: 'processing-machines', name: 'प्रसंस्करण मशीनें', nameEn: 'Processing Machines', icon: '🔧', description: 'आलू चिप्स, फ्राइज़, पाउडर और फ्लेक्स बनाने की मशीनें', descriptionEn: 'Machines for making potato chips, fries, powder and flakes', color: 'zinc' },
  { slug: 'exporters', name: 'निर्यातक', nameEn: 'Exporters', icon: '📦', description: 'ताज़ा और प्रसंस्कृत आलू के निर्यातक — APEDA पंजीकृत', descriptionEn: 'Fresh and processed potato exporters', color: 'green' },
  { slug: 'progressive-farmers', name: 'प्रगतिशील किसान', nameEn: 'Progressive Farmers', icon: '👨‍🌾', description: 'भारत के अग्रणी आलू किसान — नई तकनीक और उच्च उत्पादकता', descriptionEn: 'Leading potato farmers of India — new tech and high yields', color: 'yellow' },
];

export interface DirectoryListing {
  slug: string;
  name: string;
  nameEn?: string;
  category: string;
  state: string;
  stateEn?: string;
  district: string;
  districtEn?: string;
  address?: string;
  phone?: string[];
  email?: string;
  website?: string;
  description: string;
  descriptionEn?: string;
  image?: string;
  established?: string;
  capacity?: string;
  specialization?: string[];
  certifications?: string[];
  featured?: boolean;
  tags?: string[];
}

export const INDIAN_STATES = [
  { slug: 'uttar-pradesh', name: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh' },
  { slug: 'west-bengal', name: 'पश्चिम बंगाल', nameEn: 'West Bengal' },
  { slug: 'bihar', name: 'बिहार', nameEn: 'Bihar' },
  { slug: 'gujarat', name: 'गुजरात', nameEn: 'Gujarat' },
  { slug: 'madhya-pradesh', name: 'मध्य प्रदेश', nameEn: 'Madhya Pradesh' },
  { slug: 'punjab', name: 'पंजाब', nameEn: 'Punjab' },
  { slug: 'karnataka', name: 'कर्नाटक', nameEn: 'Karnataka' },
  { slug: 'maharashtra', name: 'महाराष्ट्र', nameEn: 'Maharashtra' },
  { slug: 'haryana', name: 'हरियाणा', nameEn: 'Haryana' },
  { slug: 'rajasthan', name: 'राजस्थान', nameEn: 'Rajasthan' },
  { slug: 'jharkhand', name: 'झारखंड', nameEn: 'Jharkhand' },
  { slug: 'assam', name: 'असम', nameEn: 'Assam' },
  { slug: 'chhattisgarh', name: 'छत्तीसगढ़', nameEn: 'Chhattisgarh' },
  { slug: 'odisha', name: 'ओडिशा', nameEn: 'Odisha' },
  { slug: 'himachal-pradesh', name: 'हिमाचल प्रदेश', nameEn: 'Himachal Pradesh' },
  { slug: 'uttarakhand', name: 'उत्तराखंड', nameEn: 'Uttarakhand' },
  { slug: 'jammu-kashmir', name: 'जम्मू-कश्मीर', nameEn: 'Jammu & Kashmir' },
  { slug: 'meghalaya', name: 'मेघालय', nameEn: 'Meghalaya' },
  { slug: 'tamil-nadu', name: 'तमिल नाडु', nameEn: 'Tamil Nadu' },
  { slug: 'andhra-pradesh', name: 'आंध्र प्रदेश', nameEn: 'Andhra Pradesh' },
  { slug: 'telangana', name: 'तेलंगाना', nameEn: 'Telangana' },
  { slug: 'kerala', name: 'केरल', nameEn: 'Kerala' },
  { slug: 'goa', name: 'गोवा', nameEn: 'Goa' },
];

const directoryDir = path.join(process.cwd(), 'content', 'directory');

export function getCategoryConfig(categorySlug: string): CategoryConfig | undefined {
  return DIRECTORY_CATEGORIES.find((c) => c.slug === categorySlug);
}

export function getAllListings(): DirectoryListing[] {
  const allListings: DirectoryListing[] = [];
  for (const category of DIRECTORY_CATEGORIES) {
    const catDir = path.join(directoryDir, category.slug);
    if (!fs.existsSync(catDir)) continue;
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(catDir, file), 'utf-8');
        const data = JSON.parse(raw) as DirectoryListing;
        data.slug = file.replace('.json', '');
        data.category = category.slug;
        allListings.push(data);
      } catch {
        console.error('Error reading ' + file + ' in ' + category.slug);
      }
    }
  }
  return allListings;
}

export function getListingsByCategory(categorySlug: string): DirectoryListing[] {
  const catDir = path.join(directoryDir, categorySlug);
  if (!fs.existsSync(catDir)) return [];
  const files = fs.readdirSync(catDir).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(catDir, file), 'utf-8');
    const data = JSON.parse(raw) as DirectoryListing;
    data.slug = file.replace('.json', '');
    data.category = categorySlug;
    return data;
  });
}

export function getListingBySlug(categorySlug: string, listingSlug: string): DirectoryListing | null {
  const filePath = path.join(directoryDir, categorySlug, listingSlug + '.json');
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(raw) as DirectoryListing;
  data.slug = listingSlug;
  data.category = categorySlug;
  return data;
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of DIRECTORY_CATEGORIES) {
    const catDir = path.join(directoryDir, category.slug);
    if (!fs.existsSync(catDir)) { counts[category.slug] = 0; continue; }
    counts[category.slug] = fs.readdirSync(catDir).filter((f) => f.endsWith('.json')).length;
  }
  return counts;
}

export function getFeaturedListings(): DirectoryListing[] {
  return getAllListings().filter((l) => l.featured);
}

export function searchListings(query: string): DirectoryListing[] {
  const q = query.toLowerCase();
  return getAllListings().filter(
    (l) => l.name.toLowerCase().includes(q) || (l.nameEn && l.nameEn.toLowerCase().includes(q)) || l.description.toLowerCase().includes(q) || l.state.toLowerCase().includes(q) || (l.stateEn && l.stateEn.toLowerCase().includes(q)) || l.district.toLowerCase().includes(q) || (l.tags && l.tags.some((t: string) => t.toLowerCase().includes(q)))
  );
}
