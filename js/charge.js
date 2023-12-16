
// plus point button
const plus1 = document.getElementById("plus1");
const plus2 = document.getElementById("plus2");
const plus3 = document.getElementById("plus3");
const plus4 = document.getElementById("plus4");

const quantity1 = document.getElementById("quantity1");
const total_price = document.getElementById("total");
const input_pw = document.getElementById("input_pw");
const button_charge = document.getElementById("button_charge");


// Increasing points by 10
plus1.addEventListener('click', function() {
    var point = parseInt(quantity1.value, 10);
    quantity1.value = point+10;
    // show total price
    total_price.innerText = ((point+10)*500).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" ￦";
    
});
// Increasing points by 50
plus2.addEventListener('click', function() {
    var point = parseInt(quantity1.value, 10);
    quantity1.value = point+50;
    // show total price
    total_price.innerText = ((point+50)*500).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" ￦";
    
});
// Increasing points by 100
plus3.addEventListener('click', function() {
    var point = parseInt(quantity1.value, 10);
    quantity1.value = point+100;
    // show total price
    total_price.innerText = ((point+100)*500).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" ￦";
    
});
// Increasing points by 500
plus4.addEventListener('click', function() {
    var point = parseInt(quantity1.value, 10);
    quantity1.value = point+500;
    // show total price
    total_price.innerText = ((point+500)*500).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" ￦";
    
});

function updateResult() {
    var point = parseInt(quantity1.value, 10);
    // show total price
    total_price.innerText = ((point)*500).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")+" ￦";
    
}

// Calculate by detecting when a value is entered
quantity1.addEventListener("input", updateResult);




button_charge.addEventListener('click', async function() {
    var my_point_str =  localStorage.getItem("point"); // Read the value of a key from local storage
    var my_point = parseInt(my_point_str, 10);
    var password =  localStorage.getItem("password"); // Read the value of a key from local storage
    var id = localStorage.getItem("id"); // Read the value of a key from local storage

    var plus_point = parseInt(quantity1.value, 10);

    if(input_pw.value == password){ // if the password is correct
        if(plus_point == 0){ //if no point are entered
            alert("Enter points you want to charge");
        }else{
            var final_point = my_point+plus_point; // Points after charge
    
            try {
                // Send data to the server
                const response = await fetch('http://localhost:8080/charge', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id, final_point }),
                });
                
                // go to the next page
                localStorage.setItem("point", final_point);
                alert(plus_point+" points charged from the account.\nYour final point is "+final_point+"won.\nThank you."); // success message
                window.location.href = "/main"; // go to main page

            } catch (error) {
                // error
                console.error('Error during login:', error);
            }
        }

    }else{ // if password is wrong
        alert("Password doesn't match");
    }

});







