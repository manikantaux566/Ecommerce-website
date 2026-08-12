// =========================
// DEALS CAROUSEL
// =========================

const dealsTrack =
    document.getElementById("deals-track");

const dealNext =
    document.getElementById("deal-next");

const dealPrev =
    document.getElementById("deal-prev");

const carouselDots =
    document.querySelectorAll(".carousel-dot");


let currentDeal = 0;

const totalDeals = 5;


// =========================
// SHOW DEAL
// =========================

function showDeal(index) {

    if (!dealsTrack) {
        return;
    }

    currentDeal =
        (index + totalDeals) % totalDeals;

    dealsTrack.style.transform =
        `translateX(-${currentDeal * 100}%)`;


    carouselDots.forEach(
        (dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === currentDeal
            );

        }
    );

}


// =========================
// NEXT DEAL
// =========================

if (dealNext) {

    dealNext.addEventListener(
        "click",
        () => {

            showDeal(currentDeal + 1);

        }
    );

}


// =========================
// PREVIOUS DEAL
// =========================

if (dealPrev) {

    dealPrev.addEventListener(
        "click",
        () => {

            showDeal(currentDeal - 1);

        }
    );

}


// =========================
// DOT NAVIGATION
// =========================

carouselDots.forEach(
    (dot, index) => {

        dot.addEventListener(
            "click",
            () => {

                showDeal(index);

            }
        );

    }
);


// =========================
// AUTO SLIDE
// =========================

let dealTimer =
    setInterval(() => {

        showDeal(currentDeal + 1);

    }, 5000);


// =========================
// PAUSE ON HOVER
// =========================

if (dealsTrack) {

    dealsTrack.addEventListener(
        "mouseenter",
        () => {

            clearInterval(dealTimer);

        }
    );


    dealsTrack.addEventListener(
        "mouseleave",
        () => {

            dealTimer =
                setInterval(() => {

                    showDeal(currentDeal + 1);

                }, 5000);

        }
    );

}


// =========================
// INITIALIZE
// =========================

showDeal(0);