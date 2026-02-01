import { Page } from '@playwright/test';
import { AIElementFinder } from '../ai/AIElementFinder';

export class SecurePage {
  private ai: AIElementFinder;

  constructor(private page: Page) {
    this.ai = new AIElementFinder(page);
  }

  async getSuccessMessage(): Promise<string> {
    return (await this.ai.find('successMessage')).textContent() as Promise<string>;
  }

  async logout() {
    await (await this.ai.find('logoutButton')).click();
  }
}