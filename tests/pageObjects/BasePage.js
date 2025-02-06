//Create a base page class and provide all common functions and extend to the other page classes

const { expect } = require("playwright/test");

class BasePage {
  
    randomElementSelection(elementList) {
        if(elementList.length == 1){
            return 0;
        }else {
            const index = Math.floor(Math.random() * elementList.length);
            return index;
        }
    }

   

    closeCookieBanner(){

    }

    async hoverOverElement(){

    }

  
}

module.exports = {BasePage};