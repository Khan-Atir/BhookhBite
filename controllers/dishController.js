const Hotel = require("../models/hotels");

const { cloudinary } =
require("../cloudConfig");


// NEW DISH FORM

module.exports.renderNewDishForm =
async(req,res)=>{

    const { hotelId } = req.params;

    const hotel =
    await Hotel.findById(hotelId);

    res.render(
        "newDishUnderHotel.ejs",
        { hotel }
    );
};



// CREATE DISH

module.exports.createDish =
async(req,res)=>{

    const { hotelId } = req.params;

    const hotel =
    await Hotel.findById(hotelId);

    let url = req.file.path;

    let filename =
    req.file.filename;

    const {
        name,
        price
    } = req.body;

    hotel.dishes.push({

        name,

        price,

        image: {

            url,

            filename
        }
    });

    await hotel.save();

    res.redirect(
        `/partner/restaurants/${hotelId}`
    );
};



// EDIT DISH FORM

module.exports.renderEditDishForm =
async(req,res)=>{

    const {
        hotelId,
        dishId
    } = req.params;

    const hotel =
    await Hotel.findById(hotelId);

    const dish =
    hotel.dishes.id(dishId);

    res.render(
        "editHotelDish.ejs",
        {
            hotel,
            dish
        }
    );
};



// UPDATE DISH

module.exports.updateDish =
async(req,res)=>{

    const {
        hotelId,
        dishId
    } = req.params;

    const {
        name,
        price
    } = req.body;

    const hotel =
    await Hotel.findById(hotelId);

    const dish =
    hotel.dishes.id(dishId);

    dish.name = name;

    dish.price = price;

    if(req.file){

        dish.image = {

            url: req.file.path,

            filename:
            req.file.filename
        };
    }

    await hotel.save();

    res.redirect(
        `/partner/restaurants/${hotelId}`
    );
};



// DELETE DISH

module.exports.deleteDish =
async(req,res)=>{

    const {
        hotelId,
        dishId
    } = req.params;

    const hotel =
    await Hotel.findById(hotelId);

    const dish =
    hotel.dishes.id(dishId);

    dish.deleteOne();

    await hotel.save();

    res.redirect(
        `/partner/restaurants/${hotelId}`
    );
};