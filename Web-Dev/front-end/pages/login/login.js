function loginPage() {
    document.getElementById("formLogin").style.display = "block";
    document.getElementById("formRegister").style.display = "none";
}

function registerPage() {
    document.getElementById("formLogin").style.display = "none";
    document.getElementById("formRegister").style.display = "block";
}

function login() {
    let username = document.getElementById('LoginUsername').value;
    let password = document.getElementById('LoginPassword').value;
    const LoginData = {
        id = username,
        pw = password
    }
}

function register() {
    let username = document.getElementById('RegisterUsername').value;
    let email = document.getElementById('RegisterEmail').value;
    let password1 = document.getElementById('RegisterPassword1').value;
    let password2 = document.getElementById('RegisterPassword2').value;

    if (password1 = password2) {
        const RegisterData = {
            id = username,
            email = email,
            password = password1
        }
    } else {
        alert('Your Passwords do not match each other');
    }
}