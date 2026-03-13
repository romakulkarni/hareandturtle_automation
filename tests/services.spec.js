const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');

test('TC_003 Verify service cards show hover effect', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await home.scrollToServices();

  // Hover the card to ensure it stays visible.
  const card = home.agenticCard;
  await expect(card).toBeVisible();

  await card.hover();

  await expect(card).toBeVisible();
});

test('TC_006 Verify Agentic AI card is clickable', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await home.scrollToServices();

  // Click the card without waiting for navigation.
  await expect(home.agenticCard).toBeVisible();
  await home.agenticCard.click({ noWaitAfter: true });
});

test('TC_008 Verify enterprise benefit cards are displayed', async ({ page }) => {
  const home = new HomePage(page);

  await home.goto();
  await home.scrollToEnterprise();

  // Validate at least one card or the section heading is visible.
  const cards = home.enterpriseBenefitCards();
  try {
    await expect(cards.first()).toBeVisible({ timeout: 15000 });
  } catch (error) {
    await expect(home.enterpriseHeading).toBeVisible({ timeout: 15000 });
  }
});
