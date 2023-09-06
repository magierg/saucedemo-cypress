import LoginPage from "./page_objects/LoginPage";
import InventoryPage from "./page_objects/InventoryPage";

describe("SauceDemo Tests", () => {
  beforeEach(() => {
    // Start a new Cypress session before each test.
    cy.login("standard_user", "secret_sauce");
  });

  it("should add an item to the cart", () => {
    // Use the same session to log in and add items to the cart.

    // Check the shopping cart badge using the InventoryPage POM method.
    InventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
  });

  // Add more tests as needed
});
