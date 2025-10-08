import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alertsanalytics.com', // Update this to your custom domain
  integrations: [sitemap()],
  output: 'static',
  build: { format: 'directory' }
});
