import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[cookie,setCookie] = useState('')
    const[cookieValue,setCookieValue] = useState(false)
    const navigate = useNavigate()

    const login = async() =>{
        const fetchUrl = await fetch("http://localhost:8080/login",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })

        if(fetchUrl.ok){
            const result = await fetchUrl.json()
            console.log(result)
            if(result.user === true){
                Cookies.set("myCookie",JSON.stringify(result.result),{expires : 1})
                setCookieValue(true)
                navigate("/")
            }
           
        }
    }

    const logout = () =>{
        Cookies.remove("myCookie")
        setCookieValue(false)
    }

    useEffect(() => {
        const cookie = Cookies.get("myCookie")
        if(cookie){
            setCookie(cookie)
            setCookieValue(true)
        }
    },[Cookies.get("myCookie")])

  return (
    <div className='homeAuth'>
        {
            cookieValue ?
            <div>
                   <button onClick={logout}>Logout</button>
            </div>
            :
            <div className='homeAuth'>
                    <input type='text' placeholder='Enter Your Email Address'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type='text' placeholder='Enter Your Password' 
                     onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={login}>Login</button>
                    <Link to={'/signup'}>create new Account</Link>
            </div>
            
        }
    </div>
  )
}

export default Login
