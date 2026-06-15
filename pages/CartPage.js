class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = '#checkout';
        this.cartBadge = '[data-test="shopping-cart-badge"]';
        this.inventoryItemSelector = '.inventory_item';
        this.removeButtonSelector = 'button:has-text("Remove")';
    }

    /* Clicks the checkout button to proceed to the checkout page */
    async clickCheckout() {
        await this.page.click(this.checkoutButton);
    }

    /** Fetch number of items in the Cart */
    async getCartCount() {
        const badgeLocator = this.page.locator(this.cartBadge);
        const count = await badgeLocator.count();
        if (count === 0) return '';
        const visible = await badgeLocator.isVisible();
        if (!visible) return '';
        return await badgeLocator.textContent();
    }

    /**
     * Remove added products from the Cart 
     * @param {*} productName 
     */
    async removeProductFromCart(productName) {
        const productLocator = this.page.locator(`${this.inventoryItemSelector}:has-text("${productName}")`);
        const removeButton = productLocator.locator(this.removeButtonSelector);
        if (await removeButton.isVisible()) {
            await removeButton.click();
            console.log(`Removed product '${productName}' from cart`);
        } else {
            console.log(`Remove button not found for product '${productName}'`);
        }
    }
}
module.exports = CartPage;