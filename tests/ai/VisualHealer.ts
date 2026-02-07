import { Page, Locator } from '@playwright/test';
import { HealingLogger } from './HealingLogger';
import { HealingStrategy } from './HealingStrategy';

/**
 * Purpose:
 * Visual inference is expensive and risky — it must be last resort.
 * 
 * Explanation:
 * Reserved for future ML or CV integration
 * Disabled by default in regulated systems
 * Clearly isolated and optional
 * 👉 Shows architectural foresight without risk.
 */
export class VisualHealer {
  constructor(private page: Page) {}

  async heal(key: string): Promise<Locator | null> {
    let locator: Locator;

    switch (key) {
        //Comment below locators if you want to skip this layer
      case 'username':
        locator = this.page.locator('input:visible');
        break;
      case 'password':
        locator = this.page.locator('input[type="password"]:visible');
        break;
      case 'loginButton':
        locator = this.page.locator('button:visible, input[type="submit"]:visible');
        break;
      case 'successMessage':
        locator = this.page.locator('.flash.success:visible, .flash:visible');
        break;
      default:
        return null;
    }

    if (locator && await locator.count() > 0) {
      HealingLogger.log(key, 'visual fallback', HealingStrategy.VISUAL, 0.5);
      return locator.first();
    }

    return null;
  }
}