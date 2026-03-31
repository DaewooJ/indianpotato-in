# CLAUDE.md — indianpotato.in Project Rules

This file contains mandatory rules for ALL work on indianpotato.in. Read this BEFORE making any changes.

---

## PROJECT OVERVIEW

- **Site:** https://www.indianpotato.in (ALWAYS use www version)
- **Language:** Hindi (hi-IN). All user-facing content in Hindi unless specified otherwise.
- **Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Vercel (Mumbai bom1)
- **Repo:** ~/Desktop/indianpotato-in
- **Blog CMS:** Markdown files in `content/blog/`
- **Directory:** JSON files in `content/directory/[category]/`
- **Blog lib:** `@/lib/blog` (NOT lib/posts.ts — that doesn't exist)
- **Deploy:** `git push` → Vercel auto-deploys. NEVER run `npm run build` locally.
- **OS:** macOS zsh — use `sed -i ''` not `sed -i`

---

## DESIGN RULES

- **NO BLACK anywhere** — white background, red accent only
- **Primary color:** Red #dc2626
- **Gradient:** from-red-700 to-red-600 (NO orange gradient on hero banners)
- **Fonts:** Noto Sans Devanagari (Hindi), DM Sans (English) — loaded via next/font/google
- **Layout stacking:** Use `flexDirection: 'column'` not CSS grid when blocks should be vertical
- **Logo:** 🥔 emoji + "इंडियन पोटैटो" text

---

## SEO RULES — MANDATORY FOR EVERY PAGE

### Every new page MUST have:

1. **Metadata export** (server component) with:
   ```typescript
   export const metadata: Metadata = {
     title: 'पेज का शीर्षक — इंडियन पोटैटो | English Keywords',  // 50-60 chars
     description: 'Hindi description with keywords, 120-160 chars',
     alternates: {
       canonical: 'https://www.indianpotato.in/[path]',
     },
     openGraph: {
       title: 'Same as title or shorter',
       description: 'Same as meta description',
       url: 'https://www.indianpotato.in/[path]',
       type: 'website',  // or 'article' for blog posts
       locale: 'hi_IN',
       siteName: 'Indian Potato',
       images: [{ url: 'https://www.indianpotato.in/og-image.jpg' }],
     },
     twitter: {
       card: 'summary_large_image',
       title: 'Same as title',
       description: 'Same as meta description',
     },
   }
   ```

2. **BreadcrumbList JSON-LD** using `components/Breadcrumbs.tsx`:
   ```typescript
   import { BreadcrumbJsonLd, BreadcrumbNav } from '@/components/Breadcrumbs'
   
   // In the component:
   <BreadcrumbJsonLd items={[
     { name: 'होम', url: 'https://www.indianpotato.in' },
     { name: 'पेज का नाम', url: 'https://www.indianpotato.in/[path]' },
   ]} />
   <BreadcrumbNav items={[
     { name: 'होम', url: '/' },
     { name: 'पेज का नाम', url: '/[path]' },
   ]} />
   ```

3. **Exactly ONE H1 tag** per page — keyword-rich, in Hindi

4. **Proper H2/H3 hierarchy** — no skipping levels

5. **All images must have Hindi alt text** — descriptive, keyword-rich

6. **Internal links** — link to at least 2-3 related pages/posts within content

7. **Server-side rendering** — pages with metadata MUST be server components. If interactivity is needed, use server wrapper + client child pattern:
   ```
   app/[page]/page.tsx      ← Server component with metadata export
   components/[Page]Client.tsx  ← Client component with 'use client'
   ```

---

## BLOG POST RULES

### Frontmatter format (content/blog/[slug].md):
```yaml
---
title: "Hindi title here"
excerpt: "2-3 line Hindi excerpt for meta description and cards"
date: "YYYY-MM-DD"
category: "उत्पादन|निर्यात|नीति|तकनीक|अनुसंधान|राज्य|प्रसंस्करण|बाज़ार"
image: "/images/[filename].jpg"
author: "Indian Potato Team"
tags: ["Hindi tag 1", "Hindi tag 2", "Hindi tag 3"]
featured: true|false
---
```

### Frontmatter rules:
- ❌ No `template` or `stats` fields
- ❌ No markdown tables — use bullet lists with **bold labels** and pipe separators
- ✅ Blockquote callouts (`>`) for key facts
- ✅ `<details><summary><strong>` HTML accordion for FAQ sections
- ✅ Sources section at bottom: `<p style="font-size:12px;color:#999;line-height:1.5;margin-top:8px">` after `---` divider
- ✅ Featured image inserted ONCE in article body (before first data/specs `##` section) with descriptive Hindi alt text

### Blog post creation (terminal):
```bash
cat > content/blog/filename.md << 'ENDOFFILE'
---
frontmatter here
---

body content here

ENDOFFILE
git add -A && git commit -m "post: short description" && git push
```

### Featured images:
```bash
cp ~/Downloads/filename.jpg public/images/filename.jpg
# Push separately if missed
```

---

## DIRECTORY LISTING RULES

### JSON file location: `content/directory/[category]/[slug].json`

### Tier styling:
- **Platinum** = red accent + 💎 badge
- **Gold** = amber accent + 👑 badge  
- **Silver** = standard styling
- **Basic** = compact, no action buttons

### Required fields:
- Company name (Hindi + English)
- Location (city, state)
- Category
- Tier level
- Contact info
- Description in Hindi

### WhatsApp CTA: `+919499668831`
### WhatsApp group: `https://spuds.me/kisan`

---

## STRUCTURED DATA RULES

### Always include appropriate JSON-LD:

| Page Type | Required Schema |
|-----------|----------------|
| All pages | BreadcrumbList (multi-level) |
| Blog posts | NewsArticle (already in [slug]/page.tsx) |
| Directory listings | LocalBusiness |
| /directory | CollectionPage |
| /yojnaye | FAQPage |
| /about | Person (founder) |
| /samachar | ItemList |
| Layout | Organization + WebSite + SearchAction |

### When adding NEW schema types:
```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObject) }}
/>
```

---

## ROBOTS & AI SEO RULES

### robots.ts allows these bots (DO NOT block any):
GPTBot, ChatGPT-User, Google-Extended, Claude-Web, anthropic-ai, CCBot, PerplexityBot, Bytespider, Applebot, Bingbot, YouBot, cohere-ai, Meta-ExternalAgent, Amazonbot, OAI-SearchBot

### /api/ is disallowed for all bots

### llms.txt exists at public/llms.txt — update when adding major new sections

### RSS feed at /feed.xml — auto-generates from blog posts

---

## URL & DOMAIN RULES

- ALWAYS use `https://www.indianpotato.in` (with www)
- Canonical URLs must match the page path exactly
- Sitemap at `https://www.indianpotato.in/sitemap.xml`
- When adding new static pages, ADD them to `app/sitemap.ts`
- No trailing slashes in URLs

---

## CONTACT INFO (use in content when needed)

- General: info@indpotato.com
- Ads: ads@indpotato.com
- News: news@indpotato.com
- WhatsApp: +91 94996 68831
- Founder: Devendra Kumar Jha, Co-Founder and Director
- LinkedIn: https://www.linkedin.com/in/potatoes/
- Company: Indpotato Pvt Ltd, Pimpri-Chinchwad, Pune

---

## POST-TASK SEO CHECKLIST

**After creating or modifying ANY page, blog post, or directory listing, ALWAYS run this checklist and show the summary:**

```
═══════════════════════════════════════════════
  SEO CHECKLIST — [Page/Post Name]
═══════════════════════════════════════════════
  
  META TAGS
  □ Title tag present (50-60 chars)        → [PASS/FAIL] "[actual title]" ([X] chars)
  □ Meta description (120-160 chars)       → [PASS/FAIL] "[first 50 chars...]" ([X] chars)
  □ Canonical URL set correctly            → [PASS/FAIL] [URL]
  □ OG tags complete (title, desc, url, image, locale) → [PASS/FAIL]
  □ Twitter card tags present              → [PASS/FAIL]
  
  CONTENT
  □ Exactly 1 H1 tag                       → [PASS/FAIL]
  □ H2/H3 hierarchy correct               → [PASS/FAIL]
  □ All images have Hindi alt text         → [PASS/FAIL] ([X]/[Y] images have alt)
  □ Internal links to related content      → [PASS/FAIL] ([X] internal links)
  □ Featured image in body (blog posts)    → [PASS/FAIL]
  
  STRUCTURED DATA
  □ BreadcrumbList JSON-LD                 → [PASS/FAIL]
  □ Page-specific schema (if applicable)   → [PASS/FAIL] [schema type]
  
  TECHNICAL
  □ Server component (not 'use client')    → [PASS/FAIL]
  □ Added to sitemap.ts (if new page)      → [PASS/FAIL]
  □ URL uses www.indianpotato.in           → [PASS/FAIL]
  □ No black colors used                   → [PASS/FAIL]
  □ Hindi language content                 → [PASS/FAIL]
  
  BLOG-SPECIFIC (if applicable)
  □ Frontmatter complete                   → [PASS/FAIL]
  □ No markdown tables (use bullet lists)  → [PASS/FAIL]
  □ Sources section at bottom              → [PASS/FAIL]
  □ FAQ accordion if applicable            → [PASS/FAIL]
  
  SCORE: [X]/[Y] checks passed
═══════════════════════════════════════════════
```

**Show this checklist EVERY TIME after completing work. Do not skip it.**

---

## FILE EDITING PREFERENCES

- Prefer Python scripts via `tee` for complex file edits
- Use `sed -i ''` for macOS (not `sed -i`)
- Avoid `sed` for slug/replace operations — use Python `.replace()` instead
- Never run local builds — always push to GitHub, let Vercel build
- Watch for duplicate files (e.g., "page 2.tsx") from copy-paste errors — remove them
