import { expect, test as base } from "@playwright/test";
import { PortfolioHomePage } from "../page-objects/PortfolioHomePage";

type AppFixtures = {
  homePage: PortfolioHomePage;
};

export const test = base.extend<AppFixtures>({
  homePage: async ({ page }, use) => {
    await use(new PortfolioHomePage(page));
  }
});

export { expect };
