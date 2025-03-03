import { CartItem } from '../models/Cart';
import { PricingRule } from './PricingRule';

export class SuperIpadBulkDiscountRule implements PricingRule {
  apply(items: CartItem[]): number {
    const ipad = items.find(item => item.product.sku === 'ipd');
    
    // No discount if there's no iPad or if the quantity is 4 or less
    if (!ipad || ipad.quantity <= 4) {
      return 0;
    }

    // If more than 4 iPads, apply the new price of $499.99 each
    const discountPrice = 499.99;
    const originalPrice = ipad.product.price;  // Assuming the original price is stored in the product object
    const discountAmountPerItem = originalPrice - discountPrice;

    return ipad.quantity * discountAmountPerItem;
  }
}