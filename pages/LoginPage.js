class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#user-name';
    this.passwordInput = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  async navigateToApplication(baseUrl) {
    await this.page.goto(baseUrl);
  }

  async login(username, password) {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async loginWithLockedUser(username, password) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
  }

  async validateLockedUserError() {
    const actualMessage = await this.page.textContent(this.errorMessage);
    if (
      actualMessage.trim() !==
      'Epic sadface: Sorry, this user has been locked out.'
    ) {
      throw new Error('Locked user error message is incorrect');
    }
    // Keep validation but logging will be handled in step definitions
  }

}
module.exports = LoginPage;