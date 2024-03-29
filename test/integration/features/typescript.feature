Feature: Scaffold for a TypeScript dialect project

  Scenario: project dialect is TypeScript
    Given the project dialect is "typescript"
    When the project is scaffolded
    Then dependencies are installed for the "typescript" dialect
    And the proper ignores are defined for the "typescript" dialect
    And the config is generated with an "mjs" extension
    And dual-mode bundles are generated
