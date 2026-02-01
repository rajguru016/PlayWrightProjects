import { HealingStrategy } from './HealingStrategy';

/**
 * Why this exists:
 * Self-healing without observability is dangerous
 * Every healing action must be:
 * Logged
 * Auditable
 * Actionable
 * 
 * Explanation:
 * Logs how the element was healed
 * Confidence helps decide whether healing is acceptable
 * Failure logs help QA/devs update locators proactively
 * 👉 This is what makes the framework enterprise-safe.
 */
export class HealingLogger {
  static log(
    elementKey: string,
    selector: string,
    strategy: HealingStrategy,
    confidence: number
  ) {
    console.info(
      `[HEALING] element=${elementKey}, strategy=${strategy}, confidence=${confidence}, selector=${selector}`
    );
  }

  static failure(elementKey: string, attempts: string[]) {
    console.error(
      `[HEALING FAILED] element=${elementKey}, attempts=${attempts.join(' | ')}`
    );
  }
}