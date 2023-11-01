import axios from "axios";
import cheerio from "cheerio";
import express from "express";
import { addToAtlas, findAllAcData, findAllEarPhonesData, findAllFridgeData, findAllLaptopData, findAllMobilData } from "./dbControls.js";
// import { getAllMobiles, getAllAc, getAllFridge, getAllHeadPhones, getAllLaptops } from "./getAllDatas.js";

let router = express.Router();


let time = 12*60*60*1000;
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

// setInterval(async()=>{
//     let response = await axios.get(`https://www.flipkart.com/search?q=mobiles&page=1`);
//     let html = response.data;
//     let $ = cheerio.load(html);
//     const title = $('title').text();
//     let productTitles = [];
//     $('._1AtVbE').each((index, element) => {
//         let obj = { title: "", image: "", rating: "", price: "", finalPrice: "" }
//         obj.title = $(element).find("._4rR01T").text().toLowerCase();
//         obj.image = $(element).find("._396cs4").attr("src");
//         obj.rating = $(element).find("._3LWZlK").text();
//         obj.price = $(element).find("._3I9_wc").text();
//         obj.finalPrice = $(element).find("._30jeq3").text();
//         productTitles.push(obj);
//     });
    
//     let result = await updateAllMobilesDetails(productTitles);
// },time)

setInterval(async()=>{
    let response = await axios.get(`https://www.flipkart.com/search?q=laptops`);
    let html = response.data;
    let $ = cheerio.load(html);
    const title = $('title').text();
    let productTitles = [];
    $('._1AtVbE').each((index, element) => {
        let obj = { title: "", image: "", rating: "", price: "", finalPrice: "" }
        obj.title = $(element).find("._4rR01T").text().toLowerCase();
        obj.image = $(element).find("._396cs4").attr("src");
        obj.rating = $(element).find("._3LWZlK").text();
        obj.price = $(element).find("._3I9_wc").text();
        obj.finalPrice = $(element).find("._30jeq3").text();
        productTitles.push(obj);
    });
    let result = await refreshAllLaptopDetails(productTitles);
},time);

setInterval(async()=>{
    let response = await axios.get(`https://www.flipkart.com/search?q=fridge`);
    let html = response.data;
    let $ = cheerio.load(html);
    const title = $('title').text();
    let allFridgeData = [];
    $("._1AtVbE").each((index, element)=>{
        let obj = { title: "", image: "", rating: "", price: "", finalPrice: "" }
        obj.title = $(element).find("._4rR01T").text().toLowerCase();
        obj.image = $(element).find("._396cs4").attr("src");
        obj.rating = $(element).find("._3LWZlK").text();
        obj.price = $(element).find("._3I9_wc").text();
        obj.finalPrice = $(element).find("._30jeq3").text();
        allFridgeData.push(obj);
    })
    let result = await refreshAllFridgeDetails(allFridgeData);
},time)

setInterval(async()=>{
    let response = await axios.get(`https://www.flipkart.com/search?q=ac`);
    let html = response.data;
    let $ = cheerio.load(html);
    const title = $('title').text();
    let allAC = [];
    $("._1AtVbE").each((index, element)=>{
        let obj = { title: "", image: "", rating: "", price: "", finalPrice: "" }
        obj.title = $(element).find("._4rR01T").text().toLowerCase();
        obj.image = $(element).find("._396cs4").attr("src");
        obj.rating = $(element).find("._3LWZlK").text();
        obj.finalPrice = $(element).find("._30jeq3").text();
        obj.price = $(element).find("._3I9_wc").text();
        allAC.push(obj);
    });
    let result = await refreshAllAcDetails(allAC);
}, time);

setInterval(async()=>{
    let response = await axios.get(`https://www.flipkart.com/search?q=earphones`);
    let html = response.data;
    let $ = cheerio.load(html);
    let allEarPhones = [];
    $("._4ddWXP").each((index, element)=>{
        let obj = { title: "", image: "", rating: "", price: "", finalPrice: "" }
        obj.title = $(element).find(".s1Q9rs").text().toLowerCase();
        obj.image = $(element).find("._396cs4").attr("src");
        obj.rating= $(element).find("._3LWZlK").text();
        obj.price = $(element).find("._3I9_wc").text();
        obj.finalPrice = $(element).find("._30jeq3").text();
        allEarPhones.push(obj);
    })
    
    let result = await refreshAllEarPhoneDetails(allEarPhones);
}, time);

export let searchRoute = router;