import {dialects} from '@form8ion/javascript-core';

export default function scaffoldDialect({dialect}) {
  switch (dialect) {
    case dialects.BABEL:
      return {dependencies: {javascript: {development: ['@rollup/plugin-babel']}}};
    case dialects.TYPESCRIPT:
      return {
        dependencies: {javascript: {development: ['@rollup/plugin-typescript']}},
        vcsIgnore: {directories: ['.rollup.cache/']}
      };
    default:
      return {};
  }
}
