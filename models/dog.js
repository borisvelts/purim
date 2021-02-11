const mongoose = require("mongoose");
const DogSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        owner: String

    }
);

module.exports = mongoose.model("Dog", DogSchema);