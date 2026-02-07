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
    const contextualMap: Record<string, string[]> = {
      //Comment below locators if you want to skip this layer
      username: [
        'form input[type="text"]',
        'form input[name*="user" i]',
        'label:has-text("Username") ~ input'
      ],
      password: [
        'form input[type="password"]',
        'form input[name*="pass" i]',
        'label:has-text("Password") ~ input'
      ],
      loginButton: [
        'form button:has-text("Login")',
        'form input[type="submit"]',
        'form button[type="submit"]',
        'form:has(input[type="password"]) button'
      ],
      successMessage: [
        'form ~ .flash.success',
        '.flash.success'
      ]
    };

    for (const selector of contextualMap[key] || []) {
      const locator = this.page.locator(selector);
      if (await locator.count() === 1) {
        HealingLogger.log(key, selector, HealingStrategy.CONTEXTUAL, 0.7);
        return locator.first();
      }
    }
    return null;
  }
}