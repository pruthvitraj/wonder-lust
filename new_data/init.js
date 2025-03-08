const mongoose = require("mongoose");
const data = require("./creation_of_data");

// MongoDB connection function
async function main() {
    try {
        await mongoose.connect('mongodb+srv://pruthvipatil0058:patil0058@cluster0.r6iz0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');
        console.log("✅ Connected successfully to MongoDB");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
    }
}

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

// Creating the model
const List = mongoose.model("List", userschema);

// Function to insert data
async function insertData(data) {
    try {
        await List.deleteMany({});
        const result = await List.insertMany(data.data);
        console.log("✅ Data inserted successfully:", result);
    } catch (error) {
        console.error("❌ Error inserting data:", error.message);
    } finally {
        mongoose.connection.close(); // Close DB connection after insertion
    }
}

// Execute connection and insert function
main().then(() => insertData(data));
