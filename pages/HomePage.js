class HomePage {
  constructor(page) {
    this.page = page;

    // Common header and footer elements.
    this.header = page.locator('header');
    this.logo = page.locator('header img');
    this.navigation = page.locator('header nav');
    this.footer = page.locator('footer').first();

    // Hero section CTAs.
    this.heroTitle = page.locator('text=Where Velocity Meets Innovation');
    this.transformBtn = page.locator('text=Transform With Us').first();
    this.learnMoreBtn = page.locator('text=Learn More').first();

    // Service cards.
    this.agenticCard = page.locator('text=Agentic AI').first();
    this.securityCard = page.locator('text=Security Services').first();
    this.managedCard = page.locator('text=Managed Services').first();

    // Section headings with flexible matching.
    this.howWeDeliverImpactHeading = page
      .getByRole('heading', { name: /Impact/i })
      .or(page.locator('text=/Impact/i'))
      .first();
    this.enterpriseHeading = page
      .getByRole('heading', { name: /Leading Enterprises/i })
      .or(page.locator('text=/Enterprise/i'))
      .first();

    this.footerServicesLink = page
      .getByRole('link', { name: /Services/i })
      .or(page.locator('footer a:has-text("Services")'))
      .or(page.locator('footer a[href*="services" i], footer a[href*="#services" i]'))
      .first();
    this.footerAboutLink = page
      .getByRole('link', { name: /About/i })
      .or(page.locator('footer a:has-text("About")'))
      .or(page.locator('footer a[href*="about" i], footer a[href*="#about" i]'))
      .first();
  }

  async goto() {
    await this.page.goto('https://hareandturtle.ai/', {
      waitUntil: 'domcontentloaded',
    });
  }

  async scrollToServices() {
    await this.agenticCard.scrollIntoViewIfNeeded();
  }

  async scrollToHowWeDeliverImpact() {
    await this.howWeDeliverImpactHeading.scrollIntoViewIfNeeded();
  }

  async scrollToEnterprise() {
    await this.enterpriseHeading.scrollIntoViewIfNeeded();
  }

  async scrollToFooter() {
    // Scroll the page then anchor on the footer element.
    await this.page.evaluate(() =>
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
    );
    await this.footer.scrollIntoViewIfNeeded();
  }

  enterpriseBenefitCards() {
    const section = this.page
      .locator('section, div')
      .filter({ has: this.enterpriseHeading });
    return section.locator(
      '[role="listitem"], [class*="card"], [class*="slide"], article, li'
    );
  }
}

module.exports = { HomePage };
