const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const prizeHistorySchema = new Schema({
    _id: mongoose.Types.ObjectId,
	user: {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
        required: true
    },
	prize: {
        type: mongoose.Types.ObjectId,
        ref: "prize",
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("prizeHistoryModel", prizeHistorySchema)