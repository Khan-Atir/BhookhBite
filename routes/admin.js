const express = require("express");

const router = express.Router();

const Dish = require("../models/foods");

const multer = require("multer");

const { storage } = require("../cloudConfig");

const upload = multer({ storage });

const {
    isLoggedIn,
    isSuperAdmin
} = require("../middleware");

router.get("/dishes", isLoggedIn, isSuperAdmin, async(req,res)=>{

    const dishes = await Dish.find();

    res.render(
        "./admin/dishes.ejs",
            {
                dishes
            }
    );
        
});


//FORM FOR NEW DISH..........
router.get(

    "/dishes/new",

    isLoggedIn,

    isSuperAdmin,

    (req,res)=>{

        res.render(
            "./admin/newDish.ejs"
        );
    }
);



router.post(

    "/dishes",

    isLoggedIn,

    isSuperAdmin,

    upload.single("image"),

    async(req,res)=>{

        const newDish = new Dish({

            name: req.body.name,

            image: {

                url: req.file.path,

                filename: req.file.filename
            }
        });

        await newDish.save();

        req.flash(
            "success",
            "Dish Added Successfully"
        );

        res.redirect(
            "/admin/dishes"
        );
    }
);



//EDIT FORM FOR DISHES..............
router.get(

    "/dishes/:id/edit",

    isLoggedIn,

    isSuperAdmin,

    async(req,res)=>{

        const dish =
        await Dish.findById(
            req.params.id
        );

        res.render(

            "./admin/editDish.ejs",

            {
                dish
            }
        );
    }
);


router.put(

    "/dishes/:id",

    isLoggedIn,

    isSuperAdmin,

    upload.single("image"),

    async(req,res)=>{

        const updateData = {

            name: req.body.name
        };

        if(req.file){

            updateData.image = {

                url: req.file.path,

                filename: req.file.filename
            };
        }

        await Dish.findByIdAndUpdate(

            req.params.id,

            updateData
        );

        req.flash(

            "success",

            "Dish Updated Successfully"
        );

        res.redirect(
            "/admin/dishes"
        );
    }
);




//DELETE DISH.........
router.delete(

    "/dishes/:id",

    isLoggedIn,

    isSuperAdmin,

    async(req,res)=>{

        await Dish.findByIdAndDelete(
            req.params.id
        );

        req.flash(
            "success",
            "Dish Deleted Successfully"
        );

        res.redirect(
            "/admin/dishes"
        );
    }
);


module.exports = router;