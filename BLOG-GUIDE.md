# indianpotato.in — Blog Post Creation Guide

## Site: https://www.indianpotato.in
## Repo: github.com/DaewooJ/indianpotato-in
## Stack: Next.js 14, Vercel, Hindi-only

## How to create a new blog post:

1. Create .md file in content/blog/ with frontmatter
2. Add featured image to public/images/
3. git add -A && git commit -m "new post: title" && git push
4. Vercel auto-deploys in 1 minute

## Template:
```
---
title: "शीर्षक"
excerpt: "1-2 वाक्य सारांश"
date: "YYYY-MM-DD"
category: "production|export|policy|technology|research|state|market|processing"
image: "/images/filename.jpg"
author: "Indian Potato Team"
tags: ["टैग1", "टैग2"]
featured: false
---

Content in markdown...
```

## Categories: production, export, policy, technology, research, state, market, processing
## Design: Red-orange theme (#dc2626 → #f97316), premium hero banner, CTA section, share buttons
## SEO: JSON-LD NewsArticle, OG tags with image, Twitter cards, auto-sitemap
## Style reference: Like indianpotato.com Bihar article but in red theme and Hindi
