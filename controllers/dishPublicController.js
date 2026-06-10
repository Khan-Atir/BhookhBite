const Dish = require("../models/foods");
const Hotel = require("../models/hotels");
const ExpressError = require("../utils/ExpressError");


// ALL DISHES

module.exports.index = async(req,res)=>{

    const dishes =
    await Dish.find();

    res.render(

        "dishes.ejs",

        {
            dishes
        }
    );
};




// DISH DETAILS

module.exports.showDish =
async(req,res)=>{

    const { dishName } =
    req.params;

    const hotels =
    await Hotel.find({

        "dishes.name": {

            $regex:

            new RegExp(

                "^" +
                dishName +
                "$",

                "i"
            )
        }
    });

    if(hotels.length === 0){

        throw new ExpressError(

            404,

            "This dish is currently unavailable"
        );
    }

    let filteredData = [];

    hotels.forEach((hotel)=>{

        const matchedDish =

        hotel.dishes.find(

            (dish)=>{

                return dish.name
                .toLowerCase()

                ===

                dishName
                .toLowerCase();
            }
        );

        if(!matchedDish) return;

        filteredData.push({

            hotelName:
            hotel.name,

            location:
            hotel.location,

            rating:
            hotel.rating,

            hotelId:
            hotel._id,

            dishId:
            matchedDish._id,

            dishName:
            matchedDish.name,

            price:
            matchedDish.price,

            image:
            matchedDish.image
        });

    });

    res.render(

        "foodDetails.ejs",

        {
            filteredData
        }
    );
};