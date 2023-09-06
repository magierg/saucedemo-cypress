import { BasePage } from "./BasePage";

export enum SortOrder {
  NameAtoZ = "az",
  NameZtoA = "za",
  PriceLowToHigh = "lohi",
  PriceHighToLow = "hilo",
}
export class InventoryPage extends BasePage {
  private readonly addToCartButton: string;
  private readonly sortContainer: string;

  constructor() {
    super();
    this.addToCartButton = "[data-test=add-to-cart-sauce-labs-backpack]";
    this.sortContainer = "[data-test=product_sort_container]";
  }

  navigate() {
    cy.visit("/inventory.html", { failOnStatusCode: false });
  }
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

  private getItem(productName: string | number) {
    return typeof productName === "number"
      ? cy.get(".inventory_item").eq(productName)
      : cy.get(".inventory_item").filter(`:contains("${productName}")`);
  }

  getItemPrice(productName: string | number) {
    return this.getItem(productName).find(".inventory_item_name");
  }
  getItemName(productName: string | number) {
    return this.getItem(productName).find(".inventory_item_price");
  }
  getItemDescription(productName: string | number) {
    return this.getItem(productName).find(".inventory_item_desc");
  }
  sortItemsBy(sortOrder: SortOrder) {
    cy.get(this.sortContainer).select(sortOrder);
  }
}
