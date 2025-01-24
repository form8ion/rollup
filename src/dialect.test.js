import {dialects} from '@form8ion/javascript-core';

import {describe, expect, it} from 'vitest';
import any from '@travi/any';

import scaffoldDialect from './dialect.js';

describe('dialect scaffolder', () => {
  it('should handle babel details', async () => {
    const {dependencies} = await scaffoldDialect({dialect: dialects.BABEL});

    expect(dependencies.javascript.development).toEqual(['@rollup/plugin-babel']);
  });

  it('should handle typescript details', async () => {
    const {dependencies, vcsIgnore} = await scaffoldDialect({dialect: dialects.TYPESCRIPT});

    expect(dependencies.javascript.development).toEqual(['@rollup/plugin-typescript']);
    expect(vcsIgnore.directories).toEqual(['.rollup.cache/']);
  });

  it('should return empty details for other dialects', async () => {
    expect(await scaffoldDialect({dialect: any.word()})).toEqual({});
  });
});
