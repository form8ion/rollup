// #### Import
// remark-usage-ignore-next 2
import stubbedFs from 'mock-fs';
import {dialects, projectTypes} from '@form8ion/javascript-core';
import {scaffold} from './lib/index.cjs';

// remark-usage-ignore-next
stubbedFs();

// #### Execute

(async () => {
  await scaffold({projectRoot: process.cwd(), dialect: dialects.BABEL, projectType: projectTypes.PACKAGE});
})();
