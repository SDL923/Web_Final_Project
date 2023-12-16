

const input_pw = document.getElementById("input_pw");
const button_show = document.getElementById("button_show");
const error = document.getElementById("error");

// Table tag can only be added once
let count = 0;

// Create a table with data imported from firestore
async function fetchData() {
    try {
      // Send a signal to server.js to get the information in the Firestore DB
      const response = await fetch('http://localhost:8080/getData');
      const data = await response.json();

      const dataTable = document.getElementById('dataTable');
      const tbody = document.createElement('tbody');
      
      // make table
      data.forEach((item) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
        
        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);
  
        const pwCell = document.createElement('td');
        pwCell.textContent = item.pw;
        row.appendChild(pwCell);
  
        const pointCell = document.createElement('td');
        pointCell.textContent = item.point;
        row.appendChild(pointCell);
  
        tbody.appendChild(row);
      });
      
      dataTable.appendChild(tbody);

    } catch (error) {
      console.error('Error fetching data:', error); //error
    }
}

// if you click the show button
button_show.addEventListener('click', async function() {
    if(input_pw.value == "1234"){
        if(count == 0){
            fetchData(); // make table
            count = 1;
        }
        error.innerText = "";
    }else{
        error.innerText = "Invalid password";
    }

});