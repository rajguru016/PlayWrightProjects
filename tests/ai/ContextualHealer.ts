import { Page, Locator } from '@playwright/test';
import { HealingLogger } from './HealingLogger';
import { HealingStrategy } from './HealingStrategy';

/**
 * Purpose:
 * Humans identify elements by where they live, not by CSS.
 * This layer answers:
 * “What element belongs in this context?”
 * 
 * Explanation:
 * Uses DOM relationships (form → password → button)
 * Avoids generic selectors
 * Only heals when exactly one candidate exists
 * 👉 Prevents false positives.
 */
export class ContextualHealer {
  constructor(private page: Page) {}

  async heal(key: string): Promise<Locator | null> {
    if (key === 'loginButton') {
      const locator = this.page.locator(
        'form:has(input[type="password"]) button'
      );

      if (await locator.count() === 1) {
        HealingLogger.log(
          key,
          'form:has(password) button',
          HealingStrategy.CONTEXTUAL,
          0.7
        );
        return locator.first();
      }
    }
    return null;
  }
}