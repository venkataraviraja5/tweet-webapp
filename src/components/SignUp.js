import React from 'react'
import "./Auth.css"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
    const[email,setEmail] = useState('')
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    const signup = async() =>{
        const fetchUrl = await fetch("http://localhost:8080/signup",{
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
            console.log(result)
            if(result.result === true){
               navigate("/login")
            }
        }
    }
  return (
    <div>
    <div className='homeAuth'>
      <input type='text' placeholder='Enter Your EmailId' onChange={(e) => setEmail(e.target.value)}/>
      <input type='text' placeholder='Enter Your Username' onChange={(e) => setUsername(e.target.value)}/>
      <input type='text' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={signup}>Signup</button>
    </div>
    </div>
  )
}

export default SignUp
