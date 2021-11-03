document.addEventListener("DOMContentLoaded", () => {
    const userProfile = document.querySelector("#user");
    const main = document.querySelector("#main");

    const userProfile_personal = document.querySelector(".personal");
    const userProfile_location = document.querySelector(".location");
    const userProfile_settings = document.querySelector(".settings");
    const userProfile_transfers = document.querySelector(".transfers");
    const userProfile_bookmarks = document.querySelector(".bookmarks");

    document.querySelector("#icon").addEventListener("click", () => {
        userProfile.classList.remove("section--hidden");
        main.classList.remove("section--hidden");
        userProfile.classList.add("section--hidden");
    });

    document.querySelector("#profile").addEventListener("click", () => {
        userProfile.classList.remove("section--hidden");
        main.classList.remove("section--hidden");
        main.classList.add("section--hidden");
        personal();
    });

    document.querySelector("#personal").addEventListener("mouseover", () => {
        personal();
    });

    document.querySelector("#location").addEventListener("mouseover", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_settings.classList.add("section--hidden");
        userProfile_transfers.classList.add("section--hidden");
        userProfile_bookmarks.classList.add("section--hidden");

        document.getElementById("personal").classList.remove("section--selected");
        document.getElementById("location").classList.remove("section--selected");
        document.getElementById("settings").classList.remove("section--selected");
        document.getElementById("transfers").classList.remove("section--selected");
        document.getElementById("bookmarks").classList.remove("section--selected");

        document.getElementById("location").classList.add("section--selected");
    });

    document.querySelector("#settings").addEventListener("mouseover", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_location.classList.add("section--hidden");
        userProfile_transfers.classList.add("section--hidden");
        userProfile_bookmarks.classList.add("section--hidden");

        document.getElementById("personal").classList.remove("section--selected");
        document.getElementById("location").classList.remove("section--selected");
        document.getElementById("settings").classList.remove("section--selected");
        document.getElementById("transfers").classList.remove("section--selected");
        document.getElementById("bookmarks").classList.remove("section--selected");

        document.getElementById("settings").classList.add("section--selected");
    });

    document.querySelector("#transfers").addEventListener("mouseover", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_location.classList.add("section--hidden");
        userProfile_settings.classList.add("section--hidden");
        userProfile_bookmarks.classList.add("section--hidden");

        document.getElementById("personal").classList.remove("section--selected");
        document.getElementById("location").classList.remove("section--selected");
        document.getElementById("settings").classList.remove("section--selected");
        document.getElementById("transfers").classList.remove("section--selected");
        document.getElementById("bookmarks").classList.remove("section--selected");

        document.getElementById("transfers").classList.add("section--selected");
    });

    document.querySelector("#bookmarks").addEventListener("mouseover", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_location.classList.add("section--hidden");
        userProfile_settings.classList.add("section--hidden");
        userProfile_transfers.classList.add("section--hidden");

        document.getElementById("personal").classList.remove("section--selected");
        document.getElementById("location").classList.remove("section--selected");
        document.getElementById("settings").classList.remove("section--selected");
        document.getElementById("transfers").classList.remove("section--selected");
        document.getElementById("bookmarks").classList.remove("section--selected");

        document.getElementById("bookmarks").classList.add("section--selected");
    });

    userProfile_personal.addEventListener("submit", e => {
        e.preventDefault();

        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        const personalUpdate = {
            name: username,
            email: email,
            password: password
        };

        fetch("http://localhost:3000/api/user/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(personalUpdate),
            })
            .then((response) => {
                if (response.ok) {
                    setFormMessage(userProfile_personal, "success", "User Information updated");
                } else {
                    setFormMessage(userProfile_personal, "error", "Error");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });

    userProfile_location.addEventListener("submit", e => {
        e.preventDefault();

        let username = document.getElementById('username').value;
        let street = document.getElementById('street').value;
        let city = document.getElementById('city').value;

        const locationUpdate = {
            name: username,
            street: street,
            city: city
        };

        fetch("http://localhost:3000/api/user/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(locationUpdate),
            })
            .then((response) => {
                if (response.ok) {
                    setFormMessage(userProfile_location, "success", "Location Information updated");
                } else {
                    setFormMessage(userProfile_location, "error", "Error");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
});

function personal() {
    const userProfile_personal = document.querySelector(".personal");
    const userProfile_location = document.querySelector(".location");
    const userProfile_settings = document.querySelector(".settings");
    const userProfile_transfers = document.querySelector(".transfers");
    const userProfile_bookmarks = document.querySelector(".bookmarks");

    userProfile_personal.classList.remove("section--hidden");
    userProfile_location.classList.remove("section--hidden");
    userProfile_settings.classList.remove("section--hidden");
    userProfile_transfers.classList.remove("section--hidden");
    userProfile_bookmarks.classList.remove("section--hidden");

    userProfile_location.classList.add("section--hidden");
    userProfile_settings.classList.add("section--hidden");
    userProfile_transfers.classList.add("section--hidden");
    userProfile_bookmarks.classList.add("section--hidden");

    document.getElementById("personal").classList.remove("section--selected");
    document.getElementById("location").classList.remove("section--selected");
    document.getElementById("settings").classList.remove("section--selected");
    document.getElementById("transfers").classList.remove("section--selected");
    document.getElementById("bookmarks").classList.remove("section--selected");

    document.getElementById("personal").classList.add("section--selected");
}

function initMap() {
    const pos = { lat:49.142693, lng: 9.210879 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: pos,
    });
    const marker = new google.maps.Marker({
        position: pos,
        map: map,
    });
}

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