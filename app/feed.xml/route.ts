import { getAllPosts } from '@/lib/blog';

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://www.indianpotato.in/samachar/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">https://www.indianpotato.in/samachar/${post.slug}</guid>
      <category>${post.category_hindi}</category>
    </item>`
    )
    .join('');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>इंडियन पोटैटो — आलू उद्योग समाचार</title>
    <link>https://www.indianpotato.in</link>
    <description>भारतीय आलू उद्योग की ताज़ा ख़बरें, मंडी अपडेट, सरकारी योजनाएँ और उद्योग समाचार</description>
    <language>hi</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.indianpotato.in/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
