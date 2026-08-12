// =========================
// TRACK ORDER
// =========================

// =========================
// GET LOGGED-IN USER
// =========================

const loggedInUser =
    localStorage.getItem("loggedInUser");

// =========================
// PAGE ELEMENTS
// =========================

const trackForm =
    document.getElementById("track-order-form");

const orderIdInput =
    document.getElementById("order-id");

const trackMessage =
    document.getElementById("track-message");

const orderResult =
    document.getElementById("order-result");

const trackedOrderId =
    document.getElementById("tracked-order-id");

const trackedOrderStatus =
    document.getElementById("tracked-order-status");

const trackedOrderDate =
    document.getElementById("tracked-order-date");

const trackedOrderTotal =
    document.getElementById("tracked-order-total");

const trackedOrderPayment =
    document.getElementById("tracked-order-payment");

const trackedProducts =
    document.getElementById("tracked-products");

const trackedAddress =
    document.getElementById("tracked-address");

const cancelButton =
    document.getElementById("cancel-tracked-order");

// =========================
// CURRENT ORDER
// =========================

let currentOrder = null;

// =========================
// GET ORDERS STORAGE KEY
// =========================

function getOrdersStorageKey() {

    if (!loggedInUser) {
        return "electromart_orders_guest";
    }

    return "electromart_orders_" +
        encodeURIComponent(loggedInUser);
}

// =========================
// GET ORDERS
// =========================

function getOrders() {

    try {

        return JSON.parse(
            localStorage.getItem(
                getOrdersStorageKey()
            )
        ) || [];

    } catch (error) {

        console.error(
            "Unable to read orders:",
            error
        );

        return [];
    }
}

// =========================
// SAVE ORDERS
// =========================

function saveOrders(orders) {

    localStorage.setItem(
        getOrdersStorageKey(),
        JSON.stringify(orders)
    );
}

// =========================
// CHECK LOGIN
// =========================

if (!loggedInUser) {

    if (typeof showToast === "function") {

        showToast(
            "Please sign in to track your order",
            "warning"
        );
    }

    setTimeout(() => {

        window.location.href =
            "signin.html";

    }, 1000);
}

// =========================
// FORMAT PRICE
// =========================

function formatPrice(price) {

    return "₹" +
        Number(price || 0)
            .toLocaleString("en-IN");
}

// =========================
// FORMAT DATE
// =========================

function formatDate(date) {

    if (!date) {
        return "—";
    }

    const parsedDate =
        new Date(date);

    if (isNaN(parsedDate)) {
        return date;
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}

// =========================
// NORMALIZE STATUS
// =========================

function normalizeStatus(status) {

    if (!status) {
        return "confirmed";
    }

    const value =
        status
            .toString()
            .toLowerCase()
            .trim()
            .replace(/_/g, "-")
            .replace(/\s+/g, "-");

    // =========================
    // STATUS ALIASES
    // =========================

    const aliases = {

        "confirm":
            "confirmed",

        "order-confirmed":
            "confirmed",

        "processing":
            "confirmed",

        "placed":
            "confirmed",

        "order-placed":
            "confirmed",

        "packing":
            "packed",

        "order-packed":
            "packed",

        "dispatched":
            "shipped",

        "shipping":
            "shipped",

        "in-transit":
            "shipped",

        "on-the-way":
            "shipped",

        "out-for-delivery":
            "out-for-delivery",

        "outfordelivery":
            "out-for-delivery",

        "delivery":
            "out-for-delivery",

        "complete":
            "delivered",

        "completed":
            "delivered",

        "order-delivered":
            "delivered",

        "cancel":
            "cancelled"

    };

    return aliases[value] || value;
}

// =========================
// STATUS LABEL
// =========================

function getStatusLabel(status) {

    const labels = {

        confirmed:
            "Order Confirmed",

        packed:
            "Packed",

        shipped:
            "Shipped",

        "out-for-delivery":
            "Out for Delivery",

        delivered:
            "Delivered",

        cancelled:
            "Cancelled"

    };

    return labels[status] ||
        "Order Confirmed";
}

// =========================
// UPDATE DELIVERY TIMELINE
// =========================

function updateTimeline(status) {

    const steps = [
        "confirmed",
        "packed",
        "shipped",
        "out-for-delivery",
        "delivered"
    ];

    const currentIndex =
        steps.indexOf(status);

    const trackingSteps =
        document.querySelectorAll(
            ".tracking-step"
        );

    // =========================
    // RESET ALL STEPS
    // =========================

    trackingSteps.forEach(step => {

        step.classList.remove(
            "completed",
            "current"
        );

    });

    // =========================
    // APPLY CURRENT STATE
    // =========================

    trackingSteps.forEach(step => {

        const stepStatus =
            normalizeStatus(
                step.dataset.status
            );

        const stepIndex =
            steps.indexOf(stepStatus);

        // =========================
        // COMPLETED
        // =========================

        if (
            currentIndex >= 0 &&
            stepIndex >= 0 &&
            stepIndex < currentIndex
        ) {

            step.classList.add(
                "completed"
            );
        }

        // =========================
        // CURRENT
        // =========================

        if (
            currentIndex >= 0 &&
            stepIndex === currentIndex
        ) {

            step.classList.add(
                "current"
            );
        }

    });

    // =========================
    // DEBUG
    // =========================

    console.log(
        "Tracking status:",
        status
    );

    console.log(
        "Current timeline index:",
        currentIndex
    );

    console.log(
        "Current step:",
        document.querySelector(
            ".tracking-step.current"
        )
    );
}

// =========================
// DISPLAY PRODUCTS
// =========================

function displayProducts(order) {

    if (!trackedProducts) {
        return;
    }

    trackedProducts.innerHTML = "";

    const items =
        order.items ||
        order.products ||
        [];

    if (!items.length) {

        trackedProducts.innerHTML = `
            <p>
                No product details available.
            </p>
        `;

        return;
    }

    items.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;

        trackedProducts.innerHTML += `

            <div class="tracked-product-item">

                <img
                    src="${item.image || ""}"
                    alt="${item.name || "Product"}"
                    onerror="this.style.display='none'"
                >

                <div class="tracked-product-info">

                    <h4>
                        ${item.name || "Product"}
                    </h4>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>

                <div class="tracked-product-price">

                    ${formatPrice(
                        price * quantity
                    )}

                </div>

            </div>

        `;

    });
}

// =========================
// DISPLAY ORDER
// =========================

function displayOrder(order) {

    if (!order) {
        return;
    }

    currentOrder = order;

    const status =
        normalizeStatus(
            order.status
        );

    // =========================
    // ORDER INFORMATION
    // =========================

    if (trackedOrderId) {

        trackedOrderId.textContent =
            order.id || "—";
    }

    if (trackedOrderStatus) {

        trackedOrderStatus.textContent =
            getStatusLabel(status);
    }

    if (trackedOrderDate) {

        trackedOrderDate.textContent =
            formatDate(
                order.date ||
                order.createdAt ||
                order.orderDate
            );
    }

    if (trackedOrderTotal) {

        trackedOrderTotal.textContent =
            formatPrice(
                order.total ||
                order.totalAmount ||
                order.subtotal
            );
    }

    if (trackedOrderPayment) {

        trackedOrderPayment.textContent =
            order.payment ||
            order.paymentMethod ||
            "—";
    }

    if (trackedAddress) {

        trackedAddress.textContent =
            order.address ||
            order.deliveryAddress ||
            "Address not available";
    }

    // =========================
    // PRODUCTS
    // =========================

    displayProducts(order);

    // =========================
    // DELIVERY TIMELINE
    // =========================

    updateTimeline(status);

    // =========================
    // CANCEL BUTTON
    // =========================

    if (cancelButton) {

        if (
            status === "cancelled" ||
            status === "delivered" ||
            status === "shipped" ||
            status === "out-for-delivery"
        ) {

            cancelButton.style.display =
                "none";

        } else {

            cancelButton.style.display =
                "inline-flex";
        }
    }

    // =========================
    // CANCELLED STATUS
    // =========================

    if (trackedOrderStatus) {

        if (status === "cancelled") {

            trackedOrderStatus.textContent =
                "Order Cancelled";

            trackedOrderStatus.style.background =
                "rgba(220, 38, 38, 0.12)";

            trackedOrderStatus.style.color =
                "#dc2626";

        } else {

            trackedOrderStatus.style.background =
                "";

            trackedOrderStatus.style.color =
                "";
        }
    }

    // =========================
    // SHOW RESULT
    // =========================

    if (orderResult) {

        orderResult.style.display =
            "block";
    }
}

// =========================
// FIND ORDER
// =========================

function findOrder(orderId) {

    const orders =
        getOrders();

    return orders.find(order => {

        return String(
            order.id
        ).toLowerCase() ===
        String(
            orderId
        ).trim().toLowerCase();

    });
}

// =========================
// TRACK ORDER
// =========================

if (trackForm) {

    trackForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const orderId =
                orderIdInput.value.trim();

            if (!orderId) {

                trackMessage.textContent =
                    "Please enter an order ID.";

                trackMessage.style.color =
                    "#dc2626";

                return;
            }

            const order =
                findOrder(orderId);

            if (!order) {

                currentOrder = null;

                orderResult.style.display =
                    "none";

                trackMessage.textContent =
                    "Order not found. Please check your order ID.";

                trackMessage.style.color =
                    "#dc2626";

                return;
            }

            trackMessage.textContent =
                "Order found successfully.";

            trackMessage.style.color =
                "#15803d";

            displayOrder(order);
        }
    );
}

// =========================
// CANCEL ORDER
// =========================

if (cancelButton) {

    cancelButton.addEventListener(
        "click",
        function () {

            if (!currentOrder) {
                return;
            }

            const confirmed =
                confirm(
                    "Are you sure you want to cancel this order?"
                );

            if (!confirmed) {
                return;
            }

            const orders =
                getOrders();

            const orderIndex =
                orders.findIndex(order =>
                    String(order.id) ===
                    String(currentOrder.id)
                );

            if (orderIndex === -1) {

                if (typeof showToast === "function") {

                    showToast(
                        "Order could not be found",
                        "warning"
                    );
                }

                return;
            }

            orders[orderIndex].status =
                "cancelled";

            orders[orderIndex].cancelledAt =
                new Date().toISOString();

            saveOrders(orders);

            currentOrder =
                orders[orderIndex];

            displayOrder(
                currentOrder
            );

            if (typeof showToast === "function") {

                showToast(
                    "Order cancelled successfully",
                    "success"
                );
            }

        }
    );
}

// =========================
// LOAD SELECTED ORDER
// =========================

const selectedOrderId =
    localStorage.getItem(
        "selectedOrderId"
    );

if (
    selectedOrderId &&
    loggedInUser
) {

    const selectedOrder =
        findOrder(selectedOrderId);

    if (selectedOrder) {

        if (orderIdInput) {

            orderIdInput.value =
                selectedOrder.id;
        }

        displayOrder(
            selectedOrder
        );

        if (trackMessage) {

            trackMessage.textContent =
                "Order loaded successfully.";

            trackMessage.style.color =
                "#15803d";
        }
    }
}