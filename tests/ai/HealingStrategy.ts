
/**
 * Why this exists:
 * Before writing healing logic, we need a common vocabulary to describe how an element was found.
 * This is critical for:
 * Debugging
 * CI reporting
 * Knowing when the framework is “guessing”
 * 
 * Explanation
 * STATIC – Original locator worked (best case)
 * SEMANTIC – Found via accessibility or meaning
 * CONTEXTUAL – Found using DOM relationships
 * INTENT – Found using user-behavior heuristics
 * VISUAL – Last-resort visual inference
 * 👉 This enum makes healing explicit and traceable, not magical.
 */
export enum HealingStrategy {
  STATIC = 'static',
  SEMANTIC = 'semantic',
  CONTEXTUAL = 'contextual',
  INTENT = 'intent',
  VISUAL = 'visual'
}