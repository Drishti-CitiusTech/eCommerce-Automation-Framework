const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    use: {
        headless: false,
        screenshot: 'only-on-failure'
    }
});