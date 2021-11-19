import {resolve} from 'path';
import {After, Given, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import {promises as fs} from 'fs';

const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));
const packagePreviewDirectory = '../__package_previews__/rollup';

After(function () {
  stubbedFs.restore();
});

Given('the project-type is {string}', async function (projectType) {
  this.projectType = projectType;
});

Given('the project dialect is {string}', async function (dialect) {
  this.dialect = dialect;
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

  this.scaffoldResult = await scaffold({
    projectRoot: process.cwd(),
    projectType: this.projectType,
    dialect: this.dialect
  });
});
