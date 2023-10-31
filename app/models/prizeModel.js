const mongoose = require("mongoose");

const schema = mongoose.Schema;

const prizeSchema = new schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model("prizeModel", prizeSchema)