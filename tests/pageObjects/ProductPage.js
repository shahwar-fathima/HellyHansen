const { expect } = require("playwright/test");

// pageObjects/ProductPage.js
class ProductPage {

    constructor(page) {
        this.page = page;
        this.sizeDropDown = page.locator('div.sizeList-module__root__NszHY');
        this.firstSizeInDropDown = page.locator('#react-select-2-listbox > div:first-child')
        this.addToBagButton = page.locator('div.productFullDetail-module__productInfoActions__aeOrk')
        this.goToCartButton = page.locator('a[href*="cart"]')
    }


async selectSizeFromDropDown(){
    await this.page.waitForSelector('div.sizeList-module__root__NszHY');
    await this.sizeDropDown.click()
    console.log('Drop Down clicked')
    await this.page.waitForTimeout(5000);

  // Select an option by index
  // await this.sizeDropDown.selectOption({ index: '1' });

    await this.firstSizeInDropDown.click({ force: true });

}

async clickOnAddToBag(){
    await this.addToBagButton.click()
}

async clickOnGoToCartButton(){
        await this.goToCartButton.click({ force: true })
        await this.page.waitForTimeout(5000);
        await expect(this.page).toHaveURL("https://newstg.musto.com/en_global/cart");
}
}
module.exports = { ProductPage };