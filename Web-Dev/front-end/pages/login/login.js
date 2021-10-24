document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const registerForm = document.querySelector("#register");

    document.querySelector("#linkRegister").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        registerForm.classList.remove("form--hidden");
        document.getElementById("LoginUsername").value = "";
        document.getElementById("LoginPassword").value = "";
        removeFormMessage(loginForm);
        removeInputError(document.getElementById("RegisterUsername"));
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        registerForm.classList.add("form--hidden");
        document.getElementById("RegisterUsername").value = "";
        document.getElementById("RegisterEmail").value = "";
        document.getElementById("RegisterPassword1").value = "";
        document.getElementById("RegisterPassword2").value = "";
        removeFormMessage(registerForm);
        removeInputError(document.getElementById("RegisterUsername"));
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        
        // AJAX Login
        let username = document.getElementById('LoginUsername').value;
        let password = document.getElementById('LoginPassword').value;
        const LoginData = {
            "id": username,
            "pw": password
        };

        // Send a token to the API and see if the password and username fits

        // IF SUCCESS
        setFormMessage(loginForm, "success", "You are logged in!");
        //send to the home page

        // IF ERROR
        setFormMessage(loginForm, "error", "Incorrect Username or Password!");
        // clear password
    });

    registerForm.addEventListener("submit", e => {
        e.preventDefault();

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

            // AJAX Register

        } else {
            setFormMessage(registerForm, "error", "Your Passwords do not match each other!");
            document.getElementById('RegisterPassword1').value = "";
            document.getElementById('RegisterPassword2').value = "";
        };
    });

    document.querySelector("#RegisterUsername").addEventListener("change", () => {
        const inputElement = document.getElementById("RegisterUsername");
        if (inputElement.value.length > 0 && inputElement.value.length < 8) {
            setInputError(inputElement, "Username must be at least 8 Characters long");
        }

        inputElement.addEventListener("input", e => {
            removeInputError(inputElement);
        });
    });
});

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function removeFormMessage(formElement) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = "";
    messageElement.classList.remove("form__message--success", "form__message--error");
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function removeInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}