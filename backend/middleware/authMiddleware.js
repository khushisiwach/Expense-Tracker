const jwt = require("jsonwebtoken");
const User = require("../models/User");
const apiResponse = (data, message, status) => {
    return { data, message, status };
};

exports.protect = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json(apiResponse(null, "Not authorized, no token", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(404).json(apiResponse(null, "User not found", 404));
        }

        next();
    } catch (err) {
        res.status(401).json(apiResponse(null, "Not authorized, token failed", 401));
    }
};
