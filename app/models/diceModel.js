const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const diceSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        type:  mongoose.Types.ObjectId,
        ref: "userModel"
    },
    dice: {
        type: Number,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
},

{ timestamps: true });

module.exports = mongoose.model('diceModel', diceSchema);