import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "./FollowersAndFollowing.css"
import { Link, useParams } from 'react-router-dom'

const Followers = () => {
   
    const[followers,setFollowers] = useState([])

    const{id} = useParams()

    const followersFun = async() =>{
        const fetchUrl = await fetch("https://tweet-web.onrender.com/userfollowers/" + id,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
        })
        if(fetchUrl.ok){
            const result = await fetchUrl.json()
           // console.log(result.result)
            setFollowers(result.result)
        }
    }

    useEffect(() =>{
        followersFun()
    },[])

  return (
    <div className='main-page'>
      <h1>Followers</h1>
      <div>
      {
        followers.length > 0 ?
        <div>
           {
            followers.map((item) => (
                <Link to={"/" + item._id} className='link' key={item._id} ><p className='followname'>{item.username}</p></Link>
            ))
           }
        </div>
        :<p>No Followers</p>
      }
      </div>
    </div>
  )
}

export default Followers
