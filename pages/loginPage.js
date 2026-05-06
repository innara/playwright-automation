const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

test.describe('Login Page Tests', () => {

  test('Valid login should succeed', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('tomsmith', 'SuperSecretPassword!');

    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
  });

  test('Invalid username should fail login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('wronguser', 'SuperSecretPassword!');

    await expect(page.locator('#flash')).toContainText('Your username is invalid!');
  });

  test('Invalid password should fail login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('tomsmith', 'wrongpass');

    await expect(page.locator('#flash')).toContainText('Your password is invalid!');
  });

  test('Empty fields should show error', async ({ page }) => {
    const login = new LoginPage(page);

    await login.open();
    await login.login('', '');

    await expect(page.locator('#flash')).toBeVisible();
  });

});