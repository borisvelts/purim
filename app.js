var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    session = require('express-session'),
    app = express();

const MongoStore = require('connect-mongo')(session);

require('dotenv').config()

const User = require('./models/user')

mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster1.rizsk.mongodb.net/purim?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => console.log('connection is open')).on('error', (error) => console.log(error));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: "changing the world is the first thing we need to do",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var indexRoutes = require('./routes/index');
var dashboardRoutes = require('./routes/dashboard');

app.get('/testing', (req, res) => {
    res.send('from app.js')
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use("/", indexRoutes);
app.use("/dashboard", function (req, res, next) {
    console.log(req.user)
    if (req.user == null) {
        return res.redirect('/')
    }
    next();
}, dashboardRoutes);

app.listen(process.env.PORT || 3001, function () {
    console.log("Server has started");
})