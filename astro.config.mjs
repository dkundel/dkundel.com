import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import a11yEmoji from '@fec/remark-a11y-emoji';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    site: 'https://dkundel.com/',
    vite: {
      plugins: [tailwindcss()],
    },
    markdown: {
      shikiConfig: {
        theme: 'rose-pine-moon',
      },
      processor: unified({
        remarkPlugins: [a11yEmoji],
      }),
    },
    integrations: [
      react(),
      sitemap(),
      mdx({}),
    ],
  }
);
