var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    app = express();

require('dotenv').config()

mongoose.connect('mongodb+srv://alicecode:Gy6SfAmbH0HdKH7L@cluster1.rizsk.mongodb.net/purim?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('connection is open')).on('error', (error) => console.log(error));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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