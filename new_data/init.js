const mongoose = require("mongoose");
const data = require("./creation_of_data");

// connection of monogodb;
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/showlist')
}
main().then(() => { console.log("connected successful to DB") }).catch(err => { console.log(err); })

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
        ref: "review",
      }
    ]
 
});
// console.log(data);
// console.log(data);

// creating model
const list = mongoose.model("list", userschema);
async function insert(data) { // Accept 'data' as a parameter
    try {
      await list.deleteMany({})
        const result = await list.insertMany(data.data)
        console.log('Data inserted successfully:', result);
      }catch (error) {
      console.error("Error inserting data:", error.message);
    }

  }
insert(data);
  // list.find({}).then(li=>{console.log("insertion of the data is comeplete");
  // })

  // const List = mongoose.model("List", listSchema);
//   module.exports = list;