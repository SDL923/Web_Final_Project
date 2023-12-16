



// form
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

// iogin, signup button
const button_login = document.getElementById("button_login");
const button_sign = document.getElementById("button_sign");
const button_account = document.getElementById("button_account");

// login, signup a tag
const login = document.getElementById("login");
const signup = document.getElementById("signup");

// input tag
const login_input_id = document.getElementById("login_input_id");
const login_input_pw = document.getElementById("login_input_pw");
const signup_input_id = document.getElementById("signup_input_id");
const signup_input_pw = document.getElementById("signup_input_pw");
const signup_input_name = document.getElementById("signup_input_name");



// convert login page & signup page
login.addEventListener('click', function() {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});
signup.addEventListener('click', function() {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});




button_sign.addEventListener('click', async function() {
    const id = signup_input_id.value;
    const password = signup_input_pw.value;
    const inputName = signup_input_name.value;

    if(id.length < 5){ //if ID is short
        alert("ID must be at least 5 characters long");
    }else if(!(/^(?=.*\d).{5,}$/.test(password))){ // worng password format
        alert("Password must be at least 5 characters and contain numbers");
    }else if(inputName==""){ //if name is empty
        alert("Name should not be empty");
    }else{
        // Send a signal to server.js to get the information in the Firestore DB
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password, inputName}),
        });
    
        // check sever response
        if (response.ok) {
            alert('Signup successful');
        } else {
            alert('Signup failed');
        }
    }

});



button_login.addEventListener('click', async function() {
    const id = login_input_id.value;
    const password = login_input_pw.value;

    try {
        // Send a signal to server.js to get the information in the Firestore DB
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        // check server response
        if (response.ok) {
            // Parsing data received from the server to JSON
            const responseData = await response.json();

            //alert("good~~" + responseData.point);
            window.location.href = "/main";

            // save at localstorage
            localStorage.setItem("id", id);
            localStorage.setItem("password", password);
            localStorage.setItem("point", responseData.point);



        } else {
            // Server response fails
            alert('Login failed');
        }
    } catch (error) {
        // error handling
        console.error('Error during login:', error);
    }

});


button_account.addEventListener('click', function() {
    window.location.href = "/account";

});



