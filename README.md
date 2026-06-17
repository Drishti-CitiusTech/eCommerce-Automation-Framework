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
.github/workflows
features
pages
step-definitions
support
test-data
reports
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
 
