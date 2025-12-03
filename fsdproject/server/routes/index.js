const express = require('express');
const dotenv = require('dotenv');

// Initialize App
const app = express();
dotenv.config();

const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory Database (Data is lost on restart)
// Note: IDs are stored as Strings for consistency
const users = [{ id: "1", uname: "admin", password: "manager" }];

// --- ROUTES ---

// 1. GET ALL USERS
app.get("/users", (req, res) => {
    try {
        res.status(200).json({
            message: "Users found successfully",
            count: users.length,
            users
        });
    } catch (err) {
        res.status(500).json({ message: "Failed to find users", error: err.message });
    }
});

// 2. GET SINGLE USER
app.get("/user/:id", (req, res) => {
    try {
        const id = req.params.id;
        // Use strict equality (===) by ensuring types match
        const user = users.find(u => u.id === id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User found successfully", user });
    } catch (err) {
        res.status(500).json({ message: "Failed to find user", error: err.message });
    }
});

// 3. CREATE USER
app.post("/user/add", (req, res) => {
    try {
        // Basic Validation
        if (!req.body.uname || !req.body.password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const newUser = {
            id: Date.now().toString(), // Convert ID to string
            ...req.body
        };

        users.push(newUser);
        res.status(201).json({ message: "User created successfully", newUser });
    } catch (err) {
        res.status(500).json({ message: "Failed to create user", error: err.message });
    }
});

// 4. UPDATE USER
app.put("/user/edit/:id", (req, res) => {
    try {
        const id = req.params.id;
        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        // Merge existing user data with new data
        users[index] = {
            ...users[index],
            ...req.body
        };

        // Return the actual updated object from the array
        res.status(200).json({ message: "User updated successfully", user: users[index] });
    } catch (err) {
        res.status(500).json({ message: "Failed to update user", error: err.message });
    }
});

// 5. DELETE USER
app.delete("/user/delete/:id", (req, res) => {
    try {
        const id = req.params.id;
        const index = users.findIndex(u => u.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "User not found" });
        }

        users.splice(index, 1);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete user", error: err.message });
    }
});

// Start Server
app.listen(port, () => {
    // Fixed Syntax Here
    console.log(`Server is running on Port ${port}`);
});