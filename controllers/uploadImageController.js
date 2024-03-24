const path = require('path')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const cloudinary = require('cloudinary').v2
const { unlink } = require('fs').promises

const uploadImageToLocalServer = async (req, res) => {
    if (!req.files)
        throw new BadRequestError('No file uploaded!')

    const catImage = req.files.image

    if (!catImage.mimetype.startsWith('image'))
        throw new BadRequestError('Please upload image file!')

    const max_size = eval(process.env.IMAGE_MAX_SIZE)
    // console.log(typeof (process.env.IMAGE_MAX_SIZE))
    // console.log(max_size);
    if (catImage.size > max_size)
        throw new BadRequestError(`Please upload image smaller than ${max_size / (1024 * 1024)}MB`)

    const imagePath = path.join(
        __dirname,
        '../public/images/' + catImage.name
    )

    await catImage.mv(imagePath)

    res.status(StatusCodes.OK).json({ image: { src: `/images/${catImage.name}` } })
}

const uploadImage = async (req, res) => {
    const catImage = req.files.image
    const result = await cloudinary.uploader.upload(
        catImage.tempFilePath,
        {
            use_filename: true,
            folder: 'image-upload-api'
        }
    )
    await unlink(catImage.tempFilePath)
    res.status(StatusCodes.OK).json({ image: { src: result.secure_url } })
}

module.exports = uploadImage