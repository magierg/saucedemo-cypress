import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private readonly checkoutButton = "[data-test=checkout]";
  private readonly continueButton = "[data-test=continue-shopping]";

  constructor() {
    super();
  }

  navigate() {
    cy.visit("/cart.html", { failOnStatusCode: false });
  }
  goToCheckout() {
    cy.get(this.checkoutButton).click();
  }

  continueShopping() {
    cy.get(this.continueButton).click();
  }

  removeItemFromCartByText(text: string) {
    const buttonId = text.split(" ").join("-").toLowerCase();
    cy.get(`[data-test=remove-${buttonId}]`).click();
  }

  getItem(productName: string | number) {
    return typeof productName === "number"
      ? cy.get(".cart_item").eq(productName)
      : cy.get(".cart_item").filter(`:contains("${productName}")`);
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
}
