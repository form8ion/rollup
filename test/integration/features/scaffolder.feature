Feature: Scaffolder

  Scenario: Scaffold
    When the project is scaffolded
    Then the config is generated with an "mjs" extension
    And dependencies are installed
    And scripts are defined
