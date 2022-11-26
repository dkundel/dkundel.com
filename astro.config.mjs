import { VitePWA } from 'vite-plugin-pwa';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
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
      plugins: [imagetools(), VitePWA()],
    },
    markdown: {
      extendDefaultPlugins: true,
      shikiConfig: {
        theme: 'rose-pine-moon',
      },
      remarkPlugins: [a11yEmoji],
    },
    integrations: [
      react(),
      tailwind({
        config: {
          path: './tailwind.config.cjs',
          applyAstroPreset: false,
          applyBaseStyles: false,
        },
      }),
      sitemap(),
      image(),
      mdx({}),
    ],
  }
);
