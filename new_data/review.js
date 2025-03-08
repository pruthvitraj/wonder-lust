const mongoose = require("mongoose");
const data = require("./creation_of_data");

const reviewschema = new mongoose.Schema({

    comment: String,
    rating: {
        type : Number,
        min: 1,
        max: 5
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
 
});

const Review = mongoose.model("Review", reviewschema);
module.exports = Review;