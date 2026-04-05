import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata, generateCategoryJsonLd } from '@/lib/dir-seo'
import { formatNumber } from '@/lib/dir-utils'
import { getCompaniesByCategory } from '@/lib/directory-db'
import { INDIAN_STATES } from '@/lib/directory'
import { DirBreadcrumbs } from '@/components/directory/DirBreadcrumbs'
import { CompanyCard } from '@/components/directory/CompanyCard'
import { FilterSidebar } from '@/components/directory/FilterSidebar'
import { Button } from '@/components/ui/Button'

export const revalidate = 300

interface PageProps {
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params
  const { category } = await getCompaniesByCategory(categorySlug)
  if (!category) return {}

  const name = category.name_hi || category.name_en
  return generateDirMetadata({
    title: `${name} — आलू उद्योग डायरेक्टरी | इंडियन पोटैटो`,
    description: category.description_hi || category.description_en || `भारत में ${name} — आलू उद्योग डायरेक्टरी में खोजें।`,
    path: `/directory/${category.slug}`,
  })
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category: categorySlug } = await params
  const sp = await searchParams

  const query = typeof sp.q === 'string' ? sp.q : undefined
  const stateFilter = typeof sp.state === 'string' ? sp.state : undefined

  const { category, companies } = await getCompaniesByCategory(categorySlug, {
    query,
    state: stateFilter,
  })

  if (!category) notFound()

  const catName = category.name_hi || category.name_en
  const catDesc = category.description_hi || category.description_en
  const totalCount = companies.length

  const categoryJsonLd = generateCategoryJsonLd(
    { name: catName, slug: category.slug, description: catDesc },
    companies.map((c) => ({ slug: c.slug, name: c.name_hi || c.name }))
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
              {category.emoji} {catName}
            </h1>
            {catDesc && (
              <p className="mt-2 text-white/80 leading-relaxed max-w-3xl">
                {catDesc}
              </p>
            )}
            <p className="mt-2 text-sm text-white/60">
              {formatNumber(totalCount)} {totalCount === 1 ? 'कंपनी' : 'कंपनियाँ'} लिस्टेड
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DirBreadcrumbs items={[{ label: catName }]} />

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-12">
            <div className="lg:w-1/3 xl:w-1/4">
              <FilterSidebar states={INDIAN_STATES} />
            </div>

            <div className="flex-1">
              {companies.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto h-16 w-16 rounded-full bg-[#f0fdf4] flex items-center justify-center mb-4">
                    <span className="text-2xl">🥔</span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    अभी कोई कंपनी लिस्टेड नहीं है
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    IndianPotato पर पहली {catName} कंपनी बनें!
                  </p>
                  <Link href="/directory/submit" className="mt-4 inline-block">
                    <Button variant="primary" size="md">
                      अपनी कंपनी जोड़ें
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companies.map((c) => (
                    <CompanyCard
                      key={c.slug}
                      name={c.name_hi || c.name}
                      slug={c.slug}
                      categorySlug={categorySlug}
                      description={c.description_hi || c.description}
                      city={c.address_city}
                      state={c.address_state}
                      planTier={c.tier}
                      isVerified={c.verified}
                      isFeatured={c.featured}
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
