import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { WhatsAppCTA, Footer } from '@/components/Sections';

// In production, fetch article data from CMS/markdown files
// For now, this is a template showing the article layout

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In production: fetch article by slug and return dynamic metadata
  return {
    title: 'समाचार लेख | इंडियन पोटैटो',
    description: 'भारतीय आलू उद्योग का ताज़ा समाचार',
  };
}

export default function ArticlePage({ params }: Props) {
  return (
    <>
      <Navbar />
      <main className="pt-[76px]">
        <article className="py-16 px-6">
          <div className="max-w-[760px] mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-body text-[0.82rem] text-stone-400 mb-8">
              <Link href="/" className="hover:text-red-600 no-underline text-stone-400">होम</Link>
              <span>/</span>
              <Link href="/samachar" className="hover:text-red-600 no-underline text-stone-400">समाचार</Link>
              <span>/</span>
              <span className="text-stone-600">लेख</span>
            </nav>

            {/* Article Header */}
            <div className="mb-10">
              <span className="inline-block px-3 py-0.5 rounded-md text-[0.72rem] font-bold font-body text-red-600 bg-red-50 mb-4">
                उत्पादन
              </span>
              <h1 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-bold text-stone-900 leading-snug mb-4">
                भारत में आलू उत्पादन 60.18 मिलियन टन — नया रिकॉर्ड
              </h1>
              <div className="flex items-center gap-4 font-body text-[0.85rem] text-stone-400">
                <span>24 मार्च 2026</span>
                <span>·</span>
                <span>5 मिनट पढ़ें</span>
              </div>
            </div>

            {/* Article Body — placeholder */}
            <div className="prose prose-stone max-w-none font-body text-[1.02rem] leading-[1.9] text-stone-700">
              <p>
                यह लेख पेज का टेम्पलेट है। प्रोडक्शन में, यहाँ Markdown या CMS से कंटेंट लोड होगा।
                आप अपने लेख <code>content/articles/</code> फ़ोल्डर में <code>.md</code> फ़ाइलों के रूप में लिख सकते हैं।
              </p>
              <p>
                प्रत्येक लेख में frontmatter (शीर्षक, तिथि, टैग, विवरण) और मुख्य सामग्री होगी।
                Next.js का Static Site Generation इन्हें बिल्ड टाइम पर HTML में बदल देगा —
                जिससे SEO और पेज स्पीड दोनों बेहतर होते हैं।
              </p>
            </div>

            {/* Share buttons */}
            <div className="mt-12 pt-8 border-t border-stone-200">
              <h3 className="font-body text-[0.85rem] font-bold text-stone-500 mb-4">इस लेख को शेयर करें</h3>
              <div className="flex gap-3">
                <a href="#" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-lg font-body text-[0.85rem] font-bold no-underline">
                  💬 WhatsApp
                </a>
                <a href="#" className="inline-flex items-center gap-2 bg-stone-800 text-white px-5 py-2.5 rounded-lg font-body text-[0.85rem] font-bold no-underline">
                  𝕏 Twitter
                </a>
                <a href="#" className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-body text-[0.85rem] font-bold no-underline">
                  📘 Facebook
                </a>
              </div>
            </div>
          </div>
        </article>
        <WhatsAppCTA />
      </main>
      <Footer />
    </>
  );
}
