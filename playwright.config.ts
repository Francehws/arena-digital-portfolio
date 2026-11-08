import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests',
  timeout: 30000,
  fullyParallel: false,
  use: { baseURL: 'http://127.0.0.1:4175', headless: true },
  reporter: [['list'], ['json', { outputFile: 'reports/browser-tests.json' }]],
  outputDir: 'output/playwright/results',
  webServer: {
    command:
      'BASE_PATH=/ PUBLISH_BUILD=0 npm run dev -- --host 127.0.0.1 --port 4175 --strictPort',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
