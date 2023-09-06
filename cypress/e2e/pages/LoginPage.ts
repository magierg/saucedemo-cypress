export class LoginPage {
  private readonly usernameInput = "[data-test=username]";
  private readonly passwordInput = "[data-test=password]";
  private readonly loginButton = "[data-test=login-button]";
  private readonly errorMessage = "[data-test=error]";

  visit() {
    cy.visit("/", { failOnStatusCode: false });
  }

  login(username: string, password: string) {
    if (username !== "") {
      cy.get(this.usernameInput).type(username);
    }
    if (password !== "") {
      cy.get(this.passwordInput).type(password);
    }
    cy.get(this.loginButton).click();
  }
  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
}
