const express = require("express");

const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");

const {
    validateHotelDishes,
    isRestaurantAdmin,
    isHotelOwner
} = require("../middleware");

const dishController =
require("../controllers/dishController");

const multer = require("multer");

const { storage } =
require("../cloudConfig");

const upload = multer({ storage });


// NEW DISH FORM

router.get(
    "/new",
    isRestaurantAdmin,
    isHotelOwner,
    wrapAsync(
        dishController.renderNewDishForm
    )
);


// CREATE DISH

router.post(
    "/",
    isRestaurantAdmin,
    isHotelOwner,
    upload.single("image"),
    validateHotelDishes,
    wrapAsync(
        dishController.createDish
    )
);


// EDIT DISH FORM

router.get(
    "/:dishId/edit",
    isRestaurantAdmin,
    isHotelOwner,
    wrapAsync(
        dishController.renderEditDishForm
    )
);


// UPDATE DISH

router.put(
    "/:dishId",
    isRestaurantAdmin,
    isHotelOwner,
    upload.single("image"),
    validateHotelDishes,
    wrapAsync(
        dishController.updateDish
    )
);


// DELETE DISH

router.delete(
    "/:dishId",
    isRestaurantAdmin,
    isHotelOwner,
    wrapAsync(
        dishController.deleteDish
    )
);

module.exports = router;




