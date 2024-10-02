//node requires extensions for the import values, unlike react except in the case of node modules
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import express from "express";
import 'express-async-errors';
import mongoose from 'mongoose';
import morgan from "morgan";
import { authenticateUser } from './middleware/authMiddleware.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import authRouter from './routes/authRouter.js';
import jobRouter from './routes/jobRouter.js';
import userRouter from './routes/userRouter.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
//public
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import path from 'path'

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

dotenv.config()
const app = express()

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./public')))

app.use(cookieParser())
app.use(express.json())
app.use(errorHandlerMiddleware)

//routes
app.use('/api/v1/jobs',authenticateUser,jobRouter)
app.use('/api/v1/users',authenticateUser,userRouter)
app.use('/api/v1/auth', authRouter)

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public','index.html'))
})

//default route
app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});

app.use('*',(req,res)=>{
    res.status(404).json({msg:'not found'})
})

//error route
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json({msg:'something went wrong'})
})

const port = process.env.PORT || 5100

try{
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () =>{
        console.log(`server running on port: ${port}...`);
    })
}catch(error){
    console.log(error);
    process.exit(1)
}