import { CheckoutOverviewPage } from "./pages/CheckOutOverviewPage";
import { toDollar, calculateTax, calculateTotal } from "./helpers/functions";

import products from "../fixtures/products.json";

describe("SauceDemo Check Overview Page Tests", () => {
  let checkoutOverviewPage: CheckoutOverviewPage;

  beforeEach(() => {
    checkoutOverviewPage = new CheckoutOverviewPage();
    checkoutOverviewPage.setUserSessionCookie("standard_user");
    checkoutOverviewPage.setupCart("[0,1]");
    checkoutOverviewPage.navigate();
  });

  it("should be able to check details finish checkout", () => {
    checkoutOverviewPage.getItem(products[1].name).should("be.visible");
    checkoutOverviewPage
      .getItemPrice(products[1].name)
      .should("have.text", toDollar(products[1].price));
    checkoutOverviewPage.getItem(products[2].name).should("be.visible");
    checkoutOverviewPage
      .getItemPrice(products[2].name)
      .should("have.text", toDollar(products[2].price));

    checkoutOverviewPage
      .getTax()
      .should(
        "contain.text",
        toDollar(calculateTax(products[2].price + products[1].price))
      );
    checkoutOverviewPage
      .getTotal()
      .should(
        "contain.text",
        toDollar(calculateTotal(products[2].price + products[1].price))
      );
    checkoutOverviewPage.clickFinish();
  });

  it("should be able to cancel", () => {
    checkoutOverviewPage.clickCancel();
    cy.url().should("include", "/inventory.html");
  });
});
