import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register controller.
const register = async (req, res) => {
    try {
        // Extract information from the frontend.
        const { fullName, userName, password, confirmPassword, gender } = req.body;

        // Check if any of the field is empty and if yes, throw error. 
        if ([fullName, userName, password, confirmPassword, gender].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if password is not matched with confirm password.
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // Check if the user is already exist.
        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Hash the password using bcryptjs
        const hashedPassword = await bcrypt.hash(password, 10);

        // import male and female profile photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        // Create a user in data base
        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        })

        // Send a response user is created successfully.
        return res.status(200).json({
            message: "Account created successfully",
            success: true
        })
        console.log("User created successfully!!");

    } catch (error) {
        console.log(error);

    }
}

// Login controller
const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if ([userName, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid username or password",
                success: false
            });
        }

        const tokendata = {
            userId: user._id
        };
        const token = await jwt.sign(tokendata, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            _id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            message: "Logged in successfully",
            success: true
        })

        console.log("User logged in successfully!!");


    } catch (error) {
        console.log(error);

    }
}


// Logout
const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            meesage: "Logged out successfully."
        })
    } catch (error) {
        console.log(error);

    }
}


// Total users login
const getOtherUsers = async (req, res) => {
    try {
        const loggedInUser = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUser } }).select("-password");

        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);

    }
}
export { register, login, logout, getOtherUsers }