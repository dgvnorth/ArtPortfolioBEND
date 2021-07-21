const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
     image: {
        type: String,
        required: true,
    },
     description: {
        type: String,
        required: true,
    },
     content: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
)

module.exports = Blog = mongoose.model("Blog", blogSchema)