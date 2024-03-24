const mongoose = require('mongoose')

const CatSchema = mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Cat', CatSchema)