import { client } from "../db.js";

export async function addToAtlas(datas){
    for(const data of datas){
        let checkIsExist = await client.db("wecode2-final").collection("mobiles").findOne({title:data.title});
        if(!checkIsExist){
            if(!data.title==""){
                let res = await client.db("wecode2-final").collection("mobiles").insertOne(data);
            }
        }
    }
}


export function findAllMobilData(){
    return client.db("wecode2-final").collection("mobiles").find().toArray()
}

export async function updateAllMobilesDetails(datas){
    for(const data of datas){
        let findData = await client.db("wecode2-final").collection("mobiles").updateOne({title:data.title}, {$set:{"price":data.price, "finalPrice":data.finalPrice}});
    }
}


export async function updateAllLaptopDetails(datas){
    for(const data of datas){
        let checkIsExist = await client.db("wecode2-final").collection("laptops").findOne({title:data.title});
        if(!checkIsExist){
            if(!data.title==""){
                let res = await client.db("wecode2-final").collection("laptops").insertOne(data);
            }
        }
    }
}

export function findAllLaptopData(){
    return client.db("wecode2-final").collection("laptops").find().toArray()
}

export async function refreshAllLaptopDetails(datas){
    for(const data of datas){
        let findData = await client.db("wecode2-final").collection("laptops").updateOne({title:data.title}, {$set:{"price":data.price, "finalPrice":data.finalPrice}});
    }
}


//dress

export async function addFridgeToDb(datas){
    for(const data of datas){
        let checkIsExist = await client.db("wecode2-final").collection("fridges").findOne({title:data.title});
        if(!checkIsExist){
            if(!data.title==""){
                let res = await client.db("wecode2-final").collection("fridges").insertOne(data);
            }
        }
    }
}

export async function refreshAllFridgeDetails(datas){
    for(const data of datas){
        let findData = await client.db("wecode2-final").collection("fridges").updateOne({title:data.title}, {$set:{"price":data.price, "finalPrice":data.finalPrice}});
        
    }
}


export function findAllFridgeData(){
    return client.db("wecode2-final").collection("fridges").find().toArray()
}

// watches

export async function updateAc(datas){
    for(const data of datas){
        let checkIsExist = await client.db("wecode2-final").collection("AC").findOne({title:data.title});
        if(!checkIsExist){
            if(data.title !== "" && data.image !== "" && data.rating !== "" && data.price !== "" && data.finalPrice !== ""){
                let res = await client.db("wecode2-final").collection("AC").insertOne(data);
            }
        }
    }
}


export async function refreshAllAcDetails(datas){
    for(const data of datas){
        let findData = await client.db("wecode2-final").collection("AC").updateOne({title:data.title}, {$set:{"price":data.price, "finalPrice":data.finalPrice}});
        
    }
}

export function findAllAcData(){
    return client.db("wecode2-final").collection("AC").find().toArray()
}


// earphones 


export async function updateAllEarPhones(datas){
    for(const data of datas){
        let checkIsExist = await client.db("wecode2-final").collection("earPhones").findOne({title:data.title});
        if(!checkIsExist){
            if(data.title !== "" && data.image !== "" && data.rating !== "" && data.price !== "" && data.finalPrice !== ""){
                // console.log(data)
                let res = await client.db("wecode2-final").collection("earPhones").insertOne(data);
            } 
        }
    }
}


export async function refreshAllEarPhoneDetails(datas){
    for(const data of datas){
        let findData = await client.db("wecode2-final").collection("earPhones").updateOne({title:data.title}, {$set:{"price":data.price, "finalPrice":data.finalPrice}});
    }
}

export function findAllEarPhonesData(){
    return client.db("wecode2-final").collection("earPhones").find().toArray()
}