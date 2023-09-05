// cypress/integration/saucedemo.spec.ts

import LoginPage from "../page_objects/LoginPage";
import InventoryPage from "../page_objects/InventoryPage";

describe("SauceDemo Tests", () => {
  beforeEach(() => {
    // Start a new Cypress session before each test.
    LoginPage.visit();
    LoginPage.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it("should add an item to the cart", () => {
    // Use the same session to log in and add items to the cart.
    InventoryPage.addItemToCart();

    // Check the shopping cart badge using the InventoryPage POM method.
    InventoryPage.getShoppingCartBadge().should("have.text", "1");
  });

  // Add more tests as needed
});
