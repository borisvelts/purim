const express = require("express");
var router = express.Router();

var Child = require('../models/child')
var School = require('../models/school')
var Picture = require('../models/picture')

router.get('/', async (req, res) => {
    var children = await Child.find({status:"APPROVED"}).populate('picture')
    res.locals.children = children;

    res.locals.schools = await School.find();
    return res.render('index')
})

router.post('/upload', async (req, res) => {
    var child = await Child.create(req.body)
    console.log(child)
    return res.redirect('/?firstName=' + child.firstName)
})

router.get('/nastia', (req, res) => {
    return res.render('nastia')
})

router.get('/ifat', (req, res) => {
    return res.render('ifat')
})

router.get('/sync', (req, res) => res.render('sync'))

module.exports = router;