class InventoryPage {
  private readonly addToCartButton =
    "[data-test=add-to-cart-sauce-labs-backpack]";
  private readonly shoppingCartBadge = ".shopping_cart_badge";

  addItemToCart() {
    cy.get(this.addToCartButton).first().click();
  }

  getShoppingCartBadge() {
    return cy.get(this.shoppingCartBadge);
  }
}

export default new InventoryPage();
