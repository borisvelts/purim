const express = require("express"),
    router = express.Router(),
    cloudinaryStorage = require("multer-storage-cloudinary"),
    multer = require('multer'),
    passport = require('passport'),
    crypto = require('crypto'),
    cloudinary = require('cloudinary');


// MODELS
const Animal = require('../models/animal'),
    School = require('../models/school'),
    User = require('../models/user'),
    Picture = require('../models/picture'),
    Neighborhood = require('../models/neighborhood');

function chunkArray(arr, n) {
    var chunkLength = Math.max(arr.length / n, 1);
    var chunks = [];
    for (var i = 0; i < n; i++) {
        if (chunkLength * (i + 1) <= arr.length) chunks.push(arr.slice(chunkLength * i, chunkLength * (i + 1)));
    }
    return chunks;
}

//#region CONFIG
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "rishon",
    allowedFormats: ["jpg", "png", 'jpeg'],
    transformation: [{ height: 1000, crop: "limit" }],
    filename: function (req, file, cb) {
        let buf = crypto.randomBytes(16);
        buf = buf.toString('hex');
        let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
        uniqFileName += buf;
        cb(undefined, buf)
    }
});

const parser = multer({ storage: storage });
//#endregion CONFIG

router.get('/reg', async (req, res) => {
    User.register({ username: "alicecode" }, 'coding2021')
    res.send('test')
})

router.get('/animals', async (req, res) => {
    var animals = await Animal.find({ "status": "APPROVED" }).populate('picture')
    var chunk = chunkArray(animals, 4)
    res.locals.animals = chunk
    res.render('animals')
})

router.get('/neighborhoods', async (req, res) => {
    var animals = await Animal.find({ "status": "APPROVED" }).populate('picture').populate('neighborhood')
    console.log(animals.length,'1')
    animals = animals.filter((e) => e.neighborhood.name == req.query.name)
    console.log(animals.length,'2')
    var chunk = chunkArray(animals, 4)
    res.locals.animals = chunk
    res.render('animals')
})

router.post('/likes', async (req, res) => {
    if (req.body.method == 'add') {
        var animal = await Animal.findById(req.body.id)
        animal.likes += 1
        animal.save()

    } else if (req.body.method == 'remove') {
        var animal = await Animal.findById(req.body.id)
        animal.likes -= 1
        animal.save()
    }
    return res.end()
})

router.delete('/likes', async (req, res) => {

})

router.get('/', async (req, res) => {
    res.locals.neighborhoods = await Neighborhood.find();
    res.locals.topAnimals = await Animal.find({ "status": "APPROVED" }).limit(7).sort({ 'likes': '-1' }).populate('picture').populate('neighborhood')
    return res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', function (req, res, next) {
    console.log(req.body)
    next()
}, passport.authenticate("local", {
    failureRedirect: "/",
    // failureFlash: "שם משתמש או סיסמא אינם נכונים",
    successRedirect: '/dashboard'
}))

router.post('/upload', parser.single('image'), async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    var body = req.body;
    if (body.animalName == '' || body.animalType == '' || body.firstName == '' || body.lastName == '' || req.file == null) {
        return res.status(500).send('נא למלא את כל השדות');
    }
    if (req.body.approveJoin == 'on') {
        req.body.approveJoin = true;
    } else {
        req.body.approveJoin = false;
    }
    var neighborhood = await Neighborhood.findOne({ name: req.body.neighborhood })
    req.body.neighborhood = neighborhood._id;
    console.log(neighborhood._id, 'neighbor id')
    var picture = await Picture.create({ public_id: req.file.public_id, secure_url: req.file.secure_url }).catch((e) => console.log(e));
    req.body.picture = picture._id;
    var animal = await Animal.create(req.body);
    neighborhood.animals.push(animal._id)
    neighborhood.save()
    return res.redirect('/')
})



module.exports = router;
