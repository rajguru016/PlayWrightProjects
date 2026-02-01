import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login/LoginPage';
import { SecurePage } from './pages/secure/SecurePage';

/**
* “I used a real public web application and implemented an AI-style self-healing layer on top 
* of Playwright. All element lookups go through a smart locator engine that tries multiple selectors 
* and context-based matching. This allows the test to survive UI changes without flakiness, 
* while still logging healing actions for transparency.”
**/
test.describe('Login Feature – AI Self-Healing Enabled', () => {
    test('should login successfully with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const securePage = new SecurePage(page);

        // Step 1: Open login page
        await loginPage.navigate();

        // Step 2: Login
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        // Step 3: Validate successful login and secure page loaded
        const message = await securePage.getSuccessMessage();
        expect(message).toContain('You logged into a secure area');

        // Step 4: secure page Logout
        await securePage.logout();

        // Step 5: Validate logout
        await expect(page).toHaveURL(/login/);
    });

});