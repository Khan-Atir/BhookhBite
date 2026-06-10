const mongoose = require("mongoose");


const orderItemSchema = new mongoose.Schema({

    hotelId: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Hotel"
    },


    hotelName: String,

    dishId: {

        type: mongoose.Schema.Types.ObjectId
    },

    name: String,

    image: {
                url: String,
                filename: String,
            },

    price: Number,

    quantity: Number

});

const orderSchema =
new mongoose.Schema({

    user: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"
    },

    items: [orderItemSchema],

    totalAmount: Number,

    deliveryAddress: String,

    phone: String,

    paymentMethod: {

        type: String,
        enum: ["Cash On Delivery","Razorpay"],
        default: "Cash On Delivery"
    },

    paymentStatus: {
        type: String,
        enum: ["Pending","Paid","Failed"],
        default: "Pending"
    },


    razorpayOrderId: String,

    razorpayPaymentId: String,

    razorpaySignature: String,



    orderStatus: {

        type: String,

        default: "Pending"
    },

    createdAt: {

        type: Date,

        default: Date.now
    }

});


module.exports = mongoose.model("Order", orderSchema);