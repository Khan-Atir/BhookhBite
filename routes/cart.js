const express = require("express");

const router = express.Router();

const wrapAsync =
require("../utils/wrapAsync");

const {
    isLoggedIn
} = require("../middleware");

const cartController =
require("../controllers/cartController");



// VIEW CART

router.get(
    "/",
    isLoggedIn,
    wrapAsync(
        cartController.viewCart
    )
);



// ADD TO CART

router.post(
    "/add",
    isLoggedIn,
    wrapAsync(
        cartController.addToCart
    )
);



// INCREASE

router.post(
    "/:dishId/increase",
    isLoggedIn,
    wrapAsync(
        cartController.increaseQuantity
    )
);



// DECREASE

router.post(
    "/:dishId/decrease",
    isLoggedIn,
    wrapAsync(
        cartController.decreaseQuantity
    )
);



// REMOVE

router.post(
    "/:dishId/remove",
    isLoggedIn,
    wrapAsync(
        cartController.removeItem
    )
);



// ORDER NOW..........
router.post(

    "/buy-now",

    isLoggedIn,

    wrapAsync(
        cartController.buyNow
    )
);


module.exports = router;