import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
// import dotenv from "dotenv"; // Uncomment this if you need to use dotenv

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB User model

const userSchema = new mongoose.Schema({
    // Add the schema fields for User here
});

const User = mongoose.model("User", userSchema);

// Connect to MongoDB
mongoose.connect("mongodb+srv://NathanStock:nathan.nguyen89@cluster0.xqvvmir.mongodb.net/test?retryWrites=true&w=majority", { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));

const stockSchema = new mongoose.Schema(
    {
        company: String,
        description: String,
        initial_price: Number,
        symbol: String,
    },
    {collection: "stocks"}  // collection name
);

const Stock = mongoose.model("Stock", stockSchema);

// Get API to grab the Stock Data
app.get("/api/stocks", async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Test route to check if data is connected
app.get("/check-db", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, data: users });
    } catch (err) {
        res.json({ success: false, message: "Error retrieving data", error: err });
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});