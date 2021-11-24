import {dialects} from '@form8ion/javascript-core';

import {assert} from 'chai';
import any from '@travi/any';

import scaffoldDialect from './dialect';

suite('dialect', () => {
  test('that typescript details are handled', async () => {
    const {devDependencies, vcsIgnore} = await scaffoldDialect({dialect: dialects.TYPESCRIPT});

    assert.deepEqual(devDependencies, ['@rollup/plugin-typescript']);
    assert.deepEqual(vcsIgnore.directories, ['.rollup.cache/']);
  });

  test('that empty details are returned for other dialects', async () => {
    assert.deepEqual(await scaffoldDialect({dialect: any.word()}), {});
  });
});
