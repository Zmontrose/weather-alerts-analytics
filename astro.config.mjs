import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://recallwatch.pages.dev',
  integrations: [sitemap()],
  output: 'static',
  build: { format: 'directory' }
});
