import React from 'react'
import Cookies from 'js-cookie'
import "./Navbar.css"
import { useState,useEffect } from 'react'
import { Link,Outlet } from 'react-router-dom'

const Navbar = () => {
    const[cookie,setCookie] = useState('')
    const[hamBtn,setHamBtn] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [window.innerWidth]);
  
    useEffect(() => {
      if(windowWidth <= 1151){
        setHamBtn(false)
      }
      else{
        setHamBtn(true)
      }
     // console.log(windowWidth);
    }, [windowWidth]); // Log whenever windowWidth changes
  
    useEffect(() => {
      try {
       // console.log("triggered")
        setCookie(JSON.parse(Cookies.get("myCookie")))
      } catch (error) {
       // console.error("Error parsing cookie:", error.message);
      }
    },[Cookies.get("myCookie")])
  
    const hanBtnFunction = () =>{
      setHamBtn(!hamBtn)
    }
    
  return (
    <div>
    <div className='navbar'>
      <img src='https://static.vecteezy.com/system/resources/previews/002/292/406/non_2x/hamburger-menu-line-icon-free-vector.jpg'
      className='ham-btn'
      onClick={hanBtnFunction}
      />
      <Link to={"/"} className='link'><p>Tweet</p></Link>
      <Link to={"/login"} className='link'><p>Login</p></Link>
    </div>
     {
      hamBtn ?
      <div>
      <div className='sidebar'>
        <Link to={"/"} className='link'><p>Home</p></Link>
        {
          cookie
          ?
          <Link to={"/" + cookie._id } className='link'><p>Profile</p></Link>
          :
          null
        }
      </div>
      </div>
      :
      null
     }
    <Outlet />
  </div>
  )
}

export default Navbar
