function homePage() {
    window.location.href = "home.html";
}

var home = document.getElementById('home');
var products = document.getElementById('products');
var markets = document.getElementById('markets');

function home() {
    home.style.visibility = 'visible';
    products.style.visibility = 'hidden';
    markets.style.visibility = 'hidden';
    alert('Hey');
}

function products() {
    home.style.visibility = 'hidden';
    products.style.visibility = 'visible';
    markets.style.visibility = 'hidden';
}

function markets() {
    home.style.visibility = 'hidden';
    products.style.visibility = 'hidden';
    markets.style.visibility = 'visible';
}