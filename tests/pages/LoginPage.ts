import { Page } from '@playwright/test';
import { AIElementFinder } from '../ai/AIElementFinder';

export class LoginPage {
  private ai: AIElementFinder;

  constructor(private page: Page) {
    this.ai = new AIElementFinder(page);
  }

  async open() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await (await this.ai.find('username')).fill(username);
    await (await this.ai.find('password')).fill(password);
    await (await this.ai.find('loginButton')).click();
  }
}