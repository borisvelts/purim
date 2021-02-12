const mongoose = require("mongoose");

const ChildSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        grade: String,
        age: Number,
        likes: Number,
        picture: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Picture"
        },
        status: {
            type: String,
            enum: ['APPROVED', 'WAITING'],
            default: 'WAITING'
        },

    }
);

module.exports = mongoose.model("Child", ChildSchema);