const { Given, When, Then } = require('@cucumber/cucumber');
require('dotenv').config({ path: 'config/.env' });

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const testData = require('../test-data/testData.json');

Given('user logs in with valid credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  await this.loginPage.login(
    testData.validUser.username,
    testData.validUser.password
  );
  console.log('user logs in with valid credentials');
  this.loggedInUser = 'valid';
});

When('user adds products to cart', async function () {
  this.productsPage = new ProductsPage(this.page);
  const backpack = await this.productsPage.addBackpackToCart();
  console.log(`user adds products to cart: ${backpack.name} - ${backpack.price}`);
  const bikeLight = await this.productsPage.addBikeLightToCart();
  console.log(`user adds products to cart: ${bikeLight.name} - ${bikeLight.price}`);
});

When('user proceeds to checkout', async function () {
  this.productsPage = new ProductsPage(this.page);
  this.cartPage = new CartPage(this.page);
  await this.productsPage.openCart();
  await this.cartPage.clickCheckout();
  console.log('user proceeds to checkout');
});

When('user enters customer information', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  const firstName = testData.checkout.firstName;
  const lastName = testData.checkout.lastName;
  const postalCode = testData.checkout.postalCode;
  await this.checkoutPage.enterCustomerInformation(firstName, lastName, postalCode);
  console.log(`user enters customer information: ${firstName} ${lastName}, ${postalCode}`);
});

Then('user should see correct item total, tax and final total', async function () {
  await this.checkoutPage.validateCheckoutTotal();
  console.log('user should see correct item total, tax and final total');
});

When('user completes the order', async function () {
  await this.checkoutPage.finishOrder();
  console.log('user completes the order');
});

Then('order confirmation message should be displayed', async function () {
  this.confirmationPage = new ConfirmationPage(this.page);
  await this.confirmationPage.validateConfirmationMessage();
  await this.confirmationPage.validateCompleteText();
  console.log('order confirmation message should be displayed');
});

Given('user navigates to login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log('user navigates to login page');
});

When('user logs in with locked credentials', async function () {
  await this.loginPage.loginWithLockedUser(
    testData.lockedUser.username,
    testData.lockedUser.password
  );
  console.log('user logs in with locked credentials');
  this.loggedInUser = 'locked';
});

Then('locked user error message should be displayed', async function () {
  await this.loginPage.validateLockedUserError();
  console.log('locked user error message should be displayed');
});

Given('user logs in with error user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  await this.loginPage.login(
    testData.errorUser.username,
    testData.errorUser.password
  );
  console.log('user logs in with error user credentials');
  this.loggedInUser = 'error';
});

When('user clicks finish button', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  const finishLocator = this.page.locator('#finish');
  if (this.loggedInUser === 'error') {
    const enabled = await finishLocator.isEnabled();
    if (!enabled) {
      console.log('finish button is not clickable and unable to move to next page');
    }
    else {
      await finishLocator.click();
      await this.page.waitForTimeout(500);
      const currentUrlAfter = this.page.url();

      if (currentUrlAfter.includes('checkout-complete.html')) {
        console.log('user clicks finish button - navigation occurred unexpectedly for error_user');
      }
      else {
        console.log('finish button clicked but unable to move to next page for error_user');
      }
    }
  }
  else {
    await this.checkoutPage.finishOrder();
    console.log('user clicks finish button');
  }
});

Then('order should not be completed successfully', async function () {
  const currentUrl = this.page.url();

  if (currentUrl.includes('checkout-complete.html')) {
    throw new Error(
      'Order completed successfully for error user'
    );
  }
  console.log('order should not be completed successfully');
});
