const { Given, When, Then } = require('@cucumber/cucumber');
require('dotenv').config({ path: 'config/.env' });

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const testData = require('../test-data/testData.json');

Given('User logs in with valid credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
  await this.loginPage.login(
    testData.users.validUser,
    testData.password
  );
  console.log('User added valid credentials with username: ' + testData.users.validUser);
  this.loggedInUser = 'valid';
});

When('User adds products to cart', async function () {
  this.productsPage = new ProductsPage(this.page);
  const backpack = await this.productsPage.addBackpackToCart();
  console.log(`User adds ${backpack.name} to cart with price ${backpack.price}`);
  const bikeLight = await this.productsPage.addBikeLightToCart();
  console.log(`User adds ${bikeLight.name} to cart with price ${bikeLight.price}`);
});

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

Given('User navigates to login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
});

When('User logs in with locked credentials', async function () {
  await this.loginPage.loginWithLockedUser(
    testData.users.lockedUser,
    testData.password
  );
  console.log('User logs in with locked credentials with username: ' + testData.users.lockedUser);
  this.loggedInUser = 'locked';
});

Then('locked user error message should be displayed', async function () {
  await this.loginPage.validateLockedUserError();
  console.log('Locked user should see error message: Epic sadface: Sorry, this user has been locked out.');
});

Given('User logs in with error-user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
  await this.loginPage.login(
    testData.users.errorUser,
    testData.password
  );
  console.log('User logs in with error user credentials with username: ' + testData.users.errorUser);
  this.loggedInUser = 'error';
});

When('User clicks finish button', async function () {
  this.checkoutPage = new CheckoutPage(this.page);
  const finishLocator = this.page.locator('#finish');
  if (this.loggedInUser === 'error') {
    const enabled = await finishLocator.isEnabled();
    if (!enabled) {
      console.log('Finish button is not clickable and unable to move to next page for ' + testData.users.errorUser);
    }
    else {
      await finishLocator.click();
      await this.page.waitForTimeout(500);
      const currentUrlAfter = this.page.url();

      if (currentUrlAfter.includes('checkout-complete.html')) {
        console.log('User clicks finish button - navigation occurred unexpectedly for ' + testData.users.errorUser);
      }
      else {
        console.log('Finish button clicked but unable to move to next page for ' + testData.users.errorUser);
      }
    }
  }
  else {
    await this.checkoutPage.finishOrder();
    console.log('User clicks finish button to complete the order');
  }
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

Given('User logs in as problem-user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
  await this.loginPage.login(
    testData.users.problemUser,
    testData.password
  );
  console.log('User logs in with problem user credentials with username: ' + testData.users.problemUser);
  this.loggedInUser = 'problem';
});

Then('All products should display the same image', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyAllProductsHaveSameImage();
});

Then('All products should display the different image', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyAllProductsHaveDifferentImage();
});

Then('Products should be sorted by name A to Z', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifySortingByNameAscending();
});

Then('Products should be sorted by name Z to A', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifySortingByNameDescending();
});

Then('Products should be sorted by price low to high', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifySortingByPriceLowToHigh();
});

Then('Products should be sorted by price high to low', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifySortingByPriceHighToLow();
});

Given('User logs in as visual-user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
  await this.loginPage.login(
    testData.users.visualUser,
    testData.password
  );
  console.log('User logs in with visual user credentials with username: ' + testData.users.visualUser);
  this.loggedInUser = 'visual';
});
 
Then('All product images should match expected image source', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyProductImagesMatchExpectedSrc(testData.expectedProductImages);
});
