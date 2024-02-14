import React from 'react'
import { Link } from 'react-router-dom'
import { useState , useEffect} from 'react';
import Cookies from 'js-cookie';
import "./PostCard.css"
import FlashMessage from './FlashMessage';
import {AiFillLike, AiFillDislike} from 'react-icons/ai'

const PostCard = ({post,fetchPosts}) => {
    const dateObject = new Date(post.createdAt);
    const formattedDate = dateObject.toLocaleDateString();

    const filePath = post.imageUrl || "";
    const fileName = filePath.replace(/^.*[\\\/]/, '');
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');

    const[cookie,setCookie] = useState({})
    const[likedPosts,setlikedPosts] = useState([])
    const[following,setFollowing] = useState([])
    const[cookieValue,setCookieValue] = useState(false)
    const[flashMessage,setFlashMessage] = useState('')
      
    const likeOrDilsike = likedPosts.includes(post._id) 

    const likeBtn = async() =>{
        //console.log(post._id)
          if(cookieValue === true){
            const fetchUrl = await fetch('https://tweet-web.onrender.com/like',{
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
          }
          else{
            //console.log("login first")
            setFlashMessage("Please Login")
            setTimeout(() => {
                setFlashMessage('')
              }, 2000);
          }
          fetchPosts()
       }
    
       const fetchUserInfo = async() =>{
        const fetchUrl  = await fetch("https://tweet-web.onrender.com/userinfo",{
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
            //console.log("follow",result.result.following)
            setlikedPosts(result.result.likedPosts)
            setFollowing(result.result.following)
          }
        }
       }
    
       const followBtn = async() =>{
        if(cookie._id != post.userId && cookieValue === true){
              const fetchUrl = await fetch("https://tweet-web.onrender.com/follow",{
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
              fetchPosts()
        }
        else{
           // console.log("please login")
            setFlashMessage("please Login")
            setTimeout(() => {
                setFlashMessage('')
              }, 2000);
        }
       }
    
       const unFollowBtn = async() =>{
    
            const fetchUrl = await fetch("https://tweet-web.onrender.com/unfollow",{
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
               fetchPosts()
       }

       const deleteFun = async() =>{
         const fetchUrl = await fetch("https://tweet-web.onrender.com/delete",{
            method:"POST",
            headers:{
                "Content-Type" :"application/json"
            },
            body:JSON.stringify({
                postId:post._id,
                userId:cookie._id
            })
         })
          if(fetchUrl.ok){
            const result = await fetchUrl.json()
           // console.log(result)
            if(result){
                fetchPosts()
            }
          }
       }
    
       useEffect(() => {
        const cookie = Cookies.get("myCookie");
    
        if (cookie) {
           const cookieValue = JSON.parse(cookie);
           setCookie(cookieValue);
           setCookieValue(true)
        }
       },[Cookies.get("myCookie")])
    
       useEffect(() => {
        fetchUserInfo()
       },[post])

  return (
   <div>
    <FlashMessage message={flashMessage}/>
    <div className='post'>
     <div className='postcard-head'>
         <div className='postcard-date'>
         <Link to={"/" + post?.userId} className='link'><b>{post?.username}</b></Link>
         <p>{formattedDate}</p>
         </div>
         {
             post?.userId === cookie._id
             ? 
             <div>
                <p onClick={deleteFun}>Delete</p>
             </div>
             :
             <div>
                        {following.includes(post.userId) ? (
                            <p onClick={unFollowBtn}>Unfollow</p>
                        ) : (
                            <p onClick={followBtn}>Follow</p>
                        )}
                   
             </div>
         }
     </div>
   <Link to={'/q/' + post?._id} className='text-dec'>
   <p>{post?.content}</p>
   {
    fileNameWithoutExtension ?
    <div>
        <img src={post.imageUrl
    }  className='postImage'/>
    </div>
    :
    null
   }
   </Link>
   <div className='comment-section'>
     <Link to={'/q/' + post?._id} className='text-dec'>
     <b>Comment</b>
     </Link>
     <b onClick={likeBtn} >{likeOrDilsike ? <AiFillLike color="red" size="20" className='like'/> 
     : <AiFillLike color="black" size="20" className='like'/>}
     :{post?.likes}</b>
   </div>
   </div>
  </div>
  )
}

export default PostCard
