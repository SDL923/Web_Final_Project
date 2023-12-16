
const show_info = document.getElementById("show_info");
const button_home = document.getElementById("button_home");


document.addEventListener("DOMContentLoaded", function() { //To make it visible right after the page is switched
    var point =  localStorage.getItem("point"); // Read the value of a key from local storage

    show_info.innerText = "Your remaining points are " + point + " P"; // show remaining point
});

button_home.addEventListener('click', async function() {
    window.location.href = "/main";

});





