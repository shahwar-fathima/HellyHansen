const { test, expect } = require('@playwright/test');

test('sample test', async ({page})=>{
await page.goto('https://www.amazon.in/');

});