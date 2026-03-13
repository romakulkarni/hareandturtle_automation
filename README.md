# HNT UI Automation

Framework: Playwright + JavaScript  
Pattern: Page Object Model (POM)  
Target Application: `https://hareandturtle.ai/`

## 1. Project Overview

This repository contains UI automation tests for the Hare & Turtle website.  
The goal is to keep tests readable and maintainable by separating:

- Page locators and actions in page objects (`pages/`)
- Test scenarios in spec files (`tests/`)

## 2. Tech Stack

- Playwright (`@playwright/test`) for browser automation and assertions
- JavaScript (Node.js)

## 3. Dependencies and Prerequisites

- Node.js 18+ (recommended)
- npm
- Google Chrome installed (tests run on Chrome)

Project dependencies (from `package.json`):

- `@playwright/test`
- `@types/node`

## 4. Project Structure

```
hareandturtle-automation/
├── pages/
│   ├── HomePage.js
│   └── ContactPage.js
├── tests/
│   ├── homepage.spec.js
│   ├── services.spec.js
│   ├── contact.spec.js
│   └── footer.spec.js
├── playwright.config.js
├── package.json
└── README.md
```

## 5. Test Scenarios Mapping

| Test Case ID | Scenario (Short)                     | Automation Script        |
| ------------ | ------------------------------------ | ------------------------ |
| TC_001       | Homepage loads                       | `tests/homepage.spec.js` |
| TC_002       | Logo visible                         | `tests/homepage.spec.js` |
| TC_004       | Transform With Us CTA redirects      | `tests/homepage.spec.js` |
| TC_005       | Learn More redirects                 | `tests/homepage.spec.js` |
| TC_007       | How We Deliver Impact visible        | `tests/homepage.spec.js` |
| TC_003       | Service cards hover effect           | `tests/services.spec.js` |
| TC_006       | Agentic AI card redirects            | `tests/services.spec.js` |
| TC_008       | Enterprise benefit cards visible     | `tests/services.spec.js` |
| TC_009       | Contact form submit success          | `tests/contact.spec.js`  |
| TC_010       | Contact form invalid email           | `tests/contact.spec.js`  |
| TC_011       | Footer Services redirects (no error) | `tests/footer.spec.js`   |
| TC_012       | Footer About redirects (no error)    | `tests/footer.spec.js`   |

## 6. Install and Run

Install dependencies:

```
npm install
```

Install Playwright browsers (first-time only):

```
npx playwright install
```

Run all tests:

```
npx playwright test
```

Run a specific suite:

```
npx playwright test tests/homepage.spec.js
npx playwright test tests/services.spec.js
npx playwright test tests/contact.spec.js
npx playwright test tests/footer.spec.js
```

## 7. Notes

- The config is set to run on Google Chrome only.
- Some tests are expected to fail until the site fixes redirect/404 issues.
