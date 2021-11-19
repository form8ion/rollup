import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

export const autoExternal = 'rollup-plugin-auto-external';

Then('dependencies are installed', async function () {
  const {devDependencies} = this.scaffoldResult;

  assert.include(devDependencies, 'rollup');
  assert.include(devDependencies, autoExternal);
});

Then('dependencies are installed for a {string} project-type', async function (projectType) {
  const {projectTypes} = require('@form8ion/javascript-core');
  const {devDependencies} = this.scaffoldResult;

  if (projectTypes.CLI === projectType) {
    assert.include(devDependencies, '@rollup/plugin-json');
    assert.include(devDependencies, 'rollup-plugin-executable');
  }
});
