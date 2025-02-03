const { expect } = require("playwright/test");

// pageObjects/SearchPage.js
class SearchPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.submitButton = page.locator('button:has-text("Sign In")');
        this.invalidLoginMessage= page.locator('span.errorMessage-module__errorMessage__sARgC');
    }


async selectRandomProductFromSearchPage(){
    await this.page.waitForTimeout(5000);
    const listOfProducts = await this.page.$$('li.productGrid-module__product__qfskE');
    const count = await listOfProducts.length;
    console.log(`Found ${count} products`);
    //await this.page.waitForTimeout(5000);
    const randomIndex = Math.floor(Math.random() * listOfProducts.length);
    await listOfProducts[randomIndex].click();

    // for (let i = 0; i < count; i++) {
    //     const element = locator.nth(1); // Access the nth element
    //     await element.click(); // Perform an action, e.g., click
    //     console.log(`Clicked element ${i + 1}`);
    //     return;
    //   }
      const url = this.page.url()
        console.log('Product Url is : ', url)
}

async waitToCheck(){
    await this.page.waitForTimeout(15000);
}
}
module.exports = { SearchPage };