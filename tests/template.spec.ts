import { test, expect } from "@playwright/test";
import { AllPages } from "../pages";

test.describe("Prihlasovani", () => {
  let pages: AllPages;

  // Before each test, visit the page
  test.beforeEach(async ({ page }) => {
    pages = new AllPages(page);

    await pages.visitPage();
  });


  test("uspesne prihlaseni", async () => {
    await pages.loginPage.visit();
  
    await pages.loginPage.fillEmail("volkova.petra@email.cz");
    await pages.loginPage.fillPassword("Petra123.heslo");
    await pages.loginPage.submitButton.click();
    await expect(pages.loginPage.signinbutton).toBeVisible()

  });

test("neuspesne prihlaseni", async () => {
  await pages.loginPage.visit();

  await pages.loginPage.fillEmail("volkova.petra@email.cz");
  await pages.loginPage.fillPassword("Petra123heslo");
  await pages.loginPage.submitButton.click();
  await expect(pages.loginPage.submitButton).toBeVisible()

});

});
