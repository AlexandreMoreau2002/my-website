# Déploiement du portfolio sur le VPS OVH — Design

Date : 2026-08-14

## Contexte

Le portfolio (`my-website`, Astro 6 statique, bilingue FR/EN) est actuellement déployé uniquement sur Firebase Hosting. Le VPS OVH d'Alexandre héberge déjà trois autres projets perso (Quest, Cloudbreak, Snoroc) via Dokploy (PaaS self-hosted). Objectif : ajouter le portfolio comme quatrième projet sur ce même VPS, en vue de retoucher sa direction artistique dans un second temps.

Doc de référence VPS : `docs/infra-serveur.md` du projet Quest (source de vérité infra partagée).

## Décisions

- **Coexistence avec Firebase** : les deux hébergements restent actifs en parallèle. Firebase reste la prod actuelle ; le VPS devient un nouvel environnement pour itérer (notamment sur la DA) sans toucher au live. Pas de bascule de nom de domaine, pas de changement sur `firebase.json`.
- **Domaine** : `nip.io` temporaire, cohérent avec Quest/Cloudbreak/Snoroc — pas de vrai nom de domaine réservé pour le portfolio pour l'instant.
- **Déclenchement du déploiement** : webhook GitHub réel sur push vers `main` (seule branche existante sur ce repo, pas de git-flow comme Quest). Vérifier explicitement l'existence du webhook côté `Settings → Webhooks` du repo — ne pas se fier au seul flag `autoDeploy: true` de Dokploy (piège déjà rencontré sur Cloudbreak et Snoroc).
- **Type d'app Dokploy** : **Static**, pas Nixpacks ni Dockerfile custom. Le site est un export statique (`astro.config.mjs` → `output: 'static'`), donc pas besoin de process Node permanent — économise la RAM sur un serveur sans swap (2 vCPU / 3.7 Go).

## Architecture

Nouveau projet Dokploy isolé, au même niveau que Quest / Cloudbreak / Snoroc :

```
Dokploy
├── Quest (existant)
├── Cloudbreak (existant)
├── Snoroc (existant)
└── portfolio (nouveau)
    └── portfolio-web — type Static, repo my-website, branche main
```

### Config de l'app `portfolio-web`

| | |
|---|---|
| Repo | `AlexandreMoreau2002/my-website` |
| Branche | `main` |
| Build command | `npm run build` (déjà `npm install && astro check && astro build` dans `package.json`) |
| Output dir | `dist` |
| Domaine | `https://portfolio-alexandre.51.178.37.35.nip.io` |
| HTTPS | Traefik / Let's Encrypt automatique (géré par Dokploy) |

## Flux de déploiement

1. Push sur `main` du repo `my-website`
2. Webhook GitHub → `http://51.178.37.35:3000/api/deploy/{refreshToken}`
3. Dokploy build (`npm run build`) et sert `dist/` en statique
4. HTTPS automatique via Traefik

## Documentation à produire/mettre à jour

- `docs/infra-serveur.md` (projet Quest) : ajouter une section "portfolio" au même format que Quest (projectId, applicationId de `portfolio-web`, domaine, particularités) — c'est la doc de référence unique du VPS partagé.
- `docs/deploiement-vps.md` (ce repo, `my-website`) : comment redéployer manuellement, où voir les logs, comment déboguer un build cassé — pour rester utilisable même en ouvrant ce repo isolément.
- `CLAUDE.md` global (`~/.claude`) : déjà couvert par la règle ajoutée le 2026-08-14 (section "VPS OVH (projets perso)") — pas de changement structurel supplémentaire nécessaire tant qu'aucun nouvel accès/règle d'usage partagé n'apparaît.

## Hors scope (explicitement reporté)

- Retouche de la direction artistique (DA) du portfolio — sujet séparé, traité dans un second temps une fois la maquette prête.
- Achat d'un vrai nom de domaine pour le portfolio.
- Suppression ou migration de Firebase Hosting.

## Critères de succès

- `https://portfolio-alexandre.51.178.37.35.nip.io` sert le site en HTTPS, contenu identique à la version Firebase actuelle.
- Un push sur `main` déclenche un redéploiement automatique vérifiable (nouveau build visible dans les logs Dokploy).
- `docs/infra-serveur.md` et `docs/deploiement-vps.md` à jour et committés.
