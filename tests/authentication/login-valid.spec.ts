import { test } from '../../pages/fixtures/test-fixture';
import { expect } from '@playwright/test';
import Env from '../../settings/.env/env.global';

test.describe('Authentication Tests for Login flow', () => {
  test('User logins with valid credentials',
    { tag: ["@login", "@TC001", "@ui"] },
    async ({ page, loginPage, mainPage }) => {
      // Arrange
      const username = Env.USERNAME;

      // Act & Assert
      await test.step("Step 1: Click on Login link", async () => {
        await loginPage.lnkLogin.click();
      });

      await test.step("Verify the Login form is displayed", async () => {
        await expect.soft(loginPage.lblDlgTitle).toBeVisible();
        await expect.soft(loginPage.txtUsername).toBeVisible();
        await expect.soft(loginPage.txtPassword).toBeVisible();
        await expect.soft(loginPage.btnLogin).toBeVisible();
      });

      await test.step("Step 2: Enter valid username and password", async () => {
        await loginPage.txtUsername.fill(Env.USERNAME);
        await loginPage.txtPassword.fill(Env.PASSWORD);
      });

      await test.step("Step 3: Click on Login button", async () => {
        await loginPage.btnLogin.click();
      });


      await test.step("Verify the user is logged in successfully", async () => {
        await expect.soft(mainPage.lnkLogout).toBeVisible();
        await expect.soft(mainPage.lnkWelcome).toBeVisible();
      });

      await test.step("Verify the username is shown in the welcome message", async () => {
        const welcomeText = await mainPage.lnkWelcome.textContent();
        expect.soft(welcomeText).toContain(username);
      });
    });

  test('Validation login form',
    { tag: ["@login", "@TC002"] },
    async ({ page, loginPage }) => {
      // Arrange
      const errMsgNoCredential = "Please fill out Username and Password.";
      const errMsgInvalidUser = "User does not exist.";
      const invalidUsername = "DemoUserTest";
      const invalidPassword = "NonExistentPassword";

      // Act & Assert
      await test.step("Step 1: Click on Login link", async () => {
        await loginPage.lnkLogin.click();
      });

      await test.step("Step 2: Do not input username and password and click on Login button", async () => {
        await loginPage.btnLogin.click();
      });

      await test.step("Verify system shows the error message Please fill out Username and Password.", async () => {
        page.once('dialog', async dialog => {
          expect.soft(dialog.message()).toContain(errMsgNoCredential);
          await dialog.accept();
        });
      });

      await test.step("Step 3: Enter valid username and empty password and click on Login button", async () => {
        await loginPage.txtUsername.fill(Env.USERNAME);
        await loginPage.txtPassword.clear();
        await loginPage.btnLogin.click();
      });

      await test.step("Verify the error message Please fill out Username and Password. is displayed", async () => {
        page.once('dialog', async dialog => {
          expect.soft(dialog.message()).toContain(errMsgNoCredential);
          await dialog.accept();
        });
      });

      await test.step("Step 4: Enter valid password and empty username and click on Login button", async () => {
        await loginPage.txtUsername.clear();
        await loginPage.txtPassword.fill(Env.PASSWORD);
        await loginPage.btnLogin.click();
      });

      await test.step("Verify the error message Please fill out Username and Password. is displayed", async () => {
        page.once('dialog', async dialog => {
          expect.soft(dialog.message()).toContain(errMsgNoCredential);
          await dialog.accept();
        });
      });

      await test.step("Step 5: Enter invalid username and password and click on Login button", async () => {
        await loginPage.txtUsername.fill(invalidUsername);
        await loginPage.txtPassword.fill(invalidPassword);
        await loginPage.btnLogin.click();
      });

      await test.step("Verify the error message User does not exist. is displayed", async () => {
        page.once('dialog', async dialog => {
          expect.soft(dialog.message()).toContain(errMsgInvalidUser);
          await dialog.accept();
        });
      });
    });
});