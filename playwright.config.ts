import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: 'tests',
  timeout: 30000,
  fullyParallel: false,
  use: { baseURL: 'http://127.0.0.1:4175', headless: true },
  reporter: [['list'], ['json', { outputFile: 'reports/browser-tests.json' }]],
  outputDir: 'output/playwright/results',
  webServer: {
    command: 'python3 -m http.server 4175 --bind 127.0.0.1 --directory dist',
    url: 'http://127.0.0.1:4175',
    reuseExistingServer: !process.env.CI,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
});
