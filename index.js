console.log("This is a test")
const url = "https://api.coingecko.com/api/v3/coins/"

// Using AJAX make call to the CoinGecko API
function getCurrentPrice(quantity) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.coingecko.com/api/v3/coins/bitcoin');
    xhr.onload = function() {
        let data = JSON.parse(xhr.responseText);
        let price = data["market_data"]["current_price"]["usd"];
        let finalPrice = (price * quantity).toFixed(2)
        document.getElementById("currency-input").value = finalPrice;
    }
    xhr.send();    
}

// Initiate default values to input boxes
document.getElementById("coin-input").value = "1";
document.getElementById("currency-input").value = getCurrentPrice(1);

// If user types number in input field, price changes
document.getElementById("coin-input").addEventListener("input", ()=>{
    let quantity = document.getElementById("coin-input").value;
    console.log(quantity);
    getCurrentPrice(quantity);
});




/* 
TODO
1. Transitions when values change in input box
2. Increase size of input box when number gets too big
3. Media Queries
4. Support for different coins
5. Add a logo
*/
