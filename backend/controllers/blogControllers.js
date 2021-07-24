const asyncHandler = require("express-async-handler")

//Model
const Blog = require("../models/Blog")

// @route        GET/api/blog
// @desc         Get all blog posts
// @accesss      Public

const getAllBlogs = asyncHandler(async(req, res) => {
    const pageSize = Number(req.query.pageSize) || 10
    const pageNumber = Number(req.query.pageNumber) || 1

    const count = await Blog.countDocuments()

    const blogs = await Blog.find().limit(pageSize).skip(pageSize * (pageNumber - 1))

    res.json({ blogs, pageNumber, pages: Math.ceil(count / pageSize)})
})

// @route        GET/api/blog/:id
// @desc         Fetch a single blog
// @accesss      Public

const getBlogbyId = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
        res.json(blog)
    } else {
        res.status(404)
        throw new Error("Blog not found")
    }
})

// @route        DELETE/api/blog/:id
// @desc         Delete a single blog
// @accesss      Private/Admin

const deleteBlog = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id)
    if (blog){
        await blog.remove()
        res.json({message: "Blog removed"})
    } else {
        res.status(404)
        throw new Error("Blog not found")
    }
})

// @route        POST/api/blog
// @desc         Create a new blog post
// @accesss      Private/Admin

const createBlog = asyncHandler(async (req, res) => {
    const blog = new Blog({
        title: "Sample Title",
        image: "Sample Image",
        content: "Sample Content",
        description: "Sample Description",
    })
    const createdBlog = await blog.save()
    res.status(201).json(createdBlog)
})

// @route        PUT/api/blog
// @desc         Update blog post
// @accesss      Private/Admin

const updateBlog = asyncHandler(async(req, res) => {
    const {title, image, content, description} = req.body
    const blog = await Blog.findById(req.params.id)

    if (blog) {
        blog.title = title
        blog.image = image
        blog.content= content
        blog.description = description
    }

    const updatedBlog = await blog.save()

    res.status(201).json(updatedBlog)
})

module.exports = {
    getAllBlogs,
    createBlog,
    updateBlog,
    getBlogbyId,
    deleteBlog,
}
