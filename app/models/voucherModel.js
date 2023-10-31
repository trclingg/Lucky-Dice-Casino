const mongoose = require("mongoose");

const schema = mongoose.Schema;

const voucherSchema = new schema({
    _id: mongoose.Types.ObjectId,
    code: {
        type: String,
        unique: true,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    }
}, {
    timestamps: true
}
)

module.exports = mongoose.model("voucherModel", voucherSchema)