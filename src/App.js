import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import PostDetails from "./components/PostDetails";
import Profile from "./components/Profile";
import store from "./components/UserContext";
import { useState } from "react";
import Followers from "./components/Followers";

function App() {
  const appRouter = createBrowserRouter([
    {
      path:"/",
      element: <Navbar />,
      children:[
        {
          path:"/",
          element:<Feed />
        },
        {
          path:"/login",
          element: <Login />
        },
        {
          path:"/signup",
          element:<SignUp />
        },
        {
          path:"/q/:id",
          element:<PostDetails />
        },
        {
          path:"/:id",
          element:<Profile />
        },
        {
          path:"/followers",
          element:<Followers />
        }
      ]
    }
  ])

  const[cookieObj,setCookieObj] = useState(false)


  return (
    <div>
        <store.Provider value={{
          cookieObj:cookieObj,
          setCookieObj:setCookieObj
        }}>
        <RouterProvider router={appRouter}/>
        </store.Provider>
 
        
    </div>
  );
}

export default App;
