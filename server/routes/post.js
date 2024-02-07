const express = require("express")
const router = express.Router()
const post = require("../controllers/post")

router.post("/createpost",post.postCreatePost)
router.get("/fetchposts",post.fetchPosts)
router.post("/postdetails/:id",post.postDetails)
router.post("/addcomment",post.addComment)
router.post('/like',post.likepost)

module.exports = router