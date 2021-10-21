function loginPage() {
    document.getElementById('formLogin').style.display = "block";
    document.getElementById('formRegister').style.display = "none";
}

function registerPage() {
    document.getElementById('formLogin').style.display = "none";
    document.getElementById('formRegister').style.display = "block";
}

function login() {
    let username = document.getElementById('LoginUsername').value;
    let password = document.getElementById('LoginPassword').value;
    const LoginData = {
        "id": username,
        "pw": password
    };

    // Send a token to the API and see if the password and username fits

    // If true then clear all elements and send back to the main page
    // If false then clear the password
}

function register() {
    let username = document.getElementById('RegisterUsername').value;
    let email = document.getElementById('RegisterEmail').value;
    let password1 = document.getElementById('RegisterPassword1').value;
    let password2 = document.getElementById('RegisterPassword2').value;

    if (password1 == password2) {
        const RegisterData = {
            "id": username,
            "email": email,
            "password": password1
        };

        document.getElementById('RegisterUsername').value = "";
        document.getElementById('RegisterEmail').value = "";
        document.getElementById('RegisterPassword1').value = "";
        document.getElementById('RegisterPassword2').value = "";
    } else {
        alert("Your Passwords do not match each other");
        document.getElementById('RegisterPassword1').value = "";
        document.getElementById('RegisterPassword2').value = "";
    };
}