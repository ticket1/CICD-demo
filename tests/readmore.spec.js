const { test, expect } = require('@playwright/test');

test('Click "Read more" button on blog homepage', async ({ page }) => {
  // 1️⃣ 開啟網站
  await page.goto('https://pleasetankuku.blogspot.com/');

  // 2️⃣ 等待頁面載入完成
  await page.waitForLoadState('domcontentloaded');

  // 3️⃣ 找到第一個 "Read more" 按鈕
  const readMoreButton = page.locator('text=Read more').first();

  // 4️⃣ 確認按鈕存在
  await expect(readMoreButton).toBeVisible();

  // 5️⃣ 點擊按鈕
  await readMoreButton.click();

  // 6️⃣ 驗證是否導向文章頁面（URL 改變）
  await expect(page).not.toHaveURL('https://pleasetankuku.blogspot.com/');

  // 7️⃣ 驗證文章內容是否出現（例如標題或文章段落）
  const articleContent = page.locator('article');
  await expect(articleContent).toBeVisible();
});
