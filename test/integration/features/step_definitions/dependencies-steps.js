import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

export const autoExternal = 'rollup-plugin-auto-external';

Then('dependencies are installed', async function () {
  const {devDependencies} = this.scaffoldResult;

  assert.include(devDependencies, 'rollup');
  assert.include(devDependencies, autoExternal);
});
