// pageObjects/HomePage.js
const { expect } = require('@playwright/test');

class HomePage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator('button#myaccount');
        this.acceptAllCookies=page.locator('#onetrust-accept-btn-handler');
        // commented locators are of https://staging-shop.hhworkwear.com/ website
       /* this.popUp= page.locator('#onetrust-accept-btn-handler');
        this.searchInput = page.locator('input[name="search_query"]');
        this.submitSearch= page.locator('button[title="Submit search"]'); */
        this.searchLink = page.locator('div.searchField-module__root__oyvn0')
        this.searchInputBox = page.locator('input[name="q"]')
        this.submitSearch =  page.locator('form[autocomplete="off"] button[type="submit"]')
        this.shippingWorldWidePopUpSaveButton = page.locator('input[value="Save"]');
        this.signInButton = page.locator("a.accountTrigger-module__dropdownLink__PmBYM");
        this.shippingWorldWidePopUp= page.locator('div.glDefaultPopupContainer');
        this.continueToCountryButton = page.locator('input[value="Continue to shop"]');
        this.selectedCountry = page.locator('div#ge_ss0_1 span');
    }

    async goToHomePage() {
        await this.page.goto('https://newstg.musto.com/') 
        await this.page.context().clearCookies();
        await this.page.evaluate(() => {
        window.localStorage.clear();
        window.sessionStorage.clear();
     });    
    }

    async clickOnAccountLink(){
        const accountLink= await this.signInButton
        await accountLink.click();
    }

    async acceptAllCookiesButton(){
        const acceptCookies= await this.acceptAllCookies
        await acceptCookies.click()
        await this.page.waitForTimeout(5000);
    }

    async closePopUpOnHomePage(){             // Pop-up on home page landing https://staging-shop.hhworkwear.com/
        const closePopUp= await this.popUp
        await closePopUp.click()
        await this.page.waitForTimeout(5000);
    }

    async clickShippingWorldWidePopUpSaveButton(){
        await this.page.waitForSelector('div.glDefaultPopupContainer')
        const isVisible = await this.shippingWorldWidePopUp.isVisible()
        if (isVisible) {
          console.log('Shipping worldwide form is visible!');
          const saveButton= await this.shippingWorldWidePopUpSaveButton
          await saveButton.click()
          await this.page.waitForTimeout(5000);
          return;
        }    
    }

    async closeCountryConfirmationPopUp(){
          await this.page.waitForSelector('input[value="Continue to shop"]')
          const continueToCountry= await this.continueToCountryButton
          const isVisibleIn = await this.continueToCountryButton.isVisible()
          if(isVisibleIn){
          await continueToCountry.click()
          await this.page.waitForTimeout(5000);
          return;
        }    
    }

    async goTo() {
        await this.page.goto('/');
    }

    async searchIconClick(){
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const searchicon= await this.searchLink
                //await searchicon.click({ force: true })
                await searchicon.dblclick({ timeout: 3000 });
                await this.page.waitForTimeout(5000);
                console.log(`Attempt ${attempt}: Click successful`);
                return; // Exit the loop if the click is successful
            } catch (error) {
                console.error(`Attempt ${attempt}: ERROR waiting for or clicking: ${error.message}`);
                if (attempt < 3) {
                    console.log(`Attempt ${attempt}: Trying again...`);
                    // Wait for a short period before trying again
                    await this.page.waitForTimeout(5000);
                } else {
                    console.error(`Attempt ${attempt}: All attempts failed. Exiting.`);
                    throw error; // Throw the error if all attempts fail
                }
            } 
            }
    }
    async searchProductByKeyword(searchkeyword){
        await this.page.waitForSelector('input[name="q"]')
        const isVisible = await this.searchInputBox.isVisible()
        if(isVisible){
            console.log('Value :' , isVisible)
            const searchText = await this.searchInputBox
            await searchText.click()
            await this.page.waitForTimeout(5000);
            await searchText.fill(searchkeyword)
 //           const submitLink = await this.submitSearch
  //          await this.searchInputBox.fill(searchkeyword)
            await this.submitSearch.click({ force: true })
            const url = this.page.url()
            console.log('Url is : ', url)
            expect(url).toContain('search');
        }
    }

    async selectRandomProduct(productData=[]) {
        const singleproduct = productData[Math.floor(Math.random() * productData.length)]
        console.log('product selected - ', singleproduct)
        return singleproduct
    }

/*
    async searchForProductByName(productData=[]) {         // Search on home page of https://staging-shop.hhworkwear.com/
        console.log(`Product data is ${productData}`)
        await this.page.waitForTimeout(5000);
        const singleproduct = await this.selectRandomProduct(productData)
        await this.searchInput.click()
        await this.searchInput.fill(singleproduct)
        const submitLink = await this.submitSearch
        await submitLink.click({force:true})
    } */

    async verifySelectedCountry(countryName){
        await this.page.waitForTimeout(5000)
        const countrySelected = await this.selectedCountry.textContent();
        console.log("Expected value:", countryName);
        console.log("Actual value:", countrySelected);
        return countrySelected.includes(countryName);
    }   
}
module.exports = { HomePage };