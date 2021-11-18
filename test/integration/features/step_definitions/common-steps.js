import {resolve} from 'path';
import {After, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import {promises as fs} from 'fs';

const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));
const packagePreviewDirectory = '../__package_previews__/rollup';

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  const {scaffold} = require('@form8ion/rollup');

  stubbedFs({
    node_modules: stubbedNodeModules,
    [packagePreviewDirectory]: {
      '@form8ion': {
        rollup: {
          templates: {
            'rollup.config.js': await fs.readFile(resolve(__dirname, '../../../../', 'templates/rollup.config.js'))
          }
        }
      },
      node_modules: stubbedNodeModules
    }

  });

  await scaffold({projectRoot: process.cwd()});
});
