class ProductsPage {
    constructor(page) {
        this.page = page;
        this.backpackAddButton = '#add-to-cart-sauce-labs-backpack';
        this.bikeLightAddButton = '#add-to-cart-sauce-labs-bike-light';
        this.cartIcon = '.shopping_cart_link';
        this.productContainer = '.inventory_item';
        this.productName = '.inventory_item_name';
        this.productPrice = '.inventory_item_price';
    }

    async _getProductInfoAndClick(addButtonSelector) {
        const btnLocator = this.page.locator(addButtonSelector);
        const itemLocator = this.page.locator(`.inventory_item:has(${addButtonSelector})`);
        const name = await itemLocator.locator(this.productName).textContent();
        const price = await itemLocator.locator(this.productPrice).textContent();
        await btnLocator.click();
        return { name: name ? name.trim() : '', price: price ? price.trim() : '' };
    }

    async addBackpackToCart() {
        return this._getProductInfoAndClick(this.backpackAddButton);
    }

    async addBikeLightToCart() {
        return this._getProductInfoAndClick(this.bikeLightAddButton);
    }
    async openCart() {
        await this.page.click(this.cartIcon);
    }
}
module.exports = ProductsPage;