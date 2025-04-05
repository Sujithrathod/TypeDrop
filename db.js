const mongoose = require("mongoose");

const Routeschema = new mongoose.Schema({
    route : String,
    content : String
})

const RouteModle = mongoose.model("routes",Routeschema);

module.exports = {
    RouteModle : RouteModle
}