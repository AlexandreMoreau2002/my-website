# Refonte thème "Cloudbreak" + animation d'intro — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Adaptation au domaine** : ceci est un projet de re-thème visuel (CSS/tokens), pas de logique métier testable unitairement. Chaque tâche remplace l'étape "test qui échoue / test qui passe" par une **vérification visuelle** dans le panneau navigateur (`preview_start` sur `astro dev`, thème clair + sombre, desktop + mobile). C'est la forme de TDD appropriée ici : on regarde AVANT de conclure qu'une étape fonctionne.
>
> **Contrainte du propriétaire** : tout le travail de ce plan doit finir en **UN SEUL commit**, et ce commit ne doit être **ni créé ni poussé** avant validation explicite d'Alexandre après démonstration locale. Chaque tâche modifie des fichiers en local sans committer — le commit final est une tâche à part, en toute fin, gatée par une confirmation utilisateur.

**Goal :** Appliquer la nouvelle palette/typo "Cloudbreak" (chaude, neutre) à tout le site (FR/EN), remplacer les fonts Google Fonts par les fonts locales fournies, ajuster 3 composants pour coller à la maquette (pill Développeur fixe, icônes du feature strip en contour, portrait hero), et ajouter une animation vidéo d'ouverture (une fois par session, home uniquement).

**Architecture :** Remap des variables CSS existantes dans `global.css` (mêmes noms, nouvelles valeurs) pour que la majorité des composants héritent automatiquement du nouveau thème sans être modifiés. Ajustements ciblés uniquement sur les 4 fichiers où la maquette diverge visiblement du style actuel (Pill, Skills, index hero, nouveau composant vidéo).

**Tech Stack :** Astro 6 (statique), CSS custom properties, pas de framework CSS.

---

### Task 1: Copier les fonts locales et les vidéos d'intro

**Files:**
- Create: `public/fonts/JosefinSans-Variable.woff2` (copié depuis le handoff)
- Create: `public/fonts/Inter-Variable.woff2` (copié depuis le handoff)
- Create: `public/fonts/JetBrainsMono-Variable.woff2` (copié depuis le handoff)
- Modify (renommage) : les 4 fichiers dans `public/intro/` → noms kebab-case sans espaces

- [ ] **Étape 1 : copier les fonts**

```bash
cd "/Users/alexandremoreau/Library/Mobile Documents/com~apple~CloudDocs/Desktop/dev/my-website"
mkdir -p public/fonts
cp "/Users/alexandremoreau/Downloads/design_handoff_portfolio_home_staging/design-system/fonts/JosefinSans-400.woff2" public/fonts/JosefinSans-Variable.woff2
cp "/Users/alexandremoreau/Downloads/design_handoff_portfolio_home_staging/design-system/fonts/Inter-300.woff2" public/fonts/Inter-Variable.woff2
cp "/Users/alexandremoreau/Downloads/design_handoff_portfolio_home_staging/design-system/fonts/JetBrainsMono-400.woff2" public/fonts/JetBrainsMono-Variable.woff2
ls -la public/fonts/
```

Vérifier : les 3 fichiers `.woff2` existent dans `public/fonts/`, taille non nulle.

- [ ] **Étape 2 : renommer les vidéos d'intro en kebab-case (pas d'espaces dans une URL)**

```bash
cd "public/intro"
git mv "Portfolio Opening Animation light.mp4" "intro-desktop-light.mp4"
git mv "Portfolio Opening Animation desktop dark.mp4" "intro-desktop-dark.mp4"
git mv "Portfolio Opening Animation Mobile ligth.mp4" "intro-mobile-light.mp4"
git mv "Portfolio Opening Animation Mobile dark.mp4" "intro-mobile-dark.mp4"
ls -la
```

Vérifier : 4 fichiers `intro-{desktop,mobile}-{light,dark}.mp4` présents, tailles inchangées (~300-400KB chacun).

_Pas de commit à cette étape — tout part dans le commit final (Task 7)._

---

### Task 2: Remap des tokens couleur/typo dans `global.css`

**Files:**
- Modify: `src/styles/global.css`

- [ ] **Étape 1 : remplacer le bloc `:root` (mode clair)**

Remplacer les lignes 2-81 par :

```css
/* Global variables */
@font-face {
  font-family: "Josefin Sans";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/JosefinSans-Variable.woff2") format("woff2-variations");
}
@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url("/fonts/Inter-Variable.woff2") format("woff2-variations");
}
@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 100 800;
  font-display: swap;
  src: url("/fonts/JetBrainsMono-Variable.woff2") format("woff2-variations");
}

:root {
  /* Colors — mode clair (palette "Cloudbreak") */
  --gray-0: #1A1A1A;
  --gray-50: #232220;
  --gray-100: #1A1A1A;
  --gray-200: #1A1A1A;
  --gray-300: #5E5E5E;
  --gray-400: #5E5E5E;
  --gray-500: #8A857C;
  --gray-600: #8A857C;
  --gray-700: rgba(26,26,26,0.22);
  --gray-800: rgba(26,26,26,0.10);
  --gray-900: #F7F5F1;
  --gray-999-basis: 39, 30%, 89%;
  --gray-999_40: hsla(var(--gray-999-basis), 0.4);
  --gray-999: #E9E4DA;

  --accent-light: #D2BA9C;
  --accent-regular: #B28C6E;
  --accent-dark: #B28C6E;
  --accent-overlay: rgba(178,140,110,0.33);
  --accent-subtle-overlay: var(--accent-overlay);
  --accent-text-over: #ffffff;

  /* Pill "Développeur" — brun fixe, ne suit jamais le thème */
  --dev-pill-bg: #B28C6E;
  --dev-pill-fg: #ffffff;

  --link-color: var(--accent-regular);

  /* Gradients — retintés en teintes chaudes */
  --gradient-stop-1: var(--accent-light);
  --gradient-stop-2: var(--accent-regular);
  --gradient-stop-3: var(--accent-dark);
  --gradient-subtle: linear-gradient(
    150deg,
    var(--gray-900) 19%,
    var(--gray-999) 150%
  );
  --gradient-accent: linear-gradient(
    150deg,
    var(--gradient-stop-1),
    var(--gradient-stop-2),
    var(--gradient-stop-3)
  );
  --gradient-accent-orange: var(--accent-regular);
  --gradient-stroke: linear-gradient(180deg, var(--gray-900), var(--gray-700));

  /* Shadows — chaudes et discrètes */
  --shadow-sm: 0 1px 2px rgba(26,26,26,0.05), 0 1px 1px rgba(26,26,26,0.03);
  --shadow-md: 0 8px 24px -12px rgba(26,26,26,0.18), 0 2px 6px rgba(26,26,26,0.05);
  --shadow-lg: 0 28px 60px -28px rgba(26,26,26,0.28), 0 4px 12px rgba(26,26,26,0.06);

  /* Text Sizes */
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-md: 1.125rem;
  --text-lg: 1.25rem;
  --text-xl: 1.625rem;
  --text-2xl: 2.125rem;
  --text-3xl: 2.625rem;
  --text-4xl: 3.5rem;
  --text-5xl: 4.5rem;

  /* Fonts */
  --font-system: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  --font-body: "Inter", var(--font-system);
  --font-brand: "Josefin Sans", var(--font-system);
  --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", monospace;

  /* Transitions */
  --theme-transition: 0.24s cubic-bezier(0.22, 0.61, 0.36, 1);
}

:root.theme-dark {
  --gray-0: #F7F5F1;
  --gray-50: #B6B0A6;
  --gray-100: #F7F5F1;
  --gray-200: #F7F5F1;
  --gray-300: #B6B0A6;
  --gray-400: #B6B0A6;
  --gray-500: #807A70;
  --gray-600: #807A70;
  --gray-700: rgba(247,245,241,0.22);
  --gray-800: rgba(247,245,241,0.10);
  --gray-900: #353334;
  --gray-999-basis: 0, 0%, 10%;
  --gray-999: #1A1A1A;

  --accent-light: #D2BA9C;
  --accent-regular: #C9A484;
  --accent-dark: #C9A484;
  --accent-overlay: rgba(201,164,132,0.33);
  --accent-subtle-overlay: rgba(201,164,132,0.2);
  --accent-text-over: #ffffff;

  --link-color: var(--accent-regular);

  --gradient-stop-1: #C9A484;
  --gradient-subtle: linear-gradient(
    150deg,
    var(--gray-900) 19%,
    var(--gray-999) 81%
  );
  --gradient-accent-orange: var(--accent-regular);
  --gradient-stroke: linear-gradient(180deg, var(--gray-600), var(--gray-800));

  --shadow-sm: 0 1px 2px rgba(0,0,0,0.5);
  --shadow-md: 0 10px 28px -12px rgba(0,0,0,0.55);
  --shadow-lg: 0 36px 80px -30px rgba(0,0,0,0.7);
}
```

Note : `--gray-100`/`--gray-200` sont fusionnés sur `--fg` (le design-system Cloudbreak n'a pas de distinction fine à ce niveau, contrairement à l'ancienne échelle violette) — acceptable, aucun composant ne dépend d'une différence visible entre les deux.

- [ ] **Étape 2 : aligner la largeur max sur 1280px**

`.wrapper` fait actuellement `max-width: 83rem` (1328px) — ni la valeur maquette (1280px) ni celle du design-system global (1200px). Remplacer dans `.wrapper` :
```css
.wrapper {
  width: 100%;
  max-width: 80rem; /* 1280px, décision arbitrée : la maquette prime */
  margin-inline: auto;
  padding-inline: 1.5rem;
}
```

- [ ] **Étape 3 : vérifier visuellement**

```bash
# Dans le panneau preview (voir Task 6 pour le détail du setup local)
```
Ouvrir `astro dev`, home FR, basculer clair/sombre via le bouton thème. Vérifier : fond beige clair (#E9E4DA) en clair, anthracite (#1A1A1A) en sombre — plus de violet nulle part.

---

### Task 3: Variante `surface` pour `Pill.astro` (pill "Grimpeur" sans accent)

**Files:**
- Modify: `src/components/fr/Pill.astro`
- Modify: `src/components/en/Pill.astro`
- Modify: `src/pages/fr/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] **Étape 1 : ajouter un prop `variant` à `Pill.astro`** (fr et en, contenu identique)

```astro
---
interface Props {
	variant?: 'accent' | 'surface';
}

const { variant = 'accent' } = Astro.props;
---
<div class:list={['pill', variant]}><slot /></div>

<style>
	.pill {
		display: flex;
		padding: 0.5rem 1rem;
		gap: 0.5rem;
		border-radius: 999rem;
		font-size: var(--text-md);
		line-height: 1.35;
		white-space: nowrap;
	}

	.pill.accent {
		color: var(--dev-pill-fg);
		border: 1px solid var(--dev-pill-bg);
		background-color: var(--dev-pill-bg);
	}

	.pill.surface {
		color: var(--gray-200);
		border: 1px solid var(--gray-800);
		background-color: var(--gray-900);
		box-shadow: inset 0 0 0 1px var(--gray-800);
	}
</style>
```

- [ ] **Étape 2 : passer `variant="surface"` au pill Grimpeur** dans `src/pages/fr/index.astro` et `src/pages/en/index.astro`

```astro
<Pill><Icon icon="code" size="1.33em" /> Developeur</Pill>
<Pill variant="surface"><Icon icon="climbing-logo" size="1.33em" /> Grimpeur</Pill>
```

(en anglais, adapter le texte existant du fichier `en/index.astro` sans changer le texte lui-même — juste ajouter `variant="surface"` au second Pill.)

- [ ] **Étape 3 : vérifier visuellement**

Home FR et EN, clair et sombre : pill "Developeur" reste marron plein (`#B28C6E`) texte blanc **dans les deux thèmes**, pill "Grimpeur" devient neutre (fond `--gray-900`, pas de couleur accent).

---

### Task 4: Icônes du feature strip en style contour (`Skills.astro`)

**Files:**
- Modify: `src/components/fr/Skills.astro`
- Modify: `src/components/en/Skills.astro`

- [ ] **Étape 1 : remplacer chaque `<Icon ... gradient />` par un badge à contour**

Pour chacun des 3 blocs, remplacer :
```astro
<Icon icon="terminal-window" color="var(--accent-regular)" size="2.5rem" gradient />
```
par :
```astro
<span class="icon-badge">
	<Icon icon="terminal-window" color="var(--accent-regular)" size="1.25rem" />
</span>
```
(idem pour `brain` et `strategy`, tailles d'icône identiques).

Ajouter dans le `<style>` :
```css
.icon-badge {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border: 1.5px solid var(--accent-regular);
	border-radius: var(--radius-md, 0.875rem);
	background: transparent;
}
```

- [ ] **Étape 2 : vérifier visuellement**

Feature strip (3 blocs Full Stack / Apprentissage rapide / Esprit stratégique) : icônes maintenant dans un badge à bordure, fond transparent — plus de dégradé violet plein.

---

### Task 5: Portrait hero — radius et ratio alignés sur la maquette (32px, 4:5)

**Files:**
- Modify: `src/pages/fr/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] **Étape 1 : ajuster le style `.hero img`**

Remplacer :
```css
.hero img {
	aspect-ratio: 5 / 4;
	object-fit: cover;
	object-position: center;
	border-radius: 1.5rem;
	box-shadow: var(--shadow-md);
}
```
par :
```css
.hero img {
	aspect-ratio: 4 / 5;
	object-fit: cover;
	object-position: center;
	border-radius: 2rem; /* 32px */
	box-shadow: var(--shadow-md);
}
```
et dans le bloc `@media (min-width: 50em)`, remplacer :
```css
.hero img {
	aspect-ratio: 3 / 4;
	border-radius: 4.5rem;
	object-fit: cover;
}
```
par :
```css
.hero img {
	aspect-ratio: 4 / 5;
	border-radius: 2rem;
	object-fit: cover;
}
```

- [ ] **Étape 2 : vérifier visuellement**

Portrait hero (mobile + desktop) : coins à 32px (nettement moins arrondi que l'ancien 72px desktop qui donnait un effet presque ovale), ratio 4:5 cohérent aux deux breakpoints.

---

### Task 6: Composant animation d'intro (vidéo, une fois par session, home uniquement)

**Files:**
- Create: `src/components/IntroAnimation.astro` (composant partagé, pas de texte donc pas de duplication fr/en nécessaire)
- Modify: `src/pages/fr/index.astro`
- Modify: `src/pages/en/index.astro`

- [ ] **Étape 1 : créer le composant**

```astro
---
// Overlay vidéo plein écran, joué une fois par session de navigateur (sessionStorage),
// uniquement sur la home. 4 variantes : thème (clair/sombre) × viewport (desktop/mobile).
---

<div id="intro-overlay" class="intro-overlay" hidden>
	<video id="intro-video" muted playsinline></video>
</div>

<style>
	.intro-overlay {
		position: fixed;
		inset: 0;
		z-index: 99999;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--gray-999);
		transition: opacity 0.4s ease;
	}

	.intro-overlay.fade-out {
		opacity: 0;
		pointer-events: none;
	}

	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>

<script>
	(function () {
		const SESSION_KEY = 'introPlayed';
		if (sessionStorage.getItem(SESSION_KEY)) return;

		const overlay = document.getElementById('intro-overlay');
		const video = document.getElementById('intro-video') as HTMLVideoElement | null;
		if (!overlay || !video) return;

		const isDark = document.documentElement.classList.contains('theme-dark');
		const isMobile = !window.matchMedia('(min-width: 50em)').matches;

		const file = isMobile
			? (isDark ? 'intro-mobile-dark.mp4' : 'intro-mobile-light.mp4')
			: (isDark ? 'intro-desktop-dark.mp4' : 'intro-desktop-light.mp4');

		video.src = `/intro/${file}`;
		overlay.hidden = false;

		const finish = () => {
			sessionStorage.setItem(SESSION_KEY, '1');
			overlay.classList.add('fade-out');
			setTimeout(() => overlay.remove(), 450);
		};

		video.addEventListener('ended', finish);
		video.addEventListener('error', finish);
		// Filet de sécurité : si la vidéo bloque plus de 8s (réseau lent), ne jamais
		// retenir l'utilisateur hors du site.
		setTimeout(finish, 8000);

		video.play().catch(finish);
	})();
</script>
```

- [ ] **Étape 2 : l'insérer dans les deux home pages**, tout en haut du template (avant `<BaseLayout>` idéalement, ou juste après son ouverture) :

```astro
import IntroAnimation from '../../components/IntroAnimation.astro';
```
```astro
<BaseLayout>
	<IntroAnimation />
	<div class="stack gap-20 lg:gap-48">
	...
```

- [ ] **Étape 3 : vérifier visuellement**

1. Ouvrir la home FR dans un nouvel onglet/session (vider `sessionStorage` via devtools ou navigation privée) : la vidéo se joue plein écran, disparaît en fondu à la fin, contenu de la page visible ensuite.
2. Recharger la même page (F5) sans fermer l'onglet : la vidéo **ne rejoue pas**.
3. Basculer le thème AVANT de recharger en navigation privée : vérifier que la bonne vidéo (clair/sombre) se charge.
4. Réduire la fenêtre en dessous de 50em (mobile) en navigation privée : vérifier que la variante mobile se charge.

---

### Task 7: Vérification finale locale, puis commit unique (gaté par validation utilisateur)

**Files:** aucun nouveau — récapitulatif de tout ce qui a été modifié dans les tasks 1-6.

- [ ] **Étape 1 : lancer le serveur de dev et parcourir tout le site**

Via le panneau preview (`preview_start` avec `astro dev`) : home FR/EN (clair+sombre, desktop+mobile), about, cv, project, une page projet individuelle. Vérifier qu'aucune page n'affiche encore de violet/bleu de l'ancien thème.

- [ ] **Étape 2 : capturer des captures d'écran représentatives** (home clair desktop, home sombre desktop, home mobile) et les montrer à Alexandre.

- [ ] **Étape 3 : attendre la validation explicite d'Alexandre.** Ne pas committer avant.

- [ ] **Étape 4 : une fois validé, un seul commit englobant tout**

```bash
cd "/Users/alexandremoreau/Library/Mobile Documents/com~apple~CloudDocs/Desktop/dev/my-website"
git add -A
git commit -m "feat(theme): apply Cloudbreak warm-neutral palette + intro animation" \
  -m "Remap complet des tokens CSS (couleurs, fonts locales Josefin Sans/Inter/JetBrains Mono) vers la palette chaude-neutre du handoff design, appliqué à tout le site FR/EN. Ajustements ciblés : pill Développeur fixe, icônes feature strip en contour, portrait hero 32px/4:5. Ajoute une animation vidéo d'ouverture (une fois par session, home uniquement, 4 variantes thème×viewport)." \
  -m "Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

- [ ] **Étape 5 : push, seulement si Alexandre le demande explicitement à ce moment-là**

```bash
git push
```
