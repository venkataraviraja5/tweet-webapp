import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import PostDetails from "./components/PostDetails";
import Profile from "./components/Profile";
import { Store } from "./components/utils/Store";
import { useEffect, useState } from "react";
import Followers from "./components/Followers";
import Cookies from "js-cookie";
import { Provider } from "react-redux";
import Following from "./components/Following";
import LikedPosts from "./components/LikedPosts";

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
          path:"/followers/:id",
          element:<Followers />
        },
        {
          path:"/following/:id",
          element:<Following />
        },
        {
          path:"/likedposts/:id",
          element:<LikedPosts />
        }
      ]
    }
  ])

  return (
    <div>
        <Provider store={Store}>
        <RouterProvider router={appRouter}/>
        </Provider>
 
    </div>
  );
}

export default App;
