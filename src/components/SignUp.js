import React from 'react'
import "./Auth.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FlashMessage from './FlashMessage'

const SignUp = () => {
    const[email,setEmail] = useState('')
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const[flashMessage,setFlashMessage] = useState('')
    const navigate = useNavigate()

    const signup = async() =>{
      if(email.length > 0 && password.length > 0 && username.length > 0){
        const fetchUrl = await fetch("https://tweet-web.onrender.com/signup",{
          method:"POST",
          headers:{
              "Content-Type" : "application/json"
          },
          body:JSON.stringify({
              email:email,
              username:username,
              password:password
          })
      })

      if(fetchUrl.ok){
          const result = await fetchUrl.json()
          //console.log(result)
          if(result.result === true){
             navigate("/login")
          }
          else{
            setFlashMessage(result.result)
            setTimeout(() => {
               setFlashMessage('')
            }, 2000);
          }
      }
      }
      else{
        setFlashMessage("Please Enter Email,Password and Username")
        setTimeout(() => {
          setFlashMessage('')
        }, 2000);
      }
    }
  return (
    <div className='homeAuth'>
      <FlashMessage message={flashMessage}/>
    <div className='auth-page'>
      <input type='text' placeholder='Enter Your EmailId' onChange={(e) => setEmail(e.target.value)}/>
      <input type='text' placeholder='Enter Your Username' onChange={(e) => setUsername(e.target.value)}/>
      <input type='text' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={signup}>Signup</button>
    </div>
    </div>
  )
}

export default SignUp
