const Joi = require("joi");



module.exports.dishValidationSchema = Joi.object({

    name: Joi.string().required(),

    // image: Joi.string().required()

});



module.exports.hotelValidationSchema = Joi.object({

    name: Joi.string().required(),

    location: Joi.string().required(),

    // image: Joi.string().required(),

    rating: Joi.number().required()

});



module.exports.hotelDishValidationSchema = Joi.object({

    name: Joi.string().required(),

    // image: Joi.string().required(),

    price: Joi.number().required()

});
