import React from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react'
import PostCard from './PostCard'
import "./Feed.css"
import FlashMessage from './FlashMessage'

const Feed = () => {
    const[content,setContent] = useState('')
    const[imageUrl,setImageUrl] = useState('')
    const[feed,setFeed] = useState([])
    const[cookieValue,setCookieValue] = useState(false)
    const[cookie,setCookie] = useState({})
    const[flashMessage,setFlashMessage] = useState('')
  
    const handleFileChange = (e) => {
      const selectedImage = e.target.files[0]
      //console.log(selectedImage)
    };
  
      const createPost = async() =>{
         if(cookieValue){
          const fetchUrl = await fetch("http://localhost:8080/createpost",{
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body:JSON.stringify({
              content:content,
              username:cookie.username,
              userid:cookie._id
            })
        })
  
        if(fetchUrl.ok){
            const result = await fetchUrl.json()
           // console.log(result)
            setContent('')
        }
         }
         else{
          //console.log("login first")
          setFlashMessage('Login First')
         }

         await fetchPosts()
      }

      const fetchPosts = async() => {
        const fetchUrl = await fetch("http://localhost:8080/fetchposts")
        const result = await fetchUrl.json()
       // console.log("feed")
        setFeed(result.result)
        
      }
  
      const getCookie = () =>{
        const cookievalue = Cookies.get('myCookie')
        if(cookievalue){
         setCookieValue(true)
         const retrievedObject = JSON.parse(cookievalue);
         setCookie(retrievedObject)
        // console.log(retrievedObject);
        }
        else{
         setCookie(false)
        }
      }

      useEffect(() => {
        fetchPosts()
       // console.log(feed)
      },[])

      useEffect(() => {
        getCookie()
      },[Cookies.get('myCookie')])
  
  return (
   
      <div className='home'>
      <div className='inputbox'>
           <FlashMessage message={flashMessage}/>
           <input type='text' placeholder='Enter your message'
             onChange={(e) => setContent(e.target.value)}
           /> 
           <input type='file'
            onChange={handleFileChange}
           />
           <button onClick={createPost}>Post</button>
      </div>
      <div className='posts'>
        
        {
          feed.length > 0 ? 
          <div>
             {
              feed.map((value) => (
                <PostCard post={value} key={value._id} fetchPosts={fetchPosts}/>
              ))
             }
          </div>
          :
          <h1>Loading</h1>
        }
      </div>
    </div>
   
  )
}

export default Feed
