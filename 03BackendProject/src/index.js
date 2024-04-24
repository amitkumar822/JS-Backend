// require('dotenv').config({path: './env'})

import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js'

dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running at port: ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed: " + error);
})















/*
import mongoose from 'mongoose';
import { DB_NAME } from './constants';


import express from 'express';
const app = express();

(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/ ${DB_NAME}`);
        app.on('error', (error)=>{
            console.error("ERROR: ",error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on PORT ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR: ",error);
        throw error;
    }
})()

*/