import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {
  private readonly cancelButton: string;
  private readonly finishButton: string;
  private readonly subtotalLabel: string;
  private readonly taxLabel: string;
  private readonly totalLabel: string;

  constructor() {
    super();
    this.cancelButton = "[data-test=cancel]";
    this.finishButton = "[data-test=finish]";
    this.subtotalLabel = ".summary_subtotal_label";
    this.taxLabel = ".summary_tax_label";
    this.totalLabel = ".summary_total_label";
  }

  navigate() {
    cy.visit("/checkout-step-two.html", { failOnStatusCode: false });
  }
  clickCancel() {
    cy.get(this.cancelButton).click();
  }

  clickFinish() {
    cy.get(this.finishButton).click();
  }

  getItem(productName: string | number) {
    return typeof productName === "number"
      ? cy.get(".cart_item").eq(productName)
      : cy.get(".cart_item").filter(`:contains("${productName}")`);
  }

  getItemPrice(productName: string | number) {
    return this.getItem(productName).find(".inventory_item_price");
  }
  getItemName(productName: string | number) {
    return this.getItem(productName).find(".inventory_item_name");
  }
  getItemDescription(productName: string | number) {
    return this.getItem(productName).find(".inventory_item_desc");
  }
  getItemsTotal() {
    return cy.get(this.subtotalLabel);
  }
  getTax() {
    return cy.get(this.taxLabel);
  }
  getTotal() {
    return cy.get(this.totalLabel);
  }
}
