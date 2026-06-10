const express = require("express");

const router = express.Router();

const wrapAsync =
require("../utils/wrapAsync");

const dishPublicController =
require("../controllers/dishPublicController");



// ALL DISHES

router.get(

    "/",

    wrapAsync(
        dishPublicController.index
    )
);



// DISH DETAILS

router.get(

    "/:dishName",

    wrapAsync(
        dishPublicController.showDish
    )
);

module.exports = router;