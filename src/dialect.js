import {dialects} from '@form8ion/javascript-core';

export default function ({dialect}) {
  switch (dialect) {
    case dialects.TYPESCRIPT:
      return {
        devDependencies: ['@rollup/plugin-typescript'],
        vcsIgnore: {directories: ['.rollup.cache/']}
      };
    default:
      return {};
  }
}
