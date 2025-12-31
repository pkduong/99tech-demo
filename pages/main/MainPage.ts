import BasePage from "../../pages/BasePage";
import { Locator, Page } from "@playwright/test";

class MainPage extends BasePage {

    readonly lnkLogout: Locator;
    readonly lnkWelcome: Locator;

    constructor(options: { page: Page }) {
        super(options);
        this.lnkLogout = this.page.getByRole("link", { name: "Log out" });
        this.lnkWelcome = this.page.getByRole("link", { name: /Welcome/i });
    }
}

export default MainPage;