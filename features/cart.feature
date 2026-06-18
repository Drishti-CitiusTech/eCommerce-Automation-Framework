Feature: Validate Cart Flow of Sauce Labs E-Commerce Application

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

@Regression
  Scenario: Remove product from cart page
    Given User logs in with valid credentials
    When User adds products to cart
    And User navigates to cart
    And User removes "Sauce Labs Backpack" products from cart
    And User removes "Sauce Labs Bike Light" products from cart
    Then Cart should be empty