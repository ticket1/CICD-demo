const { test, expect } = require('@playwright/test');

test.describe('Blog Functionality Tests', () => {
  
  // 1️⃣ 測試案例：點擊 "Read more" 按鈕
  test('Click "Read more" button', async ({ page }) => {
    await page.goto('https://pleasetankuku.blogspot.com/');
    await page.waitForLoadState('domcontentloaded');

    const readMoreButton = page.locator('text=Read more').first();
    
    if (await readMoreButton.isVisible()) {
        await readMoreButton.click();
        await expect(page).not.toHaveURL('https://pleasetankuku.blogspot.com/');
    } else {
        console.log('Read more button not found, skipping click action.');
    }
  });

  // 2️⃣ 測試案例：搜尋功能 (輸入 123)
  test('Search for "123"', async ({ page }) => {
    await page.goto('https://pleasetankuku.blogspot.com/');
    
    // 1. 嘗試找到搜尋框
    const searchInput = page.locator('input[name="q"]');
    
    // 2. 檢查是否需要先點擊放大鏡按鈕
    // 你的 HTML 中，放大鏡按鈕的 class 是 search-expand
    const searchExpandBtn = page.locator('button.search-expand');

    // 如果搜尋框被隱藏或是按鈕可見，就先點按鈕
    if (await searchExpandBtn.isVisible()) {
        await searchExpandBtn.click();
        // 等待搜尋框出現
        await expect(searchInput).toBeVisible();
    }

    // 3. 輸入內容並搜尋
    await searchInput.fill('123');
    await searchInput.press('Enter');
    
    // 4. 驗證 URL 是否跳轉 (包含 q=123)
    await expect(page).toHaveURL(/.*q=123/);
  });

  // 3️⃣ 測試案例：點擊 "Show all" (在搜尋後)
  test('Click "Show all" posts', async ({ page }) => {
    // 直接前往搜尋結果頁面模擬搜尋後的情境
    await page.goto('https://pleasetankuku.blogspot.com/search?q=123');
    
    // 尋找 Show all 相關文字連結
    const showAllLink = page.locator('text=Show all posts').or(page.locator('text=Show all')).first();
    
    if (await showAllLink.isVisible()) {
        await showAllLink.click();
        // 點擊後應該回到列表頁，網址不應包含 q=123
        await expect(page).not.toHaveURL(/.*q=123/);
    } else {
        console.log('"Show all" link not found on this page.');
    }
  });

  // 4️⃣ 測試案例：點擊標題回到首頁
  test('Click site title to go home', async ({ page }) => {
    // 先去一個內頁或搜尋頁，這樣才能驗證「回到首頁」
    await page.goto('https://pleasetankuku.blogspot.com/search?q=test');
    
    // 找到網站標題連結 (通常是 h1 a 或 .header a)
    // 這裡直接用文字內容 "tankuku.com" 來找最準
    const homeLink = page.locator('a:has-text("tankuku.com")').first();
    
    await expect(homeLink).toBeVisible();
    await homeLink.click();
    
    // 驗證回到首頁
    await expect(page).toHaveURL('https://pleasetankuku.blogspot.com/');
  });

});
