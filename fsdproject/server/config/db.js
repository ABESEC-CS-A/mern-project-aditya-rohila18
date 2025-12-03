const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

const URL = process.env.DB_URL;

const connectDB = async () => {
    try {
        // 1. Attempt connection
        await mongoose.connect(URL);
        console.log("Database connected successfully");
    } catch (error) {
        // 2. Handle errors
        console.error("Database connection failed:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// 3. Export using CommonJS syntax
module.exports = connectDB;