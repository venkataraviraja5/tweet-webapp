import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import './Likedposts.css'
import PostCard from './PostCard'

const LikedPosts = () => {

    const{id} = useParams()

    const[likedPosts,setLikedPosts] = useState({})

    const likedPostsFun = async() =>{
        const fetchUrl = await fetch("https://tweet-web.onrender.com/profilelikedposts" + id,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
            })
        })
        if(fetchUrl.ok){
            const result = await fetchUrl.json()
           // console.log(result.likedposts)
            setLikedPosts(result.likedposts)
        }
    }

    useEffect(() => {
        likedPostsFun()
    },[id])

  return (
    <div className='likedposts'>
      <h1>Liked Posts</h1> 
      {
        likedPosts.length>0 ?
        <div>
            {likedPosts.map((value) => (
             value != null 
             ?
             <PostCard post={value} key={value._id} fetchPosts={likedPostsFun}/>
             :
             null
        ))
            }
        </div>
        :
        <p>Zero  Tweets Liked</p>
      }
    </div>
  )
}

export default LikedPosts
