import { expect } from 'chai';
import { createCheckout } from '../src/test-utls/checkoutTestUtils';  
import { PricingRule  } from '../src/pricing-rules/PricingRule';
import { AppleTvDiscountRule } from '../src/pricing-rules/AppleTvDiscountRule';
import { SuperIpadBulkDiscountRule } from '../src/pricing-rules/SuperIpadBulkDiscountRule';

describe('Checkout', () => {
  describe('Apple TV 3-for-2 deal', () => {

    const pricingRules: PricingRule[] = [
      new AppleTvDiscountRule()
    ];

    context('when less than 3 Apple TVs are scanned', () => {
      it('should not apply the 3-for-2 deal with only two Apple TVs', () => {
        const checkout = createCheckout(pricingRules); 
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('vga');

        expect(checkout.total()).to.equal(249.00);
      });
    });

    context('when exactly 3 Apple TVs are scanned', () => {
      it('should apply the 3-for-2 deal with three Apple TVs', () => {
        const checkout = createCheckout(pricingRules);
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('vga');

        expect(checkout.total()).to.equal(249.00);
      });
    });

    context('when 6 Apple TVs are scanned', () => {
      it('should apply the 3-for-2 deal twice for six Apple TVs', () => {
        const checkout = createCheckout(pricingRules); 
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('vga');
        checkout.scan('vga');

        expect(checkout.total()).to.equal(498.00);
      });
    });
  });

  describe('Super iPad bulk discount', () => {

    const pricingRules: PricingRule[] = [
      new SuperIpadBulkDiscountRule()
    ];

    context('when 5 or more Super iPads are scanned', () => {
      it('should apply the bulk discount on Super iPads', () => {
        const checkout = createCheckout(pricingRules); 
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('ipd');

        expect(checkout.total()).to.equal(2718.95);
      });
    });

    context('when less than 5 Super iPads are scanned', () => {
      it('should not apply the bulk discount on Super iPads', () => {
        const checkout = createCheckout(pricingRules); 
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');

        expect(checkout.total()).to.equal(2418.96);
      });
    });
  });

  describe('Apple TV 3-for-2 deal and Super iPad bulk discount together', () => {

    const pricingRules: PricingRule[] = [
      new AppleTvDiscountRule(),
      new SuperIpadBulkDiscountRule()
    ];

    context('when both the 3-for-2 deal and Super iPad bulk discount are applicable', () => {
      it('should apply the Apple TV 3-for-2 deal and the bulk discount on Super iPads', () => {
        const checkout = createCheckout(pricingRules); 
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('atv');
        checkout.scan('ipd');
        checkout.scan('ipd');
        checkout.scan('ipd');

        expect(checkout.total()).to.equal(2937.95);
      });
    });
  });
});
