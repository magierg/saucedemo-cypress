import { BasePage } from "./BasePage";

export class CheckoutAddressDetailsPage extends BasePage {
  private readonly firstNameInput;
  private readonly lastNameInput;
  private readonly postalCodeInput;
  private readonly continueButton;
  private readonly cancelButton;
  private readonly errorMessage;

  constructor() {
    super();
    this.firstNameInput = "[data-test=firstName]";
    this.lastNameInput = "[data-test=lastName]";
    this.postalCodeInput = "[data-test=postalCode]";
    this.continueButton = "[data-test=continue]";
    this.cancelButton = "[data-test=cancel]";
    this.errorMessage = "[data-test=error]";
  }

  navigate() {
    cy.visit("/checkout-step-one.html", { failOnStatusCode: false });
  }
  fillInAddressDetails(
    firstName: string = "",
    lastName: string = "",
    postalCode: string = ""
  ) {
    if (firstName != "") {
      cy.get(this.firstNameInput).type(firstName);
    }
    if (lastName != "") {
      cy.get(this.lastNameInput).type(lastName);
    }
    if (postalCode != "") {
      cy.get(this.postalCodeInput).type(postalCode);
    }
  }

  clickContinue() {
    cy.get(this.continueButton).click();
  }

  clickCancel() {
    cy.get(this.cancelButton).click();
  }

  getErrorMessage() {
    return cy.get(this.errorMessage);
  }
}
