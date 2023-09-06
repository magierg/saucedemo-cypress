import LoginPage from "./page_objects/LoginPage";
import InventoryPage from "./page_objects/InventoryPage";

describe("SauceDemo Tests", () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login("standard_user", "secret_sauce");
    cy.url().should("include", "/inventory.html");
  });

  it("should add and remove an item ", () => {
    InventoryPage.getShoppingCartBadgeCounter().should("not.exist");
    InventoryPage.addItemToCartByText("Sauce Labs Backpack");
    InventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
    InventoryPage.removeItemFromCartByText("Sauce Labs Backpack");
    InventoryPage.getShoppingCartBadgeCounter().should("not.exist");
    // InventoryPage.sortItemsBy();
    InventoryPage.getItemProperties(0).then((item) => {
      // Access item properties within the Cypress chainable
      const { title, price } = item;

      // Assert that title and price are not empty
      title.should("have.text", "Sauce Labs Backpack");
      price.should("have.text", "$29.99");
    });
  });
  it("should be able to sort ", () => {});
  it("should persist", () => {
    InventoryPage.getShoppingCartBadgeCounter().should("not.exist");
    InventoryPage.addItemToCartByText("Sauce Labs Backpack");
    InventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
    InventoryPage.logout();
    cy.url().should("eq", "https://www.saucedemo.com/");
    LoginPage.login("standard_user", "secret_sauce");
    InventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
  });
});
