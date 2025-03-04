import { CartItem } from '../models/Cart';
import { PricingRule } from './PricingRule';
import { DISCOUNT_RULES_CONSTANTS } from '../config/discountRulesConstants';

const { SUPER_IPAD_BULK_DISCOUNT }  = DISCOUNT_RULES_CONSTANTS

export class SuperIpadBulkDiscountRule implements PricingRule {
  apply(items: CartItem[]): number {
    const ipad = items.find(item => item.product.sku === 'ipd');
    
    if (!ipad || ipad.quantity <= SUPER_IPAD_BULK_DISCOUNT.quantity) {
      return 0;
    }

    const originalPrice = ipad.product.price;  
    const discountAmountPerItem = originalPrice - SUPER_IPAD_BULK_DISCOUNT.price;

    return ipad.quantity * discountAmountPerItem;
  }
}