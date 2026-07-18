# Playwright tests (login)

Install dependencies and browsers, then run the login test:

```bash
cd qa-project
# install Playwright test runner
npm install -D @playwright/test --registry=https://registry.npmjs.org
# install browsers
npx playwright install
# run the specific test file
npx playwright test tests/login.spec.js
```

Notes:
- The corporate network may block direct access to the npm registry; see project root notes if installs fail.
