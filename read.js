const listURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
let coins = [];

function loadCoins() { // Loads top 10 coins 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', listURL, false) 
    xhr.onload = function() {
    let data = JSON.parse(xhr.responseText);
        for (let i = 0; i < 10; i++) {
            if (data[i]['symbol'] != 'usdt') { // Don't Include tether
                let coin = {
                    'name': data[i]['id'],
                    'id': data[i]['symbol']
                }
                coins.push(coin);
            }
        }
    }
    xhr.send();
}


loadCoins();

// Create Options for top 5 coins
for (let i = 0; i < 5; i++) {
    let opt = document.createElement('option');
    opt.innerHTML = (coins[i]['id']).toUpperCase();
    document.getElementById('current-coin').appendChild(opt);
}