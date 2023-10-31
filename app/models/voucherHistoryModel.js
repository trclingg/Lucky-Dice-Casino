const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const voucherHistorySchema = new Schema({
    _id: mongoose.Types.ObjectId,
	user: {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
        required: true
    },
	voucher: {
        type: mongoose.Types.ObjectId,
        ref: "voucher",
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("voucherHistoryModel", voucherHistorySchema)