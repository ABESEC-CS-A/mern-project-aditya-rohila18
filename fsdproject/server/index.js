import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import DBConnect from './config/db.js'; 
import User from './models/user.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;

// Connect to Database
DBConnect();

// --- ROUTES ---

// Get All Users
app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Users found successfully', users });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch users", error: err.message });
    }
});

// Get Single User
app.get("/user/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User found successfully', user });
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch user", error: err.message });
    }
});

// Create User
app.post("/add", async (req, res) => {
    try {
        const newUser = { ...req.body };
        const user = new User(newUser);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(500).json({ message: "Failed to create user", error: err.message });
    }
});

// Update User (CRITICAL FIX ADDED HERE)
app.put("/edit/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const data = { ...req.body };

        // Added { new: true } -> This ensures you get the UPDATED document back
        const updatedUser = await User.findOneAndUpdate({ email: email }, data, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Failed to update user", error: err.message });
    }
});

// Delete User
app.delete("/delete/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const deletedUser = await User.findOneAndDelete({ email: email });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user", error: err.message });
    }
});

// Start Server
app.listen(port, () => {
    // FIX: Changed single quotes ' ' to backticks ` `
    console.log(`Server is running on port ${port}`);
});