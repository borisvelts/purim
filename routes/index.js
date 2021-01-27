const express = require("express");
var router = express.Router();

router.get('/', (req, res) => {
<<<<<<< HEAD
    return res.render('index')

})

router.get('/nastia', (req, res) => {
    return res.render('nastia')
=======
    return res.render('inner/page') 
>>>>>>> 3c1f8fdb07392fb52ca554ca47bb48c0ec80b3f4
})

module.exports = router;