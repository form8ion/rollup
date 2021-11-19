import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('scripts are defined', async function () {
  const {scripts} = this.scaffoldResult;

  assert.equal(scripts['build:js'], 'rollup --config');
  assert.equal(scripts.watch, 'run-s \'build:js -- --watch\'');
});
