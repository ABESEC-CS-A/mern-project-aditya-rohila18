import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// REGISTER USER
export const register = async (req, res) => {
    try {
        const { name, email, password, role, mentor } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const user = await User.create({
            name,
            email: email.toLowerCase().trim(),
            password,
            role,
            mentor: role === "mentee" ? mentor : null,
        });

        res.status(201).json({
            message: "Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                mentor: user.mentor,
            },
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase().trim() });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }

        res.json({
            message: "Login Successful",
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            mentor: user.mentor,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).json({ message: error.message });
    }
};

// GET MENTORS LIST
export const getMentors = async (req, res) => {
    try {
        const mentors = await User.find({ role: "mentor" }).select("name email");
        res.json(mentors);
    } catch (err) {
        res.status(500).json({ message: "Could not load mentors" });
    }
};

// GET CURRENT LOGGED-IN USER (for mentee dashboard)
export const getMe = async (req, res) => {
    try {
        // req.user is set by auth middleware
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            assignedMentor: user.mentor || null,
        });
    } catch (error) {
        console.error("GET ME ERROR:", error);
        res.status(500).json({ message: "Could not load user" });
    }
};

// GET MENTEES ASSIGNED TO LOGGED-IN MENTOR
export const getMyMentees = async (req, res) => {
    try {
        const mentees = await User.find({
            role: "mentee",
            mentor: req.user._id,
        }).select("name email mentor");

        res.json(mentees);
    } catch (error) {
        console.error("GET MY MENTEES ERROR:", error);
        res.status(500).json({ message: "Could not load mentees" });
    }
};