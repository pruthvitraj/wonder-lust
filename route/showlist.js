
const express = require("express");
const Router = express.Router({ mergeParams: true })
const list = require("../new_data/schema");  
const Review = require("../new_data/review");
const accesslogin = require("../middelware");


// creating function for error handling
function asyncwrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => {
            console.log(err);
        })
    }
}

// show one post
Router.get("/",accesslogin, asyncwrap(async (req, res) => {
    let { id } = req.params;
    const listing = await list.findById(id);
    const listingr = await list.findById(id).populate("reviews");
    let reviewss = listingr.reviews;


    res.render("showone.ejs", { listing: listing, reviewss: listingr.reviews, });
}));
// updating the post
Router.put("/",accesslogin, asyncwrap(async (req, res) => {
    let { id } = req.params;
    await list.findByIdAndUpdate(id, { ...req.body });
    req.flash("success", "updated successfully");
    res.redirect(`/showlist/${id}`);
}))


Router.get("/edit", accesslogin,asyncwrap(async (req, res) => {
    let { id } = req.params;
    const listing = await list.findById(id);

    res.render("update.ejs", { listing: listing });
}))
module.exports = Router;