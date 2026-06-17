const { Given, When, Then } = require('@cucumber/cucumber');
require('dotenv').config({ path: 'config/.env' });

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const ConfirmationPage = require('../pages/ConfirmationPage');
const testData = require('../test-data/testData.json');
const { expect } = require('playwright/test');

Given('User logs in with valid credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
  await this.loginPage.login(
    process.env.VALID_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User added valid credentials with username: ' + process.env.VALID_USERNAME);
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
    process.env.LOCKED_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with locked credentials with username: ' + process.env.LOCKED_USERNAME);
  this.loggedInUser = 'locked';
});

Then('Locked user error message should be displayed', async function () {
  await this.loginPage.validateLockedUserError();
  console.log('Locked user should see error message: Epic sadface: Sorry, this user has been locked out.');
});

Given('User logs in with error-user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
  await this.loginPage.login(
    process.env.ERROR_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with error user credentials with username: ' + process.env.ERROR_USERNAME);
  this.loggedInUser = 'error';
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
    process.env.PROBLEM_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with problem user credentials with username: ' + process.env.PROBLEM_USERNAME);
  this.loggedInUser = 'problem';
});

Then('All products should display the same image', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyAllProductsHaveSameImage();
});

Then('All products should display different images', async function () {
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
    process.env.VISUAL_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with visual user credentials with username: ' + process.env.VISUAL_USERNAME);
  this.loggedInUser = 'visual';
});

Then('All product images should match expected image source', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.verifyProductImagesMatchExpectedSrc(testData.expectedProductImages);
});

Given('User navigates to QA environment login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(process.env.BASE_URL);
  console.log(`User navigates to ${process.env.ENVIRONMENT} environment login page: ${process.env.BASE_URL}`);
});

When('User enters username {string} and password {string}', async function (username, password) {
  await this.loginPage.login(username, password);
  console.log(`User enters username: ${username} and password: ${password}`);
  await this.page.waitForTimeout(500);
});

Then('Login error message should be displayed', async function () {
  const errorMessage = await this.loginPage.getLoginErrorMessage();
  console.log('Login Error:', errorMessage);
  // support multiple possible error messages depending on invalid input
  const allowed = [
    'Username and password do not match any user in this service',
    'Username is required',
    'Password is required'
  ];
  const matched = allowed.some(sub => errorMessage.includes(sub));
  if (!matched) {
    throw new Error('Unexpected login error message: ' + errorMessage);
  }
});

Then('User should see {string} products in the cart', async function (numberOfCartItems) {
  this.cartPage = new CartPage(this.page);
  const cartCount = await this.cartPage.getCartCount();
  expect(cartCount).toBe(numberOfCartItems);
  console.log(`Total Items in the Cart: ${cartCount}`);
});

When('User removes {string} products from cart', async function (productnName) {
  // Try to remove from products page first, otherwise remove from cart page
  this.productsPage = new ProductsPage(this.page);
  const inventoryProduct = this.page.locator(`${this.productsPage.productContainer}:has-text("${productnName}")`);
  const invRemoveButton = inventoryProduct.locator('button:has-text("Remove")');
  if (await invRemoveButton.count() > 0 && await invRemoveButton.isVisible()) {
    await invRemoveButton.click();
    console.log(`Removed '${productnName}' product from inventory`);
  } else {
    this.cartPage = new CartPage(this.page);
    await this.cartPage.removeProductFromCart(productnName);
    console.log(`User removes ${productnName} from cart`);
  }
});

Then('Button should display {string}', async function (expectedText) {
  const actualText = await this.productsPage.getProductButtonText('Sauce Labs Backpack');
  expect(actualText.trim()).toBe(expectedText);
  console.log(`User should see ${actualText} button`);
});

When('User refreshes the page', async function () {
  await this.page.reload();
  await this.page.waitForLoadState('networkidle');
  console.log('User refreshed the page');
});

Then('Added products should still be present in cart', async function () {
  this.cartPage = new CartPage(this.page);
  const cartCount = await this.cartPage.getCartCount();
  if (!cartCount || cartCount === '') {
    throw new Error('Cart is empty after refresh');
  }
  console.log(`Cart retained items after refresh: ${cartCount}`);
});

When('User logs out from application', async function () {
  // Open the menu and click logout (Sauce Demo selectors)
  const menuBtn = this.page.locator('#react-burger-menu-btn');
  await menuBtn.click();
  const logoutLink = this.page.locator('#logout_sidebar_link');
  await logoutLink.click();
  await this.page.waitForLoadState('networkidle');
  console.log('User logged out from application');
});

Then('User should be redirected to login page', async function () {
  this.loginPage = new LoginPage(this.page);
  const url = this.page.url();
  const loginVisible = await this.page.locator(this.loginPage.loginButton).isVisible();
  if (!loginVisible) {
    throw new Error('Login page is not displayed after logout: ' + url);
  }
  console.log('User redirected to login page:', url);
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

When('User navigates to cart', async function () {
  this.productsPage = new ProductsPage(this.page);
  await this.productsPage.openCart();
  console.log('User navigated to cart');
});

Then('Cart should be empty', async function () {
  this.cartPage = new CartPage(this.page);
  const cartCount = await this.cartPage.getCartCount();
  expect(cartCount).toBe('');
  console.log('Cart is empty');
});
