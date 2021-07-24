const express = require('express')
const router = express.Router()

// Middleware

const { protect, admin } = require("../middleware/authMiddleware")

// Controllers

const {
    getImages, postImage, getImageById, updateImage, deleteImage, 
} = require("../controllers/imageControllers")

// Routes

router.route('/').post(protect, admin, postImage).get(getImages)
router.route('/:id').delete(protect, admin, deleteImage).put(protect, admin, updateImage).get(protect, admin, getImageById)

module.exports = router