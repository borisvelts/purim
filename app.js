var express = require("express"),
    bodyParser = require("body-parser"),
    app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var indexRoutes = require('./routes/index');

app.get('/testing', (req, res) => {
    res.send('from app.js')
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/", indexRoutes);

app.listen(process.env.PORT || 3001, function () {
    console.log("Server has started");
})