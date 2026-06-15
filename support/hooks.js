const { Before, After, Status, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium, firefox, webkit } = require('playwright');
const fs = require('fs');

setDefaultTimeout(60 * 1000); // Set default timeout to 60 seconds

/**
* Before hook to log scenario name, tags and browser type
* Helps in debugging and understanding the context of the test execution
*/
Before(function (scenario) {
    const tags = scenario.pickle.tags.map(t => t.name).join(", ");
    console.log("\n================================================");
    console.log(`SCENARIO : ${scenario.pickle.name}`);
    console.log(`TAGS     : ${tags}`);
    console.log(`BROWSER  : ${process.env.BROWSER || 'chromium'}`);
    console.log("================================================\n");
});

/**
* Before hook to launch browser and create a new page context
* Each browser type (chromium, firefox, webkit) can be specified via environment variable BROWSER
* Default is chromium if not specified
*/
Before(async function () {
    const browserName = (process.env.BROWSER || 'chromium').toLowerCase();
    if (browserName === 'firefox') {
        this.browser = await firefox.launch({
            headless: process.env.CI ? true : false,
            slowMo: 200
        });
    } else if (browserName === 'webkit') {
        this.browser = await webkit.launch({
            headless: process.env.CI ? true : false,
            slowMo: 200
        });
    } else if (browserName === 'edge') {
        this.browser = await chromium.launch({
            channel: 'msedge',
            headless: process.env.CI ? true : false,
            slowMo: 200
        });
    } else {
        this.browser = await chromium.launch({
            headless: process.env.CI ? true : false,
            slowMo: 200
        });
    }
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

/**
* After hook to capture screenshot on failure and close browser context
* Screenshots are saved in the 'screenshots' directory with scenario name as filename
* Helps in debugging failed scenarios by providing visual context
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
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
});