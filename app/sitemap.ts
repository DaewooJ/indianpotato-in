import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';
import { getAllPosts } from '@/lib/blog';

const DIRECTORY_CATEGORY_SLUGS = [
  'seed-companies',
  'processors',
  'exporters',
  'equipment',
  'cold-storage',
  'input-suppliers',
  'research',
  'associations',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.indianpotato.in';
  const now = new Date();

  // ─── Static pages ─────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: baseUrl + '/mandi', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/samachar', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/kisme', lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/yojnaye', lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: baseUrl + '/directory', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: baseUrl + '/directory/pricing', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: baseUrl + '/directory/submit', lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: baseUrl + '/directory/claim', lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: baseUrl + '/sampark', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: baseUrl + '/about', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: baseUrl + '/privacy-policy', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: baseUrl + '/terms-and-conditions', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: baseUrl + '/disclaimer', lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  // ─── Blog posts ───────────────────────────────────────────
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: baseUrl + '/samachar/' + post.slug,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ─── Directory category pages ─────────────────────────────
  const categoryPages: MetadataRoute.Sitemap = DIRECTORY_CATEGORY_SLUGS.map((slug) => ({
    url: baseUrl + '/directory/' + slug,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ─── Company profiles from Supabase ───────────────────────
  let companyPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from('companies')
      .select('slug, categories(slug)')
      .eq('active', true)
      .eq('status', 'approved');

    if (data) {
      companyPages = data
        .filter((c: any) => c.slug && c.categories?.slug)
        .map((c: any) => ({
          url: baseUrl + '/directory/' + c.categories.slug + '/' + c.slug,
          lastModified: now,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        }));
    }
  } catch {
    // Silently continue if Supabase is unavailable — static pages still work
  }

  // ─── State pages ──────────────────────────────────────────
  const statePages: MetadataRoute.Sitemap = [
    { url: baseUrl + '/state/uttar-pradesh', lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  return [...staticPages, ...blogPages, ...categoryPages, ...companyPages, ...statePages];
}
