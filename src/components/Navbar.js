import React from 'react'
import Cookies from 'js-cookie'
import "./Navbar.css"
import { useState,useEffect } from 'react'
import { Link,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  
    const[hamBtn,setHamBtn] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

   // const {cookieObj,setCookieObj}= useContext(store)

    const cookie = useSelector(store => store.app.cookieObj)
  
   // console.log("store",cookievalue)
  
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
        <Link to={"/" + cookie._id } className='link'><p>Profile</p></Link>
        <Link to={"/likedposts/" + cookie._id} className='link'><p>Liked Tweets</p></Link>
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
