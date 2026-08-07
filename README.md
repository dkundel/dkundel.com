# dkundel.com

Dominik Kundel’s personal website, built with Astro and sourced in part from
[`dkundel/about-me`](https://github.com/dkundel/about-me).

## Local development

```bash
nvm use
npm ci
npm run dev
```

The build fetches the latest biography, speaking, and writing data before Astro
generates the static site.

## Quality checks

```bash
npm test
```

This runs a production build, Astro diagnostics, internal-link and landmark
checks, and the site’s JavaScript and large-GIF performance budgets.
