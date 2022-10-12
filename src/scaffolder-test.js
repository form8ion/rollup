import {promises as fs} from 'fs';
import {dialects, projectTypes} from '@form8ion/javascript-core';

import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';

import * as dialectScaffolder from './dialect';
import {scaffold} from './scaffolder';

suite('rollup', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'copyFile');
    sandbox.stub(dialectScaffolder, 'default');

    dialectScaffolder.default.returns({});
  });

  teardown(() => sandbox.restore());

  test('that rollup is configured', async () => {
    const dialect = any.word();
    const dialectResults = any.simpleObject();
    dialectScaffolder.default.withArgs({dialect}).returns(dialectResults);

    const results = await scaffold({projectRoot, dialect});

    assert.deepEqual(
      results,
      {
        scripts: {
          'build:js': 'rollup --config',
          watch: "run-s 'build:js -- --watch'"
        },
        devDependencies: ['rollup', 'rollup-plugin-auto-external'],
        ...dialectResults
      }
    );
    assert.calledWith(
      fs.copyFile,
      require.resolve('../templates/rollup.config.js'),
      `${projectRoot}/rollup.config.mjs`
    );
  });

  test('that modern-js details are handled', async () => {
    const {devDependencies, vcsIgnore} = await scaffold({projectRoot, dialect: dialects.BABEL});

    assert.notInclude(devDependencies, '@rollup/plugin-typescript');
    assert.isUndefined(vcsIgnore);
  });

  test('that details are handled for a CLI project', async () => {
    const {devDependencies} = await scaffold({projectRoot, dialect: dialects.BABEL, projectType: projectTypes.CLI});

    assert.include(devDependencies, '@rollup/plugin-json');
    assert.include(devDependencies, 'rollup-plugin-executable');
  });
});
