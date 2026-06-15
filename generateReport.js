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
   title: 'Execution Info',
   data: [
     { label: 'Project', value: 'SauceDemo E-commerce Checkout Flow' },
     { label: 'Framework', value: 'Playwright JavaScript with Cucumber BDD' },
     { label: 'Execution Type', value: 'Local Execution' }
   ]
 }
});