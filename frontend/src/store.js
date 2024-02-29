import { configureStore } from "@reduxjs/toolkit"
import authReducer from './slices/authSlice'
import { apiSlice } from "./slices/apiSlice"
import adminReducer from './slices/aminSlice'
 import counterSlice from "./slices/counterSlice"

const store =configureStore({
    reducer:{
        auth:authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        admin:adminReducer,
        counter:counterSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools:true
})
export default store