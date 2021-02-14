const mongoose = require("mongoose");

const TeaSchema = new mongoose.Schema(
    {
        type: String,
        age: Number,
        owner: String
    }
);

module.exports = mongoose.model("Tea", TeaSchema);