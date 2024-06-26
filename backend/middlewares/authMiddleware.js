const asyncHandler = require('express-async-handler');
const { verifyToken } = require('../lib/jwtToken');
const User = require('../models/userModel');


const auth = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = verifyToken(token);

            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not Authorized!');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not Authorized!, No Token provided!');
    }
});

module.exports = {auth}
