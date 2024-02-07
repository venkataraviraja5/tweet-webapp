const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const auth = require("./routes/auth")
const postDetails = require("./routes/post")
const profile = require("./routes/profile")
const cors = require("cors")

app.use(bodyParser.json())

app.use(cors())

app.use(auth)
app.use(postDetails)
app.use(profile)

app.listen(8080,()=>{
    console.log("server running on 8080")
})

mongoose.connect(
    "mongodb+srv://raviraja2000:raviraja2000@cluster0.eabcdxj.mongodb.net/tweet?retryWrites=true&w=majority"
).then(() => console.log("connected")).catch((err) => console.log("not connected"))