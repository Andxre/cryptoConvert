console.log("JS Loaded")
const url = "https://api.coingecko.com/api/v3/coins/"

//Functions
// Using AJAX make call to the CoinGecko API
function getCurrentPrice(quantity) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/bitcoin', false);
    xhr.onload = function() {
        let data = JSON.parse(xhr.responseText);
        let price = data["market_data"]["current_price"]["usd"];
        let finalPrice = (price * quantity).toFixed(2)
        document.getElementById("currency-input").value = numberWithCommas(finalPrice);
        console.log(numberWithCommas(finalPrice));
        console.log("Length:" + numberWithCommas(finalPrice).length)
    }
    xhr.send();    
}

function getCoinValue(enteredPrice) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/bitcoin', false);
    xhr.onload = function() {
        let data = JSON.parse(xhr.responseText);
        let price = data["market_data"]["current_price"]["usd"];
        let finalPrice = (enteredPrice / price).toFixed(7);
        document.getElementById("coin-input").value = finalPrice;
    }
    xhr.send();  
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function increaseSize(firstLength, secondLength, first, second) {
    let baseWidth = 5;
    document.getElementById(first).style.width = (baseWidth + firstLength*2) + "rem";
    document.getElementById(second).style.width = (baseWidth + secondLength*2) + "rem";
}
// End of Functions

// Initiate default values to input boxes
document.getElementById("coin-input").value = "1";
getCurrentPrice(1);
let secondLength = document.getElementById("currency-input").value;
increaseSize(1, secondLength.length, "coin-input", "currency-input");

// Event Listeners
document.getElementById("coin-input").addEventListener("input", () => {
    let first = "coin-input";
    let second = "currency-input"
    let quantity = document.getElementById(first).value;
    if (quantity == 0) {
        document.getElementById(first).style.width = "5rem";
        document.getElementById(second).style.width = "5rem";
        document.getElementById(second).value = "";
        return;
    }
    else if (isNaN(quantity)) {
        return;
    }
    console.log(quantity.length);
    getCurrentPrice(quantity);
    let change = document.getElementById(second).value;
    console.log("EventListener Length:" + change.length);
    increaseSize(quantity.length, change.length, first, second);
});

document.getElementById("currency-input").addEventListener("input", () => {
    console.log("CURRENCY INPUT CALLED");
    let second = "coin-input";
    let first = "currency-input"
    let enteredPrice = document.getElementById("currency-input").value;
    if (enteredPrice == 0) {
        document.getElementById(first).style.width = "5rem";
        document.getElementById(second).style.width = "5rem";
        document.getElementById(second).value = "";
        return;
    }
    else if (isNaN(enteredPrice)) {
        return;
    }
    getCoinValue(enteredPrice);
    let change = document.getElementById(second).value;
    increaseSize(enteredPrice.length, change.length, first, second);
   

});


/* 
TODO
3. Media Queries
4. Support for different coins
5. Add a logo
- Make site more responsive
    - when boxes hit edge of screen, fix style
*/
