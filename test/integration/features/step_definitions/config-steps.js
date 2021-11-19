import {assert} from 'chai';
import {promises as fs} from 'fs';
import {Then} from '@cucumber/cucumber';

import {autoExternal} from './dependencies-steps';

Then('the config is generated', async function () {
  assert.equal(
    await fs.readFile(`${process.cwd()}/rollup.config.js`, 'utf-8'),
    `/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import autoExternal from '${autoExternal}';

export default {
  input: 'src/index.js',
  plugins: [autoExternal()],
  output: [
    {file: 'lib/index.cjs.js', format: 'cjs', sourcemap: true},
    {file: 'lib/index.es.js', format: 'es', sourcemap: true}
  ]
};
`
  );
});
