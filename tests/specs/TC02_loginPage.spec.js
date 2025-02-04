// To verify Sign in link lands on Login page


const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pageObjects/HomePage');
const { LoginPage } = require('../pageObjects/LoginPage');
const { SearchPage } = require('../pageObjects/SearchPage');
const { ProductPage } = require('../pageObjects/ProductPage');
const { CartPage } = require('../pageObjects/CartPage');
const { CheckoutPage } = require('../pageObjects/CheckoutPage');
const { OrderConfirmationPage } = require('../pageObjects/OrderConfirmationPage');
const { TestConfig } = require('../../config/configProperties')
const  urlDetails  = require('../testData/urldetails.json');
const productData = require('../testData/productData.json');

//set the environment variables TEST_ENV appropriately
const environment = process.env.TEST_ENV!= null?process.env.TEST_ENV: TestConfig.TEST_ENV; // "qa" or "staging"
console.log(`Current working directory: ${process.cwd()}`);

// The commented line will be uncommented while pushing the code to Github
const testDataFilePath = `../testData/${environment}TestData.js`;
console.log(`Attempting to load: ${testDataFilePath}`);

const testData = require(testDataFilePath);

test('TC02 : Homepage > Verify the Login functionality',{tag : ['@smoke','@loginpage']}, async function({ page})  {
    const homePage = new HomePage(page)
    const loginPage= new LoginPage(page)
     
    console.log('[INFO] Navigate to the URL.....')
    const url = urlDetails.mustostg.url;
    await homePage.goToHomePage(url); // Navigate to the home page
    console.log('[SUCCESS] URL Launch Successful.....')
    await homePage.acceptAllCookiesButton(); // Close the cookies banner in footer
    console.log('[SUCCESS] Accept cookies banner closed succesfully.....')
    await homePage.clickShippingWorldWidePopUpSaveButton(); //Save the country bydefault selected on Now shipping worldwide!
    console.log('[SUCCESS] Pop-up closed Successful.....')
    await homePage.closeCountryConfirmationPopUp();
    console.log('[SUCCESS] Confirmation Pop-up closed Successful.....')
    await homePage.clickOnAccountLink();
    console.log('[SUCCESS] Clicked on Sign in Link.....')
    await loginPage.verifyLoginPage();
    console.log('[SUCCESS] Login page loaded Successful.....')
    await loginPage.login()
    console.log('[SUCCESS] Entered invalid credentials......')
    await loginPage.verifyInvalidLoginMessage()
    console.log('[SUCCESS] Invalid credentials validated......')
},

test('TC03 : Homepage > Verify the GEO IP banner',{tag : ['@smoke','@GEO','@Banner']}, async function({ page }) {
    const homePage = new HomePage(page)
     
   
    console.log('[INFO] Test Case starts.....')
 
    console.log('[INFO] Navigate to the URL.....')
    const url = urlDetails.mustostg.url;
    await homePage.goToHomePage(url); // Navigate to the home page
    console.log('[SUCCESS] URL Launch Successful.....')
    await homePage.acceptAllCookiesButton(); // Close the cookies banner in footer
    console.log('[SUCCESS] Accept cookies banner closed succesfully.....')
    await homePage.clickShippingWorldWidePopUpSaveButton(); //Save the country bydefault selected on Now shipping worldwide!
    console.log('[SUCCESS] Pop-up closed Successful.....')
    await homePage.closeCountryConfirmationPopUp();
    console.log('[SUCCESS] Closed pop-up.....')
    await homePage.verifySelectedCountry('India')
}),

test('TC04 : Order Confirmation flow',{tag : ['@OrderConfirmation', '@smoke']}, async ({ page }) => {
    const homePage = new HomePage(page)
    const searchPage = new SearchPage(page)
    const productPage = new ProductPage(page)
    const cartPage = new CartPage(page)
    const checkoutPage = new CheckoutPage(page)
    const orderConfirmationPage = new OrderConfirmationPage(page)
    const brand = {
        "HH":  urlDetails.hellyhansen.url,
        "musto": urlDetails.mustostg.url
    }
    
    let url =  brand[TestConfig.brand];
     url = url + TestConfig.country

     console.log("url is" + url)
    const searchKeyword = productData.productData.productskeywords;

    console.log('Smoke test executed')
    console.log('[INFO] Test Case starts.....')
    console.log('[INFO] Navigate to the URL.....')
    
    await homePage.goToHomePage(url); // Navigate to the home page
    console.log('[SUCCESS] URL Launch Successful.....')
    await homePage.acceptAllCookiesButton(); // Close the cookies banner in footer
    console.log('[SUCCESS] Accept cookies banner closed succesfully.....')
    await homePage.clickShippingWorldWidePopUpSaveButton(); //Save the country bydefault selected on Now shipping worldwide!
    console.log('[SUCCESS] Pop-up closed Successful.....')
    await homePage.closeCountryConfirmationPopUp();
    console.log('[SUCCESS] Closed pop-up.....')
    await homePage.clickonSearchIcon();
    await homePage.searchProductByKeyword(searchKeyword);
    console.log('[SUCCESS] Landed on Search page.....')
    await searchPage.selectRandomProductFromSearchPage();
    console.log('[SUCCESS] Landed on Search page.....')
    await productPage.selectSizeFromDropDown();
    await productPage.clickOnAddToBag()
    await productPage.clickOnGoToCartButton()
    const productID = await cartPage.captureProductIdFromCartPage()
    const productSize = await cartPage.captureProductSizeFromCartPage()
    const productQty = await cartPage.captureProductQtyFromCartPage()
    const totalAmount = await cartPage.captureTotalAmountFromCartPage()
    console.log('[SUCCESS] Product ID on Cart Page.....', productID);
    await cartPage.proceedToCheckout()
    await checkoutPage.fillBillingAddressDetailsAndNavigateToPayPal(testData.billingAddress)
    await checkoutPage.paypalLoginAndOrderConfirmation()
    const productQtyOrderPage = await orderConfirmationPage.getQtyOfProduct()
    const productSizeOrderPage = await orderConfirmationPage.getSizeOfProduct()
    const totalAmountOrderPage = await orderConfirmationPage.getTotalAmountOrderPage();
    expect(productQty).toEqual(productQtyOrderPage)
    expect(productSize).toEqual(productSizeOrderPage)
    expect(totalAmountOrderPage).toContain(totalAmount)
   

})
)
