import BasePage from "../../pages/BasePage";
import { Locator, Page } from "@playwright/test";
import Env from "../../settings/.env/env.global";

class LoginPage extends BasePage {

    readonly txtUsername: Locator;
    readonly txtPassword: Locator;
    readonly lnkLogin: Locator;
    readonly btnLogin: Locator;
    readonly lblDlgTitle: Locator;

    constructor(options: { page: Page }) {
        super(options);
        this.txtUsername = this.page.locator('input#loginusername');
        this.txtPassword = this.page.locator('input#loginpassword');
        this.lnkLogin = this.page.getByRole("link", { name: "Log in" });
        this.btnLogin = this.page.getByRole("button", { name: "Log in" });
        this.lblDlgTitle = this.page.getByRole("heading", { name: "Log in" });
    }

    async login(username: string = Env.USERNAME, password: string = Env.PASSWORD) {
       await this.lnkLogin.click();
       await this.txtUsername.fill(username);
       await this.txtPassword.fill(password);
       await this.btnLogin.click();
    }
}

export default LoginPage;