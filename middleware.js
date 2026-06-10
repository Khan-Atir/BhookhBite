const ExpressError = require("./utils/ExpressError");
const Hotel = require("./models/hotels");
const Order = require("./models/order");

const { dishValidationSchema } = require("./schema");
const { hotelValidationSchema  } = require("./schema");
const { hotelDishValidationSchema  } = require("./schema");

module.exports.validateDishes = (req,res,next)=>{
    const { error } = dishValidationSchema.validate(req.body);

    if(error){
        throw new ExpressError(
            400,
            error.details[0].message
        );
    }
    next();
};


module.exports.validateHotels = (req, res, next)=>{
    let {error} = hotelValidationSchema.validate(req.body);
    console.log("BODY =>", req.body);
    if(error){
        throw new ExpressError(400, error.details[0].message);
    }
    next();
}


module.exports.validateHotelDishes = (req, res, next)=>{
    let {error} = hotelDishValidationSchema.validate(req.body);
    if(error){
        throw new ExpressError(400, error.details[0].message);
    }
    next();
}



//Middleware for authentication and authorization....
module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        if(req.method === "GET"){
            req.session.redirectUrl = req.originalUrl;
        }
        
        req.flash("error", "Please Login First");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};



module.exports.isRestaurantAdmin = (req,res,next)=>{

    // USER NOT LOGGED IN

    if(!req.isAuthenticated()){ 
        req.session.redirectUrl = req.originalUrl;

        req.flash("error", "Please Login First"
        );

        return res.redirect( "/partner/login");
    }


    // USER NOT PARTNER

    if(req.user.role !== "restaurantAdmin"){

        req.flash("error", "Access Denied");

        return res.redirect("/dishes");
    }

    // ACCESS GRANTED

    next();

};


//CHECKING ACTUAL OWNER OF HOTEL TO ACCESS EDIT AND DELETE RESTAURANTS....

module.exports.isHotelOwner = async(req,res,next)=>{

    const restaurantId =
        req.params.id ||
        req.params.hotelId;

    const hotel =
        await Hotel.findById(restaurantId);

    if(!hotel){

        req.flash(
            "error",
            "Restaurant not found"
        );

        return res.redirect(
            "/partner/dashboard"
        );
    }

    if(!hotel.owner.equals(req.user._id)){

        req.flash(
            "error",
            "You are not authorized"
        );

        return res.redirect(
            "/partner/dashboard"
        );
    }

    next();
};


//CHECK KARNA HAI ORIGINAL ORDER OWNER FOR ORDER STATUS.........
module.exports.isOrderOwner = async(req,res,next)=>{

    const { id } = req.params;

    const order = await Order.findById(id);

    if(!order){

        req.flash(
            "error",
            "Order not found"
        );

        return res.redirect(
            "/partner/orders"
        );
    }

    const hotelId =
        order.items[0].hotelId;

    const hotel =
        await Hotel.findById(hotelId);

    if(!hotel.owner.equals(req.user._id)){

        req.flash(
            "error",
            "You are not authorized"
        );

        return res.redirect(
            "/partner/orders"
        );
    }

    next();
};




module.exports.isSuperAdmin = (req,res,next)=>{

    if(
        !req.user ||
        req.user.role !== "superadmin"
    ){

        req.flash(
            "error",
            "Access Denied"
        );

        return res.redirect("/");
    }

    next();
};