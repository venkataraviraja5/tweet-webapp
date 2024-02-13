const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const auth = require("./routes/auth")
const postDetails = require("./routes/post")
const profile = require("./routes/profile")
const cors = require("cors")
const path = require('path')
const multer = require("multer")

app.use(cors())

const fileStorage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,path.resolve(__dirname, 'images'))
    },
    filename:(req,file,cb) =>{
        cb(null, file.originalname)
    }
})

const fileFilter = (req,file,cb) =>{
    if(
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

app.use(bodyParser.json())
app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))
app.use('/images',express.static(path.join(__dirname,'images')))

app.get('/',(req,res,next) => {
    res.send("Api is Running")
    next()
})
app.use(auth)
app.use(postDetails)
app.use(profile)

app.listen(8080,()=>{
    console.log("server running on 8080")
})

mongoose.connect(
    "mongodb+srv://raviraja2000:raviraja2000@cluster0.eabcdxj.mongodb.net/tweet?retryWrites=true&w=majority"
).then(() => console.log("connected")).catch((err) => console.log("not connected"))