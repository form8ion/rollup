Feature: Scaffold for a CLI project-type

  Scenario: project-type is CLI
    Given the project-type is "CLI"
    When the project is scaffolded
    Then dependencies are installed for a "CLI" project-type
    And the config is generated with an "mjs" extension
    And an CLI bundle is generated
