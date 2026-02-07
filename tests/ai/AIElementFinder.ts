import { Page, Locator } from '@playwright/test';
import { HealingLogger } from './HealingLogger';
import { HealingStrategy } from './HealingStrategy';
import { SemanticHealer } from './SemanticHealer';
import { ContextualHealer } from './ContextualHealer';
import { IntentHealer } from './IntentHealer';
import { VisualHealer } from './VisualHealer';
/**
 * This class:
 * Controls healing order
 * Enforces safety
 * Centralizes element resolution
 * 
 * Explanation:
 * Healing is ordered and deterministic
 * Each step is safer → riskier
 * Failure is loud, logged, and actionable
 */
export class AIElementFinder {
  private semanticHealer: SemanticHealer;
  private contextualHealer: ContextualHealer;
  private intentHealer: IntentHealer;
  private visualHealer: VisualHealer;

  constructor(
    private page: Page,
    private repository: Record<string, string[]>
  ) {
    this.semanticHealer = new SemanticHealer(page);
    this.contextualHealer = new ContextualHealer(page);
    this.intentHealer = new IntentHealer(page);
    this.visualHealer = new VisualHealer(page);
  }

  async find(key: string): Promise<Locator> {
    const attempts: string[] = [];

    // 1️⃣ Static locator fallback
    for (const selector of this.repository[key] || []) {
      attempts.push(selector);
      const locator = this.page.locator(selector);
      if (await locator.count() > 0) {
        HealingLogger.log(key, selector, HealingStrategy.STATIC, 0.9);
        return locator.first();
      }
    }

    // 2️⃣ Semantic healing
    const semantic = await this.semanticHealer.heal(key);
    if (semantic) return semantic;

    // 3️⃣ Contextual healing
    const contextual = await this.contextualHealer.heal(key);
    if (contextual) return contextual;

    // 4️⃣ Intent-based healing
    const intent = await this.intentHealer.heal(key);
    if (intent) return intent;

    // 5️⃣ Visual healing
    const visual = await this.visualHealer.heal(key);
    if (visual) return visual;

    // 6️⃣ Fail fast with diagnostics
    HealingLogger.failure(key, attempts);
    throw new Error(`❌ Self-healing exhausted for element: ${key}`);
  }
}