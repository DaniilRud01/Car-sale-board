const mongoose = require('mongoose')

const url = 'mongodb+srv://Daniel:12131441w@cluster0.xkasi.azure.mongodb.net/car-shop'

exports.Connect = () => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}

mongoose.connection.on('connected', () => {
    console.log('db is connected')
})

mongoose.connection.on('err', () => {
    console.log('error connected db')
})