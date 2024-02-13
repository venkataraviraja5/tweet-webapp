import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { cookieValue } from './utils/TweetSlice'
import { Button } from 'react-bootstrap'
import FlashMessage from './FlashMessage'

const Login = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[cookie,setCookie] = useState('')
    const[logout,setLogout] = useState(false)
    const[flashMessage,setFlashMessage] = useState('')
    const navigate = useNavigate()

   // console.log("sessioncookie",cookieObj)

   const dispatch = useDispatch()

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
           // console.log(result)
            if(result.user === true){
                Cookies.set("myCookie",JSON.stringify(result.result),{expires : 1})
                setLogout(true)
                dispatch(cookieValue(result.result))
                navigate("/")
            }
            else{
                 setFlashMessage("Please Enter Correct Email and Password")
                 setTimeout(() =>{
                    setFlashMessage('')
                 },2000)
            }
           
        }
    }

    const logoutbtn = () =>{
        Cookies.remove("myCookie")
        dispatch(cookieValue(''))
        setLogout(false)
    }

    useEffect(() => {
        const cookie = Cookies.get("myCookie")
        if(cookie){
            setCookie(cookie)
            setLogout(true)
        }
    },[Cookies.get("myCookie")])

  return (
    <div className='homeAuth'>
         <FlashMessage message={flashMessage}/>
        {
            logout ?
            <div>
                   <Button variant="success" onClick={logoutbtn}>Logout</Button>
            </div>
            :
            <div className='auth-page'>
                    <input type='text' placeholder='Enter Your Email Address'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type='text' placeholder='Enter Your Password' 
                     onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button variant="success" onClick={login}>Login</Button>
                    <Link to={'/signup'}>Create New Account</Link>
            </div>
            
        }
    </div>
  )
}

export default Login
