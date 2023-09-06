import { LoginPage } from "./pages/LoginPage";
import { InventoryPage } from "./pages/InventoryPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutAddressDetailsPage } from "./pages/CheckOutAddressDetailsPage";
import { CheckoutOverviewPage } from "./pages/CheckOutOverviewPage";
import { CheckoutCompletePage } from "./pages/CheckOutCompletePage";
import { Product } from "./helpers/types";
import { toDollar, calculateTax, calculateTotal } from "./helpers/functions";

import customers from "../fixtures/customers.json";
import products from "../fixtures/products.json";

describe("SauceDemo Customer Journeys", () => {
  let inventoryPage: InventoryPage;
  let loginPage: LoginPage;
  let checkoutAddressDetailsPage: CheckoutAddressDetailsPage;
  let checkOutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;
  let cartPage: CartPage;

  beforeEach(() => {
    inventoryPage = new InventoryPage();
    loginPage = new LoginPage();
    checkoutAddressDetailsPage = new CheckoutAddressDetailsPage();
    checkOutOverviewPage = new CheckoutOverviewPage();
    cartPage = new CartPage();
    checkoutCompletePage = new CheckoutCompletePage();
  });

  it("should be able to login and complete order ", () => {
    const productToBuy: Product = products[0];
    loginPage.visit();
    loginPage.login(customers[0].userId, "secret_sauce");
    cy.url().should("include", "/inventory.html");
    inventoryPage.getShoppingCartBadgeCounter().should("not.exist");
    inventoryPage.addItemToCartByText(productToBuy.name);
    inventoryPage.getShoppingCartBadgeCounter().should("have.text", "1");
    inventoryPage.gotoShoppingCart();
    cartPage.getItem(productToBuy.name).should("be.visible");
    cartPage.goToCheckout();
    checkoutAddressDetailsPage.fillInAddressDetails(
      customers[0].firstName,
      customers[0].lastName,
      customers[0].postalCode
    );
    checkoutAddressDetailsPage.clickContinue();
    checkOutOverviewPage.getItem(productToBuy.name).should("be.visible");
    checkOutOverviewPage
      .getItemPrice(productToBuy.name)
      .should("have.text", toDollar(productToBuy.price));

    checkOutOverviewPage
      .getTax()
      .should("contain.text", toDollar(calculateTax(productToBuy.price)));
    checkOutOverviewPage
      .getTotal()
      .should("contain.text", toDollar(calculateTotal(productToBuy.price)));
    checkOutOverviewPage.clickFinish();
    checkoutCompletePage
      .getCompleteHeader()
      .should("have.text", "Thank you for your order!");
  });
});
