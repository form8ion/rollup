# rollup

form8ion plugin for managing rollup configuration in javascript projects

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]
![SLSA Level 2][slsa-badge]

<!--status-badges end -->

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
    * [Import](#import)
    * [Execute](#execute)
  * [API](#api)
    * [scaffold](#scaffold)
      * [`projectRoot` __string__ (_required_)](#projectroot-string-required)
      * [`projectType` __string__ (_required_)](#projecttype-string-required)
      * [`dialect` __string__ (_required_)](#dialect-string-required)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Usage

<!--consumer-badges start -->

[![MIT license][license-badge]][license-link]
[![npm][npm-badge]][npm-link]
[![Try @form8ion/rollup on RunKit][runkit-badge]][runkit-link]
![node][node-badge]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/rollup --save-prod
```

### Example

#### Import

```javascript
import {dialects, projectTypes} from '@form8ion/javascript-core';
```

#### Execute

```javascript
(async () => {
  await scaffold({projectRoot: process.cwd(), dialect: dialects.BABEL, projectType: projectTypes.PACKAGE});
})();
```

### API

#### scaffold

Scaffolder for configuring bundling of packages with [Rollup](https://rollupjs.org/guide/en/)

Takes a single options object as an argument, containing:

##### `projectRoot` __string__ (_required_)

path to the root of the project

##### `projectType` __string__ (_required_)

Chosen type of possible JavaScript [project type](https://github.com/form8ion/javascript-core#projecttypes)

##### `dialect` __string__ (_required_)

Chosen source JavaScript [dialect](https://github.com/form8ion/javascript-core#dialects)
of the project

## Contributing

<!--contribution-badges start -->

[![PRs Welcome][PRs-badge]][PRs-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![Renovate][renovate-badge]][renovate-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot

[github-actions-ci-link]: https://github.com/form8ion/rollup/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://img.shields.io/github/actions/workflow/status/form8ion/rollup/node-ci.yml.svg?branch=master&logo=github

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/rollup.svg?logo=opensourceinitiative

[npm-link]: https://www.npmjs.com/package/@form8ion/rollup

[npm-badge]: https://img.shields.io/npm/v/@form8ion/rollup?logo=npm

[runkit-link]: https://npm.runkit.com/@form8ion/rollup

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/rollup.svg

[node-badge]: https://img.shields.io/node/v/@form8ion/rollup?logo=node.js

[coverage-link]: https://codecov.io/github/form8ion/rollup

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/rollup?logo=codecov

[slsa-badge]: https://slsa.dev/images/gh-badge-level2.svg
