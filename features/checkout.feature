Feature: Validate Checkout Flow of Sauce Labs E-Commerce Application

@Smoke
  Scenario: Complete checkout with multiple products
    Given User logs in with valid credentials
    When User adds products to cart
    And User proceeds to checkout
    And User enters customer information
    Then User should see correct item total, tax and final total
    When User completes the Order
    Then Order confirmation message should be displayed

@Negative
  Scenario: Login with locked User
   Given User navigates to login page
   When User logs in with locked credentials
   Then locked user error message should be displayed

@Regression
  Scenario: Verify checkout failure for error User
   Given User logs in with error-user credentials
   When User adds products to cart
   And User proceeds to checkout
   And User enters customer information
   And User clicks finish button
   Then Order should not be completed successfully
