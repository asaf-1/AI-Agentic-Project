import { bookingRequest, validPreviewLogin } from "../../framework/test-data/demoData";
import { expect, test } from "../../framework/fixtures/baseTest";

test.describe("Amiio-Demo", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test("loads the local platform and refreshes portfolio metrics", async ({ page, homePage }) => {
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
    await expect(page.getByText("Functional actions for automation coverage.")).toBeVisible();

    const previousProperties = await page.getByTestId("metric-properties").textContent();
    await page.getByTestId("refresh-metrics").click();

    await expect(homePage.toast).toContainText("Portfolio metrics refreshed.");
    await expect(page.getByTestId("metric-properties")).not.toHaveText(previousProperties || "");
    await expect(homePage.activityFeed).toContainText("Portfolio KPI band refreshed.");
  });

  test("books a local demo and records the activity", async ({ homePage }) => {
    await test.step("Submit the booking request", async () => {
      await homePage.bookDemo(bookingRequest);
    });

    await test.step("Validate the booking feedback", async () => {
      await expect(homePage.toast).toContainText("Local demo booked.");
      await expect(homePage.activityFeed).toContainText("Reserved demo slot");
      await expect(homePage.activityFeed).toContainText(bookingRequest.company);
    });
  });

  test("creates a report draft and runs a compliance scan", async ({ homePage }) => {
    await test.step("Generate the portfolio report draft", async () => {
      await homePage.generateReport("Northpoint Logistics Fund", "Q2 2026");
      await expect(homePage.reportResult).toContainText("Ready for review");
      await expect(homePage.reportResult).toContainText("Northpoint Logistics Fund");
    });

    await test.step("Run the compliance scan", async () => {
      await homePage.runComplianceScan();
      await expect(homePage.complianceResults).toContainText("Debt service covenant");
      await expect(homePage.complianceResults).toContainText("Monitor");
      await expect(homePage.activityFeed).toContainText("Completed a compliance scan");
    });
  });

  test("checks the local API health from the workspace", async ({ homePage }) => {
    await homePage.checkApiHealth();

    await expect(homePage.toast).toContainText("Local API is healthy.");
    await expect(homePage.apiHealthResult).toContainText("Healthy");
    await expect(homePage.apiHealthResult).toContainText("Status:");
    await expect(homePage.apiHealthResult).toContainText("ok");
    await expect(homePage.apiHealthResult).toContainText("Port:");
    await expect(homePage.apiHealthResult).toContainText("4173");
    await expect(homePage.activityFeed).toContainText("Verified local API health");
  });

  test("authenticates with the preview credentials", async ({ homePage }) => {
    await homePage.loginPreview(validPreviewLogin.email, validPreviewLogin.password);

    await expect(homePage.toast).toContainText("Preview login successful.");
    await expect(homePage.loginResult).toContainText("Local analyst workspace unlocked.");
  });
});
