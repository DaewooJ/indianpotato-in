import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata, generateOrganizationJsonLd } from '@/lib/dir-seo'
import { formatNumber } from '@/lib/dir-utils'
import { Button } from '@/components/ui/Button'
import { CategoryCard } from '@/components/directory/CategoryCard'
import { SearchBar } from '@/components/directory/SearchBar'
import { DIRECTORY_CATEGORIES, getCategoryCounts, getAllListings } from '@/lib/directory'

export const metadata: Metadata = generateDirMetadata({
  title: 'भारत का आलू उद्योग डायरेक्टरी — इंडियन पोटैटो',
  description:
    'भारत भर में सत्यापित आलू कंपनियाँ खोजें — बीज आपूर्तिकर्ता, प्रसंस्करण, निर्यातक, कोल्ड स्टोरेज, उपकरण निर्माता और अन्य। भारत की सबसे बड़ी B2B आलू उद्योग डायरेक्टरी।',
  path: '/directory',
})

export default function DirectoryPage() {
  const dirCounts = getCategoryCounts()
  const totalListings = getAllListings().length
  const categories = DIRECTORY_CATEGORIES.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    nameEn: cat.nameEn,
    icon: cat.icon,
    description: cat.description,
    count: dirCounts[cat.slug] || 0,
  }))

  const orgJsonLd = generateOrganizationJsonLd()

  return (
    <>
      <Navbar />
      <main className="pt-[64px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {/* Hero */}
        <section className="relative bg-[#05420d] text-white">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                भारत का आलू उद्योग डायरेक्टरी
              </h1>
              <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed">
                सत्यापित बीज कंपनियाँ, प्रसंस्करण, निर्यातक, उपकरण निर्माता और अन्य — पूरे भारत में खोजें
              </p>

              <div className="mt-8">
                <SearchBar categories={categories} />
              </div>

              <p className="mt-6 text-sm text-white/60">
                {formatNumber(totalListings)} कंपनियाँ {categories.length} श्रेणियों में
              </p>
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              श्रेणी के अनुसार खोजें
            </h2>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              आलू मूल्य श्रृंखला के सभी खंडों में कंपनियाँ खोजें
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#f0fdf4]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                भारत की सबसे बड़ी आलू डायरेक्टरी पर अपनी कंपनी लिस्ट करें
              </h2>
              <p className="mt-3 text-gray-500 leading-relaxed">
                सैकड़ों आलू उद्योग व्यवसाय पहले से IndianPotato.in पर लिस्टेड हैं। खरीदारों और भागीदारों द्वारा खोजे जाएँ।
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/directory/submit">
                  <Button variant="primary" size="lg">
                    अपनी कंपनी जोड़ें
                  </Button>
                </Link>
                <Link href="/directory/pricing">
                  <Button variant="outline" size="lg">
                    प्लान देखें
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
