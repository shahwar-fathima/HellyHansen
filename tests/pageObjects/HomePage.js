// pageObjects/HomePage.js
const { expect } = require('@playwright/test');


class HomePage {
    constructor(page, browser) {
        this.page = page;
        this.browser = browser;
        this.signInButton = page.locator('button#myaccount');
        this.acceptAllCookies=page.locator('#onetrust-accept-btn-handler');
        // commented locators are of https://staging-shop.hhworkwear.com/ website
        this.popUp_HH= page.locator('#onetrust-accept-btn-handler');
       /* this.searchInput = page.locator('input[name="search_query"]');
        this.submitSearch= page.locator('button[title="Submit search"]'); */
        this.searchLink = page.locator('div.searchField-module__root__oyvn0, [role="combobox"][aria-label="Search"]')
        this.searchInputBox = page.locator('input[name="q"]')
        this.submitSearch =  page.locator('form[autocomplete="off"] button[type="submit"]')
        this.shippingWorldWidePopUpSaveButton = page.locator('input[value="Save"]');
        this.signInButton = page.locator("a.accountTrigger-module__dropdownLink__PmBYM");
        this.shippingWorldWidePopUp= page.locator('div.glDefaultPopupContainer');
        this.continueToCountryButton = page.locator('input[value="Continue to shop"]');
        this.selectedCountry = page.locator('div#ge_ss0_1 span');
    }

    async goToHomePage(url) {
         
        await this.page.goto(url) 
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
    }

    async closePopUpOnHomePage_HH(){             // Pop-up on home page landing https://staging-shop.hhworkwear.com/
        const closePopUp= await this.popUp_HH
        await closePopUp.click()
    }

    async  waitForPageLoad(){
        await this.page.waitForTimeout(10000);
    }

    async clickShippingWorldWidePopUpSaveButton(){
        await this.page.waitForLoadState('domcontentloaded')
        try {
            //await this.page.waitForSelector('input[value="Continue to shop"]')
            //const isVisible = await this.shippingWorldWidePopUpSaveButton.isVisible()
        if (await this.shippingWorldWidePopUpSaveButton.isVisible()) {
          console.log('Shipping worldwide form is visible!');
          const saveButton= await this.shippingWorldWidePopUpSaveButton
          await saveButton.click();
          return;
        } 
        } catch (e) {
            console.log("Save button is not visible")
        }
           
    }

    async closeCountryConfirmationPopUp(){         
          await this.page.waitForLoadState('load');
          try{
             await this.page.waitForSelector('input[value="Continue to shop"]')
            if(await this.continueToCountryButton.isVisible()){
                await await this.continueToCountryButton.click()
                return;
            } 
          }catch(e){
            console.log('Waited for Continue to save button')
          }
            
    }

    async goTo() {
        await this.page.goto('/');
    }

    async clickonSearchIcon(){

        const combinedLocator = this.page.locator('[role="combobox"][aria-label="Search"], input[placeholder="What are you looking for?"]');
        // Wait for either of the elements to be attached
        await combinedLocator.waitFor({ state: 'attached' })
        await this.searchLink.waitFor({ state: "visible"})
        await this.searchLink.click();  

    }
    
    async searchProductByKeyword(searchkeyword){
        await this.page.getByPlaceholder('What are you looking for?').fill(searchkeyword);
        await this.page.keyboard.press('Enter')
    }
    async selectRandomProduct(productData=[]) {
        const singleproduct = productData[Math.floor(Math.random() * productData.length)]
        console.log('product selected - ', singleproduct)
        return singleproduct
    }



    async verifySelectedCountry(countryName){
       // await this.selectedCountry.waitFor();
        const countrySelected = await this.selectedCountry.textContent();
        console.log("Expected value:", countryName);
        console.log("Actual value:", countrySelected);
        return countrySelected.includes(countryName);
    }  
    
    async addLoginDetailstoBrowserPopup_HH() {
        if (this.browser) {
            const context = await this.browser.newContext({
                httpCredentials: {
                    username: 'hh',
                    password: 'alive',
                },
            });

            const page = await context.newPage();  // Use the new context for a fresh page
            await page.goto('https://staging-shop3.hellyhansen.com/');
        } else {
            console.error('Browser is not defined');
        }
    }
}
module.exports = { HomePage };