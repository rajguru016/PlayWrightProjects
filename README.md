# Playwright TypeScript Demo

Lightweight Playwright test project with TypeScript examples and a basic npm workflow.

**Quick Start**

- **Install dependencies:**

```bash
npm install
```

- **Install Playwright browsers (if needed):**

```bash
npx playwright install
```

- **Run tests:**

```bash
npm run test
```

- **Open the HTML report:**

```bash
npx playwright show-report
# or open playwright-report/index.html in your browser
```

**Useful npm scripts**

- `test`: Run Playwright tests.
- `commit`: Stage all changes and commit with a default message.
- `push`: Push the current branch to the configured remote.

**Repository files of interest**

- [`package.json`](package.json) — npm scripts and metadata.
- [.gitignore](.gitignore) — files ignored by git.
- [`playwright.config.ts`](playwright.config.ts) — Playwright configuration.
- [`playwright-report/index.html`](playwright-report/index.html) — generated test report.

**Contributing**

Create branches for features or fixes, run tests locally before opening a PR, and prefer small, focused commits.

**License**

Add a license file if you intend to publish this repository.
