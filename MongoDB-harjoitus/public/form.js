// Function for validating form before sending it to server
function validateFields(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
  
    if (email = '' || password == '') { 
        alert("Can't sumbit empty fields! Check all input fields!");
        return false;
    };
};