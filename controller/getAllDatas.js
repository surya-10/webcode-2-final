import { client } from "../db.js";
import axios from "axios";

import cheerio, { html } from "cheerio";
import express from "express";
import { addFridgeToDb, addToAtlas, refreshAllAcDetails, refreshAllEarPhoneDetails, refreshAllFridgeDetails, refreshAllLaptopDetails, updateAc, updateAllEarPhones, updateAllLaptopDetails, updateAllMobilesDetails } from "./dbControls.js";


let time = 12*60*60*1000;


//mobiles-----------------------------

export async function getAllMobiles() {
    let response = await axios.get(`https://www.flipkart.com/search?q=mobiles&page=1`);
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
    let result = await addToAtlas(productTitles);
}

setInterval(async()=>{
    let response = await axios.get(`https://www.flipkart.com/search?q=mobiles&page=1`);
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
    
    let result = await updateAllMobilesDetails(productTitles);
},time)


//laptops------------------------------

export async function getAllLaptops(){
    let response = await axios.get(`https://www.flipkart.com/search?q=laptops&page=1`);
    let html = response.data;
    let $ = cheerio.load(html);
    const title = $('title').text();
    let laptopsData = [];
    $('._1AtVbE').each((index, element) => {
        let obj = { title: "", image: "", rating: "", price: "", finalPrice: "" }
        obj.title = $(element).find("._4rR01T").text().toLowerCase();
        obj.image = $(element).find("._396cs4").attr("src");
        obj.rating = $(element).find("._3LWZlK").text();
        obj.price = $(element).find("._3I9_wc").text();
        obj.finalPrice = $(element).find("._30jeq3").text();
        laptopsData.push(obj);
    });
    let result = await updateAllLaptopDetails(laptopsData);

}


setInterval(async()=>{
    let response = await axios.get(`https://www.flipkart.com/search?q=laptops&page=1`);
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




// get all fridge

export async function getAllFridge(){
    let response = await axios.get(`https://www.flipkart.com/search?q=fridge`);
    let html = response.data;
    let $ = cheerio.load(html);
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
    let result = await addFridgeToDb(allFridgeData);
}


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



export async function getAllAc(){
    let response = await axios.get(`https://www.flipkart.com/search?q=ac`);
    let html = response.data;
    let $ = cheerio.load(html);
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
    let result = await updateAc(allAC);
}

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

//earphones

export async function getAllHeadPhones(){
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
    // console.log(allEarPhones);
    let result = await updateAllEarPhones(allEarPhones);  
}

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

// export let refreshAllMobiles = await getAllMobiles();
// export let refreshAllLaptops = await getAllLaptops();
// export let fridgeData = await getAllFridge();
// export let watches = await getAllAc();
// export let earPhones = await getAllHeadPhones();