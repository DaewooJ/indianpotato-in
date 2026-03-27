import { MetadataRoute } from 'next';
import { DIRECTORY_CATEGORIES, getAllListings } from '@/lib/directory';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indianpotato.in';
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/mandi', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/samachar', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/kisme', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/yojnaye', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/directory', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/sampark', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];
  const categoryPages: MetadataRoute.Sitemap = DIRECTORY_CATEGORIES.map((cat) => ({
    url: baseUrl + '/directory/' + cat.slug,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  const listings = getAllListings();
  const listingPages: MetadataRoute.Sitemap = listings.map((listing) => ({
    url: baseUrl + '/directory/' + listing.category + '/' + listing.slug,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  return [...staticPages, ...categoryPages, ...listingPages];
}
