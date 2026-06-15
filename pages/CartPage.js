class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = '#checkout';
    }
    /* Clicks the checkout button to proceed to the checkout page */
    async clickCheckout() {
        await this.page.click(this.checkoutButton);
    }
}
module.exports = CartPage;