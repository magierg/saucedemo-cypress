import LoginPage from "./page_objects/LoginPage";
import CheckoutOverviewPage from "./page_objects/CheckOutOwerviewPage";

describe("SauceDemo Tests", () => {
  beforeEach(() => {
    cy.setLocalStorage("cart-contents", "[4,0]");
    LoginPage.visit();
    LoginPage.login("standard_user", "secret_sauce");
  });

  it("should add an item to the cart", () => {
    cy.visit({
      url: "/checkout-step-two.html",
      method: "GET",
      failOnStatusCode: false,
    });
    // Use the same session to log in and add items to the cart.
    // Check the shopping cart badge using the InventoryPage POM method.
    CheckoutOverviewPage.getShoppingCartBadgeCounter().should("have.text", "2");
  });

  // Add more tests as needed
});
