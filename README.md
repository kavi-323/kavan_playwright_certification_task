# kavan_playwright_certification_task

A TypeScript-based Playwright test suite for certification task, covering UI, API, DDT (data-driven testing), atomic, end-to-end, and visual regression tests.  
Includes modular Page Object Model, typed API helpers, and GitHub Actions CI integration.

---

## Features

- **Typescript-first** with strict type checking and clear structure
- **Playwright** for UI, E2E, visual, and API testing
- **Atomic tests** for isolated UI components/sections
- **End-to-End tests** covering full user flows (e.g., registration, login, profile editing)
- **Data-Driven Tests (DDT)** using JSON and [faker.js](https://github.com/faker-js/faker) for test case generation
- **API tests** via Playwright’s RequestContext and custom API helpers
- **Visual regression tests** with screenshot comparison
- **Reusable Page Objects and API classes**
- **ESLint & Prettier** for code quality, plus strict **TSConfig**
- **Environment separation:** All secrets stored via .env (ignored), with a provided example
- **CI/CD** via GitHub Actions – runs all tests, uploads Playwright reports

---

## Project Structure

```
.
├── assets/                  # Test assets: ddt jsons, images (referenced in tests)
├── src/
│   ├── api/                 # API client classes (request helpers)
│   ├── config/              # Test users, env URLs
│   ├── pages/               # Page Object Model classes for UI
│   └── types/               # Form and API type definitions
├── tests/
│   ├── atomic-tests/        # Isolated atomic UI tests
│   ├── end-to-end-tests/    # E2E scenario tests
│   ├── data-driven-tests/   # DDT tests using JSON & faker
│   ├── api-tests/           # API-level tests
│   └── visual-tests/        # Visual/screenshot tests and snapshots
├── .github/workflows/       # CI GitHub Actions workflow
├── .env.example             # Example/test environment variables
├── package.json             # Scripts & dependencies
├── playwright.config.ts     # Playwright runner configuration
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint config for code linting
└── ...
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kavi-323/kavan_playwright_certification_task.git
cd kavan_playwright_certification_task
```

### 2. Install dependencies

```bash
npm ci
# or
yarn install
```

### 3. Configure environment variables

Copy `.env.example` to `.env` and set values as needed (used for login/API endpoints etc.).  
Actual secrets should NOT be committed.

```bash
cp .env.example .env
# Edit .env with your credentials if needed
```

### 4. Install Playwright browsers

```bash
npx playwright install --with-deps
```

---

## Running Tests

Run all Playwright tests:

```bash
npx playwright test
```

Run a specific folder (e.g. only DDT or atomic):

```bash
npx playwright test tests/tegb/data-driven-tests
npx playwright test tests/tegb/atomic-tests
```

Run the linter:

```bash
npm run lint
# or
npm run lint:fix
```

---

## Test Types Overview

- **Atomic tests:**  
  Focused, small-scope UI checks for dashboard and components.

- **E2E tests:**  
  Complete user paths, e.g. new user registration, login, data update, etc.

- **Data-Driven tests (DDT):**  
  Parameterized bank account scenarios from JSON, randomized with [faker.js](https://github.com/faker-js/faker).

- **API tests:**  
  Login and other flows tested directly via HTTP.

- **Visual regression:**  
  Screenshot assertions and regression checks (cross-browser support possible).

---

## Continuous Integration

- All tests run automatically in GitHub Actions (see `.github/workflows/playwright.yml`).
- Playwright HTML report is uploaded as an artifact.
- Parallelization and retries configured for stability on CI.

---

## Code Quality

- Lint: `npm run lint` / `npm run lint:fix`
- Strict TypeScript with noEmit (for type-checking only)
- Review code style and best practices via ESLint/Prettier

---

## Notes & Recommendations

- **For backend/API tests:**  
  User/account creation is randomized, but shared external backend may accumulate test data over time. Consider data cleanup strategies for large or repeated CI runs.
- **Visual regression:**  
  Snapshots are platform-dependent. Approve new snapshots as needed. If using multiple OS/browsers, expect minor diffs.
- **Expanding tests:**  
  When adding coverage, prefer using existing page objects/API helpers. Maintain typing discipline for all request/response data.

---

## Contribution

Pull requests and suggestions welcome.  
For any sensitive data or configuration, always edit `.env`, never commit real secrets.

---

## License

[ISC](./LICENSE) (if not specified, change appropriately for your organization)
