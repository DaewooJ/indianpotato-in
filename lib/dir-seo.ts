import { BRAND } from '@/lib/dir-constants'
import { getCanonicalUrl } from '@/lib/dir-utils'
import type { Metadata } from 'next'

interface BaseMetadataOptions {
  title: string
  description: string
  path: string
  image?: string
  noIndex?: boolean
}

export function generateDirMetadata({ title, description, path, image, noIndex = false }: BaseMetadataOptions): Metadata {
  const canonical = getCanonicalUrl(path)
  const ogImage = image || 'https://www.indianpotato.in/og-image.jpg'

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: BRAND.nameEn,
      locale: 'hi_IN',
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  }
}

export function generateListingJsonLd(listing: any, categoryName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': getCanonicalUrl(`/directory/${listing.category}/${listing.slug}`),
    name: listing.name || listing.nameEn,
    description: listing.description,
    url: listing.website || getCanonicalUrl(`/directory/${listing.category}/${listing.slug}`),
    ...(listing.email && { email: listing.email }),
    ...(listing.phone && listing.phone[0] && { telephone: listing.phone[0] }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address || undefined,
      addressLocality: listing.district || listing.districtEn || undefined,
      addressRegion: listing.state || listing.stateEn || undefined,
      addressCountry: 'IN',
    },
    additionalType: categoryName,
  }
}

export function generateCategoryJsonLd(category: any, listings: any[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: category.name,
    description: category.description,
    url: getCanonicalUrl(`/directory/${category.slug}`),
    numberOfItems: listings.length,
    itemListElement: listings.map((listing: any, index: number) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: getCanonicalUrl(`/directory/${category.slug}/${listing.slug}`),
      name: listing.name || listing.nameEn,
    })),
  }
}

export function generateBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'होम', item: BRAND.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'डायरेक्टरी', item: getCanonicalUrl('/directory') },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 3,
        name: item.name,
        item: getCanonicalUrl(item.path),
      })),
    ],
  }
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.company,
    url: BRAND.siteUrl,
    logo: `${BRAND.siteUrl}/logo.png`,
    description: BRAND.description,
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: BRAND.email },
  }
}
