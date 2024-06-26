import { expect, type Locator, type Page } from "@playwright/test";
import { NavigationBar } from "../components/navigation-bar";

export class LoginPage {
  readonly page: Page;
  readonly navigationBar: NavigationBar;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly signinbutton: Locator;

  readonly registerButton: Locator;

  readonly errorFeedback: Locator;
  readonly errorToast: Locator;

  constructor(page: Page) {
    this.page = page;

    this.navigationBar = new NavigationBar(page);

    this.emailInput = page.locator("input#email");
    this.passwordInput = page.locator("input#passwd");
    this.submitButton = page.locator("button#SubmitLogin", { hasText: "Sign in" });
    this.signinbutton = page.locator(".account_user_name"
  );

    this.registerButton = page.locator("a", { hasText: "Zaregistrujte se" });

    this.errorFeedback = page.locator("page-heading");
    this.errorToast = page.locator("div.toast");
  }

  async visit() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.submitButton.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async expectErrorToastToHaveText(expected: string) {
    await expect(this.errorToast).toHaveText(expected);
  }

  async expectErrorFeedbackToHaveText(expected: string) {
    await expect(this.errorFeedback).toHaveText(expected);
  }

  async expectErrorFeedbackIsVisible() {
    await expect(this.errorFeedback).toBeVisible();
  }

  async expectErrorFeedbackIsNotVisible() {
    await expect(this.errorFeedback).not.toBeVisible();
  }

  async expectErrorToastIsVisible() {
    await expect(this.errorToast).toBeVisible();
  }

  async expectWarningAroundEmailInput() {
    await expect(this.emailInput).toHaveClass("form-control is-invalid");
  }
}
