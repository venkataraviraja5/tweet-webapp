import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect} from 'react';
import Cookies from 'js-cookie';
import "./PostCard.css"

const PostCard = ({post,fetchPosts}) => {
    const dateObject = new Date(post.createdAt);
    const formattedDate = dateObject.toLocaleDateString();

    const[cookie,setCookie] = useState({})
    const[likedPosts,setlikedPosts] = useState([])
    const[following,setFollowing] = useState([])
      
    const likeOrDilsike = likedPosts.includes(post._id) 
    const followCheckid = following.includes(post.userId)

    const likeBtn = async() =>{
        //console.log(post._id)
        const fetchUrl = await fetch('http://localhost:8080/like',{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                id:post._id,
                userId : cookie._id,
                likedislike : likeOrDilsike
            })
        })
         
        if(fetchUrl.ok){
            const result = await fetchUrl.json()
            //console.log(result.likedposts)
            setlikedPosts(result.likedposts)
        }
          fetchPosts()
       }
    
       const fetchUserInfo = async() =>{
        const fetchUrl  = await fetch("http://localhost:8080/userinfo",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                userId : cookie._id
            })
        })
    
        if(fetchUrl.ok){
          const result = await fetchUrl.json()
          //console.log("userinfo")
          if(result.trueOrFalse === true){
           // console.log("user")
            setlikedPosts(result.result.likedPosts)
            setFollowing(result.result.following)
          }
        }
       }
    
       const followBtn = async() =>{
        if(cookie._id != post.userId){
              const fetchUrl = await fetch("http://localhost:8080/follow",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    followId : post?.userId,
                    userId : cookie._id
                })
              })
    
              fetchUserInfo()
        }
       }
    
       const unFollowBtn = async() =>{
    
            const fetchUrl = await fetch("http://localhost:8080/unfollow",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    unFollowId : post?.userId,
                    userId : cookie._id
                })
            })
               fetchUserInfo()
       }
    
       useEffect(() => {
        const cookie = Cookies.get("myCookie");
        let cookieValue = '';
    
        if (cookie) {
           cookieValue = JSON.parse(cookie);
        }
          setCookie(cookieValue);
       },[])
    
       useEffect(() => {
        fetchUserInfo()
        //console.log(likedPosts)
       },[post])

  return (
   <div>
     
    <div className='post'>
     <div className='postcard-head'>
         <div className='postcard-date'>
         <Link to={"/" + post?.userId} className='link'><p>{post?.username}</p></Link>
         <p>{formattedDate}</p>
         </div>
         {
             post?.userId === cookie._id
             ? 
             null
             :
             <div>
              {
                 followCheckid 
                 ?
                  <p onClick={unFollowBtn}>Unfollow</p>
                 :
                 <p onClick={followBtn}>Follow</p>
              }
             </div>
         }
     </div>
   <Link to={'/q/' + post?._id} className='text-dec'>
   <h1>{post?.content}</h1>
   </Link>
   <div className='comment-section'>
     <Link to={'/q/' + post?._id} className='text-dec'>
     <p>Comment</p>
     </Link>
     <p onClick={likeBtn} >{likeOrDilsike ? "Liked" : "Like"}:{post?.likes}</p>
   </div>
   </div>
  </div>
  )
}

export default PostCard
