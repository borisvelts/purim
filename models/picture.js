const mongoose = require("mongoose");

// const cloudinary = require("cloudinary");
// cloudinary.config({
//     cloud_name: "alicecode-purim",
//     //TODO: change keys when delivering to adi
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET
// });

const PictureSchema = new mongoose.Schema(
    {
        public_id: String,
        secure_url: String,
    }
);

// PictureSchema.pre('remove', function (next) {
//     cloudinary.uploader.destroy(this.public_id)
// });

module.exports = mongoose.model("Picture", PictureSchema);