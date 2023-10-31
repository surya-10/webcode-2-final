import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { client } from "./db.js";
dotenv.config()
import { searchRoute } from "./controller/controller.js";
import {fridgeData, watches, earPhones, refreshAllLaptops, refreshAllMobiles } from "./controller/getAllDatas.js";
let app = express();
app.use(cors())
app.use(express.json());

let port = process.env.port;

app.listen(port, ()=>console.log("server connected"));
app.use("/", searchRoute);
