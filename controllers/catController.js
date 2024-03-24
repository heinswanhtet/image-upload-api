const { StatusCodes } = require('http-status-codes')
const Cat = require('../models/Cat')

const getAllCats = async (req, res) => {
    const cat = await Cat.find({})
    res.status(StatusCodes.OK).json([cat])
}

const createCat = async (req, res) => {
    const cat = await Cat.create(req.body)
    res.status(StatusCodes.CREATED).json({ cat })
}

module.exports = {
    getAllCats,
    createCat
}