import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

const Followers = () => {
    const[cookie,setCookie] = useState({})
    const[followers,setFollowers] = useState([])

    const followersFun = async() =>{
        const fetchUrl = await fetch("http://localhost:8080/userfollowers",{
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
            console.log(result)
            setFollowers(result.result)
        }
    }


    useEffect(() => {
        setCookie(JSON.parse(Cookies.get("myCookie")))

    },[Cookies.get("myCookie")])

    useEffect(() =>{
        console.log(cookie)
        followersFun()
    },[followers])

  return (
    <div>
      <h1>Followers</h1>
    </div>
  )
}

export default Followers
