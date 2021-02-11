const mongoose = require("mongoose");

const AlienSchema = new mongoose.Schema(
    {
        name: String,
        numOfEyes: Number,
        planet: String

    }
);

module.exports = mongoose.model("Alien", AlienSchema); 