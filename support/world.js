const { setWorldConstructor, World } = require('@cucumber/cucumber');
const env = process.env.TEST_ENV || 'qa'; // Default to 'qa' if TEST_ENV is not set

require ('dotenv').config({ path: `config/${env}.env` });

/** * Custom World for Cucumber tests to share context between steps
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