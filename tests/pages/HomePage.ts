import { type Page, expect } from '@playwright/test';

/**
 * Page object for the Playwright documentation home page.
 * Encapsulates common actions and locators used by tests.
 */
export class HomePage {
	/** Playwright `Page` instance provided by the test. */
	readonly page: Page;

	/**
	 * Locator for the "Get started" link using accessible role lookup.
	 * Prefer role-based selectors for stability and accessibility.
	 */
	get getStartedLink() {
		return this.page.getByRole('link', { name: 'Get started' });
	}

	/**
	 * Locator for the "What's installed" link. Uses exact match then `first()`
	 * since the page may contain multiple similar links.
	 */
	get whatsInstalledLink() {
		return this.page.getByRole('link', { name: "What's installed", exact: true }).first();
	}

	/**
	 * Locator for the "HTML Test Reports" heading. Use role-based heading lookup
	 * to make assertions more robust across markup changes.
	 */
	get htmlTestReportsHeading() {
		return this.page.getByRole('heading', { name: 'HTML Test Reports' });
	}

	/**
	 * Locator for the first paragraph following the "HTML Test Reports" heading.
	 * Tests read this paragraph to verify descriptive content.
	 */
	get descriptionPara() {
		return this.htmlTestReportsHeading.locator('xpath=following-sibling::p[1]');
	}

	/**
	 * Construct the page object with the active Playwright `page`.
	 * @param page - Playwright `Page` from the test fixture
	 */
	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Navigate to the Playwright docs home page.
	 */
	async goToHome() {
		await this.page.goto('https://playwright.dev/');
	}

	/**
	 * Click the "Get started" link.
	 * The locator is role-based for stability.
	 */
	async clickGetStarted() {
		await this.getStartedLink.click();
	}

	/**
	 * Click the "What's installed" link.
	 * Uses the configured locator and is intended to navigate the docs.
	 */
	async clickWhatsInstalled() {
		await this.whatsInstalledLink.click();
	}

	/**
	 * Return the extracted text of the paragraph describing HTML Test Reports.
	 * Returns an empty string if the paragraph is not present.
	 */
	async getHtmlTestReportsDescription() {
		return (await this.descriptionPara.textContent())?.trim() ?? '';
	}

	/**
	 * Assert that the HTML Test Reports heading is visible on the page.
	 */
	async verifyHtmlTestReportsVisible() {
		await expect(this.htmlTestReportsHeading).toBeVisible();
	}
}

