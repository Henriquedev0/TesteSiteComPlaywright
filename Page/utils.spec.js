const { test, expect, chromium } = require('@playwright/test');
const { afterEach } = require('node:test');

let browser;
let context;
let page;

test.beforeEach(async () => {
  
  browser = await chromium.launch({ headless: true, slowMo: 0 });
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterEach(async () => {
  
  await browser.close();
});

export { test, expect, chromium, afterEach, page };