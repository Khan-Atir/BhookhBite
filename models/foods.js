const mongoose = require('mongoose');


const dishSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true  
    },

    image : {
        url: String,
        filename: String,
    }
})

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;