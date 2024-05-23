const asyncHandler = require('express-async-handler');
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")
const { generateToken } = require("../lib/jwtToken");


// @desc Register new user
// @route POST /api/users/register
// @access Public
const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(422)
        throw new Error('Please Fill all required Fields!');
    }

    // Check if User already exists
    const exists = await User.findOne({ email });
    if (exists) {
        res.status(400)
        throw new Error("User Already Exists!");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create User
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data!');
    }
});

// @desc Authenticate user
// @route POST /api/users/login
// @access Public
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } else {
        res.status(401);
        throw new Error('Invalid Credentials!');
    }
});

// @desc Get user Data
// @route GET /api/users/me
// @access Private
const userProfile = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    });
});

module.exports = {
    userRegister,
    userLogin,
    userProfile
}