const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    username:{
        type:Object,
        required:true
    },
    likes:{
        type:Number,
        required:true
    },
    comments:{
        type:Array,
        requires:true
    },
    userId:{
        type:String,
        require:true
    }

},
{timestamps:true}

)

module.exports = mongoose.model('posts',postSchema)