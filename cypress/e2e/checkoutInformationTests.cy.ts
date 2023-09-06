import { CheckoutAddressDetailsPage } from "./pages/CheckOutAddressDetailsPage";

describe("SauceDemo Checkout Information Tests", () => {
  let checkoutAddressDetailsPage: CheckoutAddressDetailsPage;

  beforeEach(() => {
    checkoutAddressDetailsPage = new CheckoutAddressDetailsPage();
    checkoutAddressDetailsPage.setUserSessionCookie("standard_user");
    checkoutAddressDetailsPage.navigate();
  });

  it("should be fill in address and continue", () => {
    checkoutAddressDetailsPage.fillInAddressDetails("first", "last", "postal");
    checkoutAddressDetailsPage.clickContinue();
    cy.url().should("include", "/checkout-step-two.html");
  });

  it("should display error message", () => {
    checkoutAddressDetailsPage.clickContinue();
    checkoutAddressDetailsPage
      .getErrorMessage()
      .should("contain.text", "First Name is required");
    checkoutAddressDetailsPage.fillInAddressDetails("first");
    checkoutAddressDetailsPage.clickContinue();
    checkoutAddressDetailsPage
      .getErrorMessage()
      .should("contain.text", "Last Name is required");
    checkoutAddressDetailsPage.fillInAddressDetails("", "last");
    checkoutAddressDetailsPage.clickContinue();
    checkoutAddressDetailsPage
      .getErrorMessage()
      .should("contain.text", "Postal Code is required");
  });
  it("should be able to cancel", () => {
    checkoutAddressDetailsPage.clickCancel();
    cy.url().should("include", "/cart.html");
  });
});
