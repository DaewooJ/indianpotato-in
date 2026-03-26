# इंडियन पोटैटो — indianpotato.in

भारत का प्रमुख आलू उद्योग मंच — Hindi-only potato industry platform.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Hosting**: Vercel (Mumbai region — bom1)
- **Fonts**: Tiro Devanagari Hindi + Noto Sans Devanagari + DM Sans

## Project Structure

```
indianpotato-in/
├── app/
│   ├── layout.tsx          # Root layout with full Hindi SEO meta + JSON-LD
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles + Tailwind
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # Robots.txt (AI crawlers allowed)
│   ├── mandi/page.tsx      # मंडी भाव (Market Prices)
│   ├── samachar/page.tsx   # समाचार (News listing)
│   ├── samachar/[slug]/    # Individual article pages
│   ├── kisme/page.tsx      # किस्में (Potato Varieties)
│   ├── yojnaye/page.tsx    # सरकारी योजनाएँ (Govt Schemes)
│   ├── directory/page.tsx  # उद्योग डायरेक्टरी
│   └── sampark/page.tsx    # संपर्क (Contact + form)
├── components/
│   ├── Navbar.tsx          # Responsive nav with mobile menu
│   ├── NewsTicker.tsx      # Breaking news ticker
│   ├── Hero.tsx            # Hero section with stats
│   ├── MandiPrices.tsx     # Mandi prices with state filter
│   └── Sections.tsx        # GovSchemes, News, Varieties, WhatsApp CTA, Footer
├── content/articles/       # Markdown articles (add .md files here)
├── public/                 # Static assets (logo, icons, OG image)
├── vercel.json             # Vercel deployment config
├── next.config.js
├── tailwind.config.js
└── package.json
```

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Option 2: GitHub Integration (Recommended)
1. Push this code to a GitHub repository
2. Go to vercel.com → New Project → Import from GitHub
3. Vercel auto-detects Next.js — click Deploy
4. Add custom domain: indianpotato.in

### Custom Domain Setup
1. In Vercel dashboard → Project → Settings → Domains
2. Add `indianpotato.in`
3. Update DNS at your domain registrar:
   - **A Record**: `76.76.21.21`
   - **CNAME**: `cname.vercel-dns.com` (for www subdomain)

## SEO Features

- ✅ Hindi `<html lang="hi">` attribute
- ✅ Full Open Graph meta (hi_IN locale)
- ✅ JSON-LD structured data (WebSite + Organization + BreadcrumbList)
- ✅ Dynamic sitemap.xml generation
- ✅ AI crawler-friendly robots.txt (GPTBot, Claude-Web, PerplexityBot allowed)
- ✅ Semantic HTML with proper heading hierarchy
- ✅ `hreflang` alternate for English site (indianpotato.com)
- ✅ PWA manifest for mobile install
- ✅ Theme color (#dc2626)

## Adding Blog Articles

Create `.md` files in `content/articles/`:

```markdown
---
title: "भारत में आलू उत्पादन 60.18 मिलियन टन"
date: "2026-03-24"
tag: "उत्पादन"
description: "2024-25 सीज़न में रिकॉर्ड उत्पादन"
---

आपका लेख यहाँ लिखें...
```

## Color Theme

| Color | Hex | Usage |
|-------|-----|-------|
| Red 600 | `#dc2626` | Primary brand, CTAs, headings |
| Red 700 | `#b91c1c` | Logo text, dark accents |
| Red 900 | `#7f1d1d` | Hero gradient start |
| Orange 500 | `#f97316` | Hero gradient end, accent |
| Orange 600 | `#ea580c` | Section labels, secondary CTA |
| Green (WhatsApp) | `#25D366` | WhatsApp buttons only |

## Next Steps

- [ ] Add real mandi price API integration (agmarknet.gov.in)
- [ ] Set up markdown blog engine with gray-matter + remark
- [ ] Add Google Analytics 4
- [ ] Create OG image template (1200x630)
- [ ] Add WhatsApp share deeplinks
- [ ] Connect contact form to email service
- [ ] Add search functionality
- [ ] Add state-wise interactive map
