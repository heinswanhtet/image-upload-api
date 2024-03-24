require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

// file uploads
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// database
const connectDB = require('./db/connection')

// routers
const catRouter = require('./routes/catRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')

app.set('trust proxy', 1)
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60
    })
)
app.use(helmet())
app.use(xss())
app.use(cors())

app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload())

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/api/v1/cats', catRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleWare)

const port = process.env.PORT || 3000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening: http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()