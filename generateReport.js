const reporter = require('multiple-cucumber-html-reporter');
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
   { label: 'Project', value: 'SauceDemo E-commerce Checkout Flow' },
   { label: 'Framework', value: 'Playwright JavaScript with Cucumber BDD' },
   { label: 'Developer/Tester', value: 'Drishti Kashyap' },
   { label: 'Environment', value: 'QA' },
   { label: 'Browser', value: process.env.BROWSER || 'Chromium' },
   { label: 'Execution Type', value: process.env.CI ? 'GitHub Actions CI' : 'Local Execution' },
   { label: 'Execution Date', value: new Date().toLocaleString() }
 ]
}
});