import { VitePWA } from 'vite-plugin-pwa';
import { imagetools } from 'vite-imagetools';
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */
  {
    site: 'https://dkundel.com/',
    vite: {
      plugins: [imagetools(), VitePWA()],
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
    ],
  }
);
