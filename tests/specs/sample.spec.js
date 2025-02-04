const { test, expect } = require('@playwright/test');

test('sample test', async ({page})=>{
await page.goto('https://staging-shop3.hellyhansen.com/en_us/');

});