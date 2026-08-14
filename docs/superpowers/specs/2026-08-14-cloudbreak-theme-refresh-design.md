# Refonte thème "Cloudbreak" + animation d'intro — Design

Date : 2026-08-14

## Contexte

Handoff design reçu (`~/Downloads/design_handoff_portfolio_home_staging/`) : palette chaude-neutre "Personal Brand · Cloudbreak" en remplacement du violet actuel. Prototype HTML haute-fidélité (`Portfolio Home Staging.dc.html`) + feuille de tokens (`design-system/colors_and_type.css`) ne couvrant que la Home, mais destiné à toute l'app.

Objectif : re-thème complet (couleurs + typo), toute l'app (FR/EN, toutes les pages), sans reconstruire la structure existante — la structure actuelle colle déjà à la maquette. Ajout d'une animation d'ouverture (vidéo) à la première visite de session uniquement.

## Décisions

- **Largeur max des sections** : 1280px (valeur de la maquette, "final" selon le README, malgré l'incohérence avec le design-system global à 1200px — décision arbitrée : la maquette prime).
- **Scope** : toutes les pages FR/EN héritent des nouveaux tokens (couleurs/typo/rayons/ombres) sans changement de mise en page — remap de variables CSS, pas de rebuild.
- **Animation d'intro** : persistance `sessionStorage` (une fois par session de navigateur, pas par visite éternelle). Home uniquement (`/fr/`, `/en/`).
- **Un seul commit final**, poussé seulement après validation explicite de l'utilisateur post-test local.

## Approche technique

Remap des variables existantes dans `src/styles/global.css` (`--gray-0`…`--gray-999`, `--accent-*`, `--font-*`) vers la nouvelle palette chaude, en conservant les mêmes noms de variables — tous les composants qui les référencent héritent automatiquement du nouveau thème sans être réécrits.

### Mapping des tokens

**Mode clair** (`:root`) :
| Variable actuelle | Rôle actuel | Nouvelle valeur | Source |
|---|---|---|---|
| `--gray-999` | bg page | `#E9E4DA` | `--linen-whisper` (bg) |
| `--gray-900` | bg élevé/cards clairs | `#F7F5F1` | `--ivory-highlight` (surface) |
| `--gray-800` | bordures/rules | `rgba(26,26,26,0.10)` | `--rule` |
| `--gray-400` | texte muted | `#5E5E5E` | `--fg-muted` |
| `--gray-100` | titres | `#1A1A1A` | `--fg` |
| `--gray-0` | texte fort | `#1A1A1A` | `--fg` |
| `--accent-regular` | accent principal | `#B28C6E` | `--accent` (warm-umber) |
| `--accent-light` / `--accent-dark` | variantes gradient | `#D2BA9C` / `#B28C6E` | `--accent-soft` / `--accent` |
| `--accent-text-over` | texte sur accent | `#FFFFFF` | blanc, cohérent maquette |
| `--font-body` | corps | `"Inter", ...` | design-system |
| `--font-brand` | titres | `"Josefin Sans", ...` | design-system |

**Mode sombre** (`:root.theme-dark`) : même logique avec les valeurs dark du design-system (`--deep-anthracite` #1A1A1A en bg, `--char-card` #353334 en surface, `--accent` #C9A484 lifted umber pour contraste AA).

Nouvelle variable ajoutée : `--dev-pill-bg: #B28C6E` (fixe, ne bascule pas avec le thème — utilisée uniquement par le pill "Développeur" du Hero, cas explicitement documenté dans le handoff).

### Fonts

Remplacer le lien Google Fonts CDN (Public Sans/Rubik) dans `MainHead.astro` (fr + en) par les fichiers locaux déjà fournis dans le handoff (`design-system/fonts/*.woff2` → copiés vers `public/fonts/`) : Josefin Sans (variable, 100-900), Inter (variable, 100-900), JetBrains Mono (variable, 100-800, si besoin d'un tag mono quelque part).

### Composants à toucher explicitement (au-delà du remap de variables)

- **Hero** (`Hero.astro` fr/en, ou le composant contenant les pills) : pill "Développeur" passe sur `--dev-pill-bg` fixe + texte blanc, au lieu de suivre `--accent-regular`.
- **Skills** (feature strip) : icônes actuellement en remplissage dégradé (`gradient` prop d'`Icon.astro`) → style contour (bordure 1.5px `--accent`, fond transparent, icône `--accent`), badge 40×40px. Garder le jeu d'icônes existant (`terminal-window`, `brain`, `strategy`), pas de bascule vers Lucide.

### Animation d'intro

Nouveau composant (`IntroAnimation.astro` ou équivalent), inséré uniquement dans les layouts de la Home FR/EN :

1. Au montage, vérifier `sessionStorage.getItem('introPlayed')`. Si présent → ne rien afficher.
2. Sinon : afficher un overlay plein écran (`position: fixed; inset: 0; z-index` élevé) contenant un `<video>` autoplay muet, sans contrôles.
3. Choix du fichier : thème courant (déjà déterminé par le script inline de `MainHead.astro`, classe `theme-dark` sur `<html>`) × largeur d'écran (`matchMedia('(min-width: 50em)')`, seuil déjà utilisé dans `Nav.astro`) → un des 4 fichiers dans `public/intro/` :
   - clair + desktop → `Portfolio Opening Animation light.mp4`
   - sombre + desktop → `Portfolio Opening Animation desktop dark.mp4`
   - clair + mobile → `Portfolio Opening Animation Mobile ligth.mp4`
   - sombre + mobile → `Portfolio Opening Animation Mobile dark.mp4`
4. À la fin de la vidéo (`ended` event) : `sessionStorage.setItem('introPlayed', '1')`, fade-out de l'overlay (transition CSS courte), suppression du DOM.
5. Fallback : si la vidéo échoue à charger (`error` event) ou timeout raisonnable, marquer comme jouée et ne rien bloquer — ne jamais empêcher l'accès au site.

## Hors scope

- Retouche des images placeholder (portrait/projets déjà réels sur le site actuel, pas des placeholders — inchangés).
- Wiring d'un CMS/contenu dynamique pour les projets (déjà en dur via `src/content/work/`, inchangé).
- Refonte structurelle de la nav, footer, CTA au-delà du remap de couleurs (layout actuel conservé).

## Critères de succès

- Testé en local (`astro dev` via le panneau preview) en clair et sombre, desktop et mobile, avant tout commit.
- Un seul commit, poussé uniquement après validation explicite d'Alexandre.
- Toutes les pages FR/EN reflètent la nouvelle palette (pas seulement la Home).
- L'animation d'intro ne joue qu'une fois par session, jamais au simple rechargement (F5) de la même page dans le même onglet.
