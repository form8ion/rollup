import {dialects, projectTypes} from '@form8ion/javascript-core';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

export const autoExternal = 'rollup-plugin-auto-external';
export const pluginJson = '@rollup/plugin-json';
export const pluginExecutable = 'rollup-plugin-executable';

Then('dependencies are installed', async function () {
  const {devDependencies} = this.scaffoldResult;

  assert.include(devDependencies, 'rollup');
  assert.include(devDependencies, autoExternal);
});

Then('dependencies are installed for a {string} project-type', async function (projectType) {
  const {devDependencies} = this.scaffoldResult;

  if (projectTypes.CLI === projectType) {
    assert.include(devDependencies, pluginJson);
    assert.include(devDependencies, pluginExecutable);
  }
});

Then('dependencies are installed for the {string} dialect', async function (dialect) {
  const {devDependencies} = this.scaffoldResult;

  if (dialects.TYPESCRIPT === dialect) {
    assert.include(devDependencies, '@rollup/plugin-typescript');
  }

  if (dialects.BABEL === dialect) {
    assert.include(devDependencies, '@rollup/plugin-babel');
  }
});
