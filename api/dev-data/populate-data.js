require('dotenv').config()
const connectDB = require('../db/connect')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const Product = require('../models/productsModel')
const productData = require('./product.json')

const app = express()

app.enable('trust proxy')


app.use(cors())
app.options('*', cors())

app.use(helmet())

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());


const port = process.env.PORT || 5000

const server = async () => {
    try {
        await connectDB(process.env.DATABASE)
        await Product.create(productData)
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
} 
server()