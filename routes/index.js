const express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
    return res.send('hello world')
})

router.get('/purim', (req,res) =>{
return res.render('index')

})

router.get('/eden', (req,res) =>{
    return res.render('eden')
    
    })
module.exports = router;