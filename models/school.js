const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
    {
        name: String,
        type: String,
        children: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Child"
            }
        ]
    }
);

module.exports = mongoose.model("School", SchoolSchema);