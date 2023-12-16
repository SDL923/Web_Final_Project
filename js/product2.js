


const button_plus = document.getElementById("button_plus");
const button_minus = document.getElementById("button_minus");

const quantity1 = document.getElementById("quantity1");
const total_price = document.getElementById("total");

const button_buy = document.getElementById("button_buy");



button_plus.addEventListener('click', async function() {
    var product_num = parseInt(quantity1.value, 10);
    quantity1.value = product_num+1;
    total_price.innerText = ((product_num+1)*500).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" P";
});

button_minus.addEventListener('click', async function() {
    var product_num = parseInt(quantity1.value, 10);
    if(product_num > 0){
        quantity1.value = product_num-1;
        total_price.innerText = ((product_num-1)*500).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" P";
    }

});

button_buy.addEventListener('click', async function() {
    var total = parseInt(quantity1.value, 10) * 500;
    
    var point_str =  localStorage.getItem("point"); // Read the value of a key from local storage
    var id = localStorage.getItem("id"); // Read the value of a key from local storage
    var myPoint = parseInt(point_str, 10);

    if(total > myPoint){
        alert("Not enough points to buy!!!");
    }else{
        var left_point = myPoint-total; // Points left after purchase
    
        try {
            // Send a signal to server.js to get the information in the Firestore DB 
            const response = await fetch('http://localhost:8080/product1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, left_point }),
            });
            
            // go to the next page
            localStorage.setItem("point", left_point);
            window.location.href = "/success";


        } catch (error) {
            // error
            console.error('Error during login:', error);
        }
    }
    
});









