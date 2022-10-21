const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId:{
        required:true,
        type:Number
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    }
});

const UserModel = mongoose.model('User',userSchema);

module.exports = UserModel;