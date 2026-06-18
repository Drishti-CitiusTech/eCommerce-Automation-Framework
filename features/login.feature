Feature: Validate Login Flow of Sauce Labs E-Commerce Application

@Smoke
  Scenario: Verify user is logged out successfully
    Given User logs in with valid credentials
    When User logs out from application
    Then User should be redirected to login page

@Negative
  Scenario: Login with locked User
    Given User navigates to login page
    When User logs in with locked credentials
    Then Locked user error message should be displayed

@Negative
  Scenario Outline: Verify login failure with invalid credentials
    Given User navigates to QA environment login page
    When User enters username "<username>" and password "<password>"
    Then Login error message should be displayed
Examples:
| username         | password      |
| invalid_user     | secret_sauce  |
| standard_user    | wrong_pass    |
| invalid_user     | wrong_pass    |
|                  | secret_sauce  |
| standard_user    |               |
