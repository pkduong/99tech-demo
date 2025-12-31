import BasePage from "../../pages/BasePage";
import { Locator, Page } from "@playwright/test";

class SearchPage extends BasePage {

    readonly lnkLogout: Locator;
    readonly lnkWelcome: Locator;

    constructor(options: { page: Page }) {
        super(options);
        this.lnkLogout = this.page.getByRole("link", { name: "Log out" });
        this.lnkWelcome = this.page.getByRole("link", { name: /Welcome/i });
    }

    async selectCategory(category: string) {
        const categoryLink = this.page.getByRole('link', { name: `${category}` });
        await categoryLink.click();
    }
}

export default SearchPage;