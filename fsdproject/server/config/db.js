import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URL = process.env.DB_URL;

const DBConnect = async () => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB Connected successfully");
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Stop the app if DB fails
    }
}

export default DBConnect;