/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { siteMetadata } from './vite-plugins/siteMetadata.ts';
import { virtualKcProxy } from './vite-plugins/virtualKcProxy.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'SITE_');
  const base = env.SITE_BASE ?? '/ai-linkedin/';
  const siteUrl = env.SITE_URL ?? 'https://kcabhish.github.io/ai-linkedin/';
  // Server-only variables for the local chat proxy; never exposed to the client bundle.
  const serverEnv = loadEnv(mode, process.cwd(), 'OPENAI_');

  return {
    base,
    plugins: [
      react(),
      siteMetadata({ siteUrl }),
      virtualKcProxy({
        base,
        apiKey: serverEnv.OPENAI_API_KEY || undefined,
        model: serverEnv.OPENAI_MODEL || undefined,
      }),
    ],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./src/test/setup.ts'],
      css: { modules: { classNameStrategy: 'non-scoped' } },
    },
  };
});
