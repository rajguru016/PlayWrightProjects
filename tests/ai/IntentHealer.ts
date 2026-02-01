import { Page, Locator } from '@playwright/test';
import { HealingLogger } from './HealingLogger';
import { HealingStrategy } from './HealingStrategy';

/**
 * Purpose:
 * When structure and context both fail, we infer user intent.
 * This layer answers:
 * “What would a real user click?”
 * 
 * Explanation:
 * Finds enabled, clickable elements
 * Mimics user behavior
 * Lower confidence → used late
 * 👉 Powerful, but controlled.
 */
export class IntentHealer {
  constructor(private page: Page) {}

  async heal(key: string): Promise<Locator | null> {
    if (key !== 'loginButton') return null;

    const candidates = this.page.locator('button, input[type="submit"]');

    for (let i = 0; i < await candidates.count(); i++) {
      const candidate = candidates.nth(i);
      if (await candidate.isEnabled()) {
        HealingLogger.log(
          key,
          'enabled clickable candidate',
          HealingStrategy.INTENT,
          0.6
        );
        return candidate;
      }
    }
    return null;
  }
}