const express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
    return res.render('index')

})

router.get('/nastia', (req, res) => {
    return res.render('nastia')
})

router.get('/alisa', (req, res) => {
    return res.render('alisa')
})
router.get('/ifat', (req, res) => {
    return res.render('ifat')
})

module.exports = router;