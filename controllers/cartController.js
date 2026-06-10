const Cart = require("../models/cart");
const Hotel = require("../models/hotels");


// VIEW CART

module.exports.viewCart = async(req,res)=>{

    const cart = await Cart.findOne({
        user: req.user._id
    });

    let subtotal = 0;

    let deliveryFee = 49;

    let taxes = 20;

    let total = 0;

    if(cart){

        cart.items.forEach((item)=>{

            subtotal +=
            item.price * item.quantity;
        });

        total =
        subtotal +
        deliveryFee +
        taxes;
    }

    res.render(

        "./users/cart.ejs",

        {
            cart,
            subtotal,
            deliveryFee,
            taxes,
            total
        }
    );
};



// ADD TO CART

module.exports.addToCart = async(req,res)=>{

    const {
        hotelId,
        dishId
    } = req.body;

    const hotel =
    await Hotel.findById(hotelId);
    if(!hotel){
        req.flash("error", "Restaurant not found");

        return res.redirect("/dishes");
    }

    const dish =
    hotel.dishes.id(dishId);


    if(!dish){
        req.flash("error", "Dish not found");

        return res.redirect(`/restaurants/${hotelId}`);
    }


    let cart =
    await Cart.findOne({

        user: req.user._id
    });

    if(!cart){

        cart = new Cart({

            user: req.user._id,

            items: []
        });
    }




     // ONE RESTAURANT CHECK means eak oder eak hi restaurantsse ho sakta hai ...


        if(

            cart.items.length > 0

        ){

            const existingHotelId =

                cart.items[0].hotelId.toString();


            if(

                existingHotelId !== hotelId

            ){

                req.flash(

                    "error",

                    "Your cart already contains items from another restaurant"
                );

                return res.redirect("/cart");
            }
        }


    //CHECK EXISTING ITEM..............
    const existingItem =
    cart.items.find((item)=>{

        return item.dishId.toString() ===
        dish._id.toString();
    });

    if(existingItem){

        existingItem.quantity += 1;
    }

    else{

        cart.items.push({

            hotelId: hotel._id,

            dishId: dish._id,

            name: dish.name,

            image: dish.image,

            price: dish.price,

            quantity: 1
        });
    }

    await cart.save();

    req.flash(
        "success",
        "Item Added To Cart"
    );

    res.redirect("/cart");
};


// BUY NOW..............

module.exports.buyNow = async(req,res)=>{

    const {
        hotelId,
        dishId
    } = req.body;

    const hotel =
    await Hotel.findById(hotelId);

    if(!hotel){

        req.flash(
            "error",
            "Restaurant not found"
        );

        return res.redirect("/dishes");
    }

    const dish =
    hotel.dishes.id(dishId);

    if(!dish){

        req.flash(
            "error",
            "Dish not found"
        );

        return res.redirect(`/restaurants/${hotelId}`);
    }

    let cart =
    await Cart.findOne({

        user: req.user._id
    });

    if(!cart){

        cart = new Cart({

            user: req.user._id,

            items: []
        });
    }


    // ONE RESTAURANT CHECK

    if(cart.items.length > 0){

        const existingHotelId =

        cart.items[0].hotelId.toString();

        if(existingHotelId !== hotelId){

            req.flash(

                "error",

                "Your cart already contains items from another restaurant"
            );

            return res.redirect("/cart");
        }
    }


    // CHECK EXISTING ITEM

    const existingItem =
    cart.items.find((item)=>{

        return item.dishId.toString()

        ===

        dish._id.toString();
    });


    if(existingItem){

        existingItem.quantity += 1;
    }

    else{

        cart.items.push({

            hotelId: hotel._id,

            hotelName: hotel.name,

            dishId: dish._id,

            name: dish.name,

            image: dish.image,

            price: dish.price,

            quantity: 1
        });
    }


    await cart.save();

    // DIRECT CHECKOUT

    res.redirect("/orders/checkout");
};




// INCREASE QUANTITY

module.exports.increaseQuantity =
async(req,res)=>{

    const { dishId } =
    req.params;

    const cart =
    await Cart.findOne({

        user: req.user._id
    });

    const item =
    cart.items.find((item)=>{

        return item.dishId.toString()
        === dishId;
    });

    if(item){

        item.quantity += 1;
    }

    await cart.save();

    res.redirect("/cart");
};




// DECREASE QUANTITY

module.exports.decreaseQuantity =
async(req,res)=>{

    const { dishId } =
    req.params;

    const cart =
    await Cart.findOne({

        user: req.user._id
    });

    const item =
    cart.items.find((item)=>{

        return item.dishId.toString()
        === dishId;
    });

    if(item){

        item.quantity -= 1;

        if(item.quantity <= 0){

            cart.items =
            cart.items.filter(

                (cartItem)=>{

                    return cartItem
                    .dishId
                    .toString()

                    !==

                    dishId;
                }
            );
        }
    }

    await cart.save();

    res.redirect("/cart");
};




// REMOVE ITEM

module.exports.removeItem =
async(req,res)=>{

    const { dishId } =
    req.params;

    const cart =
    await Cart.findOne({

        user: req.user._id
    });

    cart.items =
    cart.items.filter((item)=>{

        return item.dishId.toString()
        !== dishId;
    });

    await cart.save();

    res.redirect("/cart");
};