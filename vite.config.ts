/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { siteMetadata } from './vite-plugins/siteMetadata.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  const base = env.SITE_BASE ?? '/ai-linkedin/';
  const siteUrl = env.SITE_URL ?? 'https://kcabhish.github.io/ai-linkedin/';

  return {
    base,
    plugins: [react(), siteMetadata({ siteUrl })],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: { modules: { classNameStrategy: 'non-scoped' } },
    },
  };
});
