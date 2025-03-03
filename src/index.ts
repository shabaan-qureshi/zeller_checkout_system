import { Checkout } from './Checkout';
import { Product } from './models/Product';
import { AppleTvDiscountRule } from './pricing-rules/AppleTvDiscountRule';
import { SuperIpadBulkDiscountRule } from './pricing-rules/SuperIpadBulkDiscountRule';
import { PricingRule } from './pricing-rules/PricingRule';

export const products: Product[] = [
  { sku: 'ipd', name: 'Super iPad', price: 549.99 },
  { sku: 'mbp', name: 'MacBook Pro', price: 1399.99 },
  { sku: 'atv', name: 'Apple TV', price: 109.50 },
  { sku: 'vga', name: 'VGA adapter', price: 30.00 }
];

export function createCheckout(customRules?: PricingRule[]): Checkout {
  const defaultRules: PricingRule[] = [
    new AppleTvDiscountRule(),
    new SuperIpadBulkDiscountRule()
  ];
  
  const pricingRules = customRules || defaultRules;
  return new Checkout(pricingRules, products);
}