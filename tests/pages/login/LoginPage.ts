import { Page } from '@playwright/test';
import { LoginLocators } from '../login/LoginLocators';
import { AIElementFinder } from '../../ai/AIElementFinder';

export class LoginPage {
  private finder: AIElementFinder;

  constructor(private page: Page) {
    this.finder = new AIElementFinder(page, LoginLocators);
  }

  async navigate() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async login(username: string, password: string) {
    await (await this.finder.find('username')).fill(username);
    await (await this.finder.find('password')).fill(password);
    await (await this.finder.find('loginButton')).click();
  }

  async getSuccessMessage(): Promise<string> {
    return (await this.finder.find('successMessage')).innerText();
  }
}