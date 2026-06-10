const Hotel = require("../models/hotels");


// ALL HOTELS

module.exports.index = async(req,res)=>{

    const hotels =
    await Hotel.find();

    res.render(

        "hotels.ejs",

        {
            hotels
        }
    );
};



// SINGLE HOTEL

module.exports.showHotel =
async(req,res)=>{

    const { id } =
    req.params;

    const hotel =
    await Hotel.findById(id);

    res.render(

        "hotelDetail.ejs",

        {
            hotel
        }
    );
};