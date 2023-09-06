import { LoginPage } from "./pages/LoginPage";

describe("SauceDemo Login Page Tests", () => {
  let loginPage: LoginPage;
  beforeEach(() => {
    loginPage = new LoginPage();
    loginPage.visit();
  });

  it("should be able to login with valid credentials", () => {
    loginPage.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it("should display error for missing or invalid credentials", () => {
    loginPage.login("", "");
    loginPage.getErrorMessage().should("contain.text", "Username is required");
    loginPage.login("test", "");
    loginPage.getErrorMessage().should("contain.text", "Password is required");
    loginPage.login("test", "test");
    loginPage
      .getErrorMessage()
      .should(
        "contain.text",
        "Username and password do not match any user in this service"
      );
  });

  it("should display error for locked out user", () => {
    loginPage.login("locked_out_user", "secret_sauce");
    loginPage
      .getErrorMessage()
      .should("contain.text", "Sorry, this user has been locked out.");
  });
});
