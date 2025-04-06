const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDb connected successfully"))
.catch(err => console.error("MongDb connection error" ,err))

// requing files
let {RouteModle} = require("./db");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


// middlewares
app.use(express.json());
app.use(express.static("public"));

const port = 3000;

app.listen(port,()=>{
    console.log(`server is running in port : ${port}`)
})

app.get("/",(req,res)=>{
    res.render("home",{message : ""})
})


app.get("/content" ,async(req,res)=>{
    let {route} = req.query;

    const found = await RouteModle.findOne({
        route : route
    })

    if(!found){
        RouteModle.insertOne({
            route : route,
            content : ""
        })
        res.render("home",{message:"Enter Again To Login"});
    }else{
        res.render("content",{content : found.content,route: route})
    }
});


app.post("/save",async(req,res)=>{
    const {content,routeName} = req.body;
    const updater = await RouteModle.updateOne(
        {route : routeName},
        {$set : {content : content}}
    )
})
