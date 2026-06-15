const { expect } = require('@playwright/test');
class ProductsPage {
    constructor(page) {
        this.page = page;
        this.backpackAddButton = '#add-to-cart-sauce-labs-backpack';
        this.bikeLightAddButton = '#add-to-cart-sauce-labs-bike-light';
        this.cartIcon = '.shopping_cart_link';
        this.productContainer = '.inventory_item';
        this.productName = '.inventory_item_name';
        this.productPrice = '.inventory_item_price';
        this.productImages = '.inventory_item_img img';
        this.sortDropdown = '.product_sort_container';
    }

    /**
     * Get product name and price based on the add to cart button selector, then click the add button
     * @param {*} addButtonSelector 
     * @returns 
     */
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

    /** Verifies that all products on the products page have the same image */
    async verifyAllProductsHaveSameImage() {
        const imageSources = await this.page
            .locator(this.productImages)
            .evaluateAll(images =>
                images.map(img => img.getAttribute('src'))
            ); // Get all image sources from the product images
        const uniqueImages = [...new Set(imageSources)]; // Get unique image sources
        console.log(`Total Product Found: ${imageSources.length}, Unique Images Found: ${uniqueImages.length}`);
        console.log('Unique Images :', uniqueImages); // Log the unique image sources for debugging
        expect(imageSources.length).toBeGreaterThan(0); // Ensure there are products on the page
        expect(uniqueImages.length).toBe(1); // Ensure all products have the same image
        console.log('Verified: All products display the same image');
    }

    /** Verifies that all products on the products page have different images */
    async verifyAllProductsHaveDifferentImage() {
        const imageSources = await this.page
            .locator(this.productImages)
            .evaluateAll(images =>
                images.map(img => img.getAttribute('src'))
            );
        const uniqueImages = [...new Set(imageSources)]; // Get unique image sources
        console.log(`Total Product Found: ${imageSources.length}, Unique Images Found: ${uniqueImages.length}`);
        console.log('Unique Images :', uniqueImages);
        expect(imageSources.length).toBeGreaterThan(0); // Ensure there are products on the page
        expect(uniqueImages.length).toBe(imageSources.length); // Ensure all products have different images
        console.log('Verified: All products display different images');
    }

    async getProductNames() {
        return await this.page.locator(this.productName).allTextContents();
    }
    async getProductPrices() {
        const prices = await this.page.locator(this.productPrice).allTextContents();
        return prices.map(price => parseFloat(price.replace(/[^0-9.]/g, '')));
    }

    /** Verifies that products are sorted by name from Z to A */
    async verifySortingByNameDescending() {
        const beforeSorting = await this.getProductNames();
        await this.page.selectOption(this.sortDropdown, 'za');
        const actualNames = await this.getProductNames();
        const expectedNames = [...actualNames].sort().reverse();
        console.log('Product Names before sorting:', beforeSorting);
        console.log('Product Names after sorting Z to A:', actualNames);
        if (actualNames.join() !== expectedNames.join()) {
            throw new Error('Products are not sorted by Name Z to A');
        }
    }

    /** Verifies that products are sorted by name from A to Z */
    async verifySortingByNameAscending() {
        const beforeSorting = await this.getProductNames();
        await this.page.selectOption(this.sortDropdown, 'az');
        const actualNames = await this.getProductNames();
        const expectedNames = [...actualNames].sort();
        console.log('Product Names before sorting:', beforeSorting);
        console.log('Product Names after sorting A to Z:', actualNames);
        if (actualNames.join() !== expectedNames.join()) {
            throw new Error('Products are not sorted by Name A to Z');
        }
    }

    /** Verifies that products are sorted by price from low to high */
    async verifySortingByPriceLowToHigh() {
        const beforeSorting = await this.getProductPrices();
        await this.page.selectOption(this.sortDropdown, 'lohi');
        const actualPrices = await this.getProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);
        console.log('Products price before sorting by Price Low to High:', beforeSorting);
        console.log('Product Prices after sorting by Price Low to High:', actualPrices);
        if (actualPrices.join() !== expectedPrices.join()) {
            throw new Error('Products are not sorted by Price Low to High');
        }
    }

    /** Verifies that products are sorted by price from high to low */
    async verifySortingByPriceHighToLow() {
        const beforeSorting = await this.getProductPrices();
        await this.page.selectOption(this.sortDropdown, 'hilo');
        const actualPrices = await this.getProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => b - a);
        console.log('Products price before sorting by Price High to Low:', beforeSorting);
        console.log('Product Prices after sorting by Price High to Low:', actualPrices);
        if (actualPrices.join() !== expectedPrices.join()) {
            throw new Error('Products are not sorted by Price High to Low');
        }
    }

    /** Verifies that the product images match the expected image sources provided in the expectedImages object
     * @param {Object} expectedImages - An object mapping product names to their expected image sources
     * */
    async verifyProductImagesMatchExpectedSrc(expectedImages) {
        const products = await this.page.locator('[data-test="inventory-item"]').all();
        const mismatches = [];
        for (const product of products) {
            const productName = (await product
                .locator('[data-test="inventory-item-name"]')
                .textContent()).trim();
            await this.page.waitForTimeout(250);
            const imageSrc = await product.locator('img').getAttribute('src');
            const expectedImage = expectedImages[productName];
            if (!imageSrc || !expectedImage || !imageSrc.includes(expectedImage)) {
                mismatches.push({ productName, expectedImage, imageSrc });
            }
        }
        expect(mismatches.length).toBeGreaterThan(0);
        console.log(`Found ${mismatches.length} product(s) with image mismatches.`);
        for (const m of mismatches) {
            console.log(`Verified: Product '${m.productName}' image source does not match expected source as per test data`);
            console.log(`Expected image source to include: '${m.expectedImage}', but found: '${m.imageSrc}'`);
        }
    }
}
module.exports = ProductsPage;