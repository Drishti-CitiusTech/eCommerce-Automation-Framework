# Playwright Cucumber BDD Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-JavaScript-green)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-brightgreen)
![CI](https://img.shields.io/badge/GitHub%20Actions-CI-blue)

## Overview
This project is an End-to-End UI Automation Framework developed using Playwright JavaScript and Cucumber BDD for Sauce Labs E-Commerce application.
The framework follows Page Object Model (POM) design pattern and supports:
- Cross Browser Testing
- Parallel Execution
- Dynamic Environment Selection (QA / UAT / PROD)
- GitHub Actions CI/CD Integration
- HTML Reporting
- Secure Credential Management using GitHub Secrets
- Screenshot Capture on Failure
---

## Technology Stack

| Tool                            | Usage                 |
|---------------------------------|----------------------|
| Playwright                      | UI Automation        |
| Cucumber BDD                    | Test Scenarios       |
| JavaScript                      | Programming Language |
| Node.js                         | Runtime Environment  |
| GitHub Actions                  | CI/CD Pipeline       |
| Multiple Cucumber HTML Reporter | Reporting            |

---

## Framework Features
### Page Object Model (POM)
Reusable page classes for better maintainability.

### Cross Browser Support
- Chromium
- Firefox
- WebKit

### Environment Support
- QA
- UAT
- PROD

### Parallel Execution
Supports parallel test execution to reduce execution time.

## Test Coverage

### Login Scenarios
- ✔ Standard User Login
- ✔ Locked User Login
- ✔ Error User Login

### Cart Scenarios
- ✔ Add Products to Cart
- ✔ Remove Products from Cart
- ✔ Cart Validation
- ✔ Cart Persistence After Refresh

### Checkout Scenarios
- ✔ Successful Checkout
- ✔ Checkout Information Validation
- ✔ Order Confirmation Validation

### Product Scenarios
- ✔ Product Sorting Validation
- ✔ Product Image Validation
- ✔ Visual User Validation
- ✔ Problem User Validation

### Reporting
- JSON Report
- Multiple Cucumber HTML Report
- Execution Metadata
- Browser Details
- Environment Details

### CI/CD Integration
GitHub Actions Pipeline supports:
- Browser Selection
- Environment Selection
- Sequential Execution
- Parallel Execution
---

## Project Structure
```text
ECommerce-Automation-Framework
│
├── .github/workflows        # GitHub Actions CI/CD pipeline
├── config                   # Environment configuration files
├── features                 # Cucumber feature files
│   ├── login.feature
│   ├── cart.feature
│   ├── checkout.feature
│   └── products.feature
│
├── pages                    # Page Object Model classes 
│   ├── LoginPage.js
│   ├── ProductsPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   └── ConfirmationPage.js
│
├── step-definitions         # Cucumber step definitions
│   ├── login.steps.js
│   ├── cart.steps.js
│   ├── checkout.steps.js
│   └── products.steps.js
│
├── support                  # Hooks and framework utilities
├── test-data                # Test data files
├── reports                  # JSON and HTML reports
├── screenshots              # Failure screenshots
│
├── generateReport.js        # HTML report generation
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Dependency lock file
├── playwright.config.js     # Playwright configuration
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

---

## Execute Tests

### Smoke Suite
```bash
npm run test:smoke
```

### Regression Suite
```bash
npm run test:regression

```
### Parallel Execution
```bash
npm run test:parallel
```
---

## Environment Configuration
```bash
$env:TEST_ENV="qa"; npm run test:smoke
$env:TEST_ENV="uat"; npm run test:negative
$env:TEST_ENV="prod"; npm run test:regresion
$env:TEST_ENV="qa"; $env:BROWSER="FIREFOX"; npm run test:smoke
```

---

## Security

- Environment configuration files (config/*.env) are excluded from source control using .gitignore.
- Credentials are stored securely using GitHub Secrets.
- Environment URLs are managed through GitHub Variables.
- Sensitive information is never committed to the repository.

Note: Actual environment files are ignored and are maintained locally or through CI/CD configuration.
 
---
## GitHub Actions Pipeline
Supports:
- QA / UAT / PROD
- Chromium / Firefox / Edge / WebKit
- Sequential Execution
- Parallel Execution
---

## Sample Report

The framework generates:
- Cucumber JSON Report
- HTML Report
- Execution Metadata
- Browser Information
- Environment Information
---

## Author
Drishti Kashyap
QA Automation Lead
Playwright | Selenium | C# | JavaScript | API Testing | CI/CD
 
