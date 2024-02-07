import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import PostCard from './PostCard'
import { Link } from 'react-router-dom'
import './Profile.css'
import Cookies from 'js-cookie'

const Profile = () => {
    const{id} = useParams()
   // console.log(id)
     
    const[profile,setProfile] = useState({})
    const[cookie,setCookie] = useState(false)
    const[posts,setPosts] = useState([])
    const[params,setParams] = useState('')
    const[user,setUser] = useState({})

    const profileDetails = async() =>{
        const fetchUrl = await fetch("http://localhost:8080/profile/" + id,{
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
        }
        else{
            console.log("not fetched")
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
    },[])

    
  return (
    <div>
          <div className='postdetailspage'>
      {
        user ?

          <div className='userdetails'>
            <div className='username'>
              <h1>{user.username}</h1>
              <div className='follow_unfollow'>
                <Link to={"/following"}><p>Following</p></Link>
                <Link to={"/followers"}><p>Followers</p></Link>
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
         <p>Loading....</p>
       }
        </div>
          </div>
          :
          <h1>Please login</h1>
      }
    </div>
    </div>
  )
}

export default Profile
