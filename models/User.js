const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        trim: true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

module.exports = mongoose.model('Users', userSchema);