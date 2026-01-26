import '@playwright/test';

declare module '@playwright/test' {
  // Extend Playwright test options with a custom `autoHeal` flag
  interface PlaywrightTestOptions {
    /**
     * When true, tests or helpers may enable self-healing selector behavior.
     */
    autoHeal?: boolean;
  }
}
