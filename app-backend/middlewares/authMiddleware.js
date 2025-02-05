const jwt = require("jsonwebtoken");
require("dotenv").config();


const authMiddleware = async (req, res, next) => {
    // const token = req.header("Authorization");
    const token = req.cookies._auth;
    // console.log(req);
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;