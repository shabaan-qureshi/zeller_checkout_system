import { CartItem } from '../models/Cart';
import { PricingRule } from './PricingRule';

export class AppleTvDiscountRule implements PricingRule {
  apply(items: CartItem[]): number {
    const appleTV = items.find(item => item.product.sku === 'atv');
    if (!appleTV) {
      return 0;
    }

    // For every 3 Apple TVs, one is free (3 for 2 deal)
    const freeCount = Math.floor(appleTV.quantity/3);
    return freeCount * appleTV.product.price;
  }
}