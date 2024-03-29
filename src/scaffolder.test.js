import {promises as fs} from 'node:fs';
import {dialects, projectTypes} from '@form8ion/javascript-core';
import mustache from 'mustache';

import any from '@travi/any';
import {vi, describe, it, expect, afterEach, beforeEach} from 'vitest';
import {when} from 'jest-when';

import scaffoldDialect from './dialect.js';
import {scaffold} from './scaffolder.js';

vi.mock('node:fs');
vi.mock('mustache');
vi.mock('./dialect.js');

describe('rollup scaffolder', () => {
  const projectRoot = any.string();
  const template = any.string();
  const renderedTemplate = any.string();

  beforeEach(() => {
    scaffoldDialect.mockReturnValue({});
    when(fs.readFile)
      .calledWith(require.resolve('../templates/rollup.config.mustache'), 'utf-8')
      .mockResolvedValue(template);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should configure rollup', async () => {
    const dialect = any.word();
    const dialectResults = any.simpleObject();
    when(scaffoldDialect).calledWith({dialect}).mockReturnValue(dialectResults);
    when(mustache.render).calledWith(template, {dualMode: true}).mockReturnValue(renderedTemplate);

    const results = await scaffold({projectRoot, dialect});

    expect(results).toEqual({
      scripts: {
        'build:js': 'rollup --config',
        watch: "run-s 'build:js -- --watch'"
      },
      devDependencies: ['rollup', 'rollup-plugin-auto-external'],
      ...dialectResults
    });
    expect(fs.writeFile).toHaveBeenCalledWith(`${projectRoot}/rollup.config.mjs`, renderedTemplate);
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
    when(mustache.render).calledWith(template, {dualMode: false}).mockReturnValue(renderedTemplate);
    await scaffold({projectRoot, dialect: dialects.ESM});

    expect(fs.writeFile).toHaveBeenCalledWith(`${projectRoot}/rollup.config.js`, renderedTemplate);
  });
});
