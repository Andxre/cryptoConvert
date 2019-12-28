// Variables
const url = "https://api.coingecko.com/api/v3/coins/"
const listURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
let coins = [];
let currentCoin = 'bitcoin';

// Functions
function makeAjaxCall(url, methodType) {
    var promiseObj = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4){
                if (xhr.status === 200){
                   var resp = xhr.responseText;
                   var respJson = JSON.parse(resp);
                   resolve(respJson);
                } 
                else {
                   reject(xhr.status);
                }
            }
        }
    });
    return promiseObj;
}

function loadCoins() {
    makeAjaxCall(listURL, "GET").
    then(data => {
        for (let i = 0; i < 10; i++) {
            if (data[i]['symbol'] != 'usdt') { // Don't Include tether
                let coin = {
                    'name': data[i]['id'],
                    'id': data[i]['symbol']
                }
                coins.push(coin);
            }
        }
    }, errorHandler).
    then(() => {
        for (let i = 0; i < 5; i++) {
            let opt = document.createElement('option');
            opt.innerHTML = (coins[i]['id']).toUpperCase();
            document.getElementById('current-coin').appendChild(opt);
        }
    }, errorHandler);
}

function init() {
    document.getElementById("coin-input").value = "1";
    coinChange();
}

function getCurrentPrice(result, quantity) {
    let price = result["market_data"]["current_price"]["usd"];
    let finalPrice = (price * quantity).toFixed(2)
    document.getElementById("currency-input").value = numberWithCommas(finalPrice);
}

function getCoinValue(result, enteredPrice) {
    let price = result["market_data"]["current_price"]["usd"];
    let finalPrice = (enteredPrice / price).toFixed(7);
    document.getElementById("coin-input").value = finalPrice;
}

function errorHandler(statusCode) {
    console.log("Failed with status", status)
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function increaseSize(firstLength, secondLength, first, second) {
    let baseWidth = 5;
    document.getElementById(first).style.width = (baseWidth + firstLength*2) + "rem";
    document.getElementById(second).style.width = (baseWidth + secondLength*2) + "rem";
}

function coinChange() {
    console.log("Called");
    let first = "coin-input";
    let second = "currency-input"
    let quantity = document.getElementById(first).value;
    if (quantity == 0) {
        document.getElementById(first).style.width = "5rem";
        document.getElementById(second).style.width = "5rem";
        document.getElementById(second).value = "";
        return;
    }
    else if (isNaN(quantity)) { // If Input is not a number don't do anything
        return;
    }
    let result = makeAjaxCall(url+currentCoin, "GET").
        then(result => {
            getCurrentPrice(result, quantity);
        }, errorHandler).
        then(()=> {
            let change = document.getElementById(second).value;
            increaseSize(quantity.length, change.length, first, second);
        }, errorHandler);
}

function currencyChange() {
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
    let result = makeAjaxCall(url+currentCoin, "GET").
        then(result => {
            getCoinValue(result, enteredPrice);
        }, errorHandler).
        then(()=> {
            let change = document.getElementById(second).value;
            increaseSize(enteredPrice.length, change.length, first, second);
        }, errorHandler);
}

// Event Listeners
document.getElementById('coin-input').addEventListener("input", () => {
    coinChange();    
});

document.getElementById("currency-input").addEventListener("input", () => {
    currencyChange();
});

document.getElementById('current-coin').addEventListener("change", () => {
    document.getElementById("currency-input").value = '...'; // Awaiting Response
    let symbol = document.getElementById('current-coin').value; 
    let coinObj = coins.find(coin => {
        return coin.id == symbol.toLowerCase();
    })
    currentCoin = coinObj['name'];
    init();
})

// Site Initalization
loadCoins();
init();
setInterval(coinChange, 5000); // Check if price updates every 5 seconds
console.log("Initialized");


/* 
TODO
- Media Queries
- Make site more responsive
    - when boxes hit edge of screen, fix style
- Add support for more currencies
- Better Background
- Powered by CoinGecko
*/

/*



*/