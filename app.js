const express = require('express')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3001
const sqlConnection = require('./config/sqlConnect')
const { notFound, errorHandler } = require('./middleware/errorHandler')
// const cloudinary = require('cloudinary').v2;
// router
const userRouter = require('./route/userRoute')
const app = express()



// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// })

app.use(cookieParser())
app.use(express.json())
sqlConnection.authenticate()
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log('database error: ' + err))

app.get('/', (req, res) => {
    res.send('API ready!')
})

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))