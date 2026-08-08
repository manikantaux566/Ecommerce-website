// =========================
// DARK MODE
// =========================

const themeToggle = document.getElementById("theme-toggle");


// Check saved theme

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    if (themeToggle) {
        themeToggle.textContent = "☀️";
    }

}


// =========================
// TOGGLE DARK MODE
// =========================

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDarkMode =
            document.body.classList.contains("dark-mode");


        if (isDarkMode) {

            themeToggle.textContent = "☀️";

            localStorage.setItem("theme", "dark");

        } else {

            themeToggle.textContent = "🌙";

            localStorage.setItem("theme", "light");

        }

    });

}