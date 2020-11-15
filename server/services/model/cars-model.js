const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
    body: String,
    model: String,
    drive: String,
    fuel: String,
    brand: String,
    transmission: String,
    wheel: String,
    year: String,
    volume: String,
    price: String,
    title:String,
    image: Array,
    phone: String
})

module.exports = mongoose.model('cars', carSchema)