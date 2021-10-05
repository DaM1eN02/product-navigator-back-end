function login() {
    document.getElementById("formLogin").hidden = false;
    document.getElementById("formRegister").hidden = true;
}

function register() {
    document.getElementById("formLogin").hidden = true;
    document.getElementById("formRegister").hidden = false;
}