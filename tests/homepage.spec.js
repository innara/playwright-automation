const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

test.describe('SauceDemo Login Tests', () => {

  let login;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.open();
  });

  test('Valid login should succeed', async ({ page }) => {
    await login.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
  });

  test('Invalid username should show error', async () => {
    await login.login('wrong_user', 'secret_sauce');

    await expect(login.errorMessage).toBeVisible();
  });

  test('Invalid password should show error', async () => {
    await login.login('standard_user', 'wrong_pass');

    await expect(login.errorMessage).toBeVisible();
  });

  test('Empty fields should show error', async () => {
    await login.login('', '');

    await expect(login.errorMessage).toBeVisible();
  });

});