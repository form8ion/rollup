Feature: Scaffold for a babel dialect project

  Scenario: project dialect is TypeScript
    Given the project dialect is "babel"
    When the project is scaffolded
    Then dependencies are installed for the "babel" dialect
