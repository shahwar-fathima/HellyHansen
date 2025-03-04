//Basic example to show the page object class

class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator('a.checkout-btn[role=button][href*=cart]:visible');
        this.proceedToCheckoutButton = page.locator('div.cart-module__topActions__bQ3BQ a');
        this.productIDCapture = page.locator('td.item-module__details__VKjWG span')
        this.productSizeCapture = page.locator('td.item-module__details__VKjWG dt:has-text("Size :") + dd')
    }

    async proceedToCheckout() {
       // await this.checkoutButton.click({force:true});
        await this.page.waitForTimeout(5000)
        await this.proceedToCheckoutButton.click({ force: true });
    }

    async captureProductIdFromCartPage(){
        const productID = await this.productIDCapture.textContent()
        return productID;
     
    }

    async captureProductSizeFromCartPage(){
        const productSize = await this.productSizeCapture.textContent()
        console.log('Size from bag page.....', productSize)
        return productSize;
     
    }

    async captureProductQtyFromCartPage(){
        // Fetch the value from the input
        const qtySelected = await this.page.locator('input.quantity-module__input__zjN5m').getAttribute('value');
        console.log('Quantity from bag page.....', qtySelected); 
        return qtySelected;
     
    }

    async captureTotalAmountFromCartPage(){
        const fullPrice = await this.page.locator('td.price-summary-total').getAttribute('ge-data-converted-full-price');
        const priceTotal1 = fullPrice.replace(/,/g, '');
        const priceTotal = priceTotal1.replace(/\s+/g, '');
        const trimPrice = priceTotal.replace(/[\u200B-\u200D\uFEFF]/g, '');
        console.log('Total amount from bag page.....', trimPrice);
        return trimPrice; 
    }
}

module.exports = { CartPage };