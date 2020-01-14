const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./utils/config')

console.log('connecting to', config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI

console.log("here")

mongoose.connect(mongoUrl, { useNewUrlParser: true , useUnifiedTopology: true})

const clickRouter = require('./controllers/click')

app.use(cors())
app.use(bodyParser.json())

app.use('/api/click', clickRouter)

module.exports = app
