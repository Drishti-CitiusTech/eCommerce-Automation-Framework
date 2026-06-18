const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');

const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const testData = require('../test-data/testData.json');

When('User proceeds to checkout', async function () {
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  await this.productsPage.openCart();
  await this.cartPage.clickCheckout();
  console.log('User proceeds to checkout page and clicks checkout button');
});

When('User enters customer information', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  const firstName = testData.checkout.firstName;
  const lastName = testData.checkout.lastName;
  const postalCode = testData.checkout.postalCode;
  await this.checkoutPage.enterCustomerInformation(firstName, lastName, postalCode);
  console.log(`User enters customer details: ${firstName} ${lastName}, ${postalCode}`);
});

Then('User should see correct item total, tax and final total', async function () {
  await this.checkoutPage.validateCheckoutTotal();
  console.log('User should see correct item total, tax and final total ');
});

When('User completes the Order', async function () {
  await this.checkoutPage.finishOrder();
  console.log('User completes the Order by clicking finish button');
});

Then('Order confirmation message should be displayed', async function () {
  this.confirmationPage = new ConfirmationPage(this.page);
  await this.confirmationPage.validateConfirmationMessage();
  console.log('Confirmation mesage is: Thank you for your order!');
  await this.confirmationPage.validateCompleteText();
  console.log('Order confirmation message is : Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});

When('User clicks finish button', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  const finishLocator = this.page.locator('#finish');
  if (this.loggedInUser === 'error') {
    const enabled = await finishLocator.isEnabled();
    if (!enabled) {
      console.log('Finish button is not clickable and unable to move to next page for ' + process.env.ERROR_USERNAME);
    }
    else {
      await finishLocator.click();
      await this.page.waitForTimeout(500);
      const currentUrlAfter = this.page.url();

      if (currentUrlAfter.includes('checkout-complete.html')) {
        console.log('User clicks finish button - navigation occurred unexpectedly for ' + process.env.ERROR_USERNAME);
      }
      else {
        console.log('Finish button clicked but unable to move to next page for ' + process.env.ERROR_USERNAME);
      }
    }
  }
  else {
    await this.checkoutPage.finishOrder();
    console.log('User clicks finish button to complete the order');
  }
});

When('User navigates back', async function () {
  await this.page.goBack();
  await this.page.waitForLoadState('networkidle');
  console.log('User navigated back');
});

Then('User should return to cart page with items intact', async function () {
  // verify current url and cart contents
  const url = this.page.url();
  if (!url.includes('cart.html')) {
    throw new Error('Did not return to cart page, current url: ' + url);
  }
  this.cartPage = new CartPage(this.page);
  const cartCount = await this.cartPage.getCartCount();
  if (!cartCount || cartCount === '') {
    throw new Error('Cart items not intact after navigating back');
  }
  console.log('Returned to cart with items intact:', cartCount);
});

Then('Last name field should remain blank', async function () {
  await this.checkoutPage.verifyLastNameFieldIsBlank();
});

Then('Order should not be completed successfully', async function () {
  const currentUrl = this.page.url();

  if (currentUrl.includes('checkout-complete.html')) {
    throw new Error(
      'Order completed successfully for error user'
    );
  }
  console.log('Order should not be completed successfully');
});

