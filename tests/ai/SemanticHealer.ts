import { Page, Locator } from '@playwright/test';
import { HealingLogger } from './HealingLogger';
import { HealingStrategy } from './HealingStrategy';

/**
 * Purpose:
 * UI structure changes often, but meaning rarely does.
 * This layer answers:
 * “Can I find the element by what it represents?”
 * 
 * Explanation:
 * Uses aria-label, role, visible intent
 * Case-insensitive matching for text changes
 * Very stable across redesigns
 * 👉 This is high-confidence healing.
 */
export class SemanticHealer {
  constructor(private page: Page) {}

  async heal(key: string): Promise<Locator | null> {
    const semanticMap: Record<string, string[]> = {
      loginButton: [
        '[aria-label*="login" i]',
        '[role="button"]:has-text(/login|sign in/i)'
      ]
    };

    for (const selector of semanticMap[key] || []) {
      const locator = this.page.locator(selector);
      if (await locator.count() > 0) {
        HealingLogger.log(key, selector, HealingStrategy.SEMANTIC, 0.8);
        return locator.first();
      }
    }
    return null;
  }
}