const { StatusCodes } = require('http-status-codes')
const path = require('path')

const uploadImage = async (req, res) => {
    const catImage = req.files.image
    const imagePath = path.join(
        __dirname,
        '../public/images/' + catImage.name
    )

    await catImage.mv(imagePath)

    res.status(StatusCodes.OK).json({ image: { src: `/images/${catImage.name}` } })
}

module.exports = uploadImage