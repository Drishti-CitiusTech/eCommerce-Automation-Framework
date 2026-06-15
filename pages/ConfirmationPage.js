const assert = require('assert');
class ConfirmationPage {
    constructor(page) {
        this.page = page;
        this.confirmationMessage = '.complete-header';
        this.completeText = '.complete-text';
    }

    /** Validates that the order confirmation message is displayed correctly */
    async validateConfirmationMessage() {
        const actualMessage = await this.page.textContent(this.confirmationMessage);
        assert.strictEqual(
            actualMessage.trim(),
            'Thank you for your order!',
            'Order confirmation message is not correct'
        );
        // Logging handled in step definitions
    }

    /** Validates that the order complete text is displayed correctly */
    async validateCompleteText() {
        const actualText = await this.page.textContent(this.completeText);
        assert.strictEqual(
            actualText.trim(),
            'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
            'Order complete text is not correct'
        );
        // Logging handled in step definitions
    }
}
module.exports = ConfirmationPage;