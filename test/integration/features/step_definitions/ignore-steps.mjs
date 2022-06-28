import {dialects} from '@form8ion/javascript-core';

import {Then} from '@cucumber/cucumber';
import {assert} from 'chai';

Then('the proper ignores are defined for the {string} dialect', async function (dialect) {
  const {vcsIgnore} = this.scaffoldResult;

  if (dialects.TYPESCRIPT === dialect) {
    assert.include(vcsIgnore.directories, '.rollup.cache/');
  }
});
