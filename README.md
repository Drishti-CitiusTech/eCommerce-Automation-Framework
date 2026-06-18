# Playwright Cucumber BDD Automation Framework

## Overview
This project is an End-to-End UI Automation Framework developed using Playwright JavaScript and Cucumber BDD for Sauce Labs E-Commerce application.
The framework follows Page Object Model (POM) design pattern and supports:
- Cross Browser Testing
- Parallel Execution
- Environment Configuration (QA / UAT / PROD)
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
├── .github/workflows        # GitHub Actions pipeline
├── features                 # Cucumber feature files
├── pages                    # Page Object Model classes files
├── step-definitions         # Cucumber step definitions files
├── support                  # Hooks and world setup files 
├── test-data                # Test data files
├── reports                  # JSON and HTML reports
├── screenshots              # Failure screenshots
├── generateReport.js        # HTML report generation
├── package.json             # Project dependencies and scripts
└── playwright.config.js     # Playwright configuration
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
TEST_ENV=qa
TEST_ENV=uat
TEST_ENV=prod
```

---
## GitHub Actions Pipeline
Supports:
- QA / UAT / PROD
- Chromium / Firefox / WebKit
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
 
