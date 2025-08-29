const User = require('../models/User');
const jwt = require('jsonwebtoken');

const apiResponse = (data, message, status) => {
    return { data, message, status };
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3h" });
};


exports.registerUser = async (req, res) => {
    const { fullName, email, password, profileImageUrl } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json(apiResponse(null, "All fields are required", 400));
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json(apiResponse(null, "Email already in use", 400));
        }

        const user = await User.create({ fullName, email, password, profileImageUrl });
        const { password: pwd, ...userData } = user._doc;

        res.status(201).json(apiResponse( userData , "User registered successfully", 201));
    } catch (err) {
        res.status(500).json(apiResponse(null, `Error registering user: ${err.message}`, 500));
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(apiResponse(null, "All fields are required", 400));
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json(apiResponse(null, "Invalid credentials", 400));
        }

        const token = generateToken(user._id);

        res.cookie("token", token, {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
            maxAge: 3 * 60 * 60 * 1000,
        });

        const { password: pwd, ...userData } = user._doc;

        res.status(200).json(apiResponse({ id: user._id, user: userData }, "Login successful", 200));

    } catch (err) {
        res.status(500).json(apiResponse(null, `Error logging in user: ${err.message}`, 500));
    }
};


exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');

        if (!user) {
            return res.status(404).json(apiResponse(null, "User not found", 404));
        }

        res.status(200).json(apiResponse(user, "User info fetched successfully", 200));
    } catch (err) {
        res.status(500).json(apiResponse(null, `Error getting user info: ${err.message}`, 500));
    }
};

