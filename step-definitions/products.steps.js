const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const ProductsPage = require('../pages/ProductsPage');
const testData = require('../test-data/testData.json');

When('User adds products to cart', async function () {
    this.productsPage = new ProductsPage(this.page);
    const backpack = await this.productsPage.addBackpackToCart();
    console.log(`User adds ${backpack.name} to cart with price ${backpack.price}`);
    const bikeLight = await this.productsPage.addBikeLightToCart();
    console.log(`User adds ${bikeLight.name} to cart with price ${bikeLight.price}`);
});

Then('Button should display {string}', async function (expectedText) {
    const actualText = await this.productsPage.getProductButtonText('Sauce Labs Backpack');
    expect(actualText.trim()).toBe(expectedText);
    console.log(`User should see ${actualText} button`);
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

Then('All product images should match expected image source', async function () {
    this.productsPage = new ProductsPage(this.page);
    await this.productsPage.verifyProductImagesMatchExpectedSrc(testData.expectedProductImages);
});
