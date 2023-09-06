export const toDollar = (price: number | string) => "$" + price.toString();
export const decimalRound = (num: number) =>
  (Math.round((num + Number.EPSILON) * 100) / 100).toFixed(2);
export const calculateTotal = (num: number) => decimalRound(num + num * 0.08);
export const calculateTax = (num: number) => decimalRound(num * 0.08);
