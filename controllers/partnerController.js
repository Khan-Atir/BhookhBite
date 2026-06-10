const Hotel = require("../models/hotels");
const Order = require("../models/order");
const User = require("../models/user");


module.exports.dashboard = async(req,res)=>{

    const hotels = await Hotel.find({
        owner: req.user._id
    });

    // HOTEL IDS

    const hotelIds = hotels.map((hotel)=>{
        return hotel._id;
    });

    // ORDERS

    const orders = await Order.find({
        "items.hotelId":{
            $in: hotelIds
        }
    });

    // TOTAL ORDERS

    const totalOrders = orders.length;

    // TOTAL EARNINGS

    let totalEarnings = 0;

    orders.forEach((order)=>{
        totalEarnings += order.totalAmount;
    });

    // TOTAL DISHES SOLD

    let totalDishesSold = 0;

    orders.forEach((order)=>{

        order.items.forEach((item)=>{

            totalDishesSold += item.quantity;

        });
    });

    res.render(
        "./partner/dashboard.ejs",
        {
            hotels,
            totalOrders,
            totalEarnings,
            totalDishesSold
        }
    );
};


module.exports.renderSignupForm = (req,res)=>{

    res.render(
        "./users/partnerSignup.ejs"
    );

};




module.exports.signupPartner = async (req, res) => {

    const {
        username,
        email,
        password
    } = req.body;

    const newPartner = new User({
        username,
        email,
        role: "restaurantAdmin"
    });

    await User.register(
        newPartner,
        password
    );

    req.flash(
        "success",
        "Partner Account Created Successfully"
    );

    res.redirect("/partner/login");
};



module.exports.renderLoginForm = (req,res)=>{

    res.render(
        "./users/partnerLogin.ejs"
    );

};


module.exports.loginPartner = (req,res)=>{

    res.redirect(
        "/partner/dashboard"
    );

};



module.exports.renderNewRestaurantForm = (req,res)=>{

    res.render(
        "newRestaurant.ejs"
    );

};





module.exports.createRestaurant = async(req,res)=>{

    let url = req.file.path;

    let filename = req.file.filename;

    const {
        name,
        location,
        rating
    } = req.body;

    const newHotel = new Hotel({

        name,

        location,

        image: {
            url,
            filename
        },

        rating,

        owner: req.user._id
    });

    await newHotel.save();

    res.redirect(
        "/partner/dashboard"
    );

};




//HOTEL DETAILS................
module.exports.showRestaurant = async(req,res)=>{

    const { id } = req.params;

    const hotel = await Hotel.findById(id);

    res.render(

        "partnerHotelDetail.ejs",

        {
            hotel
        }
    );

};



module.exports.renderEditRestaurantForm = async(req,res)=>{

    const { id } = req.params;

    const hotel = await Hotel.findById(id);

    res.render(
        "updateHotel.ejs",
        {
            hotel
        }
    );

};



module.exports.updateRestaurant = async(req,res)=>{

    const { id } = req.params;

    const {
        name,
        location,
        rating
    } = req.body;

    const hotel =
    await Hotel.findById(id);

    hotel.name = name;

    hotel.location = location;

    hotel.rating = rating;

    // NEW IMAGE UPLOADED

    if(req.file){

        hotel.image = {

            url: req.file.path,

            filename: req.file.filename
        };
    }

    await hotel.save();

    res.redirect(
        `/partner/restaurants/${id}`
    );

};




module.exports.deleteRestaurant = async(req,res)=>{

    const { id } = req.params;

    await Hotel.findByIdAndDelete(id);

    res.redirect(
        "/partner/dashboard"
    );
};




module.exports.partnerOrders = async(req,res)=>{

    const hotels = await Hotel.find({
        owner: req.user._id
    });

    const hotelIds = hotels.map((hotel)=>{
        return hotel._id;
    });

    const orders = await Order.find({

        "items.hotelId": {

            $in: hotelIds
        }
    });

    res.render(

        "./partner/orders.ejs",

        {
            orders
        }
    );
};




module.exports.updateOrderStatus = async(req,res)=>{

    const { id } = req.params;

    await Order.findByIdAndUpdate(

        id,

        {
            orderStatus: req.body.status
        }
    );

    res.redirect(
        "/partner/orders"
    );

};