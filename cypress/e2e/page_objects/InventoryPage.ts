import { BasePage } from "./BasePage";
import { InventoryItem } from "./InventoryItem";

class InventoryPage extends BasePage {
  private readonly addToCartButton =
    "[data-test=add-to-cart-sauce-labs-backpack]";
  private inventoryItem = new InventoryItem();

  addItemToCart() {
    cy.get(this.addToCartButton).first().click();
  }

  getPriceForTheItem(text: string) {
    cy.get(".inventory_item")
      .filter(`:contains("${text}")`)
      .find(".inventory_item_price");
  }

  addItemToCartByText(text: string) {
    const buttonId = text.split(" ").join("-").toLowerCase();
    cy.get(`[data-test=add-to-cart-${buttonId}]`).click();
  }

  removeItemFromCartByText(text: string) {
    const buttonId = text.split(" ").join("-").toLowerCase();
    cy.get(`[data-test=remove-${buttonId}]`).click();
  }

  getItemProperties(productName: string | number) {
    return this.inventoryItem.getItemProperties(productName);
  }
  sortItemsBy() {
    cy.get("[data-test=product_sort_container]").select("lohi");
  }
}

export default new InventoryPage();
