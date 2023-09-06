import { InventoryItem } from "./InventoryItem";

class InventoryPage {
  private readonly addToCartButton =
    "[data-test=add-to-cart-sauce-labs-backpack]";
  private readonly shoppingCartBadge = ".shopping_cart_badge";

  addItemToCart() {
    cy.get(this.addToCartButton).first().click();
  }

  getShoppingCartBadgeCounter() {
    return cy.get(this.shoppingCartBadge);
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

  getItem(productName: string | number) {
    return typeof productName === "number"
      ? cy.get(".inventory_item").eq(productName)
      : cy.get(".inventory_item").filter(`:contains("${productName}")`);
  }
  getItemProperties(productName: string | number) {
    return cy.wrap({
      title: this.getItem(productName).find(".inventory_item_name"),
      price: this.getItem(productName).find(".inventory_item_price"),
      description: this.getItem(productName).find(".inventory_item_desc"),
    });
  }
  sortItemsBy() {
    cy.get("[data-test=product_sort_container]").select("lohi");
  }
  logout() {
    cy.get(".bm-burger-button").click();
    cy.get("[id=logout_sidebar_link]").click();
  }
}

export default new InventoryPage();
