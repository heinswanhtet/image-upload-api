const path = require('path')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const uploadImage = async (req, res) => {
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

module.exports = uploadImage