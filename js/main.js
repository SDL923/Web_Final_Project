
//  for scroll
const menu_home = document.getElementById("menu_home")
const menu_about = document.getElementById("menu_about")
const menu_portfolio = document.getElementById("menu_portfolio")
const menu_bio = document.getElementById("menu_bio")
const menu_contack = document.getElementById("menu_contack")

const scroll_home = document.getElementById("anchor_home")
const scroll_about = document.getElementById("anchor_about")
const scroll_portfolio = document.getElementById("anchor_portfolio")
const scroll_bio = document.getElementById("anchor_bio")
const scroll_contack = document.getElementById("anchor_contack")
// --------------------------

const menu_logout = document.getElementById("menu_logout");
const information_left = document.getElementById("information_left");
const information_right = document.getElementById("information_right");

const button_buy1 = document.getElementById("button_buy1");
const button_buy2 = document.getElementById("button_buy2");
const button_buy3 = document.getElementById("button_buy3");
const button_charge = document.getElementById("button_charge");


document.addEventListener('DOMContentLoaded', function() {
    var getId = localStorage.getItem('id');
    if (getId) {
        // data exist
        information_left.innerText = "User: " + getId;
    } else {
        // no data
        information_left.innerText = "?";
    }

    var getPoint = localStorage.getItem('point');
    if (getPoint) {
        // data exist
        information_right.innerText = "point: " + getPoint;
    } else {
        // no data
        information_right.innerText = "?";
    }

});


menu_logout.addEventListener('click', function() {
    // remove localStorage
    localStorage.removeItem('id');
    localStorage.removeItem('password');
    localStorage.removeItem('point');

    // Log out
    window.location.href = "/";

});

// buy product1
button_buy1.addEventListener('click', async function() {
    // go to the next page
    window.location.href = "/product1";

});

// buy product2
button_buy2.addEventListener('click', async function() {
    // go to the next page
    window.location.href = "/product2";

});

// buy product3
button_buy3.addEventListener('click', async function() {
    // go to the next page
    window.location.href = "/product3";

});

// charge point
button_charge.addEventListener('click', function() {
    // go to the next page
    window.location.href = "/charge";
});



// for scroll
menu_home.onclick = function(){
    window.scroll({top:scroll_home.offsetTop, behavior:'smooth'});
}
menu_about.onclick = function(){
    window.scroll({top:scroll_about.offsetTop, behavior:'smooth'});
}
menu_portfolio.onclick = function(){
    window.scroll({top:scroll_portfolio.offsetTop, behavior:'smooth'});
}
menu_bio.onclick = function(){
    window.scroll({top:scroll_bio.offsetTop, behavior:'smooth'});
}
menu_contack.onclick = function(){
    window.scroll({top:scroll_contack.offsetTop, behavior:'smooth'});
}


