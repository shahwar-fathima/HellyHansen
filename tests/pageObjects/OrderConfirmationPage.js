// pageObjects/OrderConfirmationPage.js
const { expect } = require("@playwright/test");

class OrderConfirmationPage {

    constructor(page) {
        this.page = page;
        this.getProductSize = page.locator('div:has-text("Size") + div');
        this.getProductQuantity = page.locator('div[class*="product-qty"]');
        this.getTotalAmount = page.locator('div.valign-cell.product-price > div');
        this.iframe = this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
    }

    async getSizeOfProduct(){
        const iframe = this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
        if (iframe) {
                await this.page.waitForTimeout(5000);
              // Locate the div with "Size" text and get the following sibling's text content
              const productSizeLocator = iframe.locator('div.attr-key:has-text("Size:") + div');
          
              // Await textContent from the located element
              const productSize = await productSizeLocator.textContent();
          
              console.log('Product size is:', productSize);
              return productSize;            
    }
}

    async getQtyOfProduct(){
        const iframe = this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
        if (iframe) {
                await this.page.waitForTimeout(5000);
              // Locate the div with "Size" text and get the following sibling's text content
              const productQtyLocator = iframe.locator('div[class*="product-qty"]');
          
              // Await textContent from the located element
              const productQty = await productQtyLocator.textContent();
          
              console.log('Product qty is:', productQty);
              return productQty;
            } 
          
        
    }

    async getTotalAmountOrderPage(){
        const iframe = this.page.locator('iframe#Intrnl_CO_Container').contentFrame();
        if (iframe) {
                await this.page.waitForTimeout(5000);
              // Locate the div with "Size" text and get the following sibling's text content
              const value = iframe.locator('div.valign-cell.product-price > div');
          
              // Await textContent from the located element
              const value1 = await value.textContent()
              const productTotal = value1.replace(/\s+/g, '');
              const trimdata = productTotal.replace(/[\u200B-\u200D\uFEFF]/g, '');
         
              console.log('Product total is:', trimdata);
              return trimdata;       
    }
}
}
module.exports = { OrderConfirmationPage };