
const { test, expect, chromium, firefox } = require('@playwright/test') ;
//const { ai } = require('@zerostep/playwright');
const { timeout } = require('../../playwright.config');
const { HomePage} = require("../pageObjects/HomePage"); 

test('sample test', async ({page})=>{
await page.goto('https://staging-shop3.hellyhansen.com/en_us/');

});


test('sample for ai using zero step', async({page})=>{

    await page.goto('https://playwright.dev/');

    await ai('Click on get started button', {page, test});
    await ai('Click on search icon', {page,test});

});

test('open helly hansen website and do some operations', async({page})=>{
    const homePage = new HomePage(page);

    await page.goto('https://newstg.musto.com/');

    await ai('Wait for the cookie banner to appear', {page,test});
    await ai('Accept the cookies', {page,test});
    await homePage.waitForPageLoad();
    //await page.waitForTimeout(6000)
    await ai('Wait for save button in now shipping world wide modal', {page,test});
    await ai('click on save button in now shipping world wide modal', {page,test});
    await page.waitForLoadState( 'load');
    await homePage.waitForPageLoad();
    //await ai('wait until page navigation', {page,test})
    
    await ai('Wait for continue to shop button and click on continue to shop button if visible', {page,test})
    await page.waitForLoadState('domcontentloaded');
    await ai('Hover over mens or womens randomly', {page,test})
    await ai('Click on any sub links under the flyout of hovered mens or womens', {page, test});
    await ai('Navigate to any product', {page,test});
    await ai('Add item to bag', {page,test} );
});

test('open helly hansen', async({page})=>{
    await page.goto('https://staging-shop3.hellyhansen.com/en_us');

    await ai('Enter value in username of browser pop up as hh', {page, test});
    await ai('Enter value in password as alive', {page,test});
    await ai('Click on sign in', {page, test});



});