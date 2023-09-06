export class BasePage {
  private readonly shoppingCartBadge = ".shopping_cart_badge";
  private readonly shoppingCartLink = ".shopping_cart_link";
  private readonly menuBurgerButton = ".bm-burger-button";
  private readonly menuLogoutLink = "[id=logout_sidebar_link]";

  getShoppingCartBadgeCounter() {
    return cy.get(this.shoppingCartBadge);
  }

  gotoShoppingCart() {
    cy.get(this.shoppingCartLink).click();
  }

  openMenu() {
    cy.get(this.menuBurgerButton).click();
  }

  logout() {
    this.openMenu();
    cy.get(this.menuLogoutLink).click();
  }

  /**
   * set session for given user
   * @param username login as this user"
   */
  setUserSessionCookie(username) {
    cy.setCookie("session-username", username);
  }
  /**
   * set cart content in local storage
   * @param items items to include ie. "[0,1]"
   */
  setupCart(items: string) {
    cy.setLocalStorage("cart-contents", items);
  }
}
