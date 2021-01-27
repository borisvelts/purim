const express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
    return res.render('index')

})

router.get('/nastia', (req, res) => {
    return res.render('nastia')
})

module.exports = router;