const express = require("express");
var router = express.Router();

var Animal = require('../models/animal')
var School = require('../models/school')
var Picture = require('../models/picture')
var Cat = require('../models/cat');
const Dog = require("../models/dog");


const Neighborhood = require('../models/neighborhood');


router.get('/neighborhood', async (req, res) => {
    res.locals.neighborhoods = Neighborhood.find();
    res.locals.neighborhood = req.query.name;
    return res.render('shani/neighborhood')
})

router.get('/hi', async (req, res) => {
    var children = await Child.find({ status: "APPROVED" }).populate('picture')
    res.locals.children = children;

    res.locals.schools = await School.find();
    return res.render('indexBoris')
})


//#region find top neighboor

router.get('/top', async (req, res) => {
    // example url : http://localhost:3001/neighborhood?name=ראשון לציון

    // מחפשים את השכונה שהשם שלה תואם את החיפוש שלנו
    var neighborhood = await Neighborhood.findOne({ name: req.query.name })

    // מחפשים את כל החיות שהשכונה שלהם היא השכונה שחיפשנו
    var animals = await Animal.find({ neighborhood: neighborhood._id })

    // מחזירים את התשובה בצורת JSON
    res.json(animal)
})

//#endregion

router.post('/upload', async (req, res) => {
    var child = await Child.create(req.body)
    console.log(child)
    return res.redirect('/?firstName=' + child.firstName)
})


router.get('/end', (req, res) => {
    return res.render('shani/end')
})

router.get('/', async (req, res) => {
    var neighborhoods = await Neighborhood.find()
    res.locals.neighborhoods = neighborhoods

    return res.render('index')
})

module.exports = router;
