const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const CartPage = require('../pages/CartPage');
const ProductsPage = require('../pages/ProductsPage');

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
