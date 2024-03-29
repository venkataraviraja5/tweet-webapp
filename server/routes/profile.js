const express = require("express")
const router = express.Router()
const profile = require("../controllers/profile")

router.post("/profile/:id",profile.profileDetails)
router.post("/userinfo",profile.userInfoLikeAndFollow)
router.post("/follow",profile.followUser)
router.post("/unfollow",profile.unFollowUser)
router.post("/userfollowers/:id",profile.userFollowers)
router.post("/userfollowing/:id",profile.userFollowing)
router.post("/profilelikedposts:id",profile.profilelikedPosts)

module.exports = router