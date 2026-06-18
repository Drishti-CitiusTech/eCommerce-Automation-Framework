Feature: Validate Product Flow of Sauce Labs E-Commerce Application

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