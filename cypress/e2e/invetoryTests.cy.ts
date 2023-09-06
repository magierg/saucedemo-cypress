import { LoginPage } from "./pages/LoginPage";
import { InventoryPage, SortOrder } from "./pages/InventoryPage";

import products from "../fixtures/products.json";
describe("SauceDemo Inventory Page Tests", () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;

  beforeEach(() => {
    inventoryPage = new InventoryPage();
    loginPage = new LoginPage();
    inventoryPage.setUserSessionCookie("standard_user");
    inventoryPage.navigate();
  });

  it("should add and remove an item ", () => {
    inventoryPage.getShoppingCartBadgeCounter().should("not.exist");
    inventoryPage.addItemToCartByText(products[0].name);
    inventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
    inventoryPage.removeItemFromCartByText(products[0].name);
    inventoryPage.getShoppingCartBadgeCounter().should("not.exist");
  });
  it("should be able to sort ", () => {
    inventoryPage.sortItemsBy(SortOrder.PriceLowToHigh);
    inventoryPage.getItemName(0).should("have.text", "$7.99");
    inventoryPage.sortItemsBy(SortOrder.PriceHighToLow);
    inventoryPage.getItemName(0).should("have.text", "$49.99");
  });
  it("should persist cart", () => {
    inventoryPage.getShoppingCartBadgeCounter().should("not.exist");
    inventoryPage.addItemToCartByText("Sauce Labs Backpack");
    inventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
    inventoryPage.logout();
    cy.url().should("equal", "https://www.saucedemo.com/");
    loginPage.login("standard_user", "secret_sauce");
    inventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
  });
});
