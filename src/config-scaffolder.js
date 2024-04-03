import {promises as fs} from 'node:fs';
import {resolve} from 'node:path';
import mustache from 'mustache';
import filedirname from 'filedirname';
import {dialects} from '@form8ion/javascript-core';

const [, __dirname] = filedirname();

function determineExtensionFor({dialect}) {
  if (dialects.ESM === dialect) return 'js';

  return 'mjs';
}

export default async function ({projectRoot, dialect}) {
  await fs.writeFile(
    `${projectRoot}/rollup.config.${(determineExtensionFor({dialect}))}`,
    mustache.render(
      await fs.readFile(resolve(__dirname, '..', 'templates', 'rollup.config.mustache'), 'utf-8'),
      {dualMode: dialect !== dialects.ESM}
    )
  );

  return {};
}
