import express from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { client } from "./db.js";
dotenv.config()
import { searchRoute } from "./controller/controller.js";
import { getAllMobiles, getAllAc, getAllFridge, getAllHeadPhones, getAllLaptops } from "./controller/getAllDatas.js";

let app = express();
app.use(cors())
app.use(express.json());

let port = process.env.PORT;


app.use("/", searchRoute);
app.listen(port, ()=>console.log("server connected"));
