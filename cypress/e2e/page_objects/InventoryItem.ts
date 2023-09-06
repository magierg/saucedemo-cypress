export class InventoryItem {
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
}
