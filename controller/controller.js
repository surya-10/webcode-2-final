import axios from "axios";
import cheerio from "cheerio";
import express from "express";
import { addToAtlas, findAllAcData, findAllEarPhonesData, findAllFridgeData, findAllLaptopData, findAllMobilData } from "./dbControls.js";

let router = express.Router();


router.get("/all", async (req, res) => {
    try {
        let mobiles = await findAllMobilData();
        let laptop = await findAllLaptopData();
        let ac = await findAllAcData();
        let fridge = await findAllFridgeData();
        let headphones = await findAllEarPhonesData();
        return res.status(200).json({ status: 200, mobiles: mobiles, laptop: laptop, ac: ac, fridge: fridge, headphones: headphones });
    } catch (error) {
        return res.status(500).json({ status: 500, msg: "server error" });
    }
})
router.post("/search", async (req, res) => {


    let wholeProducts = [];
    let getProdTitles = [];
    let mobiles = await findAllMobilData();
    let laptop = await findAllLaptopData();
    let ac = await findAllAcData();
    let fridge = await findAllFridgeData();
    let headphones = await findAllEarPhonesData();
    let allProducts = [...mobiles, ...laptop, ...ac, ...fridge, ...headphones];
    let { inputValue } = req.body;
    if (inputValue === "mobiles" || inputValue === "mobile") {
        let data = await findAllMobilData();
        return res.status(200).json({ value: data, msg:"ok", status:200 });
    }
    if (inputValue === "laptops" || inputValue === "laptop") {
        let data = await findAllLaptopData();
        return res.status(200).json({ value: data, msg:"ok", status:200 });
    }
    if (inputValue === "ac" || inputValue === "AC" || inputValue == "air conditioner") {
        let data = await findAllAcData();
        return res.status(200).json({ value: data, msg:"ok", status:200 });
    }
    if (inputValue === "ear phones" || inputValue === "earphones" || inputValue == "headphones") {
        let data = await findAllEarPhonesData();
        return res.status(200).json({ value: data, msg:"ok", status:200 });
    }
    if (inputValue === "fridge" || inputValue === "refrigerator") {
        let data = await findAllFridgeData();
        return res.status(200).json({ value: data, msg:"ok", status:200 });
    }
    if(inputValue === "all"  || inputValue === "ALL"){
        return res.status(200).json({value: allProducts, msg:"ok", status:200});
    }
    else {
        let mobiles = await findAllMobilData();
        let laptop = await findAllLaptopData();
        let ac = await findAllAcData();
        let fridge = await findAllFridgeData();
        let headphones = await findAllEarPhonesData();
        let allProducts = [...mobiles, ...laptop, ...ac, ...fridge, ...headphones];
        wholeProducts = allProducts;
        allProducts.map((prod) => {
            let name = prod.title.toLowerCase();
            getProdTitles.push(name);
        });
        let findSearchName = [];
        for (let str of getProdTitles) {
            if (str.includes(inputValue)) {
                findSearchName.push(str);
            }
        }
        // console.log(findSearchName);
        let result = getMatchProducts(findSearchName, allProducts);
        if(result.length==0){
            return res.status(400).json({status:400, msg:"not found, search all to see all products"})
        }
        return res.status(200).json({status:200, value:result, msg:"success"})
    }



})

function getMatchProducts(prodList, allProd){
    let resultedArr = [];
    for(let i=0; i<prodList.length; i++){
        let a = allProd.filter((prod)=>prod.title==prodList[i]);
        let extractedObjects = a.flat().filter(item => typeof item === 'object');
        extractedObjects.map((prod)=>{
            resultedArr.push(prod)
        })
    }
    return resultedArr;
}

export let searchRoute = router;