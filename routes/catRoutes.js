const express = require('express')
const router = express.Router()

const { getAllCats, createCat } = require('../controllers/catController')
const uploadImage = require('../controllers/uploadImageController')

router.route('/').get(getAllCats).post(createCat)
router.route('/upload-image').post(uploadImage)

module.exports = router
