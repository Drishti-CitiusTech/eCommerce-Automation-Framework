Feature: E-commerce Checkout Flow

@Smoke
  Scenario: complete checkout with multiple products
    Given user logs in with valid credentials
    When user adds products to cart
    And user proceeds to checkout
    And user enters customer information
    Then user should see correct item total, tax and final total
    When user completes the order
    Then order confirmation message should be displayed

@Negative
  Scenario: login with locked user
   Given user navigates to login page
   When user logs in with locked credentials
   Then locked user error message should be displayed

@Regression
  Scenario: verify checkout failure for error user
   Given user logs in with error user credentials
   When user adds products to cart
   And user proceeds to checkout
   And user enters customer information
   And user clicks finish button
   Then order should not be completed successfully