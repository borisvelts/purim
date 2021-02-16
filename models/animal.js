const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema(
    {
        name: String,
        type: String, // Dog, Cat, Hamster....
        neighborhood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Neighborhood"
        },
        Picture: {  
            type: mongoose.Schema.Types.ObjectId,
            ref: "Picture"
        },
        likes: Number
    }
);

module.exports = mongoose.model("Animal", AnimalSchema);