import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';
import { getAllListings, DIRECTORY_CATEGORIES } from '@/lib/directory';

const KEY = 'b102bc251d964fb685b36653e4c60a8a';
const HOST = 'www.indianpotato.in';

export async function GET() {
  const posts = getAllPosts();
  const listings = getAllListings();

  const urls: string[] = [
    `https://${HOST}`,
    `https://${HOST}/mandi`,
    `https://${HOST}/samachar`,
    `https://${HOST}/kisme`,
    `https://${HOST}/yojnaye`,
    `https://${HOST}/directory`,
    `https://${HOST}/sampark`,
    `https://${HOST}/about`,
    ...posts.map((p) => `https://${HOST}/samachar/${p.slug}`),
    ...DIRECTORY_CATEGORIES.map((c) => `https://${HOST}/directory/${c.slug}`),
    ...listings.map((l) => `https://${HOST}/directory/${l.category}/${l.slug}`),
  ];

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key: KEY,
        keyLocation: `https://${HOST}/${KEY}.txt`,
        urlList: urls.slice(0, 10000),
      }),
    });

    return NextResponse.json({
      status: res.status,
      submitted: urls.length,
      message: res.status === 200 || res.status === 202 ? 'Submitted successfully' : 'Check IndexNow status',
    });
  } catch (e) {
    return NextResponse.json({ error: 'IndexNow submission failed' }, { status: 500 });
  }
}
