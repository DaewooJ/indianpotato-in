import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string; title: string; excerpt: string; content: string; date: string;
  category: string; category_hindi: string; image: string; author: string;
  tags: string[]; featured: boolean; readingTime: number;
}

const CATEGORY_HINDI: Record<string, string> = {
  production: 'उत्पादन', export: 'निर्यात', policy: 'नीति', technology: 'तकनीक',
  research: 'अनुसंधान', state: 'राज्य', market: 'बाज़ार', processing: 'प्रसंस्करण', general: 'सामान्य',
};

function calcReadingTime(content: string): number {
  return Math.max(1, Math.ceil(content.length / 800));
}

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
}

export function getAllPosts(): BlogPost[] {
  ensureBlogDir();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));
  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    const category = data.category || 'general';
    return {
      slug, title: data.title || 'बिना शीर्षक', excerpt: data.excerpt || content.slice(0, 200) + '…',
      content, date: data.date ? new Date(data.date).toISOString().split('T')[0] : '2026-01-01',
      category, category_hindi: CATEGORY_HINDI[category] || category,
      image: data.image || '/images/news-featured.jpg', author: data.author || 'इंडियन पोटैटो',
      tags: data.tags || [], featured: data.featured === true, readingTime: calcReadingTime(content),
    };
  });
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  ensureBlogDir();
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const category = data.category || 'general';
  return {
    slug, title: data.title || 'बिना शीर्षक', excerpt: data.excerpt || content.slice(0, 200) + '…',
    content, date: data.date ? new Date(data.date).toISOString().split('T')[0] : '2026-01-01',
    category, category_hindi: CATEGORY_HINDI[category] || category,
    image: data.image || '/images/news-featured.jpg', author: data.author || 'इंडियन पोटैटो',
    tags: data.tags || [], featured: data.featured === true, readingTime: calcReadingTime(content),
  };
}

export function getCategories(): { name: string; hindi: string; count: number }[] {
  const posts = getAllPosts();
  const catMap = new Map<string, number>();
  for (const p of posts) catMap.set(p.category, (catMap.get(p.category) || 0) + 1);
  return Array.from(catMap.entries()).map(([name, count]) => ({ name, hindi: CATEGORY_HINDI[name] || name, count }));
}

export function getAllSlugs(): string[] {
  ensureBlogDir();
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, ''));
}
