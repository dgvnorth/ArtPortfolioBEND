const express = require("express")
const router = express.Router()

//Middleware
const {protect, admin} = require("../middleware/authMiddleware")

//Controllers

const {
    getAllBlogs,
    createBlog,
    updateBlog,
    getBlogbyId,
    deleteBlog,
} = require("../controllers/blogControllers")

// Routes

router.route("/").get(getAllBlogs).post(protect, admin, createBlog)

router.route("/:id").put(protect, admin, updateBlog).get(getBlogbyId).delete(protect, admin, deleteBlog)

module.exports = router

