import deepmerge from 'deepmerge';

import any from '@travi/any';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {when} from 'vitest-when';

import scaffoldDialect from './dialect.js';
import scaffoldConfig from './config-scaffolder.js';
import {scaffold} from './scaffolder.js';

vi.mock('deepmerge');
vi.mock('./dialect.js');
vi.mock('./config-scaffolder.js');

describe('rollup scaffolder', () => {
  const projectRoot = any.string();
  const mergedResults = any.simpleObject();

  beforeEach(() => {
    scaffoldDialect.mockReturnValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should configure rollup', async () => {
    const dialect = any.word();
    const projectType = any.word();
    const dialectResults = any.simpleObject();
    const configResults = any.simpleObject();
    when(scaffoldDialect).calledWith({dialect}).thenReturn(dialectResults);
    when(scaffoldConfig).calledWith({projectRoot, dialect, projectType}).thenResolve(configResults);
    when(deepmerge.all)
      .calledWith([
        {
          dependencies: {javascript: {development: ['rollup', 'rollup-plugin-auto-external']}},
          scripts: {
            'build:js': 'rollup --config',
            watch: 'run-s \'build:js -- --watch\''
          }
        },
        configResults,
        dialectResults
      ])
      .thenReturn(mergedResults);

    const results = await scaffold({projectRoot, dialect, projectType});

    expect(results).toEqual(mergedResults);
  });
});
