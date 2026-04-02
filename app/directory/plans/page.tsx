import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

export const metadata: Metadata = {
  title: 'डायरेक्टरी लिस्टिंग प्लान — Basic, Silver, Gold, Platinum | Indian Potato',
  description: 'Indian Potato डायरेक्टरी में अपना व्यवसाय सूचीबद्ध करें। Basic (निःशुल्क), Silver (₹4,999/वर्ष), Gold (₹7,999/वर्ष), Platinum (₹9,999/वर्ष)।',
  openGraph: { title: 'डायरेक्टरी लिस्टिंग प्लान — Indian Potato', description: 'अपना व्यवसाय भारत के #1 आलू प्लेटफ़ॉर्म पर सूचीबद्ध करें', type: 'website', url: 'https://www.indianpotato.in/directory/plans' },
  alternates: { canonical: 'https://www.indianpotato.in/directory/plans' },
};

const plans = [
  {
    id: 'basic', name: 'Basic', nameHi: 'बेसिक', price: 'निःशुल्क', priceEn: 'FREE', period: '',
    color: 'stone', gradient: 'from-stone-100 to-stone-50', border: 'border-stone-200',
    badge: '', badgeBg: '', icon: '📋', cta: 'निःशुल्क लिस्टिंग', ctaBg: 'bg-stone-800 hover:bg-stone-900',
    features: { companyName: true, location: true, phone: false, category: true, description: false, descriptionWords: 0, logo: false, photos: 0, varieties: false, certifications: false, contactPerson: false, email: true, website: false, whatsappButton: false, callButton: false, premiumBadge: false, featuredHomepage: false, featuredCategory: false, socialMedia: false, seoOptimized: false, prioritySupport: false, analytics: false, dedicatedPage: false, stateFilter: true, searchVisible: true, priorityReferral: false },
  },
  {
    id: 'silver', name: 'Silver', nameHi: 'सिल्वर', price: '₹4,999', priceEn: '₹4,999', period: '/वर्ष',
    color: 'slate', gradient: 'from-slate-50 to-white', border: 'border-slate-300',
    badge: '🥈', badgeBg: 'bg-slate-200 text-slate-700', icon: '🥈', cta: 'Silver चुनें', ctaBg: 'bg-slate-700 hover:bg-slate-800',
    features: { companyName: true, location: true, phone: true, category: true, description: true, descriptionWords: 100, logo: true, photos: 2, varieties: false, certifications: true, contactPerson: true, email: true, website: true, whatsappButton: false, callButton: false, premiumBadge: false, featuredHomepage: false, featuredCategory: false, socialMedia: false, seoOptimized: true, prioritySupport: false, analytics: false, dedicatedPage: true, stateFilter: true, searchVisible: true, priorityReferral: false },
  },
  {
    id: 'gold', name: 'Gold', nameHi: 'गोल्ड', price: '₹7,999', priceEn: '₹7,999', period: '/वर्ष',
    color: 'amber', gradient: 'from-amber-50 to-yellow-50/50', border: 'border-amber-300',
    badge: '👑', badgeBg: 'bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-900', icon: '👑',
    cta: 'Gold चुनें — लोकप्रिय', ctaBg: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
    popular: true,
    features: { companyName: true, location: true, phone: true, category: true, description: true, descriptionWords: 300, logo: true, photos: 3, varieties: true, certifications: true, contactPerson: true, email: true, website: true, whatsappButton: true, callButton: true, premiumBadge: true, featuredHomepage: true, featuredCategory: true, socialMedia: true, seoOptimized: true, prioritySupport: false, analytics: true, dedicatedPage: true, stateFilter: true, searchVisible: true, priorityReferral: false },
  },
  {
    id: 'platinum', name: 'Platinum', nameHi: 'प्लेटिनम', price: '₹9,999', priceEn: '₹9,999', period: '/वर्ष',
    color: 'violet', gradient: 'from-violet-50 to-purple-50/50', border: 'border-violet-300',
    badge: '💎', badgeBg: 'bg-gradient-to-r from-violet-200 to-purple-200 text-violet-900', icon: '💎',
    cta: 'Platinum चुनें', ctaBg: 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700',
    features: { companyName: true, location: true, phone: true, category: true, description: true, descriptionWords: 500, logo: true, photos: 10, varieties: true, certifications: true, contactPerson: true, email: true, website: true, whatsappButton: true, callButton: true, premiumBadge: true, featuredHomepage: true, featuredCategory: true, socialMedia: true, seoOptimized: true, prioritySupport: true, analytics: true, dedicatedPage: true, stateFilter: true, searchVisible: true, priorityReferral: true },
  },
];

const comparisonRows: { label: string; labelEn: string; key: string; type: 'boolean' | 'text'; section?: string }[] = [
  { label: '', labelEn: '', key: '_section_basic', type: 'text', section: '📌 बुनियादी जानकारी — Basic Information' },
  { label: 'कंपनी का नाम', labelEn: 'Company Name', key: 'companyName', type: 'boolean' },
  { label: 'पता / स्थान', labelEn: 'Location & Address', key: 'location', type: 'boolean' },
  { label: 'फ़ोन नंबर', labelEn: 'Phone Number', key: 'phone', type: 'boolean' },
  { label: 'ईमेल', labelEn: 'Email Address', key: 'email', type: 'boolean' },
  { label: 'श्रेणी में दिखाई दें', labelEn: 'Category Listing', key: 'category', type: 'boolean' },
  { label: 'राज्य फ़िल्टर में दिखें', labelEn: 'State Filter Visible', key: 'stateFilter', type: 'boolean' },
  { label: 'खोज में दिखें', labelEn: 'Search Visible', key: 'searchVisible', type: 'boolean' },

  { label: '', labelEn: '', key: '_section_profile', type: 'text', section: '🏢 प्रोफ़ाइल और ब्रांडिंग — Profile & Branding' },
  { label: 'समर्पित प्रोफ़ाइल पेज', labelEn: 'Dedicated Profile Page', key: 'dedicatedPage', type: 'boolean' },
  { label: 'कंपनी लोगो', labelEn: 'Company Logo', key: 'logo', type: 'boolean' },
  { label: 'विवरण (शब्द)', labelEn: 'Description Length', key: 'descriptionWords', type: 'text' },
  { label: 'फ़ोटो गैलरी', labelEn: 'Photo Gallery', key: 'photos', type: 'text' },
  { label: 'किस्में / उत्पाद सूची', labelEn: 'Varieties / Products', key: 'varieties', type: 'boolean' },
  { label: 'प्रमाणपत्र', labelEn: 'Certifications', key: 'certifications', type: 'boolean' },
  { label: 'संपर्क व्यक्ति', labelEn: 'Contact Person', key: 'contactPerson', type: 'boolean' },
  { label: 'वेबसाइट लिंक', labelEn: 'Website Link', key: 'website', type: 'boolean' },
  { label: 'सोशल मीडिया लिंक', labelEn: 'Social Media Links', key: 'socialMedia', type: 'boolean' },

  { label: '', labelEn: '', key: '_section_premium', type: 'text', section: '⭐ प्रीमियम सुविधाएँ — Premium Features' },
  { label: '📞 कॉल बटन', labelEn: 'Direct Call Button', key: 'callButton', type: 'boolean' },
  { label: '💬 WhatsApp बटन', labelEn: 'WhatsApp Button', key: 'whatsappButton', type: 'boolean' },
  { label: 'SEO ऑप्टिमाइज़्ड पेज', labelEn: 'SEO Optimized', key: 'seoOptimized', type: 'boolean' },
  { label: '👑 प्रीमियम सत्यापित बैज', labelEn: 'Premium Verified Badge', key: 'premiumBadge', type: 'boolean' },
  { label: '⭐ होमपेज पर फ़ीचर्ड', labelEn: 'Featured on Homepage', key: 'featuredHomepage', type: 'boolean' },
  { label: '⭐ श्रेणी में टॉप पर', labelEn: 'Top in Category', key: 'featuredCategory', type: 'boolean' },
  { label: '📊 व्यू एनालिटिक्स', labelEn: 'View Analytics', key: 'analytics', type: 'boolean' },
  { label: '🔗 प्राथमिकता रेफ़रल', labelEn: 'Priority Referral', key: 'priorityReferral', type: 'boolean' },
  { label: '🎧 प्राथमिकता सपोर्ट', labelEn: 'Priority Support', key: 'prioritySupport', type: 'boolean' },
];

function getFeatureValue(features: any, key: string, type: string): string | boolean {
  if (type === 'text') {
    if (key === 'descriptionWords') return features[key] === 0 ? '—' : features[key] + ' शब्द';
    if (key === 'photos') return features[key] === 0 ? '—' : features[key] + ' फ़ोटो';
    return features[key];
  }
  return features[key];
}

export default function PlansPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        {/* Hero */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <div className="max-w-[1100px] mx-auto relative z-10 text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-4">
              <span className="text-[0.72rem] font-bold text-amber-400 tracking-wide uppercase">📋 डायरेक्टरी लिस्टिंग प्लान</span>
            </div>
            <h1 className="font-display text-[clamp(1.6rem,4.5vw,2.8rem)] font-bold text-white mb-3 leading-tight">
              अपना व्यवसाय भारत के<br className="hidden sm:block" /> <span className="text-amber-400">#1 आलू प्लेटफ़ॉर्म</span> पर सूचीबद्ध करें
            </h1>
            <p className="font-body text-[0.92rem] text-stone-400 max-w-[520px] mx-auto leading-relaxed">
              5,000+ किसान, व्यापारी और उद्योग पेशेवर प्रतिसप्ताह हमारी डायरेक्टरी देखते हैं। अपनी पहुँच बढ़ाएँ।
            </p>
          </div>
        </div>

        {/* Pricing Cards */}
        <section className="py-8 md:py-14 px-3 md:px-6 bg-stone-50/80 -mt-4 relative z-10">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {plans.map((plan: any) => (
                <div key={plan.id} className={'relative rounded-2xl border-2 overflow-hidden transition-all ' + plan.border + (plan.popular ? ' ring-2 ring-amber-400 ring-offset-2 scale-[1.02] lg:scale-105' : '')}>
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-1.5 text-center">
                      <span className="text-[0.7rem] font-bold text-white tracking-wider uppercase">⭐ सबसे लोकप्रिय</span>
                    </div>
                  )}
                  <div className={'bg-gradient-to-b ' + plan.gradient + ' p-5 md:p-6'}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[1.4rem]">{plan.icon}</span>
                      <div>
                        <h3 className="font-display text-[1.1rem] font-bold text-stone-900">{plan.name}</h3>
                        <p className="font-body text-[0.68rem] text-stone-400">{plan.nameHi}</p>
                      </div>
                      {plan.badge && plan.badgeBg && (<span className={'ml-auto text-[0.6rem] font-bold px-2 py-0.5 rounded-full ' + plan.badgeBg}>{plan.badge}</span>)}
                    </div>
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-[2rem] font-bold text-stone-900">{plan.price}</span>
                        {plan.period && <span className="font-body text-[0.82rem] text-stone-400">{plan.period}</span>}
                      </div>
                      {plan.id !== 'basic' && (<p className="font-body text-[0.68rem] text-stone-400 mt-0.5">+ GST | वार्षिक नवीकरण</p>)}
                    </div>
                    <div className="space-y-2 mb-6">
                      {plan.id === 'basic' && (
                        <>{F('कंपनी का नाम और पता')}{F('ईमेल')}{F('श्रेणी में सूचीबद्ध')}{<FNo text="कोई फ़ोन नंबर नहीं" />}{<FNo text="कोई प्रोफ़ाइल पेज नहीं" />}{<FNo text="कोई लोगो या फ़ोटो नहीं" />}</>
                      )}
                      {plan.id === 'silver' && (
                        <>{F('समर्पित प्रोफ़ाइल पेज')}{F('फ़ोन नंबर + ईमेल')}{F('कंपनी लोगो + 2 फ़ोटो')}{F('100 शब्दों का विवरण')}{F('SEO ऑप्टिमाइज़्ड पेज')}</>
                      )}
                      {plan.id === 'gold' && (
                        <>{F('👑 प्रीमियम सत्यापित बैज', true)}{F('⭐ होमपेज + श्रेणी में फ़ीचर्ड', true)}{F('📞 कॉल + 💬 WhatsApp बटन', true)}{F('लोगो + 3 फ़ोटो + किस्में सूची')}{F('300 शब्दों का विवरण')}{F('📊 व्यू एनालिटिक्स')}</>
                      )}
                      {plan.id === 'platinum' && (
                        <>{F('💎 सर्वोच्च प्राथमिकता प्लेसमेंट', true)}{F('Gold की सभी सुविधाएँ शामिल')}{F('📞 कॉल + 💬 WhatsApp बटन', true)}{F('10 फ़ोटो गैलरी')}{F('500 शब्दों का विस्तृत विवरण')}{F('🔗 प्राथमिकता रेफ़रल', true)}{F('🎧 प्राथमिकता सपोर्ट')}</>
                      )}
                    </div>
                    <a href={'https://wa.me/919XXXXXXXXX?text=' + encodeURIComponent('नमस्ते, मुझे ' + plan.name + ' लिस्टिंग प्लान (' + plan.price + ') चाहिए।')} target="_blank" rel="noopener" className={'flex items-center justify-center gap-2 w-full py-3 text-white font-body font-bold text-[0.88rem] rounded-xl transition-all shadow-md hover:shadow-lg ' + plan.ctaBg}>{plan.cta}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            PREMIUM COMPARISON TABLE
        ═══════════════════════════════════════════ */}
        <section className="py-12 md:py-20 px-3 md:px-6 bg-gradient-to-b from-white via-stone-50/30 to-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                <span className="text-[0.68rem] font-bold text-stone-500 uppercase tracking-wider">Feature Comparison</span>
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
              </div>
              <h2 className="font-display text-[clamp(1.4rem,3.5vw,2rem)] font-bold text-stone-900 mb-2">विस्तृत तुलना</h2>
              <p className="font-body text-[0.85rem] text-stone-400">हर प्लान में क्या-क्या मिलता है — एक नज़र में</p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block">
              <div className="rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-stone-900">
                      <th className="text-left py-5 px-6 w-[280px]">
                        <span className="font-display text-[0.85rem] font-bold text-white">सुविधाएँ</span>
                        <br /><span className="font-body text-[0.65rem] text-stone-400">Features</span>
                      </th>
                      {plans.map((plan: any) => (
                        <th key={plan.id} className={'text-center py-5 px-4 ' + (plan.popular ? 'bg-amber-900/30' : '')}>
                          <div className="flex flex-col items-center gap-1.5">
                            <span className="text-[1.3rem]">{plan.icon}</span>
                            <span className="font-display text-[0.88rem] font-bold text-white">{plan.name}</span>
                            <span className={'inline-block px-2.5 py-0.5 rounded-full text-[0.68rem] font-bold ' + (plan.id === 'basic' ? 'bg-white/10 text-white/70' : plan.id === 'silver' ? 'bg-slate-500/30 text-slate-200' : plan.id === 'gold' ? 'bg-amber-500/30 text-amber-200' : 'bg-violet-500/30 text-violet-200')}>{plan.price}{plan.period}</span>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, i) => {
                      if (row.section) {
                        return (
                          <tr key={row.key} className="bg-stone-100/80">
                            <td colSpan={5} className="py-3 px-6">
                              <span className="font-display text-[0.78rem] font-bold text-stone-700 tracking-wide">{row.section}</span>
                            </td>
                          </tr>
                        );
                      }
                      return (
                        <tr key={row.key} className={'transition-colors hover:bg-stone-50 ' + (i % 2 === 0 ? 'bg-white' : 'bg-stone-50/40')}>
                          <td className="py-3.5 px-6 border-b border-stone-100">
                            <div className="font-body text-[0.82rem] font-medium text-stone-700">{row.label}</div>
                            <div className="font-body text-[0.62rem] text-stone-400 mt-0.5">{row.labelEn}</div>
                          </td>
                          {plans.map((plan: any) => {
                            const val = getFeatureValue(plan.features, row.key, row.type);
                            return (
                              <td key={plan.id} className={'text-center py-3.5 px-4 border-b border-stone-100 ' + (plan.popular ? 'bg-amber-50/20' : '')}>
                                {row.type === 'boolean' ? (
                                  val ? (
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-50 border border-green-200 text-green-600 text-[0.75rem] font-bold shadow-sm">✓</span>
                                  ) : (
                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-stone-50 border border-stone-200 text-stone-300 text-[0.72rem]">✗</span>
                                  )
                                ) : (
                                  <span className={'font-body text-[0.8rem] font-semibold ' + (val === '—' ? 'text-stone-300' : 'text-stone-700')}>{val as string}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                  {/* Bottom CTA row */}
                  <tfoot>
                    <tr className="bg-stone-900">
                      <td className="py-4 px-6"><span className="font-body text-[0.78rem] text-stone-400">अभी शुरू करें →</span></td>
                      {plans.map((plan: any) => (
                        <td key={plan.id} className="text-center py-4 px-4">
                          <a href={'https://wa.me/919XXXXXXXXX?text=' + encodeURIComponent('मुझे ' + plan.name + ' प्लान चाहिए।')} target="_blank" rel="noopener" className={'inline-block px-4 py-2 text-white font-body font-bold text-[0.72rem] rounded-lg transition-all ' + plan.ctaBg}>{plan.name} चुनें</a>
                        </td>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Mobile: Premium stacked cards */}
            <div className="md:hidden space-y-4">
              {plans.map((plan: any) => (
                <div key={plan.id} className={'rounded-2xl border-2 overflow-hidden ' + plan.border + (plan.popular ? ' ring-2 ring-amber-400' : '')}>
                  {plan.popular && (<div className="bg-gradient-to-r from-amber-500 to-orange-500 py-1 text-center"><span className="text-[0.62rem] font-bold text-white uppercase tracking-wider">⭐ सबसे लोकप्रिय</span></div>)}
                  <div className={'bg-gradient-to-b ' + plan.gradient + ' p-4'}>
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
                      <div className="flex items-center gap-2">
                        <span className="text-[1.3rem]">{plan.icon}</span>
                        <span className="font-display text-[1.05rem] font-bold text-stone-900">{plan.name}</span>
                      </div>
                      <span className="font-display text-[1.15rem] font-bold text-red-600">{plan.price}<span className="text-[0.7rem] text-stone-400 font-normal">{plan.period}</span></span>
                    </div>
                    {comparisonRows.filter(r => !r.section).map((row) => {
                      const val = getFeatureValue(plan.features, row.key, row.type);
                      const isYes = row.type === 'boolean' ? val === true : val !== '—';
                      return (
                        <div key={row.key} className={'flex items-center justify-between py-1.5 ' + (isYes ? '' : 'opacity-40')}>
                          <span className="font-body text-[0.72rem] text-stone-600">{row.label}</span>
                          {row.type === 'boolean' ? (
                            isYes ? (<span className="text-[0.72rem] text-green-600 font-bold">✓</span>) : (<span className="text-[0.72rem] text-stone-300">✗</span>)
                          ) : (
                            <span className={'font-body text-[0.72rem] font-semibold ' + (isYes ? 'text-stone-700' : 'text-stone-300')}>{val as string}</span>
                          )}
                        </div>
                      );
                    })}
                    <a href={'https://wa.me/919XXXXXXXXX?text=' + encodeURIComponent('मुझे ' + plan.name + ' प्लान चाहिए।')} target="_blank" rel="noopener" className={'flex items-center justify-center gap-2 w-full py-2.5 mt-4 text-white font-body font-bold text-[0.82rem] rounded-xl ' + plan.ctaBg}>{plan.cta}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10 md:py-14 px-4 md:px-6 bg-stone-50">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-display text-[1.3rem] font-bold text-stone-900 mb-6 text-center">अक्सर पूछे जाने वाले प्रश्न</h2>
            <div className="space-y-3">
              {[
                { q: 'लिस्टिंग कितने समय में लाइव होती है?', a: 'Basic लिस्टिंग 24-48 घंटे में लाइव हो जाती है। Silver, Gold और Platinum लिस्टिंग भुगतान पुष्टि के बाद 24 घंटे के अंदर लाइव की जाती है।' },
                { q: 'क्या मैं बाद में प्लान अपग्रेड कर सकता हूँ?', a: 'हाँ, किसी भी समय अपग्रेड कर सकते हैं। अपग्रेड पर शेष अवधि का प्रो-रेटा समायोजन होगा।' },
                { q: 'भुगतान कैसे करें?', a: 'UPI, बैंक ट्रांसफ़र, और PhonePe/GPay से भुगतान स्वीकार्य है। WhatsApp पर संपर्क करें।' },
                { q: 'क्या GST अलग से लगेगा?', a: 'हाँ, दर्शाई गई कीमतों पर 18% GST अतिरिक्त लागू होगा।' },
                { q: 'प्राथमिकता रेफ़रल क्या है?', a: 'Platinum सदस्यों को हम सीधे खरीदारों और व्यापारियों से जोड़ते हैं। जब कोई किसान या व्यापारी हमसे आपकी श्रेणी में आपूर्तिकर्ता पूछता है, तो Platinum सदस्यों को पहले रेफ़र किया जाता है।' },
                { q: 'रिफ़ंड पॉलिसी क्या है?', a: 'लिस्टिंग लाइव होने से पहले पूर्ण रिफ़ंड। लाइव होने के बाद कोई रिफ़ंड नहीं।' },
              ].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-stone-200">
                  <h4 className="font-body text-[0.88rem] font-semibold text-stone-800 mb-1.5">{faq.q}</h4>
                  <p className="font-body text-[0.8rem] text-stone-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-10 md:py-14 px-4 md:px-6 bg-gradient-to-br from-red-900 to-orange-800">
          <div className="max-w-[600px] mx-auto text-center">
            <h2 className="font-display text-[clamp(1.3rem,3.5vw,1.8rem)] font-bold text-white mb-3">अभी शुरू करें</h2>
            <p className="font-body text-[0.88rem] text-white/60 mb-6">WhatsApp पर संपर्क करें — हम 24 घंटे में आपकी लिस्टिंग तैयार कर देंगे</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/919XXXXXXXXX?text=मुझे%20डायरेक्टरी%20लिस्टिंग%20के%20बारे%20में%20जानकारी%20चाहिए" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-500 hover:bg-green-600 text-white font-body font-bold text-[0.92rem] rounded-xl transition-colors shadow-lg">💬 WhatsApp पर बात करें</a>
              <Link href="/sampark" className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-body font-semibold text-[0.92rem] rounded-xl transition-colors">📧 ईमेल करें</Link>
            </div>
          </div>
        </section>

        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}

function F(text: string, highlight?: boolean) {
  return (
    <div className="flex items-start gap-2">
      <span className={'text-[0.72rem] mt-0.5 ' + (highlight ? 'text-amber-500' : 'text-green-500')}>✓</span>
      <span className={'font-body text-[0.78rem] leading-snug ' + (highlight ? 'text-stone-900 font-semibold' : 'text-stone-600')}>{text}</span>
    </div>
  );
}

function FNo({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[0.72rem] mt-0.5 text-stone-300">✗</span>
      <span className="font-body text-[0.78rem] text-stone-400 leading-snug">{text}</span>
    </div>
  );
}
