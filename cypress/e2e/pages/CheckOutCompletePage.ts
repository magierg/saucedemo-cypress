import { BasePage } from "./BasePage";

export class CheckoutCompletePage {
  private readonly completeHeader = ".complete-header";
  private readonly backHomeButton = "[data-test=back-to-products]";

  navigate() {
    cy.visit("/checkout-complete.html", { failOnStatusCode: false });
  }
  getCompleteHeader() {
    return cy.get(this.completeHeader);
  }

  goBackHome() {
    cy.get(this.backHomeButton).click();
  }
}
