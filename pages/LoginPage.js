class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  /**
   * Navigates to the application login page using the provided base URL
   * @param {string} baseUrl - The base URL of the application to navigate to
   */
  async navigateToApplication(baseUrl) {
    await this.page.goto(baseUrl);
  }

  /**
   * Logs in using the provided username and password
   * @param {*} username 
   * @param {*} password 
   */
  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  /**
   * Logs in using credentials of a locked user, which should trigger an error message
   * @param {*} username 
   * @param {*} password 
   */
  async loginWithLockedUser(username, password) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  /** Validates that the error message displayed for a locked user is correct */
  async validateLockedUserError() {
    const actualMessage = await this.page.textContent(this.errorMessage);
    if (
      actualMessage.trim() !==
      'Epic sadface: Sorry, this user has been locked out.'
    ) {
      throw new Error('Locked user error message is incorrect');
    }
  }

  /** Retrieves the error message displayed on the login page */
  async getLoginErrorMessage() {
      return await this.page.locator(this.errorMessage).textContent();
    }
  }
module.exports = LoginPage;