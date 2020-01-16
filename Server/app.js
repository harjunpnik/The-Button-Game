const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')

console.log('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true})

const clickRouter = require('./controllers/click')
const userRouter = require('./controllers/user')
const errorHandler = require('./controllers/error')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/click', clickRouter)
app.use('/api/user', userRouter)
app.use(errorHandler)


module.exports = app
