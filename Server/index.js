const http = require('http')
const app = require('./app')
const config = require('./utils/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})

// Automatically check if collection exsists and creates one if there is none 
const dbSetup = require('./utils/dbSetup')
dbSetup.setupClicksDB()

