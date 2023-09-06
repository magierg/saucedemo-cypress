export class BasePage {
  private readonly shoppingCartBadge = ".shopping_cart_badge";

  getShoppingCartBadgeCounter() {
    return cy.get(this.shoppingCartBadge);
  }

  openMenu() {
    cy.get(".bm-burger-button").click();
  }

  logout() {
    this.openMenu();
    cy.get("[id=logout_sidebar_link]").click();
  }
}
