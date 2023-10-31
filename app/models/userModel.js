const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    username: {
        type: String,
        unique : true ,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    }
},
{ timestamps: true });

module.exports = mongoose.model('userModel', userSchema);