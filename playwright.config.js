const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  /* 這裡很重要：同時產生 HTML 報告 (playwright-report) 和 Allure 資料 (allure-results) */
  reporter: [
    ['html'],             // 這是給 GitHub Actions 上傳 artifact 用的
    ['allure-playwright'] // 這是給 Allure Report 用的
  ],
  use: {
    trace: 'on-first-retry',
  },
});
