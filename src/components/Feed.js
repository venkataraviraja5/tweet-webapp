import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { useState,useEffect } from 'react'
import PostCard from './PostCard'
import "./Feed.css"
import FlashMessage from './FlashMessage'
import Button from 'react-bootstrap/Button';
import { UseSelector, useSelector } from 'react-redux'

const Feed = () => {
    const[content,setContent] = useState('')
    const[imageUrl,setImageUrl] = useState('')
    const[feed,setFeed] = useState([])
    const[cookieValue,setCookieValue] = useState(false)
    //const[cookie,setCookie] = useState({})
    const[flashMessage,setFlashMessage] = useState('')

    const cookie = useSelector(store => store.app.cookieObj)

  
    const handleFileChange = (e) => {
      const selectedImage = e.target.files[0]
     // console.log(selectedImage)
      setImageUrl(selectedImage)
    };
  
      const createPost = async() =>{
        const formData = new FormData()
        formData.append('content',content)
        formData.append('username',cookie.username)
        formData.append('userid' ,cookie._id )
        formData.append('image' , imageUrl)

         if(cookie._id){
          const fetchUrl = await fetch("http://localhost:8080/createpost",{
            method:"POST",
            body:formData
        })
  
        if(fetchUrl.ok){
            const result = await fetchUrl.json()
           // console.log(result)
            setContent('')
        }
         }
         else{
          //console.log("login first")
          setFlashMessage('Please Login')
          setTimeout(() => {
            setFlashMessage('')
          }, 2000);
         }
          setContent('')
          setImageUrl('')
         await fetchPosts()
      }

      const fetchPosts = async() => {
        const fetchUrl = await fetch("http://localhost:8080/fetchposts")
        const result = await fetchUrl.json()
       // console.log("feed")
        setFeed(result.result)
        
      }
  

      useEffect(() => {
        fetchPosts()
       // console.log(feed)
      },[])
  
  return (
   
      <div className='home'>
         <FlashMessage message={flashMessage}/>
      <div className='inputbox'>
           <input type='text' placeholder='Enter your message'
             value={content}
             onChange={(e) => setContent(e.target.value)}
           /> 
           <input type='file'
          
            placeholder='select Your Image'
            onChange={handleFileChange}
           />
           <Button variant="success"  onClick={createPost}>Tweet</Button>{' '}
      </div>
      <div className='posts'>
        
        {
          feed ? 
          <div>
             {
              feed.map((value) => (
                <PostCard post={value} key={value._id} fetchPosts={fetchPosts}/>
              ))
             }
          </div>
          :
          <h1>Loading..</h1>
        }
      </div>
    </div>
   
  )
}

export default Feed
