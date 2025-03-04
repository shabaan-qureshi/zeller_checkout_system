import { CartItem } from '../models/Cart';
import { PricingRule } from './PricingRule';
import { DISCOUNT_RULES_CONSTANTS } from '../config/discountRulesConstants';

const { APPLE_TV_BUY_X_GET_Y_FREE } = DISCOUNT_RULES_CONSTANTS;

export class AppleTvDiscountRule implements PricingRule {
  apply(items: CartItem[]): number {
    const appleTVItems = items.filter(item => item.product.sku === 'atv');
    const totalQuantity = appleTVItems.reduce((sum, item) => sum + item.quantity, 0);

    const freeCount = Math.floor(totalQuantity / APPLE_TV_BUY_X_GET_Y_FREE.quantity);

    if (freeCount > 0) {
      const priceOfOneAppleTv = appleTVItems[0].product.price;
      return freeCount * priceOfOneAppleTv;
    }

    return 0;
  }
}
