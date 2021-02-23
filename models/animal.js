const mongoose = require("mongoose");

const AnimalSchema = new mongoose.Schema(
    {
        animalName: String,
        animalType: String, // Dog, Cat, Hamster....
        firstName: String,
        lastName: String,
        cellphone: String,
        address: String,
        approveJoin: Boolean,
        status: {
            type: String,
            enum: ['APPROVED', 'WAITING'],
            default: 'WAITING'
        },
        neighborhood: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Neighborhood"
        },
        picture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Picture"
        },
        likes: {
            type: Number,
            default: 0
        }
    }
);

module.exports = mongoose.model("Animal", AnimalSchema);