class InventoryPage {
  private readonly addToCartButton = "[data-test=add-to-cart-button]";
  private readonly shoppingCartBadge = "[data-test=shopping-cart-badge]";

  addItemToCart() {
    cy.get(this.addToCartButton).first().click();
  }

  getShoppingCartBadgeText() {
    return cy.get(this.shoppingCartBadge).invoke("text");
  }
}

export default new InventoryPage();
