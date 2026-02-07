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
    let candidates: Locator;

    switch (key) {
    //Uncomment if you want to test this layer
      /*case 'username':
        candidates = this.page.locator('input[type="text"], input:not([type]), input');
        break;
      case 'password':
        candidates = this.page.locator('input[type="password"]');
        break;
      case 'loginButton':
        candidates = this.page.locator('button, input[type="submit"]');
        break;
      case 'successMessage':
        candidates = this.page.locator('.flash.success, .flash');
        break;*/
      default:
        return null;
    }

    for (let i = 0; i < await candidates.count(); i++) {
      const candidate = candidates.nth(i);
      if (await candidate.isEnabled() && await candidate.isVisible()) {
        HealingLogger.log(key,'enabled visible candidate',HealingStrategy.INTENT,0.6);
        return candidate;
      }
    }
    return null;
  }
}