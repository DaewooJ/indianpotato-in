/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
  async redirects() {
    return [
      // Non-www → www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'indianpotato.in' }],
        destination: 'https://www.indianpotato.in/:path*',
        permanent: true,
      },

      // Old blog posts → /samachar
      { source: '/odisha-farmers-trained-on-potato-cultivation-at-cpri-shimla', destination: '/samachar', permanent: true },
      { source: '/future-of-potatoes-in-india-perspective-from-simon-heck', destination: '/samachar', permanent: true },
      { source: '/potato-farmer-iqbals-opinion-on-potato-farming', destination: '/samachar', permanent: true },
      { source: '/history-of-potatoes', destination: '/samachar', permanent: true },
      { source: '/indias-processed-potato-export-market', destination: '/samachar', permanent: true },
      { source: '/bangladeshs-potato-crisis-deepens', destination: '/samachar', permanent: true },
      { source: '/the-surge-in-kazakhstans-potato-imports', destination: '/samachar', permanent: true },
      { source: '/excess-potato-stock-in-farrukhabad-cold-stores', destination: '/samachar', permanent: true },
      { source: '/latest-potato-news', destination: '/samachar', permanent: true },
      { source: '/international-potato-centre-partners-with-haryana-government', destination: '/samachar', permanent: true },
      { source: '/faces-behind-the-potato-industry-dr-brajesh-singh', destination: '/samachar', permanent: true },
      { source: '/uttar-pradesh-processing-to-boom-with-potatoes', destination: '/samachar', permanent: true },
      { source: '/millionaire-farmer-of-india-awards-for-potato', destination: '/samachar', permanent: true },
      { source: '/dr-brajesh-singh', destination: '/samachar', permanent: true },
      { source: '/potato-starch-market-declines-in-asia', destination: '/samachar', permanent: true },
      { source: '/uniagri-biosciences-growing-better-potatoes', destination: '/samachar', permanent: true },
      { source: '/the-story-of-santana-potato-in-india', destination: '/samachar', permanent: true },
      { source: '/perus-iron-rich-potatoes-to-be-in-india', destination: '/samachar', permanent: true },
      { source: '/faces-behind-potato-brands-davinder-dosanjh', destination: '/samachar', permanent: true },
      { source: '/punjab-indias-seed-bowl-for-potatoes', destination: '/samachar', permanent: true },
      { source: '/how-indian-potatoes-are-reinventing', destination: '/samachar', permanent: true },
      { source: '/bareilly-and-potato-production', destination: '/samachar', permanent: true },
      { source: '/potato-export-from-india', destination: '/samachar', permanent: true },
      { source: '/jain-irrigation-potato-seeds', destination: '/samachar', permanent: true },
      { source: '/potato-price-volatility-across-india', destination: '/mandi', permanent: true },
      { source: '/increase-potato-yield-through-nutrient-management', destination: '/samachar', permanent: true },
      { source: '/increase-potato-yield-through-nutrient-management/:path*', destination: '/samachar', permanent: true },
      { source: '/potato-farmers-losses-mount-in-west-bengal', destination: '/samachar', permanent: true },
      { source: '/jain-irrigation-cultivating-the-future-of-potato-farming-in-india', destination: '/samachar', permanent: true },
      { source: '/soundararadjane-s', destination: '/samachar', permanent: true },
      { source: '/cpri-kufri-chipbharat-1-new-processing-variety', destination: '/kisme', permanent: true },

      // Old people pages → /about
      { source: '/nripendrajha', destination: '/about', permanent: true },
      { source: '/nripendra-jha', destination: '/about', permanent: true },

      // Bihar/ICAR posts → matching Hindi posts
      { source: '/bihars-lady-rosetta-potato-expansion-scheme', destination: '/samachar/bihar-lady-rosetta-yojana', permanent: true },
      { source: '/indias-four-new-potato-varieties-by-cpri', destination: '/samachar/icar-new-potato-varieties', permanent: true },

      // Old variety pages → /kisme
      { source: '/variety', destination: '/kisme', permanent: true },
      { source: '/variety/:path*', destination: '/kisme', permanent: true },
      { source: '/company_variety/:path*', destination: '/kisme', permanent: true },

      // Old seed company pages → /directory/seed-suppliers
      { source: '/seed-company', destination: '/directory/seed-suppliers', permanent: true },
      { source: '/seed-company/:path*', destination: '/directory/seed-suppliers', permanent: true },
      { source: '/seed-companies', destination: '/directory/seed-suppliers', permanent: true },
      { source: '/potato-seed-companies', destination: '/directory/seed-suppliers', permanent: true },
      { source: '/potato-seed-companies-2', destination: '/directory/seed-suppliers', permanent: true },
      { source: '/seed-com-test-1-4', destination: '/directory/seed-suppliers', permanent: true },
      { source: '/kavyapotato', destination: '/directory/seed-suppliers/kavya-agro-potato-seed-sikandrabad', permanent: true },

      // Old state pages → /samachar
      { source: '/state/punjab', destination: '/samachar', permanent: true },
      { source: '/state/uttar-pradesh', destination: '/samachar', permanent: true },
      { source: '/state/:path*', destination: '/samachar', permanent: true },

      // Old WordPress junk → homepage
      { source: '/tbuilder-layout-part/:path*', destination: '/', permanent: true },
      { source: '/home-2', destination: '/', permanent: true },
      { source: '/home-4', destination: '/', permanent: true },

      // Old WordPress system URLs → homepage
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-json/:path*', destination: '/', permanent: true },
      { source: '/country_of_origin/:path*', destination: '/', permanent: true },

      // Magazines → /samachar
      { source: '/magazines', destination: '/samachar', permanent: true },
      { source: '/magazines/:path*', destination: '/samachar', permanent: true },

      // Old Hindi slug URLs
      { source: '/%E0%A4%AA%E0%A5%81%E0%A4%A3%E0%A5%87-%E0%A4%95%E0%A5%87-%E0%A4%B8%E0%A4%A4%E0%A4%97%E0%A4%BE%E0%A4%82%E0%A4%B5-%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A5%87%E0%A4%A4%E0%A5%8D%E0%A4%B0-%E0%A4%95%E0%A5%87', destination: '/samachar', permanent: true },
      { source: '/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4-%E0%A4%95%E0%A4%BE-2024-25-%E0%A4%AE%E0%A5%87%E0%A4%82-%E0%A4%86%E0%A4%B2%E0%A5%82-%E0%A4%89%E0%A4%A4%E0%A5%8D%E0%A4%AA%E0%A4%BE%E0%A4%A6%E0%A4%A8', destination: '/samachar/india-potato-production-2024-25', permanent: true },
      { source: '/%E0%A4%85%E0%A4%B8%E0%A4%AE-%E0%A4%94%E0%A4%B0-%E0%A4%AA%E0%A5%87%E0%A4%AA%E0%A5%8D%E0%A4%B8%E0%A4%BF%E0%A4%95%E0%A5%8B-%E0%A4%94%E0%A4%B0-%E0%A4%86%E0%A4%B2%E0%A5%82', destination: '/samachar', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Content-Language', value: 'hi' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://crm.zoho.in; style-src 'self' 'unsafe-inline'; font-src 'self' data:; img-src 'self' data: https: blob:; connect-src 'self' https://api.data.gov.in https://www.google-analytics.com https://crm.zoho.in; frame-src https://crm.zoho.in https://crm.zohopublic.in;" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
