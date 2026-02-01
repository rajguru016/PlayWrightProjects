import { Page, Locator } from '@playwright/test';
import { LocatorRepository } from '../ai/LocatorRepository';
import { HealingLogger } from '../ai/HealingLogger';

export class AIElementFinder {
  constructor(private page: Page) {}

  async find(key: string): Promise<Locator> {
    const selectors = LocatorRepository[key];

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