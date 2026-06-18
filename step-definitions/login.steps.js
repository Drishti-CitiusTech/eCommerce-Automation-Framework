const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('playwright/test');
const LoginPage = require('../pages/LoginPage');

const selectedEnv = process.env.TEST_ENV || 'qa';
require('dotenv').config({ path: `config/${selectedEnv}.env` });
const baseUrl = process.env.BASE_URL || process.env[`${selectedEnv.toUpperCase()}_BASE_URL`];

Given('User logs in with valid credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(baseUrl);
  console.log(`User navigates to ${selectedEnv} environment login page: ${baseUrl}`);
  await this.loginPage.login(
    process.env.VALID_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User added valid credentials with username: ' + process.env.VALID_USERNAME);
  this.loggedInUser = 'valid';
});

When('User logs out from application', async function () {
  // Open the menu and click logout (Sauce Demo selectors)
  const menuBtn = this.page.locator('#react-burger-menu-btn');
  await menuBtn.click();
  const logoutLink = this.page.locator('#logout_sidebar_link');
  await logoutLink.click();
  await this.page.waitForLoadState('networkidle');
  console.log('User logged out from application');
});

Then('User should be redirected to login page', async function () {
  this.loginPage = new LoginPage(this.page);
  const url = this.page.url();
  const loginVisible = await this.page.locator(this.loginPage.loginButton).isVisible();
  if (!loginVisible) {
    throw new Error('Login page is not displayed after logout: ' + url);
  }
  console.log('User redirected to login page:', url);
});

Given('User navigates to login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(baseUrl);
  console.log(`User navigates to ${selectedEnv} environment login page: ${baseUrl}`);
});

When('User logs in with locked credentials', async function () {
  await this.loginPage.loginWithLockedUser(
    process.env.LOCKED_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with locked credentials with username: ' + process.env.LOCKED_USERNAME);
  this.loggedInUser = 'locked';
});

Then('Login error message should be displayed', async function () {
  const errorMessage = await this.loginPage.getLoginErrorMessage();
  console.log('Login Error:', errorMessage);
  // support multiple possible error messages depending on invalid input
  const allowed = [
    'Username and password do not match any user in this service',
    'Username is required',
    'Password is required'
  ];
  const matched = allowed.some(sub => errorMessage.includes(sub));
  if (!matched) {
    throw new Error('Unexpected login error message: ' + errorMessage);
  }
});

Given('User navigates to QA environment login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(baseUrl);
  console.log(`User navigates to ${selectedEnv} environment login page: ${baseUrl}`);
});

When('User enters username {string} and password {string}', async function (username, password) {
  await this.loginPage.login(username, password);
  console.log(`User enters username: ${username} and password: ${password}`);
  await this.page.waitForTimeout(500);
});

Then('Locked user error message should be displayed', async function () {
  await this.loginPage.validateLockedUserError();
  console.log('Locked user should see error message: Epic sadface: Sorry, this user has been locked out.');
});


Given('User logs in with error-user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(baseUrl);
  console.log(`User navigates to ${selectedEnv} environment login page: ${baseUrl}`);
  await this.loginPage.login(
    process.env.ERROR_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with error user credentials with username: ' + process.env.ERROR_USERNAME);
  this.loggedInUser = 'error';
});

Given('User logs in as problem-user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(baseUrl);
  console.log(`User navigates to ${selectedEnv} environment login page: ${baseUrl}`);
  await this.loginPage.login(
    process.env.PROBLEM_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with problem user credentials with username: ' + process.env.PROBLEM_USERNAME);
  this.loggedInUser = 'problem';
});

Given('User logs in as visual-user credentials', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigateToApplication(baseUrl);
  console.log(`User navigates to ${selectedEnv} environment login page: ${baseUrl}`);
  await this.loginPage.login(
    process.env.VISUAL_USERNAME,
    process.env.APP_PASSWORD
  );
  console.log('User logs in with visual user credentials with username: ' + process.env.VISUAL_USERNAME);
  this.loggedInUser = 'visual';
});
