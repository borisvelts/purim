const express = require("express"),
    cloudinaryStorage = require("multer-storage-cloudinary"),
    cloudinary = require("cloudinary"),
    multer = require('multer'),
    crypto = require('crypto');
require('dotenv').config()
router = express.Router();

var Pictures = require('../models/picture')
var Animal = require('../models/animal')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    //TODO: change keys when delivering to adi
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "profile",
    allowedFormats: ["jpg", "png", 'jpeg'],
    transformation: [{ height: 1000, crop: "limit" }],
    filename: function (req, file, cb) {
        let buf = crypto.randomBytes(16);
        buf = buf.toString('hex');
        let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
        uniqFileName += buf;
        cb(undefined, uniqFileName)
    }
});

const parser = multer({ storage: storage });


//#region VIEWS
router.get('/', (req, res) => res.render('dashboard/index'))

router.get('/dashboard-screen', async (req, res) => {
    res.locals.children = await Animal.find().countDocuments();
    res.locals.pictures = await Pictures.find().countDocuments();
    res.locals.awaiting = await Animal.find({ status: "WAITING" }).countDocuments()

    return res.render('dashboard/screens/dashboard')
})

router.get('/approve-screen', async (req, res) => {
    var children = [...await Animal.find({ status: "WAITING" }).populate('picture')]
    for (var child of children) {
    }
    res.locals.children = children;
    res.render('dashboard/screens/approve')
})
router.get('/add_item-screen', async (req, res) => {
    var categories = await Category.find()
    var colors = await Color.find()
    res.render('dashboard/screens/add_item', { categories, colors })
})
router.get('/publishBlog-screen', async (req, res) => {
    var categories = await Category.find()
    var colors = await Color.find()
    res.render('dashboard/screens/publishBlog', { categories, colors })
})

router.get('/edit_home-screen', async (req, res) => {
    res.render('dashboard/screens/edit_home')
})

router.get('/edit-item-screen', async (req, res) => {
    var categories = await Category.find();
    var colors = await Color.find();
    var product = await Product.findById(req.query.id).populate('pictures').populate('availableColors')
    res.render('dashboard/screens/edit_item', { product, categories, colors })
})

router.get('/products-screen', async (req, res) => {
    var products = await Product.find().populate('category');
    res.render('dashboard/screens/products', { products })
})

router.get('/customers-screen', async (req, res) => {
    var cust = await Newsletter.find()
    console.log(cust)
    res.render('dashboard/screens/customers', { cust })
})
//#endregion VIEWS

//#region PICTURES
router.delete('/picture', async (req, res) => {
    Picture.findByIdAndRemove(req.body.id, (err, doc) => {
        if (err) {
            console.log(err)
            return res.status(500).end()
        }
        cloudinary.uploader.destroy(doc.public_id)
        return res.status(200).end()
    })
    Product.findById(req.query.product_id, (err, doc) => {
        doc.pictures.splice(doc.pictures.indexOf(req.body.id), 1)
        doc.save()
    })
})

router.patch('/picture', async (req, res) => {
    try {
        if (req.body.method == "approve") {
            for (var i of req.body.images) {
                var animal = await Animal.findById(i._id)
                animal.status = "APPROVED";
                animal.save();

            }
            return res.status(200).send({ "message": "success" })
        } else {
            return res.status(500).send({ "message": "error, no command" })
        }
    } catch (e) {
        console.log(e)
    }
})
//#endregion PICTURES



module.exports = router;
