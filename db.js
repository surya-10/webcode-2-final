import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();
let str = process.env.str;

async function dbConnect(){
    let client = new MongoClient(str);
    await client.connect();
    console.log("Connected");
    return client;
}

export let client = await dbConnect();