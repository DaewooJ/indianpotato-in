import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata, generateListingJsonLd } from '@/lib/dir-seo'
import { getEstablishedDisplay } from '@/lib/dir-utils'
import { getCompanyBySlug, getRelatedCompanies } from '@/lib/directory-db'
import { DirBreadcrumbs } from '@/components/directory/DirBreadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { CompanyCard } from '@/components/directory/CompanyCard'
import { WhatsAppButton } from '@/components/directory/WhatsAppButton'
import { EnquiryForm } from '@/components/directory/EnquiryForm'

export const revalidate = 300

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) return {}

  const location = [company.address_city, company.address_state].filter(Boolean).join(', ')
  const name = company.name_hi || company.name
  const title = `${company.name}${location ? ` — ${location}` : ''}`
  const description = `${name}${location ? ` ${location} में` : ''} — प्रोफ़ाइल, संपर्क विवरण, उत्पाद और सेवाएँ IndianPotato.in पर देखें।`

  return generateDirMetadata({ title, description, path: `/directory/${categorySlug}/${slug}` })
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { category: categorySlug, slug } = await params
  const company = await getCompanyBySlug(slug)
  if (!company) notFound()

  const cat = company.categories
  if (!cat || cat.slug !== categorySlug) notFound()

  const relatedCompanies = await getRelatedCompanies(company.category_id, company.slug)

  const catName = cat.name_hi || cat.name_en
  const companyName = company.name_hi || company.name
  const location = [company.address_city, company.address_state].filter(Boolean).join(', ')
  const fullAddress = [company.address_street, company.address_city, company.address_district, company.address_state].filter(Boolean).join(', ')
  const description = company.description_hi || company.description
  const established = getEstablishedDisplay(null) // companies table may not have year_established yet

  const jsonLd = generateListingJsonLd({
    ...company,
    category: categorySlug,
  }, catName)

  return (
    <>
      <Navbar />
      <main className="pt-[64px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DirBreadcrumbs
            items={[
              { label: catName, href: `/directory/${cat.slug}` },
              { label: companyName },
            ]}
          />

          {/* Header Section */}
          <section className="pb-6 border-b border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {company.logo_url ? (
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-xl border border-gray-200">
                  <img src={company.logo_url} alt={`${company.name} logo`} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#05420d] font-bold text-3xl">
                  {company.name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {companyName}
                  </h1>
                  {company.name !== companyName && (
                    <span className="text-lg text-gray-400 mt-1">({company.name})</span>
                  )}
                  <div className="flex items-center gap-1.5 mt-1">
                    {company.verified && <Badge variant="verified" />}
                    {(company.tier === 'premium' || company.tier === 'platinum') && <Badge tier={company.tier} />}
                  </div>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
                  {location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {location}
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {company.whatsapp && (
                    <WhatsAppButton phone={company.whatsapp} companyName={companyName} />
                  )}
                  {company.phone && (
                    <a
                      href={`tel:${company.phone}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      कॉल करें
                    </a>
                  )}
                  {company.email && (
                    <a
                      href={`mailto:${company.email}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      ईमेल
                    </a>
                  )}
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      वेबसाइट
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Two-Column Content */}
          <div className="flex flex-col lg:flex-row gap-8 pb-12">
            {/* Left Column */}
            <div className="flex-1 space-y-8">
              {description && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">परिचय</h2>
                  <div className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                    {description}
                  </div>
                </section>
              )}

              {company.products && company.products.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">उत्पाद और सेवाएँ</h2>
                  <div className="flex flex-wrap gap-2">
                    {company.products.map((item) => (
                      <span key={item} className="inline-flex items-center rounded-full bg-[#f0fdf4] text-[#05420d] px-3 py-1 text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:w-[340px] xl:w-[380px] shrink-0 space-y-5">
              <div className="lg:sticky lg:top-20 space-y-5">
                {/* Contact Card */}
                <Card hover={false}>
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 mb-4">संपर्क जानकारी</h3>
                    <div className="space-y-3">
                      {fullAddress && (
                        <div className="flex items-start gap-3">
                          <MapPin className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                          <address className="text-sm text-gray-500 not-italic leading-relaxed">
                            {fullAddress}
                          </address>
                        </div>
                      )}
                      {company.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <a href={`tel:${company.phone}`} className="text-sm text-[#05420d] hover:underline">{company.phone}</a>
                        </div>
                      )}
                      {company.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                          <a href={`mailto:${company.email}`} className="text-sm text-[#05420d] hover:underline break-all">{company.email}</a>
                        </div>
                      )}
                      {company.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-400 shrink-0" />
                          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#05420d] hover:underline break-all">
                            {company.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Enquiry Form */}
                <Card hover={false}>
                  <CardContent>
                    <EnquiryForm companyName={companyName} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Companies */}
          {relatedCompanies.length > 0 && (
            <section className="border-t border-gray-200 pt-10 pb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                अन्य {catName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedCompanies.map((r) => (
                  <CompanyCard
                    key={r.slug}
                    name={r.name_hi || r.name}
                    slug={r.slug}
                    categorySlug={categorySlug}
                    description={r.description}
                    city={r.address_city}
                    state={r.address_state}
                    planTier={r.tier}
                    isVerified={r.verified}
                    isFeatured={r.featured}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
