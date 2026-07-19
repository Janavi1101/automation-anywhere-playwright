import { Page, expect } from '@playwright/test';

export class LoginPage {

    constructor(private page: Page) {}

    async login(username: string, password: string) {

        await this.page.goto(
            'https://community.cloud.automationanywhere.digital/#/login?next=/index',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        await this.page.waitForLoadState('networkidle');

        const usernameBox = this.page.getByRole('textbox', {
            name: 'Username'
        });

        await expect(usernameBox).toBeVisible({
            timeout: 60000
        });

        await usernameBox.fill(username);

        const passwordBox = this.page.getByRole('textbox', {
            name: 'Password'
        });

        await expect(passwordBox).toBeVisible();

        await passwordBox.fill(password);

        const loginButton = this.page.getByRole('button', {
            name: 'Log in'
        });

        await expect(loginButton).toBeVisible();

        await expect(loginButton).toBeEnabled();

        await loginButton.click();

        await this.page.waitForLoadState('networkidle');

        await this.page.waitForURL(
            /.*#\/home.*/,
            {
                timeout: 60000
            }
        );

        await expect(this.page).toHaveURL(/#\/home/);
    }
}