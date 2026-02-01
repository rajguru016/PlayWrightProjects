import { Page } from '@playwright/test';
import { AIElementFinder } from '../../ai/AIElementFinder';
import { SecurePageLocators } from './SecurePageLocators';

export class SecurePage {
  private finder: AIElementFinder;

  constructor(private page: Page) {
    this.finder = new AIElementFinder(page, SecurePageLocators);
  }

  /**
   * Validates that the user has landed on the Secure page
   */
  async verifySecurePageLoaded() {
    const header = await this.finder.find('pageHeader');
    await header.waitFor({ state: 'visible' });
  }

  /**
   * Returns the login success message
   */
  async getSuccessMessage(): Promise<string> {
    return (await this.finder.find('successMessage')).innerText();
  }

  /**
   * Logs out from the application
   */
  async logout() {
    await (await this.finder.find('logoutButton')).click();
  }
}