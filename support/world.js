const { setWorldConstructor, World } = require('@cucumber/cucumber');
const env = process.env.TEST_ENV || 'qa'; // Default to 'qa' if TEST_ENV is not set
require ('dotenv').config({ path: `config/${env}.env` });

/**
 * Custom World constructor to manage browser, context and page instances for each scenario
 * This allows us to maintain state across steps and ensures that each scenario has its own isolated browser context
 * The browser type (chromium, firefox, webkit) can be specified via environment variable BROWSER
 * Default is chromium if not specified
 */
class CustomWorld extends World {
    constructor(options) {
        super(options);
        this.browser = null;
        this.context = null;
        this.page = null;
    }
}
setWorldConstructor(CustomWorld);