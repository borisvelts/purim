const express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
    return res.send('hello world')
})

router.get('/wow',(req,res)=>{
    return res.render('index')
})
router.get('/shani',(req,res)=>{
    return res.render('shani')
})
module.exports = router;