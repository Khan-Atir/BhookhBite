const express = require("express");

const router = express.Router();

router.get("/", (req,res)=>{

    const { q } = req.query;

    if(!q || q.trim() === ""){

        return res.redirect("/dishes");
    }

    res.redirect(
        `/dishes/${q.trim()}`
    );
});

module.exports = router;