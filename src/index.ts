"use strict";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import CategoryRouter from './routes/categories_routes';
import AuthRouter from './routes/auth_router';
import * as dotenv from 'dotenv';
dotenv.config(); 
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/',CategoryRouter);
app.use('/', AuthRouter);
app.listen(8000,()=>{
    console.info("Hello listening at 8000");
})