if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}


const express = require("express");

const app = express();

const mongoose = require("mongoose");

const session = require("express-session");
const {MongoStore} = require('connect-mongo')

const path = require("path");

const methodOverride = require("method-override");

const passport = require("passport");

const LocalStrategy = require("passport-local");

const flash = require("connect-flash");



/* .........MODELS..................*/

const User = require("./models/user");





/* ............ROUTES..............*/

const userRoutes = require("./routes/user");

const partnerRoutes = require("./routes/partner");

const hotelRoutes = require("./routes/hotels");

const dishRoutes = require("./routes/dishes");

const partnerHotelDishRoutes = require("./routes/partnerHotelDishes");

const cartRoutes = require("./routes/cart");

const orderRoutes = require("./routes/orders");

const searchRoutes = require("./routes/search");

const adminRoutes = require("./routes/admin");



/* ............... UTILS.............. */

const ExpressError =
require("./utils/ExpressError");





/* .......... DATABASE CONNECTION...........*/

const dbUrl = process.env.ATLASDB_URL;

main()

.then(()=>{

    console.log(
        "MongoDB Connected"
    );

})

.catch((err)=>{

    console.log(err);

});





async function main(){

    await mongoose.connect(dbUrl);

}





/* ...............EXPRESS CONFIG.................*/

app.use(

    express.urlencoded({

        extended: true
    })
);

app.use(express.json());





/*............... METHOD OVERRIDE............*/

app.use(

    methodOverride("_method")
);





/* ..............VIEW ENGINE.............*/

app.set(

    "view engine",

    "ejs"
);





/*.................... STATIC FILES................*/

app.use(

    express.static(

        path.join(__dirname, "public")
    )
);





/* .........SESSION CONFIG...............*/
console.log(MongoStore);
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on("error", ()=>{
    console.log("ERROR IN MONGO SESSION STORE", err);
    
})

app.use(

    session({
        store,

        secret: process.env.SECRET,

        resave: false,

        saveUninitialized: true,
        cookie:{
            expires: Date.now() + 7 *24 * 60 * 60 * 1000,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        }
    })
);



app.use(flash());





/* =========================================
   PASSPORT CONFIG
========================================= */

app.use(passport.initialize());

app.use(passport.session());





passport.use(

    new LocalStrategy(

        User.authenticate()
    )
);





passport.serializeUser(

    User.serializeUser()
);

passport.deserializeUser(

    User.deserializeUser()
);





/* =========================================
   GLOBAL USER
========================================= */

app.use((req,res,next)=>{

    res.locals.currUser = req.user;

    res.locals.success = req.flash("success");

    res.locals.error = req.flash("error");

    next();

});





/* =========================================
   ROUTES
========================================= */




// USER AUTH ROUTES

app.use(

    "/",

    userRoutes
);




// PARTNER ROUTES

app.use(

    "/partner",

    partnerRoutes
);




// PUBLIC RESTAURANTS

app.use(

    "/restaurants",

    hotelRoutes
);




// PUBLIC DISHES

app.use("/dishes", dishRoutes);


// PARTNER HOTEL DISHES

app.use("/partner/restaurants/:hotelId/dishes", partnerHotelDishRoutes);


// CART ROUTE
app.use("/cart", cartRoutes);

app.use("/orders", orderRoutes);

//SEARCH ROUTE.......
app.use("/search", searchRoutes);

//SUPERADMIN ROUTE...........
app.use("/admin", adminRoutes);






/* =========================================
   404 HANDLER
========================================= */

app.use((req,res,next)=>{

    next(

        new ExpressError(

            404,

            "Page Not Found"
        )
    );

});





/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use((err,req,res,next)=>{

    const {

        statusCode = 500,

        message = "Something Went Wrong"

    } = err;





    res.status(statusCode).render(

        "error.ejs",

        {
            message
        }
    );

});





/* =========================================
   SERVER
========================================= */

app.listen(3000, ()=>{

    console.log(

        "Server Running On Port 3000"
    );

});