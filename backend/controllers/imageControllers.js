const asyncHandler = require("express-async-handler")

// Models
const Img = require("../models/Img")

// @route        GET/api/image
// @desc         Get all images
// @accesss      Public

const getImages = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 10
    const page = Number(req.query.pageNumber) || 1

    const count = await Img.countDocuments()

    const images = await Img.find().limit(pageSize).skip(pageSize * (page -1))

    res.json({ images, page, pages: Math.ceil(count / pageSize)})
})

// @route        POST/api/image
// @desc         Create image entry
// @accesss      Private / Admin

const postImage = asyncHandler(async (req, res) => {
    const image = new Img({
        alt: "Sample Alt",
        src: "/uploads/sample.jpg",
        author: req.user._id,
    })

    const createdImage = await image.save()

    res.status(201).json(createdImage)
})

// @route        GET/api/image/:id
// @desc         Get single image
// @accesss      Private / Admin

const getImageById = asyncHandler(async (req, res) => {
    const image = await Img.findById(req.params.id)
    if (image) {
        res.json(image)
    } else {
        res.status(404)
        throw new Error("Image not found")
    }
})

// @route        PUT/api/image/:id
// @desc         Update image entry
// @accesss      Private / Admin

const updateImage = asyncHandler(async (req, res) => {
    const { src, alt, author } = req.body
    const image = await Img.findById(req.params.id)

    if (image) {
        image.src = src ? src : image.src
        image.alt = alt ? alt : image.alt
        image.author = author ? author : image.author

        const updatedImage = await image.save()
        res.json(updatedImage)
    } else {
        res.status(404)
        throw new Error("Image not found")
    }
})

// @route        DELETE/api/image/:id
// @desc         Delete single image
// @accesss      Private / Admin

const deleteImage = asyncHandler(async (req, res) => {
    const image = await Img.findById(req.params.id)

    if (image) {
        await image.remove()
        res.json({ message: "Image Removed"})
    } else {
        res.status(404)
        throw new Error("Image not found")
    }
})
module.exports = { getImages, postImage, getImageById, updateImage, deleteImage, }
