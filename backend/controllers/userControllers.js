const asyncHandler = require('express-async-handler');

const {generateToken} = require('../utils/generateToken');

// Models
const User = require('../models/User');

// @route        POST/api/user
// @desc         Register user and create token
// @accesss      Public

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password, isAdmin} = req.body

    const userExists = await User.findOne({email})

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password,
        isAdmin: isAdmin && isAdmin,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

// @route        GET/api/user
// @desc         Get all users
// @accesss      Public

const getAllUsers = asyncHandler(async (req, res)=> {
    const users = await User.find()
    res.json(users)
})

// @route        POST/api/user/login
// @desc         Login user & get user
// @accesss      Public

const loginUser = asyncHandler(async (req, res)=> {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

// @route        DELETE/api/user/:id
// @desc         Delete User by ID
// @accesss      Public

module.exports = {registerUser, getAllUsers, loginUser}