const { expect } = require("playwright/test");

// pageObjects/LoginPage.js
class LoginPage {

    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('input#email');
        this.passwordInput = page.locator('input#password');
        this.submitButton = page.locator('button:has-text("Sign In")');
        this.invalidLoginMessage= page.locator('span.errorMessage-module__errorMessage__sARgC');
    }

    async verifyLoginPage(){
        await expect(this.page).toHaveURL("https://newstg.musto.com/en_global/sign-in");
    }

    async goToLoginPage() {
        await this.page.goto('https://staging-shop.hhworkwear.com/');
    }

    async closeModal(){
        await this.page.locator('#emailSignupModal button.close').click();
    }

    async login(username, password) {
        await this.submitButton.click();
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
        //await this.page.waitForTimeout(5000);
    }

    async verifySuccessfulLogin(expectedUsername) {
        await this.page.waitForSelector('a[role="button"][id="myaccount"]');
        const userProfileName = await this.userProfileButton.textContent();
        return userProfileName.includes(expectedUsername);
    }

    async verifyInvalidLoginMessage(){
        const invalidMessage = await this.invalidLoginMessage.textContent();
        console.log('Invalid message showing:',invalidMessage)
        expect(this.invalidLoginMessage.toHaveText("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."))
    }
}

module.exports = { LoginPage };