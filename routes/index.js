const express = require("express");
var router = express.Router();

var Child = require('../models/child')
var School = require('../models/school')
var Picture = require('../models/picture')
var Cat = require('../models/cat')

router.get('/', async (req, res) => {
    var children = await Child.find({status:"APPROVED"}).populate('picture')
    res.locals.children = children;

    res.locals.schools = await School.find();
    return res.render('indexBoris')
})

router.post('/upload', async (req, res) => {
    var child = await Child.create(req.body)
    console.log(child)
    return res.redirect('/?firstName=' + child.firstName)
})

router.get('/nastia', (req, res) => {
    return res.render('nastia')
})

router.get('/alisa', (req, res) => {
    return res.render('alisa/alisa')
})
router.get('/ifat', (req, res) => {
    return res.render('ifat')
})
router.get('/eden', (req, res) => {
    return res.render('eden')
})
router.get('/shani', (req, res) => {
    return res.render('shani/shani')
})
router.get('/end', (req, res) => {
    return res.render('shani/end')
})

router.get('/AliceCode', async (req, res) => {
    // create
    //Cat.create({name: "Heineken", age: 1})
    //Cat.create({name: "Cappuchi", age: 2, owner: "Ifat"}) //<- Added owner

    // find all
    // var ifatsCats = await Cat.find()
    // res.locals.ifatsCats = ifatsCats
    // console.log(ifatsCats)

    //find one + catch error
    // Cat.findOne({"name": "Cappuchi"}, function (err, doc) {
    //     if(err != null) { //error
    //         return res.status(500).send('error fetching cat')
    //     }
    //     var cat = doc
    //     console.log(cat)
    //     return res.render('index')
    // })


    // print to screen: a.find all and initialize res.locals.cats
    // var ifatsCats = await Cat.find()
    // res.locals.cats = ifatsCats

    // b. put that in the ejs file in order to see your list:
    // <div class="row d-flex justify-content-around">
    //     <% for(var i=0;i<cats.length;i++){ %>
    //                 <p>
    //                     <%=cats[i].name%>
    //                 </p>
    //         <%}%>
    // </div>

    return res.render('index')
})


router.get('/sync', (req, res) => res.render('sync'))

module.exports = router;