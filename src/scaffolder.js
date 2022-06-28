import {promises as fs} from 'fs';
import {resolve} from 'path';

import filedirname from 'filedirname';
import deepmerge from 'deepmerge';
import {projectTypes} from '@form8ion/javascript-core';

import scaffoldDialect from './dialect';

const [, __dirname] = filedirname();

export async function scaffold({projectRoot, dialect, projectType}) {
  await fs.copyFile(resolve(__dirname, '..', 'templates', 'rollup.config.js'), `${projectRoot}/rollup.config.js`);

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
