const getAllCats = async (req, res) => {
    res.send('This is get all cats')
}

const createCat = async (req, res) => {
    res.send('This is create cat')
}

module.exports = {
    getAllCats,
    createCat
}