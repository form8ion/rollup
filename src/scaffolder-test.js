import {promises as fs} from 'fs';
import {dialects, projectTypes} from '@form8ion/javascript-core';
import {assert} from 'chai';
import sinon from 'sinon';
import any from '@travi/any';
import {scaffold} from './scaffolder';

suite('rollup', () => {
  let sandbox;
  const projectRoot = any.string();

  setup(() => {
    sandbox = sinon.createSandbox();

    sandbox.stub(fs, 'copyFile');
  });

  teardown(() => sandbox.restore());

  test('that rollup is configured', async () => {
    const {devDependencies, scripts} = await scaffold({projectRoot});

    assert.equal(scripts['build:js'], 'rollup --config');
    assert.equal(scripts.watch, 'run-s \'build:js -- --watch\'');
    assert.deepEqual(devDependencies, ['rollup', 'rollup-plugin-auto-external']);
    assert.calledWith(fs.copyFile, require.resolve('../templates/rollup.config.js'), `${projectRoot}/rollup.config.js`);
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

  test('that typescript details are handled', async () => {
    const {devDependencies, vcsIgnore} = await scaffold({projectRoot, dialect: dialects.TYPESCRIPT});

    assert.include(devDependencies, '@rollup/plugin-typescript');
    assert.include(vcsIgnore.directories, '.rollup.cache/');
  });
});
