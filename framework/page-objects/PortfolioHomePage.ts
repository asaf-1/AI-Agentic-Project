import { expect, Locator, Page } from "@playwright/test";

type BookingDetails = {
  fullName: string;
  workEmail: string;
  company: string;
  preferredDate: string;
  teamSize: string;
};

type ContactDetails = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export class PortfolioHomePage {
  readonly page: Page;
  readonly heroHeading: Locator;
  readonly toast: Locator;
  readonly reportResult: Locator;
  readonly complianceResults: Locator;
  readonly apiHealthResult: Locator;
  readonly contactFeedback: Locator;
  readonly activityFeed: Locator;
  readonly loginResult: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heroHeading = page.getByTestId("hero-heading");
    this.toast = page.getByTestId("global-toast");
    this.reportResult = page.getByTestId("report-result");
    this.complianceResults = page.getByTestId("compliance-results");
    this.apiHealthResult = page.getByTestId("api-health-result");
    this.contactFeedback = page.getByTestId("contact-feedback");
    this.activityFeed = page.getByTestId("activity-feed");
    this.loginResult = page.getByTestId("login-result");
  }

  async goto() {
    await this.page.goto("/");
    await expect(this.heroHeading).toBeVisible();
  }

  async bookDemo(details: BookingDetails) {
    await this.page.getByTestId("open-booking-modal").click();
    await this.page.getByTestId("booking-name-input").fill(details.fullName);
    await this.page.getByTestId("booking-email-input").fill(details.workEmail);
    await this.page.getByTestId("booking-company-input").fill(details.company);
    await this.page.getByTestId("booking-date-input").fill(details.preferredDate);
    await this.page.getByTestId("booking-team-size-select").selectOption(details.teamSize);
    await this.page.getByTestId("booking-submit-button").click();
  }

  async generateReport(asset: string, period: string) {
    await this.page.getByTestId("report-asset-select").selectOption(asset);
    await this.page.getByTestId("report-period-select").selectOption(period);
    await this.page.getByTestId("generate-report-button").click();
  }

  async runComplianceScan() {
    await this.page.getByTestId("run-compliance-scan").click();
  }

  async checkApiHealth() {
    await this.page.getByTestId("check-api-health").click();
  }

  async submitContact(details: ContactDetails) {
    await this.page.getByTestId("contact-name-input").fill(details.name);
    await this.page.getByTestId("contact-email-input").fill(details.email);
    await this.page.getByTestId("contact-company-input").fill(details.company);
    await this.page.getByTestId("contact-message-input").fill(details.message);
    await this.page.getByTestId("contact-submit-button").click();
  }

  async openLoginModal() {
    await this.page.getByTestId("open-login-modal").click();
  }

  async loginPreview(email: string, password: string) {
    await this.openLoginModal();
    await this.page.getByTestId("login-email-input").fill(email);
    await this.page.getByTestId("login-password-input").fill(password);
    await this.page.getByTestId("login-submit-button").click();
  }
}
