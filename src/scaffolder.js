import {promises as fs} from 'node:fs';
import {resolve} from 'node:path';

import mustache from 'mustache';
import filedirname from 'filedirname';
import deepmerge from 'deepmerge';
import {dialects, projectTypes} from '@form8ion/javascript-core';

import scaffoldDialect from './dialect.js';

const [, __dirname] = filedirname();

function determineExtensionFor({dialect}) {
  if (dialects.ESM === dialect) return 'js';

  return 'mjs';
}

export async function scaffold({projectRoot, dialect, projectType}) {
  fs.writeFile(
    `${projectRoot}/rollup.config.${(determineExtensionFor({dialect}))}`,
    mustache.render(
      await fs.readFile(resolve(__dirname, '..', 'templates', 'rollup.config.mustache'), 'utf-8'),
      {dualMode: dialect !== dialects.ESM}
    )
  );

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
