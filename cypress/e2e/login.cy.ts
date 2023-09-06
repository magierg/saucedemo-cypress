// cypress/integration/saucedemo.spec.ts

import LoginPage from "./page_objects/LoginPage";
import InventoryPage from "./page_objects/InventoryPage";

describe("SauceDemo Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("should be able to login with valid credentials", () => {
    LoginPage.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it("should display error for missing or invalid credentials", () => {
    LoginPage.login("", "");
    LoginPage.getErrorMessage().should("contain.text", "Username is required");
    LoginPage.login("test", "");
    LoginPage.getErrorMessage().should("contain.text", "Password is required");
    LoginPage.login("test", "test");
    LoginPage.getErrorMessage().should(
      "contain.text",
      "Username and password do not match any user in this service"
    );
  });

  it("should display error for locked out user", () => {
    LoginPage.login("locked_out_user", "secret_sauce");
    LoginPage.getErrorMessage().should(
      "contain.text",
      "Sorry, this user has been locked out."
    );
  });
});
