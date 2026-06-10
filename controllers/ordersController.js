const Cart = require("../models/cart");

const Order = require("../models/order");

const razorpay = require("../utils/razorpay");
const crypto = require("crypto");

// CHECKOUT PAGE

module.exports.renderCheckout = async(req,res)=>{

    const cart = await Cart.findOne({

        user: req.user._id
    });

    if(!cart || cart.items.length === 0){

        req.flash(
            "error",
            "Cart Is Empty"
        );

        return res.redirect("/cart");
    }

    let subtotal = 0;

    cart.items.forEach((item)=>{

        subtotal +=
        item.price * item.quantity;
    });

    const deliveryFee = 49;

    const taxes = 20;

    const total =
    subtotal +
    deliveryFee +
    taxes;

    res.render(

        "./users/checkout.ejs",

        {
            cart,

            subtotal,

            deliveryFee,

            taxes,

            total,

            razorpayKey: process.env.RAZORPAY_KEY_ID
        }
    );
};




// PLACE ORDER

module.exports.placeOrder = async(req,res)=>{

    console.log(
        "PAYMENT METHOD =>",
        req.body.paymentMethod
    );

    const cart = await Cart.findOne({

        user: req.user._id
    });

    if(!cart || cart.items.length === 0){

        req.flash(
            "error",
            "Cart Is Empty"
        );

        return res.redirect("/cart");
    }

    let subtotal = 0;

    cart.items.forEach((item)=>{

        subtotal +=
        item.price * item.quantity;
    });

    const total =
    subtotal +
    49 +
    20;

    const newOrder =
    new Order({

        user: req.user._id,

        items: cart.items,

        totalAmount: total,

        deliveryAddress:
        req.body.address,

        phone:
        req.body.phone,

        paymentMethod:
        req.body.paymentMethod
    });

    if(
    req.body.paymentMethod ===
    "Cash On Delivery"
){

    console.log("COD FLOW");

    await newOrder.save();

    cart.items = [];

    await cart.save();

    req.flash(

        "success",

        "Order Placed Successfully"
    );

    res.redirect(
        "/orders/my"
    );
}
else{
    console.log(
        "RAZORPAY FLOW"
    );

    return res.send(
        "Razorpay Flow"
    );
}
}


// CREATE RAZORPAY ORDER

module.exports.createRazorpayOrder = async (req, res) => {


    req.session.checkoutData = {

        phone: req.body.phone,

        address: req.body.address
    };

    const cart = await Cart.findOne({

        user: req.user._id
    });

    if (!cart || cart.items.length === 0) {

        return res.status(400).json({

            success: false,

            message: "Cart is empty"
        });
    }

    let subtotal = 0;

    cart.items.forEach((item) => {

        subtotal += item.price * item.quantity;
    });

    const total = subtotal + 49 + 20;

    const options = {

        amount: total * 100,

        currency: "INR",

        receipt: `receipt_${Date.now()}`
    };

    const razorpayOrder =
    await razorpay.orders.create(options);

    res.json({

        success: true,

        order: razorpayOrder,

        amount: total
    });
};


//VERIFY PAYMENT............
module.exports.verifyPayment =
async(req,res)=>{

    try{
        const {

            razorpay_order_id,

            razorpay_payment_id,

            razorpay_signature

        } = req.body;


        const body =

        razorpay_order_id +

        "|" +

        razorpay_payment_id;


        const expectedSignature =

        crypto

        .createHmac(

            "sha256",

            process.env.RAZORPAY_KEY_SECRET
        )

        .update(body.toString())

        .digest("hex");


        if(
            expectedSignature !==
            razorpay_signature
        ){

            return res.status(400).json({

                success: false,

                message:
                "Invalid Signature"
            });
        }


        const cart = await Cart.findOne({

            user: req.user._id
        });


        let subtotal = 0;

        cart.items.forEach((item)=>{

            subtotal += item.price * item.quantity;
        });

        const total = subtotal + 49 + 20;

        const newOrder = new Order({

            user: req.user._id,

            items: cart.items,

            totalAmount: total,

            deliveryAddress: req.session.checkoutData.address,

            phone: req.session.checkoutData.phone,

            paymentMethod: "Razorpay",

            paymentStatus: "Paid",

            razorpayOrderId: razorpay_order_id,

            razorpayPaymentId: razorpay_payment_id,

            razorpaySignature: razorpay_signature
        });

        await newOrder.save();

        delete req.session.checkoutData;

        cart.items = [];

        await cart.save();


        req.flash(
            "success",
            "Order Placed Successfully"
        );

        res.json({

            success: true
        });
    }
    catch(err){
        console.log(err);

        return res.status(500).json({
            success:false
        })
        
    }
}




// MY ORDERS

module.exports.myOrders =
async(req,res)=>{

    const orders =
    await Order.find({

        user: req.user._id

    }).sort({

        createdAt: -1
    });

    res.render(

        "./users/myOrders.ejs",

        {
            orders
        }
    );
};