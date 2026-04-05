import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Phone, Mail, Globe, Calendar } from 'lucide-react'
import Navbar from '@/components/Navbar'
import { Footer } from '@/components/Sections'
import { generateDirMetadata, generateListingJsonLd } from '@/lib/dir-seo'
import { getEstablishedDisplay } from '@/lib/dir-utils'
import { getCategoryConfig, getListingBySlug, getListingsByCategory } from '@/lib/directory'
import { DirBreadcrumbs } from '@/components/directory/DirBreadcrumbs'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { CompanyCard } from '@/components/directory/CompanyCard'
import { WhatsAppButton } from '@/components/directory/WhatsAppButton'
import { EnquiryForm } from '@/components/directory/EnquiryForm'

interface PageProps {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params
  const listing = getListingBySlug(categorySlug, slug)
  if (!listing) return {}

  const location = [listing.districtEn || listing.district, listing.stateEn || listing.state].filter(Boolean).join(', ')
  const title = `${listing.nameEn || listing.name}${location ? ` — ${location}` : ''}`
  const description = `${listing.nameEn || listing.name}${location ? ` ${location} में` : ''} — प्रोफ़ाइल, संपर्क विवरण, उत्पाद और सेवाएँ IndianPotato.in पर देखें।`

  return generateDirMetadata({ title, description, path: `/directory/${categorySlug}/${slug}` })
}

export default async function CompanyProfilePage({ params }: PageProps) {
  const { category: categorySlug, slug } = await params
  const listing = getListingBySlug(categorySlug, slug)
  if (!listing) notFound()

  const config = getCategoryConfig(categorySlug)
  if (!config) notFound()

  const allInCategory = getListingsByCategory(categorySlug)
  const relatedListings = allInCategory.filter((l) => l.slug !== slug).slice(0, 4)

  const location = [listing.districtEn || listing.district, listing.stateEn || listing.state].filter(Boolean).join(', ')
  const fullAddress = [listing.address, listing.district, listing.state].filter(Boolean).join(', ')
  const established = getEstablishedDisplay(listing.established as any)
  const hasPhone = listing.phone && listing.phone.length > 0

  const jsonLd = generateListingJsonLd(listing, config.name)

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
              { label: config.name, href: `/directory/${config.slug}` },
              { label: listing.name },
            ]}
          />

          {/* Header Section */}
          <section className="pb-6 border-b border-gray-200 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-xl bg-[#f0fdf4] text-[#05420d] font-bold text-3xl">
                {(listing.nameEn || listing.name).charAt(0).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {listing.name}
                  </h1>
                  {listing.nameEn && listing.nameEn !== listing.name && (
                    <span className="text-lg text-gray-400 mt-1">({listing.nameEn})</span>
                  )}
                  {listing.featured && <Badge variant="verified" />}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-500">
                  {location && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {location}
                    </span>
                  )}
                  {established && (
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {established}
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {hasPhone && listing.phone![0] && (
                    <WhatsAppButton phone={listing.phone![0]} companyName={listing.name} />
                  )}
                  {hasPhone && (
                    <a
                      href={`tel:${listing.phone![0]}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      कॉल करें
                    </a>
                  )}
                  {listing.email && (
                    <a
                      href={`mailto:${listing.email}`}
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      ईमेल
                    </a>
                  )}
                  {listing.website && (
                    <a
                      href={listing.website}
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
              {listing.description && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">परिचय</h2>
                  <div className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                    {listing.description}
                  </div>
                </section>
              )}

              {listing.specialization && listing.specialization.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">उत्पाद और सेवाएँ</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.specialization.map((item) => (
                      <span key={item} className="inline-flex items-center rounded-full bg-[#f0fdf4] text-[#05420d] px-3 py-1 text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {listing.certifications && listing.certifications.length > 0 && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">प्रमाणपत्र</h2>
                  <div className="flex flex-wrap gap-2">
                    {listing.certifications.map((cert) => (
                      <span key={cert} className="inline-flex items-center gap-1.5 rounded-full border border-[#05420d]/20 bg-white px-3 py-1 text-sm font-medium text-[#05420d]">
                        {cert}
                      </span>
                    ))}
                  </div>
                </section>
              )}

              {listing.capacity && (
                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">व्यवसाय विवरण</h2>
                  <div className="text-sm text-gray-500">
                    <p><strong>क्षमता:</strong> {listing.capacity}</p>
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
                      {hasPhone && listing.phone!.map((ph, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                          <a href={`tel:${ph}`} className="text-sm text-[#05420d] hover:underline">{ph}</a>
                        </div>
                      ))}
                      {listing.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                          <a href={`mailto:${listing.email}`} className="text-sm text-[#05420d] hover:underline break-all">{listing.email}</a>
                        </div>
                      )}
                      {listing.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-400 shrink-0" />
                          <a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#05420d] hover:underline break-all">
                            {listing.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Enquiry Form */}
                <Card hover={false}>
                  <CardContent>
                    <EnquiryForm companyName={listing.name} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Companies */}
          {relatedListings.length > 0 && (
            <section className="border-t border-gray-200 pt-10 pb-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                अन्य {config.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedListings.map((related) => (
                  <CompanyCard
                    key={related.slug}
                    name={related.name}
                    slug={related.slug}
                    categorySlug={categorySlug}
                    description={related.description}
                    city={related.districtEn || related.district}
                    state={related.stateEn || related.state}
                    isFeatured={related.featured || false}
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
