const express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
    return res.render('index')

})

router.get('/nastia', (req, res) => {
    return res.render('nastia')
})

router.get('/ifat', (req, res) => {
    return res.render('ifat')
})
router.get('/eden', (req, res) => {
    return res.render('eden')
})
module.exports = router;