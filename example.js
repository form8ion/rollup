// #### Import
// remark-usage-ignore-next 2
import {resolve} from 'path';
import stubbedFs from 'mock-fs';
import {dialects, projectTypes} from '@form8ion/javascript-core';
import {scaffold} from './lib/index.js';

// remark-usage-ignore-next
stubbedFs({templates: stubbedFs.load(resolve(...[__dirname, 'templates']))});

// #### Execute

(async () => {
  await scaffold({projectRoot: process.cwd(), dialect: dialects.BABEL, projectType: projectTypes.PACKAGE});
})();
