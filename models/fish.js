const mongoose = require("mongoose");
const CatSchema = new mongoose.Schema(
    {
        name: String,
        age: Number,
        owner: String

    }
);

module.exports = mongoose.model("fish", CatSchema);