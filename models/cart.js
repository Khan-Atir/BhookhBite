const mongoose = require("mongoose");


const cartItemSchema = new mongoose.Schema({

    hotelId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Hotel"
    },


    dishId: {

        type: mongoose.Schema.Types.ObjectId
    },

    name: String,

    image: {
                url: String,
                filename: String,
            },

    price: Number,

    quantity: {

        type: Number,

        default: 1
    }

});





const cartSchema = new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"
    },

    items: [cartItemSchema]

});





module.exports = mongoose.model("Cart", cartSchema);