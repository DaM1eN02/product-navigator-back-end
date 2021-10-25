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
    });

    document.querySelector("#personal").addEventListener("click", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_location.classList.add("section--hidden");
        userProfile_settings.classList.add("section--hidden");
        userProfile_transfers.classList.add("section--hidden");
        userProfile_bookmarks.classList.add("section--hidden");
    });

    document.querySelector("#location").addEventListener("click", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_settings.classList.add("section--hidden");
        userProfile_transfers.classList.add("section--hidden");
        userProfile_bookmarks.classList.add("section--hidden");
    });

    document.querySelector("#settings").addEventListener("click", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_location.classList.add("section--hidden");
        userProfile_transfers.classList.add("section--hidden");
        userProfile_bookmarks.classList.add("section--hidden");
    });

    document.querySelector("#transfers").addEventListener("click", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_location.classList.add("section--hidden");
        userProfile_settings.classList.add("section--hidden");
        userProfile_bookmarks.classList.add("section--hidden");
    });

    document.querySelector("#bookmarks").addEventListener("click", () => {
        userProfile_personal.classList.remove("section--hidden");
        userProfile_location.classList.remove("section--hidden");
        userProfile_settings.classList.remove("section--hidden");
        userProfile_transfers.classList.remove("section--hidden");
        userProfile_bookmarks.classList.remove("section--hidden");

        userProfile_personal.classList.add("section--hidden");
        userProfile_location.classList.add("section--hidden");
        userProfile_settings.classList.add("section--hidden");
        userProfile_transfers.classList.add("section--hidden");
    });
});