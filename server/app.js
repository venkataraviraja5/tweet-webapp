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


app.use(bodyParser.json())
app.use(multer({storage:fileStorage}).single('image'))
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
    ""
).then(() => console.log("connected")).catch((err) => console.log("not connected"))
