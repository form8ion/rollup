import {assert} from 'chai';
import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';

import {autoExternal} from './dependencies-steps.mjs';

Then('the config is generated with a(n) {string} extension', async function (extension) {
  assert.equal(
    await fs.readFile(`${process.cwd()}/rollup.config.${extension}`, 'utf-8'),
    `import autoExternal from '${autoExternal}';

export default {
  input: 'src/index.js',
  plugins: [autoExternal()],
  output: [
    {file: 'lib/index.js', format: 'cjs', sourcemap: true},
    {file: 'lib/index.mjs', format: 'esm', sourcemap: true}
  ]
};
`
  );
});
