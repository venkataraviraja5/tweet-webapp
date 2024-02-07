const PostSchema = require("../models/post")
const User = require("../models/auth")

exports.postCreatePost = async(req,res,next) => {
    const content = req.body.content
    const username = req.body.username
    const userid = req.body.userid
  //  console.log(content)
    const newPost = new PostSchema({
        content:content,
        imageUrl:"url",
        username:username,
        likes:0,
        comments:[],
        userId:userid
    })

    const result = await newPost.save()

        const newUser = await User.findById({_id : userid})
       // console.log(newUser)
        if(newUser){
            newUser.posts.unshift(result._id)
           // console.log(result._id)
           await newUser.save()
        }
    res.status(201).json({result:"post created successfull"})
}

exports.fetchPosts =async (req,res,next) =>{
    const posts =  await PostSchema.find().sort({createdAt : -1})
    //console.log(posts)
  
    if(posts){
      res.status(201).json({result:posts})
    }
    else{
      res.json({result:"post doesnt fetch"})
    }
  }

exports.postDetails = async(req,res,next) =>{
    const {id} = req.params
    //console.log(id)

   const postdetails = await PostSchema.findOne({_id : id})

   if(postdetails){
     res.status(201).json({result:postdetails})
   // console.log(postdetails)
   }
   else{
    res.json({result:"Not Fetched"})
   }
}

exports.addComment = async(req,res,next) => {
    const id = req.body.id
    const comment = req.body.comment
    const username = req.body.username
    
    const post = await PostSchema.findById(id)

    if(post){
        post.comments.unshift({username:username,comment:comment})
        await post.save()
        res.status(201).json({result:"add comment successfull"})
    }
}


exports.likepost = async(req,res,next) =>{
    const id = req.body.id
    const userId = req.body.userId
    const likeOrDislike = req.body.likedislike
    //console.log(likeOrDislike)
    //console.log(userId)
    const post = await PostSchema.findOne({_id : id})
    const user = await User.findById(userId)
    
  
    if(post && user){
      if(likeOrDislike === false){
          post.likes = post.likes + 1
          user.likedPosts.push(id)
          await post.save()
          await user.save()
        //  console.log(user.likedPosts)
          await res.status(202).json({likedposts : user.likedPosts})
      }
      else{
          post.likes = post.likes - 1
          const filterDislike =  user.likedPosts.filter((value) => value != id)
         // console.log(filterDislike)
          user.likedPosts = filterDislike
          await post.save()
          await user.save()
          await res.status(202).json({likedposts : user.likedPosts})
      }
    }
    else{
        res.json({result:"not Liked"})
    }
  }