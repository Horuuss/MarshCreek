const express = require("express"),
    app = express()

    app.set("view engine", "ejs");


    app.get("/", function (req, res){
        res.render("index");
    });

    app.get("/magic", function (req, res) {
        res.render("magic");
    });

    app.listen(8080, function () {
        console.log("server is running on port 8080 ");
    });

    app.use( express.static( "public"));