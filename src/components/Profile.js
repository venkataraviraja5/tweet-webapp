import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import PostCard from './PostCard'
import { Link } from 'react-router-dom'
import './Profile.css'
import Cookies from 'js-cookie'
import Login from './Login'


const Profile = () => {
    const{id} = useParams()
    //console.log(id)
     
    const[cookie,setCookie] = useState(false)
    const[posts,setPosts] = useState([])
    const[user,setUser] = useState({})
    const[login,setLogin] = useState(false)

    const profileDetails = async() =>{
      if(id != undefined){
        const fetchUrl = await fetch("https://tweet-web.onrender.com/profile/" + id,{
          method:"POST",
          headers:{
              "Content-Type" : "application/json"
          }
      })

      if(fetchUrl.ok){
          //console.log("fetched")
          const result = await fetchUrl.json()
         // console.log(result)
          setUser(result.user)
          setPosts(result.posts)
          setLogin(true)
      }
      else{
         // console.log("not fetched")
          setLogin(false)
      } 
      }
      
    }

    useEffect(() => {
      const cookie = Cookies.get("myCookie")
        if(cookie){
          setCookie(true)
        }
    },[Cookies.get('myCookie')])

    useEffect(() => {
        profileDetails()
    },[id])

    
  return (
    <div>
      {
        login ?
        <div className='postdetailspage'>
        {
          user ?
  
            <div className='userdetails'>
              <div className='username'>
                <h1>{user.username}</h1>
                <div className='follow_unfollow'>
                  <Link to={"/following/" + id} className='link'><p>Following</p></Link>
                  <Link to={"/followers/" + id} className='link'><p>Followers</p></Link>
                </div>
              </div>
            <div>
         {
           posts.length > 0 ?
           <div>
             {
              posts.map((value,index) => (
                  <div key={index}>
                     <PostCard post={value} fetchPosts={profileDetails}/>
                  </div>
              ))
             }
           </div>
           :
           <p>Zero Tweets <Link to={"/"}>Create Post</Link></p>
         }
          </div>
            </div>
            :
            null
        }
      </div>
      :
       <Login />
      }
    </div>
  )
}

export default Profile
