class LoginPage {
  private readonly usernameInput = "[data-test=username]";
  private readonly passwordInput = "[data-test=password]";
  private readonly loginButton = "[data-test=login-button]";

  visit() {
    cy.visit("https://www.saucedemo.com/");
  }

  login(username: string, password: string) {
    cy.get(this.usernameInput).type(username);
    cy.get(this.passwordInput).type(password);
    cy.get(this.loginButton).click();
  }
}

export default new LoginPage();
