# Checkout System

This project implements a checkout system for a computer store that supports multiple product discounts, including a "3-for-2" deal on Apple TVs and bulk discounts for Super iPads. The system calculates the total price based on the applied discounts. For more information, please see [https://github.com/zeller-public/code-challenge-bff]

## Features

- **Apple TV 3-for-2 deal**: When a customer buys three Apple TVs, they only pay for two.
- **Super iPad bulk discount**: When a customer buys more than 4 Super iPads, each iPad is discounted to a lower price.
- **Flexible pricing rules**: New discount rules can easily be added to the system.

## Requirements

- **TypeScript**: This project is written in TypeScript. Make sure you have TypeScript installed globally. To verify after installation, run `npx -v` 

The project uses TypeScript version `^5.1.6`. If you're setting up the project, ensure you're using this version or higher.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/shabaan-qureshi/zeller_checkout_system.git
    cd zeller_checkout_system
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Compile TypeScript files:

    ```bash
    npx tsc
    ```

4. Run the tests (optional):

    ```bash
    npm test
    ```

## Project Structure

- **/models**: Contains product and cart-related models.
- **/pricing-rules**: Contains different pricing rules such as discounts and promotions.
- **/config**:  Holds constants like discount rules and product data.
- **/Checkout.ts**: Contains the Checkout class which handles cart management, applying pricing rules, and calculating the total price.
- **/test-utils**: Contains helper functions for testing the checkout process.
- **/test**: Contains unit tests to ensure the correct behavior of the checkout system.

## Usage

### Example 1: Apple TV 3-for-2 deal

```typescript
import { createCheckout } from '../src/test-utls/checkoutTestUtils';  
import { PricingRule  } from '../src/pricing-rules/PricingRule';
import { AppleTvBuyXGetYFreeDiscount } from '../src/pricing-rules/AppleTvBuyXGetYFreeDiscount';

const pricingRules = [new AppleTvBuyXGetYFreeDiscount()];
const checkout = createCheckout(pricingRules);

checkout.scan('atv');
checkout.scan('atv');
checkout.scan('atv');

console.log(checkout.total()); // Output will be 219.00
```

### Example 2: Super iPad Bulk Discount

```typescript
import { createCheckout } from '../src/test-utls/checkoutTestUtils';  
import { PricingRule  } from '../src/pricing-rules/PricingRule';
import { AppleTvBuyXGetYFreeDiscount } from '../src/pricing-rules/AppleTvBuyXGetYFreeDiscount';
import { SuperIpadBulkDiscountRule } from '../src/pricing-rules/SuperIpadBulkDiscountRule';

const pricingRules = [new SuperIpadBulkDiscountRule()];
const checkout = createCheckout(pricingRules);

checkout.scan('ipd');
checkout.scan('ipd');
checkout.scan('ipd');
checkout.scan('ipd');
checkout.scan('ipd');

console.log(checkout.total()); // Output will be 2499.95
```

## Testing

This project uses **Chai** and **Mocha** for unit testing. To run the tests:

1. Make sure you have installed the dependencies (as mentioned in step 2 of the installation section).
2. Run the tests with the following command:

   ```bash
   ```npm run test

The tests cover various scenarios, including:

- Apple TV 3-for-2 deal with varying quantities of Apple TVs.  
- Super iPad bulk discount when purchasing multiple iPads.  
- Combined application of both the Apple TV 3-for-2 deal and the Super iPad bulk discount.  
- An empty cart scenario to ensure proper handling when no items are scanned.

