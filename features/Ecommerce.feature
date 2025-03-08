Feature: Ecommerce Validations

    Scenario: Placing an Order
    Given a login to an ecommerce application with "username" and "password"
    When add "zara coat 3" to cart
    Then verify "zara coat 3" displayed in the cart
    When enter valid details and place the Order
    Then verify order is present in the OrderHistory