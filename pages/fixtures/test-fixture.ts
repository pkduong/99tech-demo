import { test as base } from "@playwright/test";
import LoginPage from "../../pages/login/LoginPage";
import MainPage from "../main/MainPage";
import SearchPage from "../search/SearchPage";
import Env from "../../settings/.env/env.global";

type DemoBlaze = {
    loginPage: LoginPage;
    mainPage: MainPage;
    searchPage: SearchPage;
};

export const test = base.extend<DemoBlaze>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage({ page }));
    },
    mainPage: async ({ page }, use) => {
        await use(new MainPage({ page }));
    },
    searchPage: async ({ page }, use) => {
        await use(new SearchPage({ page }));
    },
});

test.beforeEach(async ({ page }) => {
    // Navigate to the DemoBlaze home page
    await page.goto(Env.BASE_URL);
});