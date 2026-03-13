class ContactPage {
  constructor(page) {
    this.page = page;

    // Key headings and feedback messages.
    this.contactHeading = page
      .getByRole('heading', { name: /Contact/i })
      .first();

    this.successMessage = page
      .locator('text=/thank you|success|submitted/i')
      .first();
    this.errorMessage = page.locator('text=/invalid|error|email/i').first();
  }

  async scrollToContactForm() {
    // Try to reach the form by scrolling and clicking a contact trigger.
    await this.page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    );
    const contactTrigger = this.page
      .getByRole('link', { name: /Contact/i })
      .or(this.page.getByRole('button', { name: /Contact/i }))
      .first();
    if (await contactTrigger.count()) {
      await contactTrigger.click({ noWaitAfter: true }).catch(() => {});
    }
  }

  async waitForFormReady() {
    // Poll for visible inputs until timeout.
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline) {
      await this.resolveFormScope();
      const inputs = this.scopeLocator(
        'input:not([type="hidden"]), textarea, select'
      );
      if (await inputs.count()) {
        await inputs.first().waitFor({ state: 'visible', timeout: 10000 });
        return true;
      }
      await this.page.waitForTimeout(500);
    }
    throw new Error('Contact form inputs not found');
  }

  async fillForm({
    name,
    company,
    phone,
    email,
    reason,
  } = {}) {
    if (name) await this.fillField(name, [
      'input[name="name"]',
      'input[placeholder*="name" i]',
      'input[type="text"]',
    ], 0);
    if (company) await this.fillField(company, [
      'input[name="company"]',
      'input[placeholder*="company" i]',
      'input[type="text"]',
    ], 1);
    if (phone) await this.fillField(phone, [
      'input[name="phone"]',
      'input[placeholder*="phone" i]',
      'input[type="tel"]',
      'input[type="text"]',
    ], 2);
    if (email) await this.fillField(email, [
      'input[name="email"]',
      'input[placeholder*="email" i]',
      'input[type="email"]',
    ], 3);
    if (reason) await this.fillReason(reason, 4);
  }

  async fillField(value, selectors, fallbackIndex) {
    // Try preferred selectors first, then fall back by index.
    for (const selector of selectors) {
      const field = this.scopeLocator(selector).first();
      if (await field.count()) {
        await this.fillFieldValue(field, value);
        return;
      }
    }

    if (fallbackIndex !== undefined) {
      const inputs = this.scopeLocator(
        'input:not([type="hidden"]), textarea, select'
      );
      if (await inputs.count()) {
        const field = inputs.nth(fallbackIndex);
        if (await field.count()) {
          await this.fillFieldValue(field, value);
        }
      }
    }
  }

  async fillFieldValue(field, value) {
    // Use selectOption when the target is a select element.
    const handle = await field.elementHandle();
    if (!handle) return;

    const tagName = await handle.evaluate((node) => node.tagName.toLowerCase());
    if (tagName === 'select') {
      await field.selectOption({ index: 0 });
      return;
    }

    await field.fill(value);
  }

  async fillReason(reason, fallbackIndex) {
    // Reason may be a textarea or select, depending on the form.
    const field = this.scopeLocator(
      'textarea[name="reason"], textarea[placeholder*="reason" i], select[name="reason"], textarea, select'
    ).first();
    const handle = await field.elementHandle();
    if (!handle) {
      if (fallbackIndex !== undefined) {
        await this.fillField(reason, [], fallbackIndex);
      }
      return;
    }

    const tagName = await handle.evaluate((node) => node.tagName.toLowerCase());
    if (tagName === 'select') {
      try {
        await field.selectOption({ label: reason });
      } catch (error) {
        const options = await field.locator('option').all();
        if (options.length > 0) {
          const firstValue = await options[0].getAttribute('value');
          if (firstValue !== null) {
            await field.selectOption({ value: firstValue });
          }
        }
      }
      return;
    }

    await field.fill(reason);
  }

  async resolveFormScope() {
    // Cache a scope to avoid repeated DOM scanning.
    const scope = await this.findFormScope();
    if (scope) {
      this.formScope = scope;
    }
  }

  async findFormScope() {
    for (const frame of this.page.frames()) {
      const inputs = frame.locator('input, textarea, select');
      if (await inputs.count()) {
        return { type: 'frame', frame };
      }
    }

    const form = this.page.locator('form').first();
    if (await form.count()) {
      return { type: 'locator', root: form };
    }

    const section = this.page
      .locator('section')
      .filter({ has: this.contactHeading })
      .first();
    if (await section.count()) {
      return { type: 'locator', root: section };
    }

    return { type: 'locator', root: this.page.locator('body') };
  }

  scopeLocator(selector) {
    if (!this.formScope || this.formScope.type === 'locator') {
      const root = this.formScope?.root || this.page.locator('body');
      return root.locator(selector);
    }
    return this.formScope.frame.locator(selector);
  }

  async hasForm() {
    await this.resolveFormScope();
    const inputs = this.scopeLocator(
      'input:not([type="hidden"]), textarea, select'
    );
    return (await inputs.count()) > 0;
  }

  get submitBtn() {
    return this.scopeLocator(
      'button:has-text("Submit"), button:has-text("Send"), input[type="submit"]'
    );
  }
}

module.exports = { ContactPage };
