import deepmerge from 'deepmerge';
import {dialects, projectTypes} from '@form8ion/javascript-core';

import any from '@travi/any';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {when} from 'jest-when';

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
    const dialectResults = any.simpleObject();
    when(scaffoldDialect).calledWith({dialect}).mockReturnValue(dialectResults);
    when(deepmerge.all)
      .calledWith([
        {
          devDependencies: ['rollup', 'rollup-plugin-auto-external'],
          scripts: {
            'build:js': 'rollup --config',
            watch: 'run-s \'build:js -- --watch\''
          }
        },
        {},
        dialectResults
      ])
      .mockReturnValue(mergedResults);

    const results = await scaffold({projectRoot, dialect});

    expect(results).toEqual(mergedResults);
    expect(scaffoldConfig).toHaveBeenCalledWith({projectRoot, dialect});
  });

  it('should handle details for a CLI project', async () => {
    when(deepmerge.all)
      .calledWith([
        {
          devDependencies: ['rollup', 'rollup-plugin-auto-external'],
          scripts: {
            'build:js': 'rollup --config',
            watch: 'run-s \'build:js -- --watch\''
          }
        },
        {
          devDependencies: ['@rollup/plugin-json', 'rollup-plugin-executable']
        },
        {}
      ])
      .mockReturnValue(mergedResults);

    expect(await scaffold({projectRoot, dialect: dialects.BABEL, projectType: projectTypes.CLI}))
      .toEqual(mergedResults);
  });
});
