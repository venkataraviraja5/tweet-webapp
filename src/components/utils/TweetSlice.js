import { createSlice } from '@reduxjs/toolkit'
import React from 'react'
import Cookies from 'js-cookie'

export const TweetSlice = createSlice({
       name:"app",
       initialState:{
         cookieObj: Cookies.get('myCookie') ? JSON.parse(Cookies.get('myCookie')) : ''
       },
       reducers:{
        cookieValue:(state,action) =>{
          state.cookieObj = action.payload
        }
       }
})

export const {cookieValue} = TweetSlice.actions
export default TweetSlice.reducer
