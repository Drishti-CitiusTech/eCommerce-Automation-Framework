const reporter = require('multiple-cucumber-html-reporter');
const env = process.env.TEST_ENV || 'qa'; // Default to 'qa' if TEST_ENV is not set
require('dotenv').config({ path: `config/${env}.env` });

const selectedEnv = process.env.TEST_ENV || 'qa';
const environmentName = selectedEnv.toUpperCase();

reporter.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html-report',
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'windows',
      version: '11'
    }
  },
  customData: {
    title: 'Execution Information',
    data: [
      { label: 'Project', value: 'Checkout Flow of Sauce Labs E-Commerce' },
      { label: 'Framework', value: 'Playwright JavaScript with Cucumber BDD' },
      { label: 'Tester', value: 'Drishti Kashyap' },
      { label: 'Environment', value: environmentName || 'QA' },
      { label: 'Browser', value: process.env.BROWSER || 'Chromium' },
      { label: 'Execution Type', value: process.env.CI ? 'GitHub Actions CI' : 'Local Execution' },
      { label: 'Execution Date', value: new Date().toLocaleString() }
    ]
  }
});