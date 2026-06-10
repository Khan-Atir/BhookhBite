const express = require("express");

const router = express.Router();

const wrapAsync =
require("../utils/wrapAsync");

const hotelController =
require("../controllers/hotelController");



// ALL HOTELS

router.get(

    "/",

    wrapAsync(
        hotelController.index
    )
);



// HOTEL DETAILS

router.get(

    "/:id",

    wrapAsync(
        hotelController.showHotel
    )
);

module.exports = router;