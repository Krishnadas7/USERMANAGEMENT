import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import userRouter from './routes/userRoutes.js'
import adminRouter from './routes/adminRoute.js'
import { notFound,errorHandler } from "./middleware/errorMiddleware.js";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
dotenv.config()
const port = process.env.PORT || 5000
const app =  express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
connectDb()
app.use('/api/users',userRouter)
app.use('/api/admin',adminRouter)
app.use('/static',express.static('public'));

app.get('/',(req,res)=>{
    res.send('server is ready')
})
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server connected on ${port}`);
})