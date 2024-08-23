import {assert} from 'chai';
import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';

import {autoExternal, pluginExecutable, pluginJson} from './dependencies-steps.js';

Then('the config is generated with a(n) {string} extension', async function (extension) {
  this.config = await fs.readFile(`${process.cwd()}/rollup.config.${extension}`, 'utf-8');
});

Then('dual-mode bundles are generated', async function () {
  assert.equal(
    this.config,
    `import autoExternal from '${autoExternal}';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal()
  ],
  output: [
    {file: 'lib/index.js', format: 'cjs', sourcemap: true},
    {file: 'lib/index.mjs', format: 'esm', sourcemap: true}
  ]
};
`
  );
});

Then('an ESM bundle is generated', async function () {
  assert.equal(
    this.config,
    `import autoExternal from '${autoExternal}';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal()
  ],
  output: [
    {file: 'lib/index.js', format: 'esm', sourcemap: true}
  ]
};
`
  );
});

Then('an CLI bundle is generated', async function () {
  assert.equal(
    this.config,
    `import autoExternal from '${autoExternal}';
import json from '${pluginJson}';
import executable from '${pluginExecutable}';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal(),
    json(),
    executable()
  ],
  output: [
    {file: 'bin/travi.js', format: 'esm', sourcemap: true, banner: '#!/usr/bin/env node'}
  ]
};
`
  );
});
