const express = require("express");

const router = express.Router();

const wrapAsync =
require("../utils/wrapAsync");

const { isLoggedIn } =
require("../middleware");

const ordersController =
require("../controllers/ordersController");



// CHECKOUT

router.get(

    "/checkout",

    isLoggedIn,

    wrapAsync(
        ordersController.renderCheckout
    )
);



// PLACE ORDER

router.post(

    "/place",

    isLoggedIn,

    wrapAsync(
        ordersController.placeOrder
    )
);


router.post(

    "/create-razorpay-order",

    isLoggedIn,

    wrapAsync(
        ordersController.createRazorpayOrder
    )
);


router.post(

    "/verify-payment",

    isLoggedIn,

    wrapAsync(
        ordersController.verifyPayment
    )
);



// MY ORDERS

router.get(

    "/my",

    isLoggedIn,

    wrapAsync(
        ordersController.myOrders
    )
);





module.exports = router;

