import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice.js";
import messageReducer from "./messageSlice.js"

const store = configureStore({
    reducer: {
        user: useReducer,
        message:messageReducer,
    }
});

export default store;