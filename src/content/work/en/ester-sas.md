---
title: ESTER SAS
publishDate: 2026-06-07 00:00:00
img: /assets/ester-sas.png
img_alt: ESTER SAS website homepage
project_url: https://ester-gap.fr/
description: |
  A structural engineering firm founded in 1977, invisible on Google. I built their site from scratch with a local SEO focus to get them ranking on searches around Gap.
tags:
  - Freelance
  - SEO
  - Performance
  - Vanilla JS
  - Vite
  - Netlify
  - Notion API
  - Google Places API
  - Resend
  - CSS
lang: "en"
---

### Goal

ESTER SAS is a structural engineering firm based in Gap, in the French Alps, founded in 1977. Despite decades of local expertise, they had zero web presence. The mission: **build a site that ranks at the top of local search results** when an architect or project owner looks for a structural engineer in Gap.

### SEO & performance — the core of the project

Local SEO and technical performance were priority #1, not an afterthought.

**Lighthouse score: 100** across all four categories (Performance, Accessibility, Best Practices, SEO) — measured in production, not just locally.

How it was achieved:

- **Zero unnecessary JavaScript** — pure vanilla JS, no framework. Nothing to parse, near-instant First Contentful Paint.
- **Self-hosted fonts** in `woff2`, preloaded via `<link rel="preload">` — no Google Fonts request, CLS at zero.
- **Optimized images** — modern formats, explicit dimensions to eliminate layout shift.
- **Strict semantic HTML** — proper heading hierarchy, ARIA landmarks, `<address>`, `<time>`, Schema.org structured data (LocalBusiness) for Google's local knowledge graph.
- **Complete meta tags** — title, description, Open Graph, Twitter Card, `hreflang` FR/EN for the bilingual version.
- **XML sitemap + robots.txt** exposed for crawling and indexing.
- **Core Web Vitals in the green** — LCP < 1 s, minimal INP, CLS 0.

### Tech stack

- **Frontend**: HTML5, CSS (design tokens, components), vanilla JavaScript
- **Bundler**: Vite (tree-shaking, hashed assets, long-term HTTP cache)
- **Hosting**: Netlify with global CDN and automatic HTTPS
- **Projects CMS**: Notion API — projects managed in Notion, injected at build time
- **Google reviews**: Google Places API — fetched and displayed automatically
- **Mailer**: Resend + Netlify Function for the contact form
- **Internationalization**: custom i18n engine (`data-i18n`), `hreflang` correctly declared

### Other features

- SVG visualization of surrounding Alpine peaks (Pic de Bure, Vieux Chaillol…) in the hero — strong local visual identity
- Paginated projects section, dynamically fed from Notion
- Contact form with file attachment (CV for job applications)
- CI/CD with GitHub Actions: 100% Vitest coverage, automated build and deploy

### Takeaways

Every technical decision — vanilla stack, CDN hosting, semantic HTML, Schema.org — was made with measurable SEO impact in mind. The result is a perfect Lighthouse score and a solid foundation for ESTER to rank on high-intent local queries across the Hautes-Alpes region.

### Links

- [Live website](https://ester-gap.fr/)
