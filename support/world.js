const { setWorldConstructor, World } = require('@cucumber/cucumber');

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