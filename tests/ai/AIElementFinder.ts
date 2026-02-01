import { Page, Locator } from '@playwright/test';
import { HealingLogger } from '../ai/HealingLogger';

export class AIElementFinder {
  constructor(
    private page: Page,
    private locators: Record<string, string[]>
  ) {}

  async find(key: string): Promise<Locator> {
    const selectors = this.locators[key];

    if (!selectors) {
      throw new Error(`No locators configured for: ${key}`);
    }

    for (const selector of selectors) {
      const locator = this.page.locator(selector);
      if (await locator.count() > 0) {
        HealingLogger.log(key, selector);
        return locator.first();
      }
    }

    throw new Error(`Self-healing failed for element: ${key}`);
  }
}