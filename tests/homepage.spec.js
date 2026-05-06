const { test, expect } = require('@playwright/test');

test('Open website and verify title', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
