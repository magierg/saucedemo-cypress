import { CartPage } from "./pages/CartPage";

import products from "../fixtures/products.json";

describe("SauceDemo Cart Tests", () => {
  let cartPage: CartPage;

  beforeEach(() => {
    cartPage = new CartPage();
    cartPage.setUserSessionCookie("standard_user");
    cartPage.setupCart("[0,1]");
    cartPage.navigate();
  });

  it("should be able to checkout", () => {
    cartPage.getShoppingCartBadgeCounter().should("have.text", "2");
    cartPage.getItem(products[1].name).should("be.visible");
    cartPage.getItem(products[2].name).should("be.visible");
    cartPage.goToCheckout();
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("should be able to remove and go back to shopping", () => {
    cartPage.getShoppingCartBadgeCounter().should("have.text", "2");
    cartPage.removeItemFromCartByText(products[1].name);
    cartPage.getItem(products[1].name).should("not.exist");
    cartPage.getShoppingCartBadgeCounter().should("have.text", "1");
    cartPage.continueShopping();
    cy.url().should("include", "/inventory.html");
  });
});
