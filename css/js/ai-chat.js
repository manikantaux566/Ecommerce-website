/* =========================================================
   ELECTROMART AI CHAT
   FRONTEND-ONLY VERSION
========================================================= */


// =========================================================
// GET ELEMENTS
// =========================================================

const aiChatButton =
    document.getElementById("ai-chat-button");

const aiChatWindow =
    document.getElementById("ai-chat-window");

const aiChatClose =
    document.getElementById("ai-chat-close");

const aiChatMessages =
    document.getElementById("ai-chat-messages");

const aiChatForm =
    document.getElementById("ai-chat-form");

const aiChatInput =
    document.getElementById("ai-chat-input");

const aiChatSuggestions =
    document.getElementById("ai-chat-suggestions");


// =========================================================
// SAFETY CHECK
// =========================================================

if (
    aiChatButton &&
    aiChatWindow &&
    aiChatClose &&
    aiChatMessages &&
    aiChatForm &&
    aiChatInput
) {

    // =====================================================
    // OPEN CHAT
    // =====================================================

    aiChatButton.addEventListener(
        "click",
        function () {

            aiChatWindow.classList.add("active");

            aiChatWindow.setAttribute(
                "aria-hidden",
                "false"
            );

            setTimeout(() => {

                aiChatInput.focus();

            }, 200);

        }
    );


    // =====================================================
    // CLOSE CHAT
    // =====================================================

    aiChatClose.addEventListener(
        "click",
        function () {

            aiChatWindow.classList.remove("active");

            aiChatWindow.setAttribute(
                "aria-hidden",
                "true"
            );

        }
    );


    // =====================================================
    // CLOSE WITH ESCAPE
    // =====================================================

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                aiChatWindow.classList.contains("active")
            ) {

                aiChatWindow.classList.remove(
                    "active"
                );

                aiChatWindow.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }

        }
    );


    // =====================================================
    // ADD MESSAGE
    // =====================================================

    function addMessage(
        message,
        type = "ai"
    ) {

        const messageElement =
            document.createElement("div");


        messageElement.className =
            type === "user"
                ? "user-message"
                : "ai-message";


        messageElement.innerHTML =
            message;


        aiChatMessages.appendChild(
            messageElement
        );


        scrollToBottom();

    }


    // =====================================================
    // SCROLL TO BOTTOM
    // =====================================================

    function scrollToBottom() {

        aiChatMessages.scrollTop =
            aiChatMessages.scrollHeight;

    }


    // =====================================================
    // SHOW TYPING
    // =====================================================

    function showTyping() {

        const typing =
            document.createElement("div");


        typing.className =
            "ai-typing";


        typing.id =
            "ai-typing";


        typing.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;


        aiChatMessages.appendChild(
            typing
        );


        scrollToBottom();

    }


    // =====================================================
    // REMOVE TYPING
    // =====================================================

    function removeTyping() {

        const typing =
            document.getElementById(
                "ai-typing"
            );


        if (typing) {

            typing.remove();

        }

    }


    // =====================================================
    // GET AI RESPONSE
    // =====================================================

    function getAIResponse(message) {

        const text =
            message
                .toLowerCase()
                .trim();


        // -----------------------------------------------
        // GREETING
        // -----------------------------------------------

        if (
            text.includes("hello") ||
            text.includes("hi") ||
            text.includes("hey")
        ) {

            return `
                Hello! 👋<br><br>
                Welcome to ElectroMart.
                How can I help you today?
            `;

        }


        // -----------------------------------------------
        // LAPTOPS
        // -----------------------------------------------

        if (
            text.includes("laptop") ||
            text.includes("computer")
        ) {

            return `
                💻 We have several laptop options
                available.<br><br>

                You can explore them here:<br>

                <a href="products.html?category=laptops">
                    View Laptops →
                </a>
            `;

        }


        // -----------------------------------------------
        // HEADPHONES / AUDIO
        // -----------------------------------------------

        if (
            text.includes("headphone") ||
            text.includes("earphone") ||
            text.includes("audio")
        ) {

            return `
                🎧 Looking for great sound?<br><br>

                Check out our Audio collection:

                <br><br>

                <a href="products.html?category=audio">
                    Explore Audio →
                </a>
            `;

        }


        // -----------------------------------------------
        // SMARTWATCH
        // -----------------------------------------------

        if (
            text.includes("smartwatch") ||
            text.includes("smart watch") ||
            text.includes("watch")
        ) {

            return `
                ⌚ We have smartwatches for
                fitness, calls and everyday use.<br><br>

                <a href="products.html?category=smartwatches">
                    View Smartwatches →
                </a>
            `;

        }


        // -----------------------------------------------
        // GAMING
        // -----------------------------------------------

        if (
            text.includes("gaming") ||
            text.includes("keyboard") ||
            text.includes("mouse")
        ) {

            return `
                🎮 Looking for gaming gear?<br><br>

                Check our gaming and accessory
                collection:

                <br><br>

                <a href="products.html?category=gaming">
                    Explore Gaming →
                </a>
            `;

        }


        // -----------------------------------------------
        // DEALS
        // -----------------------------------------------

        if (
            text.includes("deal") ||
            text.includes("offer") ||
            text.includes("discount") ||
            text.includes("sale")
        ) {

            return `
                🔥 We currently have several
                limited-time deals on ElectroMart.

                <br><br>

                Head to the homepage to check
                today's featured deals.
            `;

        }


        // -----------------------------------------------
        // TRACK ORDER
        // -----------------------------------------------

        if (
            text.includes("track") ||
            text.includes("delivery") ||
            text.includes("order status")
        ) {

            return `
                🚚 You can track your order
                using the Track Order page.

                <br><br>

                <a href="track-order.html">
                    Track My Order →
                </a>
            `;

        }


        // -----------------------------------------------
        // CART
        // -----------------------------------------------

        if (
            text.includes("cart") ||
            text.includes("shopping cart")
        ) {

            return `
                🛒 You can view your selected
                products in your cart.

                <br><br>

                <a href="cart.html">
                    Open Cart →
                </a>
            `;

        }


        // -----------------------------------------------
        // WISHLIST
        // -----------------------------------------------

        if (
            text.includes("wishlist") ||
            text.includes("wish list") ||
            text.includes("saved")
        ) {

            return `
                ❤️ Your wishlist contains
                products you've saved for later.

                <br><br>

                <a href="wishlist.html">
                    Open Wishlist →
                </a>
            `;

        }


        // -----------------------------------------------
        // PRODUCTS
        // -----------------------------------------------

        if (
            text.includes("product") ||
            text.includes("gadgets") ||
            text.includes("electronics")
        ) {

            return `
                🛍️ ElectroMart offers smartphones,
                laptops, audio products,
                smartwatches, gaming products,
                monitors, cameras and accessories.

                <br><br>

                <a href="products.html">
                    View All Products →
                </a>
            `;

        }


        // -----------------------------------------------
        // PAYMENT
        // -----------------------------------------------

        if (
            text.includes("payment") ||
            text.includes("pay") ||
            text.includes("upi")
        ) {

            return `
                🔒 ElectroMart supports secure
                payment options during checkout.

                <br><br>

                Add products to your cart and
                continue to checkout to see
                the available payment options.
            `;

        }


        // -----------------------------------------------
        // HELP
        // -----------------------------------------------

        if (
            text.includes("help") ||
            text.includes("what can you do")
        ) {

            return `
                🤖 I can help you with:

                <br><br>

                • Finding products<br>
                • Laptops and audio<br>
                • Gaming products<br>
                • Today's deals<br>
                • Cart and wishlist<br>
                • Order tracking<br>
                • Payment information

                <br><br>

                Just ask me something!
            `;

        }


        // -----------------------------------------------
        // DEFAULT
        // -----------------------------------------------

        return `
            🤔 I'm still learning.

            <br><br>

            Try asking me about:

            <br><br>

            💻 Laptops<br>
            🎧 Headphones<br>
            ⌚ Smartwatches<br>
            🎮 Gaming<br>
            🔥 Deals<br>
            🚚 Order tracking
        `;

    }


    // =====================================================
    // SEND MESSAGE
    // =====================================================

    function sendMessage(message) {

        if (!message) {
            return;
        }


        // USER MESSAGE

        addMessage(
            escapeHTML(message),
            "user"
        );


        // CLEAR INPUT

        aiChatInput.value = "";


        // SHOW TYPING

        showTyping();


        // SIMULATE AI THINKING

        setTimeout(
            function () {

                removeTyping();


                const response =
                    getAIResponse(message);


                addMessage(
                    response,
                    "ai"
                );

            },
            700
        );

    }


    // =====================================================
    // FORM SUBMIT
    // =====================================================

    aiChatForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const message =
                aiChatInput.value.trim();


            if (!message) {
                return;
            }


            sendMessage(message);

        }
    );


    // =====================================================
    // QUICK SUGGESTIONS
    // =====================================================

    if (aiChatSuggestions) {

        aiChatSuggestions
            .querySelectorAll("button")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    function () {

                        const message =
                            this.dataset.message;


                        if (!message) {
                            return;
                        }


                        sendMessage(
                            message
                        );

                    }
                );

            });

    }


    // =====================================================
    // ESCAPE HTML
    // =====================================================

    function escapeHTML(text) {

        const div =
            document.createElement("div");


        div.textContent =
            text;


        return div.innerHTML;

    }

}