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
    const baseTotal = this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const totalDiscount = this.pricingRules.reduce(
      (sum, rule) => sum + rule.apply(this.cart),
      0
    );

    return parseFloat((baseTotal - totalDiscount).toFixed(2));
  }
}
