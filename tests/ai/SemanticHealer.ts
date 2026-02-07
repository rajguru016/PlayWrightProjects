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
        //Uncomment if you want to test this layer
      /*username: [
        'input[placeholder*="username" i]', 
        'input[aria-label*="username" i]', 
        'input[name*="user" i]'
      ], 
      password: [
        'input[placeholder*="password" i]', 
        'input[aria-label*="password" i]', 
        'input[name*="pass" i]'
      ], 
      loginButton: [
        '[aria-label*="login" i]',
        'button:has-text("Login")',
        'input[type="submit"]',
        'button[type="submit"]'
      ],
      successMessage: [
        '.flash.success',
        '.flash:has-text("secure area")',
        'div:has-text("secure area")'
      ]*/
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

    /*async heal(key: string): Promise<Locator | null> {
        switch (key) {
        case 'username':
            // Try common semantic selectors for username field
            const usernameLocator = this.page.locator(
            'input[placeholder*="username" i], input[aria-label*="username" i], input[name*="user" i], input[type="text"]'
            );
            if (await usernameLocator.count() > 0) return usernameLocator.first();
            break;
        case 'password':
            // Try common semantic selectors for password field
            const passwordLocator = this.page.locator(
            'input[placeholder*="password" i], input[aria-label*="password" i], input[name*="pass" i], input[type="password"]'
            );
            if (await passwordLocator.count() > 0) return passwordLocator.first();
            break;
        case 'loginButton':
            // Try common semantic selectors for login button
            const loginButtonLocator = this.page.locator(
            'button:has-text("Login"), input[type="submit"], button[type="submit"]'
            );
            if (await loginButtonLocator.count() > 0) return loginButtonLocator.first();
            break;
        case 'successMessage':
            // Try to find the success message after login
            const successMessageLocator = this.page.locator(
            '.flash.success, .flash:has-text("secure area"), div:has-text("secure area")'
            );
            if (await successMessageLocator.count() > 0) return successMessageLocator.first();
            break;
        default:
            return null;
        }
        return null;
  }*/

}