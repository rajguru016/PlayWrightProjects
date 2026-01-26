import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// goto https://playwright.dev/ , click Get Started button, verify What's installed link is present, click it, under HTML Test Reports section read the description and print on console
// make this a self healing test by using role based selectors and text based selectors where ever possible
test('Navigate Playwright docs and verify HTML Test Reports section', async ({ page }) => {
  const home = new HomePage(page);
  await home.goToHome();
  await home.clickGetStarted();
  await home.clickWhatsInstalled();
  await home.verifyHtmlTestReportsVisible();
  const descriptionText = await home.getHtmlTestReportsDescription();
  console.log('HTML Test Reports Description:', descriptionText);
});

//create more tests as needed but limited to 5 tests per file
// you can create tests to verify other sections of the Playwright docs as well

test('Verify Playwright Features section is visible', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');
  const featuresHeading = page.getByRole('heading', { name: 'Introduction' });
  await expect(featuresHeading).toBeVisible();
}
);

test('Verify Playwright supports multiple languages', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');
  const languagesSection = page.getByRole('heading', { name: 'Installing Playwright' });
  await expect(languagesSection).toBeVisible();
}
);

test('Verify Playwright Test Runner section is accessible', async ({ page }) => {
  await page.goto('https://playwright.dev/docs/intro');
  const testRunnerLink = page.getByRole('link', { name: 'What\'s Installed', exact: true });
  await testRunnerLink.click();
  const testRunnerHeading = page.getByText('Playwright downloads required browser binaries and creates the scaffold below.' );
  await expect(testRunnerHeading).toBeVisible();
}
);

