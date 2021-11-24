import {dialects} from '@form8ion/javascript-core';

export default function ({dialect}) {
  switch (dialect) {
    case dialects.BABEL:
      return {devDependencies: ['@rollup/plugin-babel']};
    case dialects.TYPESCRIPT:
      return {
        devDependencies: ['@rollup/plugin-typescript'],
        vcsIgnore: {directories: ['.rollup.cache/']}
      };
    default:
      return {};
  }
}
