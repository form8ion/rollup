import deepmerge from 'deepmerge';
import {projectTypes} from '@form8ion/javascript-core';

import scaffoldConfig from './config-scaffolder.js';
import scaffoldDialect from './dialect.js';

export async function scaffold({projectRoot, dialect, projectType}) {
  await scaffoldConfig({projectRoot, dialect});

  return deepmerge.all([
    {
      devDependencies: ['rollup', 'rollup-plugin-auto-external'],
      scripts: {
        'build:js': 'rollup --config',
        watch: "run-s 'build:js -- --watch'"
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
