const mongoose = require('mongoose');

const GetHelpSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobileNumber:{
        type: Number,
        required: true,
        unique: true
    },
    type:{
        type: String,
        required: true
    },
    data:{
        type: Date,
        default: Date.now
    }
});
module.exports = User = mongoose.model('gethelp',GetHelpSchema);
