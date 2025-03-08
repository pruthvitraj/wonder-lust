
const mongoose = require("mongoose");
const data = require("./creation_of_data");

// connection of monogodb;
const userschema = new mongoose.Schema({
    title: String,
    description: String,
    image: {
      filename: String,
      url: String,
    },
    price: Number,
    country: String,
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      }
    ]
 
});
// console.log(data);
// console.log(data);

// creating model
const list = mongoose.model("list", userschema);

  // list.find({}).then(li=>{console.log("insertion of the data is comeplete");
  // })

  // const List = mongoose.model("List", listSchema);
  module.exports = list;