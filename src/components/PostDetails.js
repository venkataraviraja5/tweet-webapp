import React from 'react'
import "./PostDetails.css"
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import FlashMessage from './FlashMessage'
import { Button } from 'react-bootstrap'

const PostDetails = () => {
    const {id} = useParams()
    //console.log("params" ,id)
    const[postDetails,setPostDetails] = useState('')
    const[comments,setComments] = useState([])
    const[comment,setComment] = useState('')
    const[cookieObj,setCookie] = useState({})
    const[cookieStateValue,setCookieStateValue] = useState(false)
    const[flashMessage,setFlashMessage] = useState('')

     const dateObject = new Date(postDetails.createdAt);
    const formattedDate = dateObject.toLocaleDateString();

    const filePath = postDetails.imageUrl || "";
    const fileName = filePath.replace(/^.*[\\\/]/, '');
    const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');

    const postDetailsPage = async() =>{
        const fetchUrl = await fetch(`https://tweet-web.onrender.com/postdetails/${id}`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            }
        })

        if(fetchUrl.ok){
            const result =await fetchUrl.json()
           // console.log(result)
            setPostDetails(result.result)
            setComments(result.result.comments)
        }
        else{
            console.log("not fetched")
        }
    }

    const addComment = async() => {
        if(cookieStateValue === true){
            const fetchUrl = await fetch("https://tweet-web.onrender.com/addcomment",{
                method:"POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body:JSON.stringify({
                    id:id,
                    username:cookieObj.username,
                    comment:comment,
                })
            })
        }
        else{
           // console.log("Login first")
            setFlashMessage("Please Login")
            setTimeout(() => {
                setFlashMessage('')
              }, 2000);
        }
    }
    
    const getCookie = () =>{
        const cookie = Cookies.get('myCookie');
        //console.log(retrievedObject)
       if(cookie){
        const parsedCookie = JSON.parse(cookie)
        setCookie(parsedCookie)
        setCookieStateValue(true)
       }
    }

    useEffect(() => {
        postDetailsPage()
    },[comments])

    useEffect(() => {
        getCookie()
    },[Cookies.get("myCookie")])

  return (
    <div className='postDetailsPage'>
      <div className='postDetailsCard'>
        <div className='username-date'>
            <b>{postDetails.username}</b>
            <p>{formattedDate} </p>
        </div>
        <div>
            <p>{postDetails.content}</p>
            {
                fileNameWithoutExtension ?
                <img src={`https://tweet-web.onrender.com/images/${fileNameWithoutExtension}.png` || `https://tweet-web.onrender.com/images/${fileNameWithoutExtension}.jpg` || 
      `https://tweet-web.onrender.com/images/${fileNameWithoutExtension}.jpeg`
    }  className='postImage'/>
    :
    null
            }
        </div>
      </div>
      <FlashMessage message={flashMessage}/>
      <div className='commentbox'>
        <input type='text' placeholder='Enter Your Comment'
         onChange={(e) => setComment(e.target.value)}
        />  <Button variant="success" onClick={addComment}>Comment</Button>{' '}
      </div>
      <div>
       {
        comments.length > 0 ?
        <div>
            {
             comments.map((value,index) => (
                <div key={index} className='comment'>
                    <p>{value.username}</p>
                    <p>{value.comment}</p>
                </div>
             ))
            }
        </div>
        :
        <p>No comments yet!!!</p>
       }
      </div>
    </div>
  )
}

export default PostDetails
