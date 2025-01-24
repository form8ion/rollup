import deepmerge from 'deepmerge';

import scaffoldConfig from './config-scaffolder.js';
import scaffoldDialect from './dialect.js';

export async function scaffold({projectRoot, dialect, projectType}) {
  return deepmerge.all([
    {
      dependencies: {javascript: {development: ['rollup', 'rollup-plugin-auto-external']}},
      scripts: {
        'build:js': 'rollup --config',
        watch: "run-s 'build:js -- --watch'"
      }
    },
    await scaffoldConfig({projectRoot, dialect, projectType}),
    scaffoldDialect({dialect})
  ]);
}
