import {promises as fs} from 'node:fs';
import {dialects, projectTypes} from '@form8ion/javascript-core';

import any from '@travi/any';
import {vi, describe, it, expect, afterEach, beforeEach} from 'vitest';
import {when} from 'jest-when';

import scaffoldDialect from './dialect.js';
import {scaffold} from './scaffolder.js';

vi.mock('node:fs');
vi.mock('./dialect.js');

describe('rollup scaffolder', () => {
  const projectRoot = any.string();

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

    const results = await scaffold({projectRoot, dialect});

    expect(results).toEqual({
      scripts: {
        'build:js': 'rollup --config',
        watch: "run-s 'build:js -- --watch'"
      },
      devDependencies: ['rollup', 'rollup-plugin-auto-external'],
      ...dialectResults
    });
    expect(fs.copyFile).toHaveBeenCalledWith(
      require.resolve('../templates/rollup.config.js'),
      `${projectRoot}/rollup.config.mjs`
    );
  });

  it('should handle modern-js details', async () => {
    const {devDependencies, vcsIgnore} = await scaffold({projectRoot, dialect: dialects.BABEL});

    expect(devDependencies).not.toContain('@rollup/plugin-typescript');
    expect(vcsIgnore).toBe(undefined);
  });

  it('should handle details for a CLI project', async () => {
    const {devDependencies} = await scaffold({projectRoot, dialect: dialects.BABEL, projectType: projectTypes.CLI});

    expect(devDependencies).toContain('@rollup/plugin-json');
    expect(devDependencies).toContain('rollup-plugin-executable');
  });

  it('should use a `.js` extension for the config when the dialect is ESM', async () => {
    await scaffold({projectRoot, dialect: dialects.ESM});

    expect(fs.copyFile).toHaveBeenCalledWith(
      require.resolve('../templates/rollup.config.js'),
      `${projectRoot}/rollup.config.js`
    );
  });
});
