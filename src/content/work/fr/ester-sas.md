---
title: ESTER SAS
publishDate: 2026-06-07 00:00:00
img: /assets/ester-sas.png
img_alt: Page d'accueil du site ESTER SAS
project_url: https://ester-gap.fr/
description: |
  Bureau d'ingénierie structurelle fondé en 1977, invisible sur Google. J'ai construit leur site de zéro avec un focus SEO local pour qu'ils remontent sur les recherches autour de Gap.
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
lang: 'fr'
---

### Objectif

ESTER SAS est un bureau d'ingénierie structurelle basé à Gap, dans les Hautes-Alpes, fondé en 1977. Présent depuis des décennies sur le terrain, il était invisible sur le web. La mission : **créer une présence en ligne qui remonte en tête des résultats locaux** quand un architecte ou maître d'ouvrage cherche un bureau d'études structure à Gap.

### SEO & performance — le cœur du projet

Le référencement local et la performance technique étaient les priorités n°1, pas un bonus de fin de projet.

**Score Lighthouse 100** sur les quatre axes (Performance, Accessibilité, Bonnes pratiques, SEO) — obtenu en production, pas seulement en local.

Pour y arriver :

- **Zéro dépendance JavaScript inutile** — vanilla JS pur, pas de framework. Aucun bundle à parser, First Contentful Paint quasi instantané.
- **Polices auto-hébergées** en `woff2`, préchargées via `<link rel="preload">` — aucune requête Google Fonts, CLS à zéro.
- **Images optimisées** — formats modernes, dimensions explicites pour éviter le layout shift.
- **HTML sémantique strict** — hiérarchie de titres, landmarks ARIA, balises `<address>`, `<time>`, microdonnées Schema.org pour l'entreprise locale (LocalBusiness).
- **Meta tags complets** — title, description, Open Graph, Twitter Card, `hreflang` FR/EN pour la version bilingue.
- **Sitemap XML + robots.txt** générés et exposés pour l'indexation.
- **Core Web Vitals dans le vert** — LCP < 1 s, INP minimal, CLS 0.

### Stack technique

- **Front-end** : HTML5, CSS (design tokens, composants), JavaScript vanilla
- **Bundler** : Vite (tree-shaking, assets hachés, cache HTTP long terme)
- **Hébergement** : Netlify avec CDN global et HTTPS automatique
- **CMS réalisations** : Notion API — les projets sont gérés dans Notion et injectés au build
- **Avis Google** : Google Places API — avis récupérés et affichés automatiquement
- **Mailer** : Resend + Netlify Function pour le formulaire de contact
- **Internationalisation** : moteur i18n maison (`data-i18n`), `hreflang` correctement déclaré

### Autres fonctionnalités

- Visualisation SVG des sommets alpins environnants (Pic de Bure, Vieux Chaillol…) en hero — identité visuelle locale forte
- Section réalisations paginée, alimentée dynamiquement depuis Notion
- Formulaire de contact avec pièce jointe (CV pour candidatures)
- CI/CD GitHub Actions : tests Vitest 100 % coverage, build, déploiement automatique

### Bilan

Un site conçu de bout en bout pour la visibilité locale : chaque décision technique — stack vanilla, hébergement CDN, sémantique HTML, Schema.org — a été prise en fonction de son impact SEO mesurable. Le résultat est un score Lighthouse parfait et une base solide pour que ESTER remonte sur les requêtes à forte intention locale dans les Hautes-Alpes.

### Liens

- [Site en ligne](https://ester-gap.fr/)
