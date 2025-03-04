import { Checkout } from '../Checkout';
import { PricingRule } from '../pricing-rules/PricingRule';
import { PRODUCTS } from '../config/productsConstants'

export function createCheckout(pricingRules: PricingRule[]): Checkout {
  return new Checkout(pricingRules, PRODUCTS);
}