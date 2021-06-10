const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

var users = mongoose.model('user',userSchema)
module.exports= users;

