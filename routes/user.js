const express = require("express");

const router = express.Router();

const wrapAsync =
require("../utils/wrapAsync");

const passport =
require("passport");

const {
    saveRedirectUrl
} = require("../middleware");

const userController =
require("../controllers/userController");



// SIGNUP FORM

router.get(
    "/signup",
    userController.renderSignupForm
);



// SIGNUP

router.post(
    "/signup",
    wrapAsync(
        userController.signupUser
    )
);



// LOGIN FORM

router.get(
    "/login",
    userController.renderLoginForm
);



// LOGIN

router.post(

    "/login",

    saveRedirectUrl,

    passport.authenticate(

        "local",

        {
            failureRedirect:
            "/login"
        }
    ),

    userController.loginUser
);



// LOGOUT

router.get(
    "/logout",
    userController.logoutUser
);

module.exports = router;