Feature: Scaffold for a ESM dialect project

  @wip
  Scenario: project dialect is ESM
    Given the project dialect is "ESM"
    When the project is scaffolded
    Then the config is generated with a "js" extension
