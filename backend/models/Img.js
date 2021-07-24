const mongoose = require("mongoose")

const imgSchema = new mongoose.Schema(
    {
        src: {
            type: Array,
            required: true,
        },
        alt: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = Img = mongoose.model("Img", imgSchema)