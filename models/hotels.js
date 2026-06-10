const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    image: {
                url: String,
                filename: String,
            },

    rating: {
        type: Number,
        required: true
    },

     owner: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },


    dishes: [
        {
            name: {
                type: String,
                required: true
            },

            price: {
                type: Number,
                required: true
            },

            image: {
                url: String,
                filename: String,
            }
        }
    ]

});

const Hotel = mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;