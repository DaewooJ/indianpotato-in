import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://indianpotato.in';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/mandi`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.95 },
    { url: `${baseUrl}/samachar`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/kisme`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/yojnaye`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/directory`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/sampark`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  // In production, you'd dynamically add blog/article URLs here
  // const articles = getArticleSlugs().map(slug => ({
  //   url: `${baseUrl}/samachar/${slug}`,
  //   lastModified: new Date(),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.7,
  // }));

  return [...staticPages];
}
