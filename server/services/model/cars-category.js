const mongoose = require('mongoose')

const carCategorySchema = mongoose.Schema({
    body: Array,
    model: Array,
    mark:Array,
    drive: Array,
    fuel: Array,
    brand: Array,
    transmission: Array,
    wheel: Array,
})

module.exports = mongoose.model('categorycars', carCategorySchema)