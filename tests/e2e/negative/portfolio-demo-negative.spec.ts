import { invalidContactRequest } from "../../../framework/test-data/demoData";
import { expect, test } from "../../../framework/fixtures/baseTest";

test.describe("Amiio-Demo negative", () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test("shows validation feedback for an invalid contact email", async ({ homePage }) => {
    await homePage.submitContact(invalidContactRequest);

    await expect(homePage.contactFeedback).toContainText("Please correct the highlighted fields.");
    await expect(homePage.page.locator("[data-error-for='email']")).toHaveText(
      "Enter a valid email address."
    );
    await expect(homePage.activityFeed).not.toContainText(invalidContactRequest.company);
  });
});
