import {promises as fs} from 'node:fs';
import {resolve} from 'node:path';

import filedirname from 'filedirname';
import deepmerge from 'deepmerge';
import {projectTypes} from '@form8ion/javascript-core';

import scaffoldDialect from './dialect.js';

const [, __dirname] = filedirname();

export async function scaffold({projectRoot, dialect, projectType}) {
  await fs.copyFile(resolve(__dirname, '..', 'templates', 'rollup.config.js'), `${projectRoot}/rollup.config.mjs`);

  return deepmerge.all([
    {
      devDependencies: ['rollup', 'rollup-plugin-auto-external'],
      scripts: {
        'build:js': 'rollup --config',
        watch: 'run-s \'build:js -- --watch\''
      }
    },
    {
      ...projectTypes.CLI === projectType && {
        devDependencies: ['@rollup/plugin-json', 'rollup-plugin-executable']
      }
    },
    scaffoldDialect({dialect})
  ]);
}
