import LoginPage from "../page_objects/LoginPage";
import InventoryPage from "../page_objects/InventoryPage";

describe("SauceDemo Tests", () => {
  before(() => {
    cy.intercept("/service-worker.js", {
      body: undefined,
    });
  });
  // beforeEach(() => {
  //   LoginPage.visit();
  // });

  it("should log in with valid credentials", () => {
    LoginPage.visit();

    LoginPage.login("standard_user", "secret_sauce");

    cy.get("[data-test=inventory-header]").should("exist");
  });

  it("should add an item to the cart", () => {
    LoginPage.login("standard_user", "secret_sauce");
    InventoryPage.addItemToCart();

    InventoryPage.getShoppingCartBadgeText().should("have.text", "1");
  });
});
