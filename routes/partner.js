const express = require("express");

const router = express.Router();

const passport = require("passport");

const User = require("../models/user");

const Hotel = require("../models/hotels");

const Order = require("../models/order");

const wrapAsync = require("../utils/wrapAsync");

const partnerController = require("../controllers/partnerController");





const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })

const {
    validateHotels,
    isRestaurantAdmin,
    isHotelOwner,
    isOrderOwner
} = require("../middleware");




/*................ PARTNER DASHBOARD.............. */

router.get(
    "/dashboard",
    isRestaurantAdmin,
    wrapAsync(partnerController.dashboard)
);




/*................. PARTNER SIGNUP................ */

router.get("/signup", partnerController.renderSignupForm);



router.post(
    "/signup",
    wrapAsync(partnerController.signupPartner)
);




/*............... PARTNER LOGIN............... */

router.get(
    "/login",
    partnerController.renderLoginForm
);




router.post(

    "/login",

    passport.authenticate(

        "local",

        {
            failureRedirect:
            "/partner/login",
            failureFlash: true
        }
    ),

    partnerController.loginPartner
);




//ADDING NEW RETAURANTS..............
router.get(

    "/restaurants/new",

    isRestaurantAdmin,

    partnerController.renderNewRestaurantForm
);




router.post(

    "/restaurants",

    isRestaurantAdmin,

    upload.single("image"),

    validateHotels,

    wrapAsync(
        partnerController.createRestaurant
    )
);





/* .........RESTAURANT DETAILS.............. */

router.get(

    "/restaurants/:id",

    isRestaurantAdmin,
    isHotelOwner,

    wrapAsync(
        partnerController.showRestaurant
    )
);





/*................ EDIT RESTAURANT..............*/

router.get(

    "/restaurants/:id/edit",

    isRestaurantAdmin,
    isHotelOwner,

    wrapAsync(
        partnerController.renderEditRestaurantForm
    )
);





/* .............. UPDATE RESTAURANT...............*/

router.put(

    "/restaurants/:id",

    isRestaurantAdmin,
    isHotelOwner,

    upload.single("image"),

    validateHotels,

    wrapAsync(
        partnerController.updateRestaurant
    )
);





/*.............. DELETE RESTAURANT...............*/

router.delete(

    "/restaurants/:id",

    isRestaurantAdmin,
    isHotelOwner,

    wrapAsync(
        partnerController.deleteRestaurant
    )
);



// Partner Orders Dashboard.........
router.get(

    "/orders",

    isRestaurantAdmin,

    wrapAsync(
        partnerController.partnerOrders
    )
);


//ROUTE FOR ORDER STATUS UPDATE...........
router.put(

    "/orders/:id/status",

    isRestaurantAdmin,
    isOrderOwner,

    wrapAsync(
        partnerController.updateOrderStatus
    )
);



module.exports = router;