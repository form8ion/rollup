/* eslint import/no-extraneous-dependencies: ['error', {'devDependencies': true}] */
import autoExternal from 'rollup-plugin-auto-external';
import {codecovRollupPlugin} from '@codecov/rollup-plugin';

export default {
  input: 'src/index.js',
  plugins: [
    autoExternal(),
    codecovRollupPlugin({
      enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
      bundleName: '@form8ion/rollup',
      uploadToken: process.env.CODECOV_TOKEN
    })
  ],
  output: [
    {file: 'lib/index.js', format: 'esm', sourcemap: true}
  ]
};
