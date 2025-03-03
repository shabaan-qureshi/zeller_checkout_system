import { CartItem } from '../models/Cart';

export interface PricingRule {
    apply(items: CartItem[]): number;
  }