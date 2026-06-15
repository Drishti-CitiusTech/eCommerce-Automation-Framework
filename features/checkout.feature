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

@Negative
Scenario: Verify all products display same image for problem user
    Given User logs in as problem-user credentials
    Then All products should display the same image

@Smoke
  Scenario: Verify all products display different image for valid user
    Given User logs in with valid credentials
    Then All products should display different images

@Smoke
  Scenario: Verify product sorting options for standard user
    Given User logs in with valid credentials
    Then Products should be sorted by name Z to A
    And Products should be sorted by name A to Z
    And Products should be sorted by price high to low
    And Products should be sorted by price low to high

@Regression
  Scenario: Verify product images are correctly mapped for visual user
    Given User logs in as visual-user credentials
    Then All product images should match expected image source

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

@Smoke
  Scenario: Add two products to cart
    Given User logs in with valid credentials
    When User adds products to cart
    Then User should see "2" products in the cart

@Regression
  Scenario: Remove product from inventory page
    Given User logs in with valid credentials
    When User adds products to cart
    And User removes "Sauce Labs Backpack" products from cart
    Then User should see "1" products in the cart
  
@Smoke
  Scenario: Verify Add To Cart button changes to Remove
    Given User logs in with valid credentials
    When User adds products to cart
    Then Button should display "Remove"

@Regression
  Scenario: Verify cart retains items after page refresh
    Given User logs in with valid credentials
    When User adds products to cart
    And User refreshes the page
    Then Added products should still be present in cart

@Smoke
  Scenario: Verify user is logged out successfully
    Given User logs in with valid credentials
    When User logs out from application
    Then User should be redirected to login page

@Regression
  Scenario: Verify back navigation from checkout page
    Given User logs in with valid credentials
    When User adds products to cart
    And User proceeds to checkout
    And User navigates back
    Then User should return to cart page with items intact

@Regression
  Scenario: Remove product from cart page
    Given User logs in with valid credentials
    When User adds products to cart
    And User navigates to cart
    And User removes "Sauce Labs Backpack" products from cart
    And User removes "Sauce Labs Bike Light" products from cart
    Then Cart should be empty