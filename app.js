var express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var indexRoutes = require('./routes/index');


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// יופיעו 10 התחפושות המובילות

// קטגוריית הורים ?

// 
// 
// 

app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log("Server has started");
})