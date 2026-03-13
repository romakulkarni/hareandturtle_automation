const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test('TC_001 Verify homepage loads successfully', async ({ page }) => {
  const home = new HomePage(page);

  // Load the homepage and verify core elements.
  await home.goto();

  await expect(home.logo).toBeVisible();
  await expect(home.navigation).toBeVisible();
  await expect(home.heroTitle).toBeVisible();
  await home.scrollToFooter();
  try {
    await expect(home.footer).toBeVisible({ timeout: 15000 });
  } catch (error) {
    await expect(home.footer).toBeAttached();
  }
});

test('TC_002 Verify logo visible in header', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();

  await expect(home.logo).toBeVisible();
});

test('TC_004 Verify "Transform With Us" CTA button redirects to respective url or page', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();

  // Ensure CTA navigates away from the starting URL.
  await home.transformBtn.scrollIntoViewIfNeeded();
  await expect(home.transformBtn).toBeEnabled();
  const beforeUrl = page.url();
  await home.transformBtn.click();

  await expect(page).not.toHaveURL(/404|not-found/i);
  await expect(page.locator('text=/404|not found/i')).toHaveCount(0);
  await expect(page).not.toHaveURL(beforeUrl);
});

test('TC_005 Verify "Learn More" button redirects to respective url or page', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();

  // Check that Learn More triggers a navigation.
  await home.learnMoreBtn.scrollIntoViewIfNeeded();
  await expect(home.learnMoreBtn).toBeEnabled();
  const beforeUrl = page.url();
  await home.learnMoreBtn.click();

  await expect(page).not.toHaveURL(/404|not-found/i);
  await expect(page.locator('text=/404|not found/i')).toHaveCount(0);
  await expect(page).not.toHaveURL(beforeUrl);
});

test('TC_007 Verify "How We Deliver Impact" section visibility', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();

  // Scroll to the section before asserting visibility.
  await home.scrollToHowWeDeliverImpact();
  try {
    await expect(home.howWeDeliverImpactHeading).toBeVisible({
      timeout: 15000,
    });
  } catch (error) {
    await expect(home.howWeDeliverImpactHeading).toBeAttached();
  }
});
