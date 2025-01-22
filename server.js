const express = require("express");
const ejsMate = require("ejs-mate");
const path = require("path")

app = express()

app.engine("ejs", ejsMate)

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res){
    res.render("home");
});

app.get("/magic", function (req, res) {
    res.render("magic");
});

app.listen(8080, function () {
    console.log("server is running on port 8080 ");
});

app.use( express.static( "public"));