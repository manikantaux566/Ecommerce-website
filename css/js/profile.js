// =========================
// PROFILE
// =========================


// =========================
// GET LOGGED-IN USER
// =========================

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));


// =========================
// PAGE ELEMENTS
// =========================

const profileName =
    document.getElementById("profile-name");

const profileEmail =
    document.getElementById("profile-email");

const detailName =
    document.getElementById("detail-name");

const detailEmail =
    document.getElementById("detail-email");

const detailPhone =
    document.getElementById("detail-phone");

const detailAddress =
    document.getElementById("detail-address");

const editProfileButton =
    document.getElementById("edit-profile-btn");

const profileModal =
    document.getElementById("profile-modal");

const closeProfileModal =
    document.getElementById("close-profile-modal");

const profileForm =
    document.getElementById("profile-form");

const editName =
    document.getElementById("edit-name");

const editEmail =
    document.getElementById("edit-email");

const editPhone =
    document.getElementById("edit-phone");

const editAddress =
    document.getElementById("edit-address");


// =========================
// CHECK LOGIN
// =========================

if (!loggedInUser) {

    if (typeof showToast === "function") {

        showToast(
            "Please sign in to view your profile",
            "warning"
        );

    }

    setTimeout(() => {

        window.location.href =
            "signin.html";

    }, 1000);

}


// =========================
// GET USER IDENTIFIER
// =========================

function getUserIdentifier() {

    if (!loggedInUser) {
        return "";
    }

    return (
        loggedInUser.email ||
        loggedInUser.name ||
        loggedInUser.username ||
        ""
    );

}


// =========================
// GET PROFILE STORAGE KEY
// =========================

function getProfileStorageKey() {

    return "electromart_profile_" +
        encodeURIComponent(
            getUserIdentifier()
        );

}


// =========================
// LOAD PROFILE
// =========================

function loadProfile() {

    if (!loggedInUser) {
        return;
    }


    const savedProfile =
        JSON.parse(
            localStorage.getItem(
                getProfileStorageKey()
            )
        );


    // =========================
    // DEFAULT PROFILE
    // =========================

    const profile = savedProfile || {

        name:
            loggedInUser.name || "User",

        email:
            loggedInUser.email || "",

        phone:
            loggedInUser.phone || "",

        address:
            loggedInUser.address || ""

    };


    // =========================
    // DISPLAY PROFILE
    // =========================

    if (profileName) {

        profileName.textContent =
            profile.name || "User";

    }


    if (profileEmail) {

        profileEmail.textContent =
            profile.email || "No email";

    }


    if (detailName) {

        detailName.textContent =
            profile.name || "—";

    }


    if (detailEmail) {

        detailEmail.textContent =
            profile.email || "—";

    }


    if (detailPhone) {

        detailPhone.textContent =
            profile.phone || "Not added";

    }


    if (detailAddress) {

        detailAddress.textContent =
            profile.address || "Not added";

    }


    // =========================
    // FILL EDIT FORM
    // =========================

    if (editName) {

        editName.value =
            profile.name || "";

    }


    if (editEmail) {

        editEmail.value =
            profile.email || "";

    }


    if (editPhone) {

        editPhone.value =
            profile.phone || "";

    }


    if (editAddress) {

        editAddress.value =
            profile.address || "";

    }

}


// =========================
// OPEN EDIT PROFILE
// =========================

if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        function () {

            if (profileModal) {

                profileModal.classList.add(
                    "active"
                );

            }

        }
    );

}


// =========================
// CLOSE MODAL
// =========================

if (closeProfileModal) {

    closeProfileModal.addEventListener(
        "click",
        function () {

            if (profileModal) {

                profileModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =========================
// CLOSE WHEN CLICKING OUTSIDE
// =========================

if (profileModal) {

    profileModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                profileModal
            ) {

                profileModal.classList.remove(
                    "active"
                );

            }

        }
    );

}


// =========================
// SAVE PROFILE
// =========================

if (profileForm) {

    profileForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const updatedProfile = {

                name:
                    editName.value.trim(),

                email:
                    editEmail.value.trim(),

                phone:
                    editPhone.value.trim(),

                address:
                    editAddress.value.trim()

            };


            // =========================
            // VALIDATION
            // =========================

            if (
                !updatedProfile.name ||
                !updatedProfile.email
            ) {

                if (
                    typeof showToast ===
                    "function"
                ) {

                    showToast(
                        "Name and email are required",
                        "warning"
                    );

                }

                return;

            }


            // =========================
            // SAVE PROFILE
            // =========================

            localStorage.setItem(

                getProfileStorageKey(),

                JSON.stringify(
                    updatedProfile
                )

            );


            // =========================
            // UPDATE DISPLAY
            // =========================

            loadProfile();


            // =========================
            // CLOSE MODAL
            // =========================

            if (profileModal) {

                profileModal.classList.remove(
                    "active"
                );

            }


            // =========================
            // SUCCESS MESSAGE
            // =========================

            if (
                typeof showToast ===
                "function"
            ) {

                showToast(
                    "Profile updated successfully",
                    "success"
                );

            }

        }
    );

}


// =========================
// INITIALIZE
// =========================

loadProfile();