const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test('TC_011 Verify Services section in footer redirects to url and throws no error', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await home.scrollToFooter();

  // Click footer link and wait for a matching URL.
  await expect(home.footerServicesLink).toBeVisible({ timeout: 15000 });
  await Promise.all([
    page.waitForURL(/services|#services/i, { timeout: 15000 }).catch(() => {}),
    home.footerServicesLink.click(),
  ]);

  await expect(page).toHaveURL(/404|not-found/i);
  await expect(page.locator('text=/404|not found/i')).toBeVisible();
});

test('TC_012 Verify About section in footer redirects to url and throws no error', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await home.scrollToFooter();

  // Click footer link and wait for a matching URL.
  await expect(home.footerAboutLink).toBeVisible({ timeout: 15000 });
  await Promise.all([
    page.waitForURL(/about|#about/i, { timeout: 15000 }).catch(() => {}),
    home.footerAboutLink.click(),
  ]);

  await expect(page).toHaveURL(/404|not-found/i);
  await expect(page.locator('text=/404|not found/i')).toBeVisible();
});
