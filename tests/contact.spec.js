const { test, expect } = require('@playwright/test');
const { ContactPage } = require('../pages/ContactPage');

test('TC_009 Verify contact form submits with valid details', async ({ page }) => {
  const contact = new ContactPage(page);

  await page.goto('https://hareandturtle.ai/', { waitUntil: 'domcontentloaded' });
  await contact.scrollToContactForm();
  await contact.waitForFormReady();

  // Fill the form with valid data and submit.
  await contact.fillForm({
    name: 'Test User',
    company: 'Test Company',
    phone: '1234567890',
    email: 'test@test.com',
    reason: 'Automation test',
  });

  await contact.submitBtn.first().click();

  await expect(contact.successMessage).toBeVisible();
});

test('TC_010 Verify invalid email shows error message', async ({ page }) => {
  const contact = new ContactPage(page);

  await page.goto('https://hareandturtle.ai/', { waitUntil: 'domcontentloaded' });
  await contact.scrollToContactForm();
  await contact.waitForFormReady();

  // Submit an invalid email to confirm validation feedback.
  await contact.fillForm({
    name: 'Test User',
    company: 'Test Company',
    phone: '1234567890',
    email: 'invalid-email',
    reason: 'Automation test',
  });

  await contact.submitBtn.first().click();

  await expect(contact.errorMessage).toBeVisible();
});
