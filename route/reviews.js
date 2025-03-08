const express = require("express");
const accesslogin = require("../middelware");
const Router = express.Router({mergeParams:true})
const list = require("../new_data/schema");  // ✅ Import List model
const Review = require("../new_data/review");
const session = require("express-session");

function asyncwrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(err => {
            console.log(err);
        })
    }
}

//delete reviews 
Router.delete("/deletereview/:rid", accesslogin,asyncwrap(async (req, res) => {
    let { id, rid } = req.params;
    let listing = await list.findById(id);
    await Review.findByIdAndDelete(rid);
    listing.reviews.push(_id = rid);
    req.flash("success","reviews deleted suceessfully");
    res.redirect(`/showlist/${id}`)
}))

//delete the listing
Router.delete("/delete",accesslogin,asyncwrap(async (req, res) => {
    let { id } = req.params;
    const listing = await list.findById(id);
    await list.deleteOne({ _id: listing._id }).then((res) => {
        console.log(res);
    })
    req.flash("success","listing deleted successfully");
    res.redirect(`/showlist`);
}))

Router.post("/reviews", accesslogin,asyncwrap(async (req, res) => {
    let {id} = req.params;
    let { rating, review } = req.body;
    let reviewData = req.body.review;
    let newReview = new Review(reviewData);
    let listing = await list.findById(req.params.id);
    if (!listing.reviews) {
        listing.reviews = [];
    }
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","reviews edited successfully");
    res.redirect(`/showlist/${id}`);
}))
module.exports = Router;