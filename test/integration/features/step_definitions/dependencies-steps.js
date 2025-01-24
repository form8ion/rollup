import {dialects, projectTypes} from '@form8ion/javascript-core';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

export const autoExternal = 'rollup-plugin-auto-external';
export const pluginJson = '@rollup/plugin-json';
export const pluginExecutable = 'rollup-plugin-executable';

Then('dependencies are installed', async function () {
  const {dependencies} = this.scaffoldResult;

  assert.include(dependencies.javascript.development, 'rollup');
  assert.include(dependencies.javascript.development, autoExternal);
});

Then('dependencies are installed for a {string} project-type', async function (projectType) {
  const {dependencies} = this.scaffoldResult;

  if (projectTypes.CLI === projectType) {
    assert.include(dependencies.javascript.development, pluginJson);
    assert.include(dependencies.javascript.development, pluginExecutable);
  }
});

Then('dependencies are installed for the {string} dialect', async function (dialect) {
  const {dependencies} = this.scaffoldResult;

  if (dialects.TYPESCRIPT === dialect) {
    assert.include(dependencies.javascript.development, '@rollup/plugin-typescript');
  }

  if (dialects.BABEL === dialect) {
    assert.include(dependencies.javascript.development, '@rollup/plugin-babel');
  }
});
