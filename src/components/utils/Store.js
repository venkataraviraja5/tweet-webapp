import { configureStore } from "@reduxjs/toolkit";
import TweetSlice from "./TweetSlice";

export const Store = configureStore({
    reducer:{
        app:TweetSlice
    }
})