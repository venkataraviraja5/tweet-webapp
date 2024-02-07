const mongoose = require("mongoose")
const Schema = mongoose.Schema

const user = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    posts:{
        type:Array
    },
    likedPosts:{
        type:Array
    },
    following:{
        type:Array
    },
    followers:{
        type:Array
    }
})

module.exports = mongoose.model("users",user)