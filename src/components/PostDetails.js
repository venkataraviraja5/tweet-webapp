import React from 'react'
import "./PostDetails.css"
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Cookies from 'js-cookie'
import FlashMessage from './FlashMessage'

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

    const postDetailsPage = async() =>{
        const fetchUrl = await fetch(`http://localhost:8080/postdetails/${id}`,{
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
            const fetchUrl = await fetch("http://localhost:8080/addcomment",{
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
            console.log("Login first")
            setFlashMessage("Login First")
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
            <p>{postDetails.username}</p>
            <p>{formattedDate} </p>
        </div>
        <div>
            <h1>{postDetails.content}</h1>
        </div>
      </div>
      <FlashMessage message={flashMessage}/>
      <div className='commentbox'>
        <input type='text' placeholder='Enter Your Comment'
         onChange={(e) => setComment(e.target.value)}
        /> <button onClick={addComment}>Comment</button>
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
        <p>No coments</p>
       }
      </div>
    </div>
  )
}

export default PostDetails
