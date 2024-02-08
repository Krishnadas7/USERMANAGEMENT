import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
dotenv.config()
const port = process.env.PORT || 5000
const app =  express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
connectDb()
app.use('/api/users',userRouter)

app.get('/',(req,res)=>{
    res.send('server is ready')
})
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server connected on ${port}`);
})