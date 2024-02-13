import React from 'react'
import "./FollowersAndFollowing.css"
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Following = () => {
    const[following,setFollowing] = useState([])

    const{id} = useParams()

    const followingFun = async() =>{
        const fetchUrl = await fetch("http://localhost:8080/userfollowing/" + id,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
        })
        if(fetchUrl.ok){
            const result = await fetchUrl.json()
            //console.log(result.result)
            setFollowing(result.result)
        }
    }

    useEffect(() =>{
        followingFun()
    },[])

  return (
    <div className='main-page'>
    <h1>Following</h1>
    <div>
    {
      following.length > 0 ?
      <div>
         {
          following.map((item) => (
              <Link to={"/" + item._id} className='link' key={item._id}><p className='followname'>{item.username}</p></Link>
          ))
         }
      </div>
      :<p>Zero Following</p>
    }
    </div>
  </div>
  )
}

export default Following
