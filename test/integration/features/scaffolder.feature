Feature: Scaffolder

  Scenario: Scaffold
    When the project is scaffolded
    Then the config is generated
    And dependencies are installed
    And scripts are defined
