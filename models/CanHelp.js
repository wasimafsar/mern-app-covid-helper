const mongoose = require('mongoose');

const CanHelpSchema = new mongoose.Schema({
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
module.exports = User = mongoose.model('canhelp',CanHelpSchema);
