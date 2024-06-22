require('dotenv').config()
const connectDB = require('./db/connect')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')
const reviewRouter = require('./routes/reviewRoutes')
const paymentRouter = require('./routes/stripeRoute')
const globalErrorHandler = require('./controllers/errorController')

const morgan = require('morgan')
const AppError = require('./utility/appError')

const app = express()

if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.enable('trust proxy')

app.use(cors({
    origin: true,
    credentials: true}))
app.options('*', cors())

app.use(helmet())

app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());


app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('api/v1/payments', paymentRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Cant't find ${req.originalUrl} on this server`))
})

app.use(globalErrorHandler)

const port = process.env.PORT || 5000

const server = async () => {
    try {
        await connectDB(process.env.DATABASE)
        app.listen(port, console.log(`Server listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
} 
server()