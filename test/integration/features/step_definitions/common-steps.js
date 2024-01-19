import {resolve} from 'path';

import filedirname from 'filedirname';
import {After, Given, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';

// eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
import {scaffold} from '@form8ion/rollup';

const [, __dirname] = filedirname();

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
  stubbedFs({
    node_modules: stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules')),
    templates: stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'templates'))
  });

  this.scaffoldResult = await scaffold({
    projectRoot: process.cwd(),
    projectType: this.projectType,
    dialect: this.dialect
  });
});
