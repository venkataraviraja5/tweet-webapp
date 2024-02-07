const User = require("../models/auth")
const Posts = require("../models/post")

exports.profileDetails = async(req,res,next) =>{
    const {id}= req.params
    console.log(id)
    if(id){
            const userExists = await User.findById({_id:id})

            if(userExists){
                  //console.log(userExists.posts)
                  const postsPromises = userExists.posts.map((postId) => {
                    return Posts.findById(postId);
                  });
            
                  const posts = await Promise.all(postsPromises);

                  //console.log(posts)
            
                  res.status(200).json({ posts: posts,user:userExists});
            }
            else{
                //console.log("user not found")
                res.json({result:"post fetch Failed"})
            }
      
    }
    else if(id === undefined){
        res.json({result:"undefined"})
    }
    else{
        res.json({result:"profile Deosnt Fetch"})
    }
}


exports.userInfoLikeAndFollow = async(req,res,next) => {
    const userId = req.body.userId
   // console.log(userId)

   const userPosts = await User.findById(userId)
   
   if(userPosts){
    res.status(201).json({result : userPosts,trueOrFalse : true})
    //console.log(userPosts)
   }
   else{
    //console.log("not fetched")
    res.json({result:"user not fetched"})
   }
}

exports.followUser = async(req,res,next) => {
    const followId = req.body.followId
    const userId = req.body.userId
    //console.log("follow",followId,userId)

    const user = await User.findById(userId)
    const followingUser = await User.findById(followId)

    if(followingUser && user){
       // console.log("follow")
        followingUser.followers.push(userId)
        user.following.push(followId)

        await user.save()
        await followingUser.save()
        res.status(201).json({reult:"succesfull"})
    }
    else{
        console.log("missing")
        res.json({json:"Follow doesnt work"})
    }
}

exports.unFollowUser = async(req,res,next) =>{
    const unfollowId = req.body.unFollowId
    const userId = req.body.userId

   // console.log("unfollow",unfollowId, userId)
    
    const user = await User.findById(userId)
    const unFollowIdUser = await User.findById(unfollowId)

    if(user && unFollowIdUser){
       // console.log("unfollow")
       const userFilter = user.following.filter((value) => value != unfollowId)
       user.following = userFilter
       
       const unfollowingFilter = unFollowIdUser.followers.filter((value) => value != userId)
       unFollowIdUser.followers = unfollowingFilter

       await user.save()
       await unFollowIdUser.save()
       res.status(202).json({result:"succesfull"})
    }
    else{
        console.log("sonething is missing")
        res.json({result:"unfollow doesnt work"})
    }
}