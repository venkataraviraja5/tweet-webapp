const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    content:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    username:{
        type:Object,
    },
    likes:{
        type:Number,
    },
    comments:{
        type:Array,
    },
    userId:{
        type:String,
    }

},
{timestamps:true}

)

module.exports = mongoose.model('posts',postSchema)