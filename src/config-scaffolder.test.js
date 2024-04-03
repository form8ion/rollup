import {promises as fs} from 'node:fs';
import mustache from 'mustache';
import {dialects} from '@form8ion/javascript-core';

import any from '@travi/any';
import {beforeEach, describe, expect, it, vi} from 'vitest';
import {when} from 'jest-when';

import scaffoldConfig from './config-scaffolder.js';

vi.mock('node:fs');
vi.mock('mustache');

describe('config scaffolder', () => {
  const template = any.string();
  const renderedTemplate = any.string();
  const projectRoot = any.string();

  beforeEach(() => {
    when(fs.readFile)
      .calledWith(require.resolve('../templates/rollup.config.mustache'), 'utf-8')
      .mockResolvedValue(template);
  });

  it('should generate the file and determine additional plugins', async () => {
    const dialect = any.word();
    when(mustache.render).calledWith(template, {dualMode: true}).mockReturnValue(renderedTemplate);

    await scaffoldConfig({projectRoot, dialect});

    expect(fs.writeFile).toHaveBeenCalledWith(`${projectRoot}/rollup.config.mjs`, renderedTemplate);
  });

  it('should use a `.js` extension for the config when the dialect is ESM', async () => {
    when(mustache.render).calledWith(template, {dualMode: false}).mockReturnValue(renderedTemplate);

    await scaffoldConfig({projectRoot, dialect: dialects.ESM});

    expect(fs.writeFile).toHaveBeenCalledWith(`${projectRoot}/rollup.config.js`, renderedTemplate);
  });
});
