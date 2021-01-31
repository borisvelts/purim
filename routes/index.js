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

module.exports = router;