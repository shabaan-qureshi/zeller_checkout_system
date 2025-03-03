import { Product } from './models/Product';
import { CartItem } from './models/Cart';
import { PricingRule } from './pricing-rules/PricingRule';

export class Checkout {
  private cart: CartItem[] = [];
  private pricingRules: PricingRule[];
  private products: Map<string, Product>;

  constructor(pricingRules: PricingRule[], products: Product[]) {
    this.pricingRules = pricingRules;
    this.products = new Map(products.map(product => [product.sku, product]));
  }

  scan(sku: string): void {
    const product = this.products.get(sku);
    if (!product) {
      throw new Error(`Product with SKU ${sku} not found`);
    }

    const existingItem = this.cart.find(item => item.product.sku === sku);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  total(): number {
    // Calculate base price (sum of all products at their regular price)
    const baseTotal = this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    // Apply all pricing rules and sum up the discounts
    const totalDiscount = this.pricingRules.reduce(
      (sum, rule) => sum + rule.apply(this.cart),
      0
    );

    // Return the total, rounded to 2 decimal places
    return parseFloat((baseTotal - totalDiscount).toFixed(2));
  }
}
