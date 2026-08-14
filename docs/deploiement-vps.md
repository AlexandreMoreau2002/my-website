# Déploiement sur le VPS OVH

> Doc spécifique à ce repo. Doc infra complète (accès, autres projets hébergés, pièges généraux du VPS) : `dev/quest/docs/infra-serveur.md` et la page Notion « 🖥️ Serveur OVH ».

## Où c'est hébergé

Le portfolio tourne sur le VPS OVH partagé, via **Dokploy** (PaaS self-hosted), en parallèle de Firebase Hosting (qui reste actif — pas de bascule de domaine pour l'instant).

- URL : https://portfolio-alexandre.51.178.37.35.nip.io
- Projet Dokploy : `portfolio` (projectId `aJgBW4bnARyqeR-5ynT_D`)
- App : `portfolio-web` (applicationId `QP8m0d0wRFS27wyEFPucp`)
- Branche suivie : `main` (seule branche du repo)

## Comment ça se déploie

```
push sur main
   │
   ▼
webhook GitHub (Settings → Webhooks, événement push)
   │
   ▼
POST http://51.178.37.35:3000/api/deploy/{refreshToken}
   │
   ▼
Dokploy : git clone → Nixpacks détecte le projet Node
   │         → npm install && npm run build (= npm install astro && astro check && astro build)
   │         → sert dist/ en statique (isStaticSpa: true)
   ▼
Traefik : HTTPS automatique (Let's Encrypt)
```

**Build type** : `nixpacks` + `isStaticSpa: true` + `publishDirectory: "dist"`. **Pas** le buildType `static` de Dokploy — celui-ci ne lance aucun build, il fait juste `COPY dist .` dans une image nginx en supposant que `dist/` existe déjà dans le repo (ce qui n'est pas notre cas, Astro génère `dist/` au build).

**Node version** : `package.json` déclare `"engines": {"node": ">=22.12.0"}` — sans ça, Nixpacks utilise Node 18 par défaut, incompatible avec Astro 6.

## Redéployer manuellement

Sans passer par l'UI Dokploy (login web à éviter pour un agent) :

```bash
ssh vps-ovh-projets "curl -s -X POST 'http://localhost:3000/api/application.deploy' \
  -H 'x-api-key: <token — voir Notion Serveur OVH>' \
  -H 'Content-Type: application/json' \
  -d '{\"applicationId\":\"QP8m0d0wRFS27wyEFPucp\"}'"
```

## Voir les logs d'un déploiement

```bash
# Dernier déploiement (status + chemin du log)
ssh vps-ovh-projets "curl -s -X GET 'http://localhost:3000/api/deployment.all?applicationId=QP8m0d0wRFS27wyEFPucp' \
  -H 'x-api-key: <token>'" | python3 -m json.tool

# Contenu du log
ssh vps-ovh-projets "sudo cat /etc/dokploy/logs/<appName>/<fichier>.log"
```

## Vérifier l'état de l'app

```bash
ssh vps-ovh-projets "curl -s -X GET 'http://localhost:3000/api/application.one?applicationId=QP8m0d0wRFS27wyEFPucp' \
  -H 'x-api-key: <token>'"
```

`applicationStatus` : `idle` (jamais déployé) → `running` (build en cours) → `done` (build OK, site live) ou `error` (build cassé, voir les logs).

## Vérifier le webhook GitHub

```bash
gh api repos/AlexandreMoreau2002/my-website/hooks --jq '.[] | {active, events, url: .config.url}'
```

Le flag `autoDeploy: true` côté Dokploy ne suffit pas — c'est ce webhook réel qui déclenche le déploiement sur push.

---
Mis en place le 2026-08-14.
