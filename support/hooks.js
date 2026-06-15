const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const fs = require('fs');

setDefaultTimeout(60 * 1000); // Set default timeout to 60 seconds

/** Before hook to logs the scenario name and associated tags to the console for better traceability 
    @param {Object} scenario - The scenario object provided by Cucumber 
*/
Before(function (scenario) {
    const tags = scenario.pickle.tags.map(t => t.name).join(", ");
    console.log("\n================================================");
    console.log(`SCENARIO : ${scenario.pickle.name}`);
    console.log(`TAGS     : ${tags}`);
    console.log("================================================\n");
});

/**
 * Before hook to launch browser and create a new page context
 */
Before(async function () {
    this.browser = await chromium.launch({
        headless: process.env.CI ? true : false,
        slowMo: 200
    });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

/**
 * After hook to capture screenshot on failure and close browser context
 * @param {Object} scenario - The scenario object provided by Cucumber
 */
After(async function (scenario) {
    if (scenario.result.status === Status.FAILED && this.page) {
        if (!fs.existsSync('screenshots')) {
            fs.mkdirSync('screenshots');
        }
        const screenshot = await this.page.screenshot({
            path: `screenshots/${scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`,
            fullPage: true
        });
        await this.attach(screenshot, 'image/png');
    }

    /** Ensure that the page, context, and browser are closed after each scenario to prevent resource leaks */
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});