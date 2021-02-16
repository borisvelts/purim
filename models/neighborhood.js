const mongoose = require("mongoose");

const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: "dssfbfwa5",
    //TODO: change keys when delivering to adi
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const NeighborhoodSchema = new mongoose.Schema(
    {
        name: String,   
        families: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Family"
            },
        ],
        picture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Picture"
        },
    }
);



NeighborhoodSchema.pre('remove', async function (next) {
    var id = await this.populate('image').public_id;
    cloudinary.uploader.destroy(id)
});

module.exports = mongoose.model("Neighborhood", NeighborhoodSchema);