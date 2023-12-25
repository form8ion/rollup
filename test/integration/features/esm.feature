Feature: Scaffold for a ESM dialect project

  Scenario: project dialect is ESM
    Given the project dialect is "esm"
    When the project is scaffolded
    Then the config is generated with a "js" extension
