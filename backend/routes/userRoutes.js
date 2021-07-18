const express = require('express');

const router = express.Router()

//Controllers

const { registerUser } = require('../controllers/userController')

//Routes

router.route("/").post(registerUser)

module.exports = router