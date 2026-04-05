import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata, generateCategoryJsonLd } from '@/lib/dir-seo'
import { formatNumber } from '@/lib/dir-utils'
import { DIRECTORY_CATEGORIES, INDIAN_STATES, getListingsByCategory, getCategoryConfig } from '@/lib/directory'
import { DirBreadcrumbs } from '@/components/directory/DirBreadcrumbs'
import { CompanyCard } from '@/components/directory/CompanyCard'
import { FilterSidebar } from '@/components/directory/FilterSidebar'
import { Button } from '@/components/ui/Button'

export function generateStaticParams() {
  return DIRECTORY_CATEGORIES.map((cat) => ({ category: cat.slug }))
}

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const config = getCategoryConfig(categorySlug)
  if (!config) return {}

  return generateDirMetadata({
    title: `${config.name} — आलू उद्योग डायरेक्टरी | इंडियन पोटैटो`,
    description: config.description || `भारत में ${config.name} — आलू उद्योग डायरेक्टरी में खोजें।`,
    path: `/directory/${config.slug}`,
  })
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params
  const sp = await searchParams

  const config = getCategoryConfig(categorySlug)
  if (!config) notFound()

  let listings = getListingsByCategory(categorySlug)

  // Apply search filters
  const query = typeof sp.q === 'string' ? sp.q.toLowerCase() : ''
  const stateFilter = typeof sp.state === 'string' ? sp.state : ''

  if (query) {
    listings = listings.filter((l) =>
      l.name.toLowerCase().includes(query) ||
      (l.nameEn && l.nameEn.toLowerCase().includes(query)) ||
      (l.description && l.description.toLowerCase().includes(query))
    )
  }
  if (stateFilter) {
    listings = listings.filter((l) =>
      l.stateEn === stateFilter || l.state === stateFilter
    )
  }

  // Sort: featured first, then alphabetical
  listings.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    return a.name.localeCompare(b.name, 'hi')
  })

  const totalCount = listings.length

  // JSON-LD
  const categoryJsonLd = generateCategoryJsonLd(
    { name: config.name, slug: config.slug, description: config.description },
    listings
  )

  return (
    <>
      <Navbar />
      <main className="pt-[64px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryJsonLd) }}
        />

        {/* Category Hero Banner */}
        <section className="bg-[#05420d] text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {config.icon} {config.name}
            </h1>
            {config.description && (
              <p className="mt-2 text-white/80 leading-relaxed max-w-3xl">
                {config.description}
              </p>
            )}
            <p className="mt-2 text-sm text-white/60">
              {formatNumber(totalCount)} {totalCount === 1 ? 'कंपनी' : 'कंपनियाँ'} लिस्टेड
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DirBreadcrumbs items={[{ label: config.name }]} />

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-12">
            <div className="lg:w-1/3 xl:w-1/4">
              <FilterSidebar states={INDIAN_STATES} />
            </div>

            <div className="flex-1">
              {listings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto h-16 w-16 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-4">
                    <span className="text-2xl">🥔</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    अभी कोई कंपनी लिस्टेड नहीं है
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    IndianPotato पर पहली {config.name} कंपनी बनें!
                  </p>
                  <Link href="/directory/submit" className="mt-4 inline-block">
                    <Button variant="primary" size="md">
                      अपनी कंपनी जोड़ें
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {listings.map((listing) => (
                    <CompanyCard
                      key={listing.slug}
                      name={listing.name}
                      slug={listing.slug}
                      categorySlug={categorySlug}
                      description={listing.description}
                      city={listing.districtEn || listing.district}
                      state={listing.stateEn || listing.state}
                      isFeatured={listing.featured || false}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
