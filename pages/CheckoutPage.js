const assert = require('assert');
class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.postalCodeInput = '#postal-code';
        this.continueButton = '#continue';
        this.finishButton = '#finish';
        this.itemTotalLabel = '.summary_subtotal_label';
        this.taxLabel = '.summary_tax_label';
        this.finalTotalLabel = '.summary_total_label';
    }
    async enterCustomerInformation(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
        await this.page.click(this.continueButton);
    }

    async getPriceValue(locator) {
        const text = await this.page.textContent(locator);
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }

    async validateCheckoutTotal() {
        const itemTotal = await this.getPriceValue(this.itemTotalLabel);
        const tax = await this.getPriceValue(this.taxLabel);
        const finalTotal = await this.getPriceValue(this.finalTotalLabel);
        const expectedTotal = Number((itemTotal + tax).toFixed(2));
        assert.strictEqual(
            finalTotal,
            expectedTotal,
            `Expected final total ${expectedTotal}, but found ${finalTotal}`
        );
        // Log computed totals so they appear in the console output
        console.log(`Item total: $${itemTotal.toFixed(2)}, Tax: $${tax.toFixed(2)}, Final total: $${finalTotal.toFixed(2)}`);
    }

    async finishOrder() {
        await this.page.click(this.finishButton);
    }
}
module.exports = CheckoutPage;