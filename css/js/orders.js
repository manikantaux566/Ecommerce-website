// =========================
// ELECTROMART - ORDERS
// =========================


// =========================
// GET CURRENT USER
// =========================

const loggedInUser =
    localStorage.getItem("loggedInUser");


// =========================
// GET ORDERS STORAGE KEY
// =========================

function getOrdersStorageKey() {

    if (!loggedInUser) {
        return "electromart_guest_orders";
    }

    return "electromart_orders_" +
        encodeURIComponent(loggedInUser);
}


// =========================
// LOAD ORDERS
// =========================

let orders =
    JSON.parse(
        localStorage.getItem(
            getOrdersStorageKey()
        )
    ) || [];


// =========================
// PAGE ELEMENTS
// =========================

const ordersContainer =
    document.getElementById(
        "orders-container"
    );

const emptyOrders =
    document.getElementById(
        "empty-orders"
    );

const cartCount =
    document.getElementById(
        "cart-count"
    );


// =========================
// UPDATE CART COUNT
// =========================

function updateCartCount() {

    if (!cartCount) {
        return;
    }

    const currentUser =
        localStorage.getItem(
            "loggedInUser"
        );

    const cartKey =
        currentUser
            ? "electromart_cart_" +
              encodeURIComponent(
                  currentUser
              )
            : "electromart_guest_cart";

    const cart =
        JSON.parse(
            localStorage.getItem(
                cartKey
            )
        ) || [];

    cartCount.textContent =
        cart.reduce(
            (total, item) => {

                return total +
                    Number(
                        item.quantity || 0
                    );

            },
            0
        );
}


// =========================
// FORMAT DATE
// =========================

function formatOrderDate(date) {

    if (!date) {
        return "Date unavailable";
    }

    const orderDate =
        new Date(date);

    if (
        isNaN(
            orderDate.getTime()
        )
    ) {
        return "Date unavailable";
    }

    return orderDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


// =========================
// FORMAT PRICE
// =========================

function formatPrice(price) {

    return Number(price || 0)
        .toLocaleString("en-IN");
}


// =========================
// GET STATUS CLASS
// =========================

function getStatusClass(status) {

    return String(
        status || "processing"
    )
        .toLowerCase()
        .replace(/\s+/g, "-");
}


// =========================
// GET STATUS ICON
// =========================

function getStatusIcon(status) {

    const normalizedStatus =
        String(
            status || "processing"
        ).toLowerCase();


    if (
        normalizedStatus ===
        "delivered"
    ) {

        return "✓";

    }


    if (
        normalizedStatus ===
        "shipped"
    ) {

        return "🚚";

    }


    if (
        normalizedStatus ===
        "cancelled"
    ) {

        return "✕";

    }


    if (
        normalizedStatus ===
        "out-for-delivery"
    ) {

        return "🚚";

    }


    if (
        normalizedStatus ===
        "packed"
    ) {

        return "📦";

    }


    if (
        normalizedStatus ===
        "confirmed"
    ) {

        return "✓";

    }


    return "📦";
}


// =========================
// DISPLAY ORDERS
// =========================

function displayOrders(
    statusFilter = "all"
) {

    if (
        !ordersContainer ||
        !emptyOrders
    ) {

        return;

    }


    // =========================
    // FILTER ORDERS
    // =========================

    let filteredOrders =
        orders;


    if (
        statusFilter !== "all"
    ) {

        filteredOrders =
            orders.filter(
                order => {

                    return String(
                        order.status ||
                        "processing"
                    ).toLowerCase() ===
                    statusFilter;

                }
            );

    }


    // =========================
    // NO ORDERS
    // =========================

    if (
        filteredOrders.length === 0
    ) {

        ordersContainer.innerHTML =
            "";

        emptyOrders.style.display =
            "flex";

        return;

    }


    emptyOrders.style.display =
        "none";


    ordersContainer.innerHTML =
        "";


    // =========================
    // DISPLAY EACH ORDER
    // =========================

    filteredOrders.forEach(
        order => {

            const status =
                String(
                    order.status ||
                    "processing"
                ).toLowerCase();


            const statusClass =
                getStatusClass(
                    status
                );


            const statusIcon =
                getStatusIcon(
                    status
                );


            const orderItems =
                Array.isArray(
                    order.items
                )
                    ? order.items
                    : [];


            const totalItems =
                orderItems.reduce(
                    (
                        total,
                        item
                    ) => {

                        return total +
                            Number(
                                item.quantity ||
                                1
                            );

                    },
                    0
                );


            const orderTotal =
                Number(
                    order.total ||
                    order.finalTotal ||
                    0
                );


            // =========================
            // PRODUCT PREVIEW
            // =========================

            let productsHTML =
                "";


            orderItems.forEach(
                item => {

                    productsHTML += `

                        <div class="order-product">

                            <img
                                src="${item.image || ""}"
                                alt="${item.name || "Product"}"
                                onerror="this.style.display='none'"
                            >

                            <div class="order-product-info">

                                <h4>
                                    ${item.name || "Product"}
                                </h4>

                                <p>
                                    Quantity:
                                    ${item.quantity || 1}
                                </p>

                                <strong>
                                    ₹${formatPrice(
                                        Number(
                                            item.price || 0
                                        ) *
                                        Number(
                                            item.quantity || 1
                                        )
                                    )}
                                </strong>

                            </div>

                        </div>

                    `;

                }
            );


            // =========================
            // ORDER ACTIONS
            // =========================

            let orderActionsHTML =
                "";


            // =========================
            // CANCELLED ORDER
            // =========================

            if (
                status === "cancelled"
            ) {

                orderActionsHTML = `

                    <span class="cancelled-label">
                        Order Cancelled
                    </span>

                `;

            }


            // =========================
            // DELIVERED ORDER
            // =========================

            else if (
                status === "delivered"
            ) {

                orderActionsHTML = `

                    <button
                        class="track-order-btn"
                        onclick="trackOrder('${order.id}')"
                    >
                        Track Order →
                    </button>

                `;

            }


            // =========================
            // ACTIVE ORDER
            // =========================

            else {

                orderActionsHTML = `

                    <button
                        class="track-order-btn"
                        onclick="trackOrder('${order.id}')"
                    >
                        Track Order →
                    </button>

                    <button
                        class="cancel-order-btn"
                        onclick="cancelOrder('${order.id}')"
                    >
                        Cancel Order
                    </button>

                `;

            }


            // =========================
            // ORDER CARD
            // =========================

            ordersContainer.innerHTML += `

                <article
                    class="order-card"
                    data-status="${status}"
                >

                    <!-- ORDER HEADER -->

                    <div class="order-card-header">

                        <div>

                            <span class="order-label">
                                ORDER ID
                            </span>

                            <h3>
                                #${order.id || "N/A"}
                            </h3>

                        </div>


                        <div
                            class="order-status ${statusClass}"
                        >

                            <span>
                                ${statusIcon}
                            </span>

                            ${
                                status.charAt(0).toUpperCase() +
                                status.slice(1)
                            }

                        </div>

                    </div>


                    <!-- ORDER META -->

                    <div class="order-meta">

                        <span>
                            📅
                            ${formatOrderDate(
                                order.date ||
                                order.createdAt
                            )}
                        </span>

                        <span>
                            📦
                            ${totalItems}
                            ${
                                totalItems === 1
                                    ? "item"
                                    : "items"
                            }
                        </span>

                    </div>


                    <!-- PRODUCTS -->

                    <div class="order-products">

                        ${productsHTML}

                    </div>


                    <!-- ORDER FOOTER -->

                    <div class="order-card-footer">

                        <div class="order-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹${formatPrice(
                                    orderTotal
                                )}
                            </strong>

                        </div>


                        <div class="order-actions">

                            ${orderActionsHTML}

                        </div>

                    </div>


                </article>

            `;

        }
    );
}


// =========================
// CANCEL ORDER
// =========================

function cancelOrder(orderId) {

    const order =
        orders.find(
            item =>
                String(item.id) ===
                String(orderId)
        );


    if (!order) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Order not found",
                "warning"
            );

        }

        return;

    }


    // =========================
    // ALREADY CANCELLED
    // =========================

    if (
        String(order.status)
            .toLowerCase() ===
        "cancelled"
    ) {

        return;

    }


    // =========================
    // DELIVERED ORDERS
    // =========================

    if (
        String(order.status)
            .toLowerCase() ===
        "delivered"
    ) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Delivered orders cannot be cancelled",
                "warning"
            );

        }

        return;

    }


    // =========================
    // CONFIRMATION
    // =========================

    const confirmed =
        confirm(
            "Are you sure you want to cancel this order?"
        );


    if (!confirmed) {
        return;
    }


    // =========================
    // UPDATE ORDER
    // =========================

    order.status =
        "cancelled";


    order.cancelledAt =
        new Date().toISOString();


    // =========================
    // SAVE ORDERS
    // =========================

    localStorage.setItem(
        getOrdersStorageKey(),
        JSON.stringify(
            orders
        )
    );


    // =========================
    // REFRESH ORDERS
    // =========================

    displayOrders();


    // =========================
    // SUCCESS MESSAGE
    // =========================

    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "Order cancelled successfully",
            "success"
        );

    }

}


// =========================
// TRACK ORDER
// =========================

function trackOrder(orderId) {

    const order =
        orders.find(
            item =>
                String(item.id) ===
                String(orderId)
        );


    if (!order) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Order not found",
                "warning"
            );

        }

        return;

    }


    // =========================
    // DON'T TRACK CANCELLED ORDER
    // =========================

    if (
        String(order.status)
            .toLowerCase() ===
        "cancelled"
    ) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Cancelled orders cannot be tracked",
                "warning"
            );

        }

        return;

    }


    // =========================
    // SAVE SELECTED ORDER
    // =========================

    localStorage.setItem(
        "selectedOrderId",
        String(order.id)
    );


    // =========================
    // OPEN TRACKING PAGE
    // =========================

    window.location.href =
        "track-order.html";

}


// =========================
// FILTER BUTTONS
// =========================

const filterButtons =
    document.querySelectorAll(
        ".order-filter-btn"
    );


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            function () {

                // =========================
                // REMOVE ACTIVE STATE
                // =========================

                filterButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                // =========================
                // ADD ACTIVE STATE
                // =========================

                this.classList.add(
                    "active"
                );


                // =========================
                // GET FILTER
                // =========================

                const status =
                    this.dataset.status ||
                    "all";


                // =========================
                // DISPLAY
                // =========================

                displayOrders(
                    status
                );

            }
        );

    }
);


// =========================
// INITIALIZE PAGE
// =========================

updateCartCount();

displayOrders();