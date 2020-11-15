import path from 'path'
const NewCar =  require( './services/model/cars-model')
const CarsCategory = require('./services/model/cars-category')
const express = require('express')
const cors = require('cors')
const mongoServices = require('./services/mongoose')
const bodyParser = require('body-parser')

mongoServices.Connect()

const server = express()

const PORT = process.env.PORT || 8080
server.use(bodyParser.json({ limit: '50mb', extended: true }))
server.use(cors())
if(process.env.NODE_ENV === 'production'){
    server.use(express.static(path.join(path.resolve(), '/build')))
}

server.listen(PORT, () => {
    console.log(`Server is started port: ${PORT}`)
})

server.get('/', async (req,res) => {
    const cars = await NewCar.find({})
    res.json(cars)
})


server.post('/category', async (req,res) => {
    const { body, model, drive, fuel, brand, transmission, wheel,mark } = req.body
    const carsCategory = await new CarsCategory({
        body,
        model,
        drive,
        fuel,
        brand,
        transmission,
        wheel,
        mark
    })
    carsCategory.save()
    res.json(carsCategory)
})

server.get('/category',async (req,res) => {
    const category = await CarsCategory.find({})
    res.json(category)
})

server.post('/', (req,res) => {
    const { body, model, drive, fuel, brand, transmission, wheel, year, volume, price, title, image, phone} = req.body
    const newCar = new NewCar({
        body,
        model,
        drive,
        fuel,
        brand,
        transmission,
        wheel,
        year,
        volume,
        price,
        title,
        image,
        phone
    })
    newCar.save()
    res.json(newCar)
})
