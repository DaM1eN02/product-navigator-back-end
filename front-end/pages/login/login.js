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

    document.querySelector("#linkPassword").addEventListener("click", e => {
        e.preventDefault();
        alert("Feature not availbale yet");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        
        let username = document.getElementById('LoginUsername').value;
        let password = document.getElementById('LoginPassword').value;

        const LoginData = {
            email: username,
            password: password
        };

        fetch("http://localhost:3000/api/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(LoginData),
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.result == 'true') {
                setFormMessage(loginForm, "success", "You are logged in!");
                window.location = "../home/home.html?name="+data.name+"&birthday="+data.birthday+"&email="+data.email+"&password="+data.password+"&city="+data.city+"&street="+data.street;
            }
            if (data.result == 'false') {
                setFormMessage(loginForm, "error", "Incorrect Username or Password!");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    });

    registerForm.addEventListener("submit", e => {
        e.preventDefault();

        let username = document.getElementById('RegisterUsername').value;
        let email = document.getElementById('RegisterEmail').value;
        let password1 = document.getElementById('RegisterPassword1').value;
        let password2 = document.getElementById('RegisterPassword2').value;

        if (password1 == password2) {
            const RegisterData = {
                name: username,
                email: email,
                password: password1
            };

            fetch("http://localhost:3000/api/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(RegisterData),
            })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.result == 'true') {
                    setFormMessage(registerForm, "success", "You are registered!");
                    window.location = "../home/home.html?name="+data.name+"&birthday="+data.birthday+"&email="+data.email+"&password="+data.password+"&city="+data.city+"&street="+data.street;
                }
                if (data.result == 'false') {
                    setFormMessage(registerForm, "error", "Username or Email are already registered!");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            setFormMessage(registerForm, "error", "Your Passwords do not match each other!");
            document.getElementById('RegisterPassword1').value = "";
            document.getElementById('RegisterPassword2').value = "";
        };
    });

    document.querySelector("#RegisterUsername").addEventListener("change", () => {
        const inputElement = document.getElementById("RegisterUsername");
        if (inputElement.value.length > 0 && inputElement.value.length < 6) {
            setInputError(inputElement, "Username must be at least 6 Characters long");
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