import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.BASE_PATH || '/';
  const publicBuild = env.PUBLISH_BUILD === '1';
  if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(base))
    throw new Error(
      'BASE_PATH deve iniziare e terminare con / e contenere segmenti semplici.',
    );
  return {
    publicDir: publicBuild ? false : 'public',
    plugins: [
      react(),
      ...(publicBuild
        ? [
            {
              name: 'approved-public-assets-only',
              apply: 'build' as const,
              async closeBundle() {
                for (const name of [
                  'favicon.svg',
                  'assets/og.png',
                  'native-previews/tavqi.png',
                  'native-previews/ai-receptionist.png',
                  'native-previews/auto-manhattan.png',
                  'native-previews/fps-staff-manager.png',
                ]) {
                  const target = path.resolve('dist', name);
                  await mkdir(path.dirname(target), { recursive: true });
                  await copyFile(path.resolve('public', name), target);
                }
              },
            },
          ]
        : []),
    ],
    base,
    define: { __SITE_URL__: JSON.stringify(env.SITE_URL || '') },
    build: { sourcemap: false },
  };
});
