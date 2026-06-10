const User = require("../models/user");


// SIGNUP FORM

module.exports.renderSignupForm = (req,res)=>{

    res.render(
        "./users/signup.ejs"
    );
};


// SIGNUP

module.exports.signupUser =
async(req,res,next)=>{

    try{

        let {
            username,
            email,
            password
        } = req.body;

        const newUser =
        new User({

            email,
            username
        });

        const registeredUser =
        await User.register(
            newUser,
            password
        );

        req.login(
            registeredUser,
            (err)=>{

                if(err){

                    return next(err);
                }

                res.redirect(
                    "/dishes"
                );
            }
        );

    }catch(err){
         req.flash("error", error.message);

        res.redirect(
            "/signup"
        );
    }
};


// LOGIN FORM

module.exports.renderLoginForm =
(req,res)=>{

    res.render(
        "./users/login.ejs"
    );
};


// LOGIN SUCCESS

module.exports.loginUser =
(req,res)=>{

    let redirectUrl =
    res.locals.redirectUrl ||
    "/dishes";

    res.redirect(
        redirectUrl
    );
};


// LOGOUT

module.exports.logoutUser =
(req,res,next)=>{

    req.logout((err)=>{

        if(err){

            return next(err);
        }

        res.redirect(
            "/dishes"
        );
    });
};